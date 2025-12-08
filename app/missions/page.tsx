"use client"

import { useSearchParams } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, Heart } from "lucide-react"

// Mission data with details
const missions = [
  {
    id: "hurricane-relief-2024",
    title: "Hurricane Relief 2024",
    date: "October 2024",
    location: "Jamaica - Multiple Parishes",
    team: "45 Medical Professionals",
    beneficiaries: "2,500+ People Served",
    description:
      "Emergency medical response team deployed to affected communities across Jamaica following devastating hurricane damage. Our volunteers provided critical first aid, psycho-social support, and coordinated with local health authorities for comprehensive care.",
    impact: [
      "Emergency medical care for 2,500+ individuals",
      "Mental health counseling for 800+ affected families",
      "Distributed medical supplies to 15 communities",
      "Coordinated with Ministry of Health for ongoing support",
    ],
    images: ["/care-relief-image-1.jpg"],
    focus: ["Emergency Care", "Mental Health", "Community Coordination"],
  },
  {
    id: "community-health-outreach",
    title: "Community Health Outreach",
    date: "September 2024",
    location: "Rural Jamaica",
    team: "32 Medical Professionals",
    beneficiaries: "1,800+ People Served",
    description:
      "Mobile clinics providing preventative care and health education to underserved rural areas. Our telemedicine initiative connected US-based doctors with local communities for ongoing care and consultations.",
    impact: [
      "Conducted health screenings for 1,800+ residents",
      "Provided vaccinations and preventative care",
      "Established telemedicine access points in 8 communities",
      "Trained 25 local health workers",
    ],
    images: ["/care-relief-image-2.jpg"],
    focus: ["Preventative Care", "Telemedicine", "Health Education"],
  },
  {
    id: "disaster-coordination",
    title: "Disaster Coordination",
    date: "August 2024",
    location: "Kingston & St. Andrew",
    team: "28 Medical Professionals",
    beneficiaries: "3,200+ People Served",
    description:
      "Rapid response coordination with local health authorities and international partners during natural disaster. Focused on establishing field hospitals and coordinating supply distribution.",
    impact: [
      "Set up 3 field hospitals in affected areas",
      "Coordinated supply distribution to 20+ communities",
      "Provided emergency care for 3,200+ individuals",
      "Established partnership with Medical Commission of Jamaica",
    ],
    images: ["/care-relief-image-3.jpg"],
    focus: ["Disaster Response", "Field Hospitals", "Coordination"],
  },
]

export default function MissionsPage() {
  const searchParams = useSearchParams()
  const missionId = searchParams.get("id")

  // Find the specific mission or show all
  const selectedMission = missionId ? missions.find((m) => m.id === missionId) : null

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-16 px-4 bg-secondary/5">
        <div className="max-w-6xl mx-auto">
          {selectedMission ? (
            // Single Mission Detail View
            <div>
              <div className="mb-8">
                <Badge className="mb-4 bg-primary text-white">{selectedMission.date}</Badge>
                <h1 className="text-5xl font-bold mb-4">{selectedMission.title}</h1>
                <div className="flex flex-wrap gap-4 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {selectedMission.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    {selectedMission.team}
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                    {selectedMission.beneficiaries}
                  </div>
                </div>
              </div>

              {/* Mission Image */}
              <div className="min-h-[300px] bg-muted rounded-lg mb-8 overflow-hidden">
                <img
                  src={selectedMission.images[0] || "/placeholder.svg"}
                  alt={selectedMission.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Focus Areas */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Focus Areas</h2>
                <div className="flex gap-2 flex-wrap">
                  {selectedMission.focus.map((area, idx) => (
                    <Badge key={idx} className="bg-blue-600 text-white px-4 py-2">
                      {area}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Description */}
              <Card className="p-8 mb-8">
                <h2 className="text-2xl font-bold mb-4">Mission Overview</h2>
                <p className="text-lg leading-relaxed text-foreground/80">{selectedMission.description}</p>
              </Card>

              {/* Impact */}
              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-6">Impact & Outcomes</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {selectedMission.impact.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <p className="text-foreground/80">{item}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          ) : (
            // All Missions View
            <div>
              <div className="text-center mb-12">
                <h1 className="text-5xl font-bold mb-4">Our Medical Missions</h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Documenting our commitment to providing critical healthcare support during times of crisis and
                  community need across Jamaica.
                </p>
              </div>

              <div className="grid gap-8">
                {missions.map((mission) => (
                  <Card key={mission.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="md:flex">
                      <div className="md:w-1/3 aspect-video md:aspect-auto bg-muted">
                        <img
                          src={mission.images[0] || "/placeholder.svg"}
                          alt={mission.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="md:w-2/3 p-8">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <Badge className="mb-3 bg-primary text-white">{mission.date}</Badge>
                            <h2 className="text-3xl font-bold mb-2">{mission.title}</h2>
                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                {mission.location}
                              </div>
                              <div className="flex items-center gap-2">
                                <Users className="w-4 h-4" />
                                {mission.team}
                              </div>
                              <div className="flex items-center gap-2">
                                <Heart className="w-4 h-4" />
                                {mission.beneficiaries}
                              </div>
                            </div>
                          </div>
                        </div>
                        <p className="text-foreground/70 mb-4 leading-relaxed">{mission.description}</p>
                        <div className="flex gap-2 flex-wrap mb-4">
                          {mission.focus.map((area, idx) => (
                            <Badge key={idx} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                              {area}
                            </Badge>
                          ))}
                        </div>
                        <a
                          href={`/missions?id=${mission.id}`}
                          className="text-primary hover:underline font-medium inline-flex items-center gap-2"
                        >
                          Read full mission report →
                        </a>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
