"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import Link from "next/link"
import { doctorDatabase } from "@/lib/doctors"

interface Doctor {
  id: string
  name: string
  specialty: string
  country: string
  medicalRole: string
  workPreference: string
  bio: string
  photoUrl: string
  email: string
  phone: string
  availability: string
  approved: boolean
}

const doctors: Doctor[] = Object.values(doctorDatabase).map((entry) => ({
  id: entry.doctor.doctor_id,
  name: entry.doctor.name,
  specialty: entry.doctor.specialty,
  country: entry.doctor.country,
  medicalRole: entry.doctor.medical_role,
  workPreference: entry.doctor.work_preference,
  bio: entry.profile.bio,
  photoUrl: entry.doctor.photo_url,
  email: "N/A",
  phone: "N/A",
  availability: entry.doctor.availability,
  approved: true,
}))

const getPreferenceVariant = (preference: string): "default" | "secondary" | "outline" => {
  const variants: Record<string, "default" | "secondary" | "outline"> = {
    Telemedicine: "default",
    "Field Work": "secondary",
    Both: "outline",
  }
  return variants[preference] || "outline"
}

const getPreferenceColor = (preference: string): { bg: string; text: string; border: string } => {
  switch (preference) {
    case "Telemedicine":
      return { bg: "bg-blue-600", text: "text-white", border: "border-blue-600" }
    case "Field Work":
      return { bg: "bg-slate-900", text: "text-white", border: "border-slate-900" }
    case "Both":
      return { bg: "bg-slate-300", text: "text-slate-900", border: "border-slate-300" }
    default:
      return { bg: "bg-muted", text: "text-muted-foreground", border: "border-muted-foreground" }
  }
}

export default function DoctorsPage() {
  const [allDoctors, setAllDoctors] = useState<Doctor[]>(doctors)
  const [searchTerm, setSearchTerm] = useState("")
  const [specialtyFilter, setSpecialtyFilter] = useState("all")
  const [countryFilter, setCountryFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const registeredDoctors = JSON.parse(localStorage.getItem("doctors") || "[]")
      const approvedDoctors = registeredDoctors.filter((doc: any) => doc.approved === true)

      const formattedDoctors = approvedDoctors.map((doc: any) => ({
        id: doc.id || doc.doctor_id,
        name: doc.name,
        specialty: doc.specialty,
        country: doc.country,
        medicalRole: doc.medicalRole || doc.medical_role,
        workPreference: doc.workPreference || doc.work_preference,
        bio: doc.bio || "Professional healthcare provider with passion for global care.",
        photoUrl: doc.photoUrl || doc.photo_url || "/caring-doctor.png",
        email: doc.email,
        phone: doc.phone,
        availability: doc.availability || "Availability TBD",
        approved: true,
      }))

      if (formattedDoctors.length > 0) {
        setAllDoctors([...doctors, ...formattedDoctors])
      }
    }
    setIsLoading(false)
  }, [])

  const specialties = Array.from(new Set(allDoctors.map((d) => d.specialty)))
  const countries = Array.from(new Set(allDoctors.map((d) => d.country)))

  const filteredDoctors = allDoctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSpecialty = specialtyFilter === "all" || doctor.specialty === specialtyFilter
    const matchesCountry = countryFilter === "all" || doctor.country === countryFilter

    return matchesSearch && matchesSpecialty && matchesCountry
  })

