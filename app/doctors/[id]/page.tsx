import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  MapPin,
  Award,
  Calendar,
  Languages,
  Target,
  Lightbulb,
  Heart,
  User,
  Briefcase,
  Sparkles,
  BookOpen,
  Shield,
  Zap,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { doctorDatabase } from "@/lib/doctors"

type TranscriptData = {}

interface DoctorData {
  doctor_id: string
  name: string
  specialty: string
  country: string
  medical_role: string
  work_preference: string | null
  availability: string | null
  experience_years: number | null
  photo_url: string | null
}

interface ProfileData {
  education: string | null
  certifications: string[] | null
  languages: string[] | null
  bio: string | null
  personal_story: string | null
  academic_journey: string | null
  professional_experience: string | null
  memorable_case: string | null
  strengths: string | null
  areas_for_growth: string | null
  personality: string | null
  core_values: string | null
  values: string | null
  goals: string | null
  hobbies: string | null
}

async function getDoctorData(id: string) {
  const data = doctorDatabase[id as keyof typeof doctorDatabase]

  if (!data) {
    return null
  }

  return {
    doctor: data.doctor as DoctorData,
    profile: data.profile as ProfileData,
    transcripts: data.transcripts as TranscriptData[],
  }
}

function SkillBar({ label, level }: { label: string; level: number }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium text-foreground">{level}/10</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-all duration-300"
          style={{ width: `${(level / 10) * 100}%` }}
        />
      </div>
    </div>
  )
}

