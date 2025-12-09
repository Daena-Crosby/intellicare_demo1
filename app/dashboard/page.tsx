"use client"

import type React from "react"
import type { DoctorFormData } from "@/types/doctor"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getAdminSession } from "@/lib/auth"
import {
  Users,
  CheckCircle2,
  Clock,
  Trash2,
  Upload,
  FileText,
  Loader2,
  Mail,
  Phone,
  MapPin,
  Stethoscope,
  CheckCircle,
  AlertCircle,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Edit2,
  Save,
  X,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { createClient } from "@/lib/supabase/client"
import { deleteDoctor } from "@/app/actions/delete-doctor"
import { uploadTranscript } from "@/app/actions/upload-transcript"
import { updateDoctorStatus } from "@/app/actions/update-doctor-status"
import { parseDocument } from "@/app/actions/parse-document"

const supabase = createClient()

export default function AdminDashboard() {
  const router = useRouter()
  const { toast } = useToast()

  const [isLoading, setIsLoading] = useState(true)
  const [allDoctors, setAllDoctors] = useState<DoctorFormData[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [doctorToDelete, setDoctorToDelete] = useState<DoctorFormData | null>(null)
  const [transcriptDoctor, setTranscriptDoctor] = useState<DoctorFormData | null>(null)
  const [transcriptText, setTranscriptText] = useState("")
  const [transcriptFile, setTranscriptFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [expandedDoctors, setExpandedDoctors] = useState(new Set<string>())
  const [editingDoctor, setEditingDoctor] = useState<string | null>(null)
  const [editedData, setEditedData] = useState<Partial<DoctorFormData>>({})

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
        // NOTE: if your column is `created_at` in Supabase, change this to "created_at"
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

      setAllDoctors(data || [])
    } catch (error) {
      console.error("[v0] Error loading doctors:", error)
    }
  }

  const handleApproveDoctor = async (doctorId: string) => {
    const result = await updateDoctorStatus(doctorId, { approved: true })

    if (result.success) {
      await loadDoctors()
      toast({
        title: "Doctor Approved",
        description: "The doctor's profile is now visible on the public doctors page.",
      })
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to approve doctor",
        variant: "destructive",
      })
    }
  }

  const handleRejectDoctor = async (doctorId: string) => {
    const result = await updateDoctorStatus(doctorId, { approved: false })

    if (result.success) {
      await loadDoctors()
      toast({
        title: "Approval Revoked",
        description: "The doctor's profile has been removed from the public page.",
        variant: "destructive",
      })
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to revoke approval",
        variant: "destructive",
      })
    }
  }

  const handleDeleteDoctor = async () => {
    if (!doctorToDelete) return

    try {
      const result = await deleteDoctor(doctorToDelete.doctor_id)

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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    console.log("[v0] File selected:", file.name, "Type:", file.type, "Size:", file.size)
    setTranscriptFile(file)
    setIsProcessing(true)

    try {
      // Convert file to base64 for server-side parsing (browser-safe)
      const arrayBuffer = await file.arrayBuffer()
      const bytes = new Uint8Array(arrayBuffer)
      let binary = ""
      for (let i = 0; i < bytes.length; i++) {
        binary += String.fromCharCode(bytes[i])
      }
      const base64 = btoa(binary)

      // Parse document on server
      const result = await parseDocument(base64, file.name, file.type)

      if (result.success && result.text) {
        console.log("[v0] File parsed successfully, length:", result.text.length)
        setTranscriptText(result.text)
        toast({
          title: "File Loaded",
          description: `Successfully extracted ${result.text.length} characters from ${file.name}`,
        })
      } else {
        console.error("[v0] File parsing failed:", result.error)
        toast({
          title: "File Parsing Error",
          description: result.error || "Could not parse the file. Please try pasting text directly.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("[v0] File processing error:", error)
      toast({
        title: "Error",
        description: "Failed to process file. Please try pasting the transcript text directly.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleUploadTranscript = async () => {
    if (!transcriptDoctor || !transcriptText.trim()) {
      toast({
        title: "Error",
        description: "Please enter or upload a transcript",
        variant: "destructive",
      })
      return
    }

    if (transcriptText.trim().length < 50) {
      toast({
        title: "Error",
        description: "Transcript is too short. Please provide a complete interview transcript.",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)
    console.log("[v0] Starting transcript upload for doctor:", transcriptDoctor.doctor_id)

    try {
      const result = await uploadTranscript(
        transcriptDoctor.doctor_id,
        transcriptText,
        transcriptFile?.name || "pasted-transcript.txt",
      )
      console.log("[v0] Transcript upload result:", result)

      if (result.success) {
        await loadDoctors()
        toast({
          title: "Transcript Processed Successfully",
          description: "AI has extracted profile information and created the doctor's dynamic profile page.",
        })
        setTranscriptDoctor(null)
        setTranscriptText("")
        setTranscriptFile(null)
      } else {
        console.error("[v0] Transcript upload failed:", result.error)
        toast({
          title: "Processing Failed",
          description: result.error || "Failed to process transcript",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("[v0] Transcript upload error:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleUpdateField = async (doctorId: string, field: string, value: string | boolean) => {
    const result = await updateDoctorStatus(doctorId, { [field]: value })

    if (result.success) {
      await loadDoctors()
      toast({
        title: "Updated",
        description: "Doctor information has been updated.",
      })
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to update",
        variant: "destructive",
      })
    }
  }

  const startEditing = (doctor: DoctorFormData) => {
    setEditingDoctor(doctor.doctor_id)
    setEditedData({
      name: doctor.name,
      email: doctor.email,
      phone: doctor.phone,
      specialty: doctor.specialty,
      country: doctor.country,
      medicalrole: doctor.medicalrole,
      years_experience: doctor.years_experience,
    })
  }

  const saveEditing = async () => {
    if (!editingDoctor) return

    const result = await updateDoctorStatus(editingDoctor, editedData)

    if (result.success) {
      await loadDoctors()
      setEditingDoctor(null)
      setEditedData({})
      toast({
        title: "Updated",
        description: "Doctor information has been saved.",
      })
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to save changes",
        variant: "destructive",
      })
    }
  }

  const cancelEditing = () => {
    setEditingDoctor(null)
    setEditedData({})
  }

  const handleLogout = () => {
    localStorage.removeItem("admin_session")
    router.push("/")
  }

  const filteredDoctors = allDoctors.filter(
    (doctor) =>
      doctor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.country?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const pendingDoctors = filteredDoctors.filter((doc) => !doc.approved)
  const approvedDoctors = filteredDoctors.filter((doc) => doc.approved)

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      new: "bg-blue-500",
      scheduled: "bg-yellow-500",
      interviewed: "bg-purple-500",
      "1st meeting": "bg-orange-500",
      credential: "bg-green-500",
    }
    return colors[status] || "bg-gray-500"
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage doctor registrations and profiles</p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 border-l-4 border-l-primary">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Total Registered</p>
                <p className="text-4xl font-bold">{allDoctors.length}</p>
              </div>
              <div className="bg-primary/10 p-4 rounded-xl">
                <Users className="w-8 h-8 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-l-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Pending Approval</p>
                <p className="text-4xl font-bold text-yellow-600">{pendingDoctors.length}</p>
              </div>
              <div className="bg-yellow-500/10 p-4 rounded-xl">
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-l-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Approved</p>
                <p className="text-4xl font-bold text-green-600">{approvedDoctors.length}</p>
              </div>
              <div className="bg-green-500/10 p-4 rounded-xl">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-l-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Profiles Generated</p>
                <p className="text-4xl font-bold text-blue-600">
                  {allDoctors.filter((d) => d.profile_generated).length}
                </p>
              </div>
              <div className="bg-blue-500/10 p-4 rounded-xl">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </Card>
        </div>

        <div className="mb-6">
          <Input
            placeholder="Search by name, email, specialty, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>

        <div className="space-y-6">
          {filteredDoctors.map((doctor) => {
            const isEditing = editingDoctor === doctor.doctor_id
            const isExpanded = expandedDoctors.has(doctor.doctor_id)

            return (
              <Card
                key={doctor.doctor_id}
                className="overflow-hidden hover:shadow-lg transition-all duration-200"
              >
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      {isEditing ? (
                        <Input
                          value={editedData.name ?? ""}
                          onChange={(e) =>
                            setEditedData({
                              ...editedData,
                              name: e.target.value,
                            })
                          }
                          className="text-2xl font-bold mb-2"
                        />
                      ) : (
                        <h3 className="text-2xl font-bold mb-2">{doctor.name}</h3>
                      )}
                      <div className="flex flex-wrap items-center gap-3">
                        <Select
                          value={doctor.status || "new"}
                          onValueChange={(value) => handleUpdateField(doctor.doctor_id, "status", value)}
                        >
                          <SelectTrigger
                            className={`w-auto h-8 ${getStatusColor(
                              doctor.status || "new",
                            )} text-white border-none`}
                          >
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="new">New</SelectItem>
                            <SelectItem value="scheduled">Scheduled</SelectItem>
                            <SelectItem value="interviewed">Interviewed</SelectItem>
                            <SelectItem value="1st meeting">1st Meeting</SelectItem>
                            <SelectItem value="credential">Credential</SelectItem>
                          </SelectContent>
                        </Select>

                        {doctor.approved ? (
                          <Badge className="bg-green-500 text-white gap-1">
                            <CheckCircle className="w-3 h-3" />
                            Approved
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="border-yellow-500 text-yellow-700 gap-1">
                            <AlertCircle className="w-3 h-3" />
                            Pending
                          </Badge>
                        )}
                        {doctor.profile_generated && (
                          <Badge className="bg-blue-500 text-white gap-1">
                            <FileText className="w-3 h-3" />
                            Profile Generated
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {isEditing ? (
                        <>
                          <Button size="sm" onClick={saveEditing} className="bg-green-600 hover:bg-green-700">
                            <Save className="w-4 h-4 mr-1" />
                            Save
                          </Button>
                          <Button size="sm" variant="outline" onClick={cancelEditing}>
                            <X className="w-4 h-4 mr-1" />
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <Button size="sm" variant="outline" onClick={() => startEditing(doctor)}>
                          <Edit2 className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          const newExpandedDoctors = new Set(expandedDoctors)
                          if (newExpandedDoctors.has(doctor.doctor_id)) {
                            newExpandedDoctors.delete(doctor.doctor_id)
                          } else {
                            newExpandedDoctors.add(doctor.doctor_id)
                          }
                          setExpandedDoctors(newExpandedDoctors)
                        }}
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Left Column - Doctor Information */}
                    <div className="md:col-span-2 space-y-4">
                      <div className="grid md:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Mail className="w-4 h-4 flex-shrink-0" />
                          {isEditing ? (
                            <Input
                              value={editedData.email ?? ""}
                              onChange={(e) =>
                                setEditedData({
                                  ...editedData,
                                  email: e.target.value,
                                })
                              }
                              className="h-8"
                            />
                          ) : (
                            <span className="truncate">{doctor.email}</span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Phone className="w-4 h-4 flex-shrink-0" />
                          {isEditing ? (
                            <Input
                              value={editedData.phone ?? ""}
                              onChange={(e) =>
                                setEditedData({
                                  ...editedData,
                                  phone: e.target.value,
                                })
                              }
                              className="h-8"
                            />
                          ) : (
                            <span>{doctor.phone || "N/A"}</span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Stethoscope className="w-4 h-4 flex-shrink-0" />
                          {isEditing ? (
                            <div className="flex gap-2 flex-1">
                              <Input
                                value={editedData.medicalrole ?? ""}
                                onChange={(e) =>
                                  setEditedData({
                                    ...editedData,
                                    medicalrole: e.target.value,
                                  })
                                }
                                className="h-8"
                                placeholder="Role"
                              />
                              <Input
                                value={editedData.specialty ?? ""}
                                onChange={(e) =>
                                  setEditedData({
                                    ...editedData,
                                    specialty: e.target.value,
                                  })
                                }
                                className="h-8"
                                placeholder="Specialty"
                              />
                            </div>
                          ) : (
                            <span className="truncate">
                              {doctor.medicalrole || "N/A"} - {doctor.specialty}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="w-4 h-4 flex-shrink-0" />
                          {isEditing ? (
                            <Input
                              value={editedData.country ?? ""}
                              onChange={(e) =>
                                setEditedData({
                                  ...editedData,
                                  country: e.target.value,
                                })
                              }
                              className="h-8"
                            />
                          ) : (
                            <span>{doctor.country}</span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Briefcase className="w-4 h-4 flex-shrink-0" />
                          {isEditing ? (
                            <Input
                              value={
                                editedData.years_experience !== undefined && editedData.years_experience !== null
                                  ? String(editedData.years_experience)
                                  : ""
                              }
                              onChange={(e) =>
                                setEditedData({
                                  ...editedData,
                                  years_experience: e.target.value as any,
                                })
                              }
                              className="h-8"
                              placeholder="Years"
                            />
                          ) : (
                            <span>{doctor.years_experience || "N/A"} years</span>
                          )}
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="space-y-4 pt-4 border-t">
                          <div className="grid md:grid-cols-3 gap-3">
                            <div>
                              <label className="text-sm font-medium text-muted-foreground mb-1 block">Preference</label>
                              <Select
                                value={doctor.preference || doctor.work_preference || "tbd"}
                                onValueChange={(value) =>
                                  handleUpdateField(doctor.doctor_id, "preference", value)
                                }
                              >
                                <SelectTrigger className="h-9">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="field">Field</SelectItem>
                                  <SelectItem value="telemedicine">Telemedicine</SelectItem>
                                  <SelectItem value="both">Both</SelectItem>
                                  <SelectItem value="tbd">TBD</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <label className="text-sm font-medium text-muted-foreground mb-1 block">
                                Availability
                              </label>
                              <Select
                                value={doctor.availability || "tbd"}
                                onValueChange={(value) =>
                                  handleUpdateField(doctor.doctor_id, "availability", value)
                                }
                              >
                                <SelectTrigger className="h-9">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="full time">Full Time</SelectItem>
                                  <SelectItem value="part time">Part Time</SelectItem>
                                  <SelectItem value="tbd">TBD</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <label className="text-sm font-medium text-muted-foreground mb-1 block">
                                Certification
                              </label>
                              <Select
                                value={doctor.certification_documents || "not submitted"}
                                onValueChange={(value) =>
                                  handleUpdateField(doctor.doctor_id, "certification_documents", value)
                                }
                              >
                                <SelectTrigger className="h-9">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="submitted">Submitted</SelectItem>
                                  <SelectItem value="not submitted">Not Submitted</SelectItem>
                                  <SelectItem value="certified">Certified</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div>
                            <label className="text-sm font-medium text-muted-foreground mb-1 block">
                              Verification
                            </label>
                            <Input
                              value={doctor.verification || ""}
                              onChange={(e) =>
                                handleUpdateField(doctor.doctor_id, "verification", e.target.value)
                              }
                              placeholder="Enter verification details..."
                              className="h-9"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right Column - Actions */}
                    <div className="space-y-3">
                      {doctor.approved ? (
                        <Button
                          onClick={() => handleRejectDoctor(doctor.doctor_id)}
                          variant="outline"
                          className="w-full border-yellow-500 text-yellow-700 hover:bg-yellow-50"
                        >
                          Revoke Approval
                        </Button>
                      ) : (
                        <Button
                          onClick={() => handleApproveDoctor(doctor.doctor_id)}
                          className="w-full bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Approve Doctor
                        </Button>
                      )}

                      {!doctor.profile_generated && (
                        <Button
                          onClick={() => {
                            console.log("[v0] Opening transcript dialog for doctor:", doctor.doctor_id)
                            setTranscriptDoctor(doctor)
                          }}
                          variant="secondary"
                          className="w-full hover:bg-blue-100 hover:text-blue-700 transition-colors"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Upload Transcript
                        </Button>
                      )}

                      {doctor.profile_generated && doctor.approved && (
                        <Button
                          onClick={() => router.push(`/doctors/${doctor.doctor_id}`)}
                          variant="outline"
                          className="w-full"
                        >
                          View Profile
                        </Button>
                      )}

                      <Button
                        onClick={() => setDoctorToDelete(doctor)}
                        variant="outline"
                        className="w-full hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition-colors"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Doctor
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}

          {filteredDoctors.length === 0 && (
            <Card className="p-12">
              <div className="text-center text-muted-foreground">
                <Users className="w-16 h-16 mx-auto mb-4 opacity-20" />
                <p className="text-lg">No doctors found</p>
                <p className="text-sm">Try adjusting your search criteria</p>
              </div>
            </Card>
          )}
        </div>
      </main>
      <Footer />

      {/* Transcript Upload Dialog */}
      <Dialog
        open={!!transcriptDoctor}
        onOpenChange={(open) => {
          if (!open) {
            setTranscriptDoctor(null)
            setTranscriptText("")
            setTranscriptFile(null)
          }
        }}
      >
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Upload Interview Transcript</DialogTitle>
            <DialogDescription>
              Upload or paste the doctor's interview transcript. The AI will automatically extract and structure their
              profile information.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Upload File</label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                <Input
                  type="file"
                  accept=".pdf,.docx"
                  onChange={handleFileChange}
                  disabled={isProcessing}
                  className="cursor-pointer"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  <strong>Accepted formats:</strong> PDF, DOCX
                </p>
                <p className="text-xs text-muted-foreground">Upload the interview transcript in any supported format</p>
                {transcriptFile && (
                  <p className="text-xs text-green-600 mt-2 font-medium">✓ Loaded: {transcriptFile.name}</p>
                )}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleUploadTranscript}
                disabled={isProcessing || !transcriptText.trim()}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing with AI...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Process Transcript
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setTranscriptDoctor(null)
                  setTranscriptText("")
                  setTranscriptFile(null)
                }}
                disabled={isProcessing}
              >
                Cancel
              </Button>
            </div>

            {isProcessing && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Processing Steps:</strong>
                </p>
                <ul className="text-xs text-blue-700 mt-2 space-y-1 list-disc list-inside">
                  <li>Saving transcript to database...</li>
                  <li>Analyzing with AI...</li>
                  <li>Extracting profile information...</li>
                  <li>Creating dynamic profile page...</li>
                </ul>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!doctorToDelete} onOpenChange={() => setDoctorToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to permanently delete <strong>{doctorToDelete?.name}</strong>? This action cannot be
              undone and will remove all associated data including their profile and transcripts.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setDoctorToDelete(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteDoctor}>
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Permanently
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
