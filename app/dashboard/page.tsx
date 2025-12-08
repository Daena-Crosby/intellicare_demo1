"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getAdminSession } from "@/lib/auth"
import { Users, CheckCircle2, Clock, Search, LogOut, UserCheck, UserX, Shield, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { createClient } from "@supabase/supabase-js"
import { deleteDoctor } from "@/app/actions/delete-doctor"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

export default function DashboardPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [allDoctors, setAllDoctors] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null)
  const [doctorToDelete, setDoctorToDelete] = useState<any>(null)

  useEffect(() => {
    const checkAuth = async () => {
      const adminAuth = getAdminSession()

      if (!adminAuth) {
        router.push("/admin-login")
        return
      }

      await loadDoctors()
      setIsLoading(false)
    }

    checkAuth()
  }, [router])

  const loadDoctors = async () => {
    try {
      const { data, error } = await supabase
        .from("doctors_form_data")
        .select("*")
        .order("createdat", { ascending: false })

      if (error) {
        console.error("[v0] Error loading doctors:", error)
        toast({
          title: "Error",
          description: "Failed to load doctors from database",
          variant: "destructive",
        })
        return
      }

      const doctors = (data || []).map((doc: any) => ({
        id: doc.doctor_id,
        name: doc.name,
        email: doc.email,
        country: doc.country,
        medicalRole: doc.medical_role,
        specialty: doc.specialty,
        workPreference: doc.work_preference,
        availability: doc.availability,
        phone: doc.phone || "N/A",
        approved: doc.approved || false,
        registeredAt: doc.createdat,
        photoUrl: doc.photo_url,
      }))

      setAllDoctors(doctors)
    } catch (error) {
      console.error("[v0] Error loading doctors:", error)
    }
  }

  const handleApproveDoctor = async (doctorId: string) => {
    try {
      const { error } = await supabase.from("doctors_form_data").update({ approved: true }).eq("doctor_id", doctorId)

      if (error) {
        toast({
          title: "Error",
          description: "Failed to approve doctor",
          variant: "destructive",
        })
        return
      }

      await loadDoctors()

      toast({
        title: "Doctor Approved",
        description: "The doctor's profile is now visible on the public doctors page.",
      })
    } catch (error) {
      console.error("[v0] Approval error:", error)
    }
  }

  const handleRejectDoctor = async (doctorId: string) => {
    try {
      const { error } = await supabase.from("doctors_form_data").update({ approved: false }).eq("doctor_id", doctorId)

      if (error) {
        toast({
          title: "Error",
          description: "Failed to revoke approval",
          variant: "destructive",
        })
        return
      }

      await loadDoctors()

      toast({
        title: "Approval Revoked",
        description: "The doctor's profile has been removed from the public page.",
        variant: "destructive",
      })
    } catch (error) {
      console.error("[v0] Rejection error:", error)
    }
  }

  const handleDeleteDoctor = async () => {
    if (!doctorToDelete) return

    try {
      const result = await deleteDoctor(doctorToDelete.id)

      if (result.success) {
        await loadDoctors()
        toast({
          title: "Doctor Deleted",
          description: "The doctor has been permanently removed from the system.",
        })
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to delete doctor",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("[v0] Delete error:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setDoctorToDelete(null)
    }
  }

  // Handle admin logout
  const handleLogout = () => {
    localStorage.removeItem("admin_session")
    router.push("/")
  }

  // Filter doctors based on search
  const filteredDoctors = allDoctors.filter(
    (doctor) =>
      doctor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.country?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const pendingDoctors = filteredDoctors.filter((doc) => !doc.approved)
  const approvedDoctors = filteredDoctors.filter((doc) => doc.approved)

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-secondary/5">
      <Header />
      <main className="flex-1 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Admin Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <p className="text-muted-foreground">Manage medical volunteer registrations</p>
              </div>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Registered</p>
                  <p className="text-3xl font-bold">{allDoctors.length}</p>
                </div>
                <Users className="w-8 h-8 text-primary" />
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Pending Approval</p>
                  <p className="text-3xl font-bold text-yellow-600">{pendingDoctors.length}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Approved</p>
                  <p className="text-3xl font-bold text-green-600">{approvedDoctors.length}</p>
                </div>
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
            </Card>
          </div>

          {/* Tabs for Pending and Approved */}
          <Tabs defaultValue="pending" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="pending">Pending Approval ({pendingDoctors.length})</TabsTrigger>
              <TabsTrigger value="approved">Approved ({approvedDoctors.length})</TabsTrigger>
            </TabsList>

            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search by name, email, specialty, or country..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Pending Doctors Tab */}
            <TabsContent value="pending">
              <Card className="p-6">
                {pendingDoctors.length === 0 ? (
                  <div className="text-center py-12">
                    <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <p className="text-muted-foreground">No pending approvals!</p>
                  </div>
                ) : (
                  <div className="border rounded-lg bg-card overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/50">
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Specialty</TableHead>
                          <TableHead>Country</TableHead>
                          <TableHead>Work Type</TableHead>
                          <TableHead>Registered</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pendingDoctors.map((doctor) => (
                          <TableRow key={doctor.id}>
                            <TableCell className="font-medium">{doctor.name}</TableCell>
                            <TableCell className="text-sm">{doctor.email}</TableCell>
                            <TableCell>
                              <Badge className="bg-blue-600 text-white">{doctor.specialty}</Badge>
                            </TableCell>
                            <TableCell>{doctor.country}</TableCell>
                            <TableCell>
                              <Badge variant="secondary">{doctor.workPreference}</Badge>
                            </TableCell>
                            <TableCell className="text-sm">
                              {new Date(doctor.registeredAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex gap-2 justify-end">
                                <Button size="sm" variant="outline" onClick={() => setSelectedDoctor(doctor)}>
                                  View
                                </Button>
                                <Button
                                  size="sm"
                                  className="bg-green-600 hover:bg-green-700"
                                  onClick={() => handleApproveDoctor(doctor.id)}
                                >
                                  <UserCheck className="w-4 h-4 mr-1" />
                                  Approve
                                </Button>
                                <Button size="sm" variant="destructive" onClick={() => setDoctorToDelete(doctor)}>
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </Card>
            </TabsContent>

            {/* Approved Doctors Tab */}
            <TabsContent value="approved">
              <Card className="p-6">
                {approvedDoctors.length === 0 ? (
                  <div className="text-center py-12">
                    <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No approved volunteers yet.</p>
                  </div>
                ) : (
                  <div className="border rounded-lg bg-card overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/50">
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Specialty</TableHead>
                          <TableHead>Country</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {approvedDoctors.map((doctor) => (
                          <TableRow key={doctor.id}>
                            <TableCell className="font-medium">{doctor.name}</TableCell>
                            <TableCell className="text-sm">{doctor.email}</TableCell>
                            <TableCell>
                              <Badge className="bg-blue-600 text-white">{doctor.specialty}</Badge>
                            </TableCell>
                            <TableCell>{doctor.country}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex gap-2 justify-end">
                                <Button size="sm" variant="outline" onClick={() => setSelectedDoctor(doctor)}>
                                  Details
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => handleRejectDoctor(doctor.id)}>
                                  <UserX className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="destructive" onClick={() => setDoctorToDelete(doctor)}>
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />

      {/* Doctor Details Modal */}
      {selectedDoctor && (
        <Dialog open={!!selectedDoctor} onOpenChange={() => setSelectedDoctor(null)}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl flex items-center gap-3">
                {selectedDoctor.name}
                {selectedDoctor.approved && <Badge className="bg-green-600 text-white">Approved</Badge>}
                {!selectedDoctor.approved && <Badge className="bg-yellow-600 text-white">Pending</Badge>}
              </DialogTitle>
              <DialogDescription>Complete volunteer information</DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* Contact & Basic Info */}
              <div className="grid md:grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Email</p>
                  <p className="text-sm font-medium">{selectedDoctor.email}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Phone</p>
                  <p className="text-sm font-medium">{selectedDoctor.phone}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Country</p>
                  <p className="text-sm font-medium">{selectedDoctor.country}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Role</p>
                  <p className="text-sm font-medium">{selectedDoctor.medicalRole}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Specialty</p>
                  <p className="text-sm font-medium">{selectedDoctor.specialty}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Work Type</p>
                  <p className="text-sm font-medium">{selectedDoctor.workPreference}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-xs font-medium text-muted-foreground mb-1">Availability</p>
                  <p className="text-sm">{selectedDoctor.availability || "Not specified"}</p>
                </div>
              </div>

              {/* Approval Actions */}
              {!selectedDoctor.approved ? (
                <div className="flex gap-3">
                  <Button
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    onClick={() => {
                      handleApproveDoctor(selectedDoctor.id)
                      setSelectedDoctor(null)
                    }}
                  >
                    <UserCheck className="w-4 h-4 mr-2" />
                    Approve Doctor
                  </Button>
                  <Button variant="outline" onClick={() => setSelectedDoctor(null)}>
                    Cancel
                  </Button>
                </div>
              ) : (
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1 bg-transparent"
                    onClick={() => {
                      handleRejectDoctor(selectedDoctor.id)
                      setSelectedDoctor(null)
                    }}
                  >
                    <UserX className="w-4 h-4 mr-2" />
                    Revoke Approval
                  </Button>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}

      {doctorToDelete && (
        <Dialog open={!!doctorToDelete} onOpenChange={() => setDoctorToDelete(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl flex items-center gap-2 text-red-600">
                <Trash2 className="w-5 h-5" />
                Confirm Deletion
              </DialogTitle>
              <DialogDescription>This action cannot be undone.</DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <p className="text-sm">
                Are you sure you want to permanently delete <strong>{doctorToDelete.name}</strong> from the system?
              </p>
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-xs text-red-800">
                  <strong>Warning:</strong> This will permanently remove all their information from the database.
                </p>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setDoctorToDelete(null)}>
                  Cancel
                </Button>
                <Button variant="destructive" className="flex-1" onClick={handleDeleteDoctor}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Permanently
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