export default async function DoctorDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  const data = await getDoctorData(id);

  if (!data) {
    notFound();
  }

  const { doctor, profile, transcripts } = data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />
      <div className="mx-auto max-w-7xl px-4 py-8">
        <Link href="/doctors">
          <Button
            variant="ghost"
            className="mb-6 gap-2 text-slate-300 hover:text-white cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Doctors
          </Button>
        </Link>

        <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
          {/* Left Sidebar - Photo & Basic Info */}
          <div className="space-y-6">
            {/* Profile Photo Card */}
            <Card className="overflow-hidden border-slate-700 bg-slate-800/50 shadow-lg backdrop-blur">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 gap-4 mb-6">
                  {/* 1st Profile Photo Card */}
                  <Image
                    src={doctor.photo_url || "/placeholder.svg"}
                    alt={doctor.name}
                    width={400}
                    height={400}
                    className="h-80 w-80 rounded-full object-cover shadow-xl border-4 border-white"
                  />
                </div>
                <div className="space-y-4">
                  <div>
                    <h1 className="mb-2 text-3xl font-bold text-white">
                      {doctor.name}
                    </h1>
                    <p className="text-lg text-slate-300">{doctor.specialty}</p>
                  </div>
                </div>

                <div className="space-y-3 border-t border-slate-700 pt-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                    About
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <Calendar className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-200" />
                      <div>
                        <div className="text-slate-500">Experience</div>
                        <div className="text-slate-200">
                          {doctor.experience_years} years
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-200" />
                      <div>
                        <div className="text-slate-500">Location</div>
                        <div className="text-slate-200">{doctor.country}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Award className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-200" />
                      <div>
                        <div className="text-slate-500">Specialty</div>
                        <div className="text-slate-200">
                          {doctor.medical_role}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Languages className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-200" />
                      <div>
                        <div className="text-slate-500">Languages</div>
                        <div className="text-slate-200">
                          {profile?.languages
                            ? profile.languages.join(", ")
                            : "Not specified"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="lg:hidden">              
              {profile?.bio && (
                <Card className="border-slate-700 bg-slate-800/50 shadow-lg backdrop-blur">
                  <CardContent className="p-6">
                    <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-white">
                      <User className="h-6 w-6 text-blue-200" />
                      Bio
                    </h2>
                    <p className="text-pretty text-base leading-relaxed text-slate-300">
                      {profile.bio}
                    </p>
                  </CardContent>
                </Card>
              )}
              </div>  

            {/* Core Values Card */}
            {profile?.core_values && (
              <Card className="border-slate-700 bg-slate-800/50 shadow-lg backdrop-blur">
                <CardContent className="p-6">
                  <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-white">
                    <Shield className="h-5 w-5 text-blue-200" />
                    Core Values
                  </h2>
                  <p className="text-pretty text-sm leading-relaxed text-slate-300">
                    {profile.core_values}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Personality Card */}
            {profile?.personality && (
              <Card className="border-slate-700 bg-slate-800/50 shadow-lg backdrop-blur">
                <CardContent className="p-6">
                  <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-white">
                    <Zap className="h-5 w-5 text-blue-200" />
                    Personality
                  </h2>
                  <p className="text-pretty text-sm leading-relaxed text-slate-300">
                    {profile.personality}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Hobbies */}
            {profile?.hobbies && (
              <Card className="border-slate-700 bg-slate-800/50 shadow-lg backdrop-blur">
                <CardContent className="p-6">
                  <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-white">
                    <Heart className="h-6 w-6 text-blue-200" />
                    Hobbies & Interests
                  </h2>
                  <p className="text-pretty text-sm leading-relaxed text-slate-300">
                    {profile.hobbies}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Content Area */}
          <div className="space-y-6">
            <div className="hidden lg:block">
              {profile?.bio && (
                <Card className="border-slate-700 bg-slate-800/50 shadow-lg backdrop-blur">
                  <CardContent className="p-6">
                    <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-white">
                      <User className="h-6 w-6 text-blue-200" />
                      Bio
                    </h2>
                    <p className="text-pretty text-base leading-relaxed text-slate-300">
                      {profile.bio}
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
            {/* Goals */}
            <div className="grid gap-6 ">
              {profile?.goals &&
                (() => {
                  const goals = profile.goals
                    .split(".")
                    .filter(Boolean)
                    .map((g) => g.trim());

                  return (
                    <Card className="border-slate-700 bg-slate-800/50 shadow-lg backdrop-blur lg:col-span-2">
                      <CardContent className="p-6">
                        <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-white">
                          <Target className="h-6 w-6 text-blue-200" />
                          Goals
                        </h2>

                        {goals.length === 1 ? (
                          // ✅ One Goal → No bullet
                          <p className="text-sm text-slate-300 text-pretty">
                            {goals[0]}.
                          </p>
                        ) : (
                          // ✅ Multiple Goals → Bulleted list
                          <ul className="space-y-2 text-sm text-slate-300">
                            {goals.map((goal, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-white" />
                                <span className="text-pretty">{goal}.</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </CardContent>
                    </Card>
                  );
                })()}
            </div>

            {/* Motivation */}
            {/* <div className="grid gap-6 ">
              <Card className="border-slate-700 bg-slate-800/50 shadow-lg backdrop-blur">
                <CardContent className="p-6">
                  <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-white">
                    <Sparkles className="h-5 w-5 text-blue-200" />
                    Motivations
                  </h2>
                  <div className="space-y-3">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-white">Patient Care</span>
                        <span className="font-medium text-white">10/10</span>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-primary transition-all duration-300"
                          style={{ width: "100%" }}
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-white">Global Health</span>
                        <span className="font-medium text-white">9/10</span>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-primary transition-all duration-300"
                          style={{ width: "90%" }}
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-white">Longevity</span>
                        <span className="font-medium text-white">9/10</span>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-primary transition-all duration-300"
                          style={{ width: "90%" }}
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-white">Preventative</span>
                        <span className="font-medium text-white">10/10</span>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-primary transition-all duration-300"
                          style={{ width: "100%" }}
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-white">Balance</span>
                        <span className="font-medium text-white">8/10</span>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-primary transition-all duration-300"
                          style={{ width: "80%" }}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {profile?.strengths && (
                <Card className="border-slate-700 bg-slate-800/50 shadow-lg backdrop-blur">
                  <CardContent className="p-6">
                    <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-white">
                      <Award className="h-5 w-5 text-blue-200" />
                      Strengths
                    </h2>
                    <p className="text-pretty text-sm leading-relaxed text-slate-300">
                      {profile.strengths}
                    </p>
                  </CardContent>
                </Card>
              )}
            </div> */}

            {profile?.education && (
              <Card className="border-slate-700 bg-slate-800/50 shadow-lg backdrop-blur lg:col-span-2">
                <CardContent className="p-6">
                  <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-white">
                    <BookOpen className="h-6 w-6 text-blue-200" />
                    Education
                  </h2>
                  <ul className="space-y-2 text-sm text-slate-300">
                    {profile.education
                      .split(".")
                      .filter(Boolean)
                      .map((education, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-white" />
                          <span className="text-pretty">
                            {education.trim()}.
                          </span>
                        </li>
                      ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Professional Journey */}
            {profile?.professional_experience && (
              <Card className="border-slate-700 bg-slate-800/50 shadow-lg backdrop-blur">
                <CardContent className="p-6">
                  <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-white">
                    <Briefcase className="h-6 w-6 text-blue-200" />
                    Professional Journey
                  </h2>
                  <p className="text-pretty text-base leading-relaxed text-slate-300">
                    {profile.professional_experience}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* 2nd Profile Photo Card */}
            <div className="flex w-full gap-4 lg:grid-cols-3">
              {/* {doctor.name === "Dr. Ilya Rabkin" && (
                <Image
                  src="/ilya-second-photo.jpg"
                  alt={`${doctor.name} - Professional Photo`}
                  width={400}
                  height={400}
                  className=" h-70 w-80 rounded-lg object-cover shadow-xl"
                />
              )} */}

              {/* {profile?.professional_experience && (
                <Card className="border-slate-700 bg-slate-800/50 shadow-lg backdrop-blur lg:col-span-2 w-full">
                  <CardContent className="p-6 w-auto">
                    <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-white">
                      <Lightbulb className="h-5 w-5 text-blue-200" />
                      Technology & Innovation
                    </h2>
                    <div className="space-y-3 w-auto">
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-white">Telemedicine</span>
                          <span className="font-medium text-white">9/10</span>
                        </div>
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                          <div
                            className="h-full rounded-full bg-primary"
                            style={{ width: "90%" }}
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-white">AI Integration</span>
                          <span className="font-medium text-white">8/10</span>
                        </div>
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                          <div
                            className="h-full rounded-full bg-primary"
                            style={{ width: "80%" }}
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-white">Digital Health</span>
                          <span className="font-medium text-white">9/10</span>
                        </div>
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                          <div
                            className="h-full rounded-full bg-primary"
                            style={{ width: "90%" }}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )} */}
            </div>

            {/* Personal Story */}
            {profile?.personal_story && (
              <Card className="border-slate-700 bg-slate-800/50 shadow-lg backdrop-blur">
                <CardContent className="p-6">
                  <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-white">
                    <Heart className="h-6 w-6 text-blue-200" />
                    Personal Story
                  </h2>
                  <p className="text-pretty text-base leading-relaxed text-slate-300">
                    {profile.personal_story}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Memorable Case */}
            {profile?.memorable_case && (
              <Card className="border-slate-700 bg-slate-800/50 shadow-lg backdrop-blur">
                <CardContent className="p-6">
                  <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-white">
                    <Heart className="h-6 w-6 text-blue-200" />
                    Memorable Experience
                  </h2>
                  <p className="text-pretty text-base leading-relaxed text-slate-300">
                    {profile.memorable_case}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