if (isLoading) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <main className="flex-1 py-16 px-4">
        <div className="max-w-7xl mx-auto">

          {/* Page header skeleton */}
          <div className="text-center mb-10">
            <div className="mx-auto h-8 w-80 rounded-md bg-gray-300 animate-pulse" />
            <div className="mx-auto mt-3 h-4 w-96 rounded-md bg-gray-300/80 animate-pulse" />
          </div>

          {/* Filters skeleton */}
          <div className="grid md:grid-cols-3 gap-4 mb-8 bg-card p-4 md:p-6 rounded-lg">
            <div className="space-y-2">
              <div className="h-4 w-24 rounded bg-gray-300 animate-pulse" />
              <div className="h-10 rounded-md bg-gray-300 animate-pulse" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-28 rounded bg-gray-300 animate-pulse" />
              <div className="h-10 rounded-md bg-gray-300 animate-pulse" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-20 rounded bg-gray-300 animate-pulse" />
              <div className="h-10 rounded-md bg-gray-300 animate-pulse" />
            </div>
          </div>

          {/* Doctor cards skeleton grid */}
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-lg border border-border bg-card p-4 flex flex-col gap-4 animate-pulse"
              >
                {/* avatar row */}
                <div className="flex items-center gap-4">
                  <div className="shrink-0">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-300" />
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-3/4 bg-gray-300 rounded" />
                    <div className="h-3 w-1/2 bg-gray-300 rounded" />
                  </div>
                </div>

                {/* badges */}
                <div className="flex gap-2 flex-wrap">
                  <div className="h-6 w-20 rounded-md bg-gray-300" />
                  <div className="h-6 w-16 rounded-md bg-gray-300" />
                  <div className="h-6 w-12 rounded-md bg-gray-300" />
                </div>

                {/* bio lines */}
                <div className="space-y-2 mt-1">
                  <div className="h-3 w-full bg-gray-300 rounded" />
                  <div className="h-3 w-11/12 bg-gray-300 rounded" />
                </div>

                {/* CTA placeholder */}
                <div className="mt-auto">
                  <div className="h-8 w-32 rounded bg-gray-300 ml-auto" />
                </div>
              </div>
            ))}
          </div>

          <div className="col-span-full text-center py-12 hidden">
            <p className="text-muted-foreground text-lg">Loading doctors...</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}


  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-16 px-4 bg-secondary/5">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              Our Healthcare Professionals
            </h1>
            <p className="text-lg text-muted-foreground">
              Meet the dedicated healthcare experts providing care through
              Intellibus Care Foundation
            </p>
          </div>

          {/* Filters */}
          <div className="grid md:grid-cols-3 gap-4 mb-12 bg-card p-6 rounded-lg">
            <div>
              <label className="block text-sm font-medium mb-2">Search</label>
              <Input
                placeholder="Search by name or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Specialty
              </label>
              <Select
                value={specialtyFilter}
                onValueChange={setSpecialtyFilter}
              >
                <SelectTrigger className="cursor-pointer">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Specialties</SelectItem>
                  {specialties.map((specialty) => (
                    <SelectItem key={specialty} value={specialty}>
                      {specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Country</label>
              <Select value={countryFilter} onValueChange={setCountryFilter}>
                <SelectTrigger className="cursor-pointer">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Countries</SelectItem>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Doctor Cards Grid */}
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map((doctor) => (
                <motion.div
                  key={doctor.id}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Link href={`/doctors/${doctor.id}`}>
                    <Card className="overflow-hidden rounded-lg shadow-md border border-border h-full flex flex-col bg-card hover:shadow-lg transition-shadow cursor-pointer w-auto">
                      {/* Image Section */}
                      <div className="flex justify-center mt-6">
                        <div className="relative w-70 h-70 overflow-hidden bg-muted group rounded-full flex justify-center items-center">
                          <img
                            src={doctor.photoUrl || "/placeholder.svg"}
                            alt={doctor.name}
                            className=" object-cover object-[center_20%] transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                      </div>
                      {/* Content Section */}
                      <div className="p-5 flex flex-col flex-1 space-y-3">
                        <div>
                          <h3 className="text-lg font-bold text-foreground">
                            {doctor.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {doctor.medicalRole}
                          </p>
                        </div>

                        {/* Badges - Specialty (Blue), Work Preference (Black), Country (Grey) */}
                        <div className="flex gap-2 flex-wrap">
                          {doctor.specialty && (
                            <Badge className="px-3 py-1 text-xs bg-blue-600 text-white">
                              {doctor.specialty}
                            </Badge>
                          )}

                          {doctor.workPreference === "Both" ? (
                            <>
                              <Badge className="px-3 py-1 text-xs bg-slate-900 text-white">
                                Telemedicine
                              </Badge>
                              <Badge className="px-3 py-1 text-xs bg-slate-900 text-white">
                                Medical care
                              </Badge>
                            </>
                          ) : (
                            <Badge
                              className={`px-3 py-1 text-xs ${getPreferenceColor(doctor.workPreference).bg} ${getPreferenceColor(doctor.workPreference).text}`}
                            >
                              {doctor.workPreference}
                            </Badge>
                          )}

                          <Badge
                            variant="outline"
                            className="px-3 py-1 text-xs bg-slate-100 text-slate-700 border-slate-300"
                          >
                            {doctor.country}
                          </Badge>
                        </div>

                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                          {doctor.bio}
                        </p>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No healthcare professionals found matching your filters.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
