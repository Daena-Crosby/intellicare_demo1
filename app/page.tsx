"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { doctorDatabase } from "@/lib/doctors"
import { OfferCarousel } from "@/components/offer-carousel"
import { VerticalValuesScroll } from "@/components/vertical-values-scroll"
import {
  Heart,
  Stethoscope,
  Video,
  CheckCircle,
  Award,
  Briefcase,
  Globe,
  Shield,
  ArrowUp,
  Brain,
  Badge as Bandage,
} from "lucide-react"
import { useEffect, useState } from "react"

export default function Home() {
  // State for scroll-to-top button visibility
  const [showScrollTop, setShowScrollTop] = useState(false)

  // Generate carousel profiles automatically from doctorDatabase
  const doctorProfiles = Object.values(doctorDatabase).map((entry) => ({
    id: entry.doctor.doctor_id,
    imageSrc: entry.doctor.photo_url,
    imageAlt: entry.doctor.name,
    tag: entry.doctor.work_preference,
    title: entry.doctor.name,
    description: entry.profile?.bio?.substring(0, 110) + "..." || "",
    brandLogoSrc: "/doctor-avatar.png",
    brandName: entry.doctor.country,
    href: `/doctors/${entry.doctor.doctor_id}`,
  }))

  // Monitor scroll position to show/hide scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Doctor onboarding journey steps
  const journeySteps = [
    {
      number: "01",
      title: "Visit Website",
      description: "Learn about our mission and the impact you can make",
      icon: Globe,
    },
    {
      number: "02",
      title: "Register",
      description: "Submit your professional credentials",
      icon: Briefcase,
    },
    {
      number: "03",
      title: "Group Training",
      description: "Attend orientation call with your group",
      icon: Video,
    },
    {
      number: "04",
      title: "One-on-One",
      description: "Personal interview to tailor your role and create AI profile",
      icon: Stethoscope,
    },
    {
      number: "05",
      title: "Start Helping",
      description: "Begin providing psycho-social and medical care",
      icon: Heart,
    },
  ]

  // What the foundation supports
  const focusAreas = [
    { title: "Psycho-Social Health", icon: Brain, description: "Mental and emotional wellbeing support" },
    { title: "First Medical Aid", icon: Bandage, description: "Emergency primary care" },
    { title: "Telemedicine", icon: Video, description: "Remote care delivery" },
    { title: "Shelter & Relief", icon: Shield, description: "Emergency aid and support" },
    { title: "Education", icon: Award, description: "Knowledge and skill development" },
    { title: "Crisis Response", icon: CheckCircle, description: "Rapid deployment readiness" },
  ]

  // Healthcare volunteer profiles for carousel
  // const doctorProfiles = [
  //   {
  //     id: "ilya-rabkin",
  //     imageSrc: "/images/dsc-2404-5b1-5d.jpg",
  //     imageAlt: "Dr. Ilya Rabkin",
  //     tag: "Both",
  //     title: "Dr. Ilya Rabkin",
  //     description: "Family physician with nearly 10 years specializing in preventative/longevity medicine",
  //     brandLogoSrc: "/doctor-avatar.png",
  //     brandName: "Jamaica",
  //     href: "/doctors/ilya-rabkin",
  //   },
  //   {
  //     id: "abigail-cameron",
  //     imageSrc: "/doctor-healthcare-professional.jpg",
  //     imageAlt: "Dr. Sarah",
  //     tag: "Telemedicine",
  //     title: "Dr. Sarah Johnson",
  //     description: "Emergency Medicine Specialist with 12 years of experience",
  //     brandLogoSrc: "/doctor-avatar.png",
  //     brandName: "Jamaica",
  //     href: "/doctors",
  //   },
  //   {
  //     id: "2",
  //     imageSrc: "/nurse-healthcare.jpg",
  //     imageAlt: "Nurse Marcus",
  //     tag: "Field Work",
  //     title: "Nurse Marcus Chen",
  //     description: "Community health nurse with passion for rural care",
  //     brandLogoSrc: "/nurse-avatar.jpg",
  //     brandName: "Jamaica",
  //     href: "/doctors",
  //   },
  //   {
  //     id: "3",
  //     imageSrc: "/doctor-physician-care.jpg",
  //     imageAlt: "Dr. Amara",
  //     tag: "Both",
  //     title: "Dr. Amara Williams",
  //     description: "Pediatrician dedicated to child health outcomes",
  //     brandLogoSrc: "/doctor-avatar.png",
  //     brandName: "Jamaica",
  //     href: "/doctors",
  //   },
  //   {
  //     id: "4",
  //     imageSrc: "/paramedic-medical.jpg",
  //     imageAlt: "Paramedic David",
  //     tag: "Field Work",
  //     title: "Paramedic David López",
  //     description: "Critical care paramedic with disaster response training",
  //     brandLogoSrc: "/paramedic-avatar.jpg",
  //     brandName: "Jamaica",
  //     href: "/doctors",
  //   },
  //   {
  //     id: "5",
  //     imageSrc: "/doctor-mental-health.jpg",
  //     imageAlt: "Dr. Priya",
  //     tag: "Telemedicine",
  //     title: "Dr. Priya Patel",
  //     description: "Psychiatrist specializing in trauma and resilience",
  //     brandLogoSrc: "/doctor-avatar.png",
  //     brandName: "Jamaica",
  //     href: "/doctors",
  //   },
  //   {
  //     id: "6",
  //     imageSrc: "/nurse-practitioner.jpg",
  //     imageAlt: "NP Elena",
  //     tag: "Both",
  //     title: "Nurse Practitioner Elena",
  //     description: "Family health specialist with 8 years of field experience",
  //     brandLogoSrc: "/practitioner-avatar.jpg",
  //     brandName: "Jamaica",
  //     href: "/doctors",
  //   },
  //   {
  //     id: "7",
  //     imageSrc: "/doctor-surgery.jpg",
  //     imageAlt: "Dr. Hassan",
  //     tag: "Field Work",
  //     title: "Dr. Hassan Ahmed",
  //     description: "Surgeon with mobile clinic experience in remote areas",
  //     brandLogoSrc: "/doctor-avatar.png",
  //     brandName: "Jamaica",
  //     href: "/doctors",
  //   },
  //   {
  //     id: "8",
  //     imageSrc: "/midwife-healthcare.jpg",
  //     imageAlt: "Midwife Grace",
  //     tag: "Both",
  //     title: "Midwife Grace Okonkwo",
  //     description: "Maternal health specialist serving underserved communities",
  //     brandLogoSrc: "/midwife-avatar.jpg",
  //     brandName: "Jamaica",
  //     href: "/doctors",
  //   },
  // ]

  // Smooth scroll to healthcare network section
  const scrollToOurPeople = () => {
    const element = document.getElementById("our-people")
    element?.scrollIntoView({ behavior: "smooth" })
  }

  const coreValues = [
    {
      title: "Human Care",
      description:
        "Mental, physical, and emotional wellbeing through comprehensive psycho-social support and compassionate medical care that addresses the whole person.",
      imageSrc: "/care-relief-collage-1.png",
    },
    {
      title: "Relief & Resilience",
      description:
        "Immediate medical care, emergency shelter, and ongoing recovery aid that helps communities rebuild stronger and more prepared for future challenges.",
      imageSrc: "/care-relief-collage-2.png",
    },
    {
      title: "Economic Revitalization",
      description:
        "AI Academy programs and GQ initiatives that empower communities with skills, knowledge, and opportunities for sustainable economic growth and independence.",
      imageSrc: "/field-care.png",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 relative overflow-hidden bg-primary">
          {/* Hero Section*/}
          <div className="absolute inset-0 z-0">
            <div className="relative w-full h-full">
              <div className="relative w-full h-full overflow-hidden col-span-3">
                <img
                  src="/care-relief-collage-3.jpg"
                  alt="Healthcare team with community"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="absolute inset-0 bg-primary/45"></div>
          </div>

          <div className="max-w-5xl mx-auto text-center relative z-40">
            <h1 className="text-5xl font-bold text-primary-foreground mb-6 text-start md:text-center md:text-6xl">
              Care. Relief. Revitalization
            </h1>
            <h1 className="text-[26px] font-semibold text-primary-foreground mb-6 text-start md:text-center md:text-4xl">
              Beginning with Jamaica.
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-4 text-balance leading-relaxed text-start md:text-center">
              A global care model built on rapid medical missions, telemedicine,
              community revitalization, and preventative health starting with
              the people and communities rebuilding after Hurricane Melissa.
            </p>
            <p className="text-lg text-primary-foreground/80 mb-8 text-balance text-start md:text-center">
              Our first major focus is Jamaica, coordinating medical and
              psycho-social relief in the wake of recent hurricanes.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/register" onClick={scrollToTop}>
                <Button
                  size="lg"
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 cursor-pointer"
                >
                  Join as a Volunteer
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 bg-transparent cursor-pointer"
                onClick={scrollToOurPeople}
              >
                View Our Volunteers
              </Button>
            </div>
          </div>
        </section>

        {/* Updated Jamaica Relief section */}
        <section className="py-16 px-4 bg-white border-t-4 border-primary">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-4xl  font-bold mb-4 text-foreground">
              <h2 className="text-4xl  font-bold mb-4 text-foreground">
                Current Focus: Jamaica Relief
              </h2>
              <p className="text-lg leading-relaxed text-gray-700 mb-0">
                Following recent hurricanes, Jamaica is facing overlapping
                challenges in mental health, primary care access, and basic
                stability. Our response prioritizes{" "}
                <strong>psycho-social health</strong> and{" "}
                <strong>first medical aid</strong>, supported by a coordinated
                network of Jamaican and international volunteers who deliver
                care both on the ground and through telemedicine.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6 mb-10">
              <div className="relative group">
                <div className="absolute inset-0 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all"></div>
                <div className="relative w-48 h-48 mx-auto bg-white rounded-full p-2 shadow-lg">
                  <img
                    src="/images/hurrican-relief-1.jpeg"
                    alt="WDG relief workers coordinating field operations"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </div>
              <div className="relative group">
                <div className="absolute inset-0 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all"></div>
                <div className="relative w-48 h-48 mx-auto bg-white rounded-full p-2 shadow-lg">
                  <img
                    src="/images/hurricane-relief-2.jpeg"
                    alt="Medical consultation during hurricane relief"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </div>
              <div className="relative group">
                <div className="absolute inset-0 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all"></div>
                <div className="relative w-48 h-48 mx-auto bg-white rounded-full p-2 shadow-lg sm:flex hidden">
                <div className="relative w-48 h-48 mx-auto bg-white rounded-full p-2 shadow-lg sm:flex hidden">
                  <img
                    src="/images/hurricane-relief-3.jpeg"
                    alt="Relief worker coordinating nighttime operations"
                    className="w-full h-full rounded-full object-cover "
                    className="w-full h-full rounded-full object-cover "
                  />
                </div>
              </div>
              <div className="relative group">
                <div className="absolute inset-0 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all"></div>
                <div className="relative w-48 h-48 mx-auto bg-white rounded-full p-2 shadow-lg sm:flex hidden">
                <div className="relative w-48 h-48 mx-auto bg-white rounded-full p-2 shadow-lg sm:flex hidden">
                  <img
                    src="/telemedicine-1.png"
                    alt="Telemedicine consultation with patient"
                    className="w-full h-full rounded-full object-cover sm:flex hidden"
                    className="w-full h-full rounded-full object-cover sm:flex hidden"
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-10">
              <Card className="p-6 bg-card backdrop-blur border-2 border-border">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Brain className="w-6 h-6 text-primary" />
                  Psycho-Social & First Aid Focus
                </h3>
                <ul className="space-y-3 text-foreground/80">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>
                      Mental health support for trauma and emotional recovery
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>First medical aid and emergency triage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Crisis counseling and psychosocial support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Primary care and wound management</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-6 bg-card backdrop-blur border-2 border-border">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Video className="w-6 h-6 text-primary" />
                  Telemedicine Initiative
                </h3>
                <ul className="space-y-3 text-foreground/80">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>International doctors can help remotely</strong> -
                      Provide care from anywhere via telemedicine
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Local Jamaican doctors</strong> - On-the-ground
                      expertise and community knowledge
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>International field volunteers</strong> - Hands-on
                      support in affected areas
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>
                      All volunteers work together as a coordinated network
                    </span>
                  </li>
                </ul>
              </Card>
            </div>

            {/* Medical certification support */}
            <Card className="p-6 bg-muted/30 border-2 border-primary mb-0">
              <div className="flex items-start gap-4">
                <Shield className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">
                    Medical Certification Support
                  </h3>
                  <p className="text-foreground/80 leading-relaxed">
                    We actively support eligible clinicians in obtaining the
                    approvals required to practice in Jamaica. This includes
                    guidance on documentation, coordination with the{" "}
                    <strong>Ministry of Health</strong> and{" "}
                    <strong>Medical Council of Jamaica</strong>, and clear
                    step-by-step instructions. Our goal is to remove friction so
                    you can focus on what matters most: providing safe,
                    high-quality care to people who need it.
                  </p>
                </div>
              </div>
            </Card>

            <div className="text-center mt-8">
              <Link href="/register" onClick={scrollToTop}>
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer"
                >
                  Register to Help Jamaica
                </Button>
              </Link>
            </div>
          </div>
        </section>

{/* Healthcare Network Carousel */}
        <section id="our-people" className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">
                Our Healthcare Network
              </h2>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                Meet the dedicated healthcare professionals providing care,
                relief, and support to communities in need
              </p>
            </div>

            <OfferCarousel offers={doctorProfiles} />

            <div className="text-center mt-12">
              <Link href="/doctors" onClick={scrollToTop}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10 bg-transparent cursor-pointer hover:text-primary"
                >
                  View All Volunteers
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Previous Medical Missions Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold mb-4 text-center">
              Previous Medical Missions
            </h2>
            <p className="text-center text-foreground/70 mb-12 max-w-2xl mx-auto">
              Our track record of providing critical healthcare support during
              times of crisis and community need.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 w-full">
              {/* Card 1 */}
              <Card className="p-6 border border-border overflow-hidden group hover:shadow-lg transition-shadow cursor-pointer w-full">
                <a href="https://www.intellibus.care/missions/melissa-recovery">
                  <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                    <img
                      src="/field-care.jpg"
                      alt="Hurricane relief field work"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <h3 className="font-semibold mb-2">Melissa Recovery Across Jamaica</h3>
                  <h4 className="font-light text-[14px] mb-2">Supporting communities across parishes</h4>
                  <p className="text-sm text-foreground/70 flex gap-2">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    Mapping medical needs across parishes
                  </p>
                  <p className="text-sm text-foreground/70 flex gap-2"> 
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    Deploying Starlink-powered telehealth terminals
                  </p>
                  <p className="text-sm text-foreground/70 flex gap-2">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    Distributing diagnostic kits for leptospirosis and cholera
                  </p>
                  <p className="text-sm text-foreground/70 flex gap-2">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    Coordinating with ODPEM, MLSS, and community partners
                  </p>
                </a>
              </Card>

              {/* Card 2 - Updated */}
              <Card className="p-6 border border-border overflow-hidden group hover:shadow-lg transition-shadow cursor-pointer w-full">
                <a href="https://www.intellibus.care/missions/bluefields-mernsville">
                  <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                    <img
                      src="/team-meeting.jpg"
                      alt="Bluefields & Mernsville telemedicine and relief"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <h3 className="font-semibold mb-2">Bluefields & Mernsville</h3>
                  <h4 className="font-light text-[14px] mb-2">Restoring care access after Hurricane Melissa</h4>
                  <p className="text-sm text-foreground/70 flex gap-2">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    Building telemedicine nodes, diagnostic clinics, and community pods
                  </p>
                  <p className="text-sm text-foreground/70 flex gap-2">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    Running medical missions with JDF, BDF, UWI, and international doctors
                  </p>
                  <p className="text-sm text-foreground/70 flex gap-2">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    Supporting small businesses and youth talent programs
                  </p>
                </a>
              </Card>
            </div>
            <p className="text-center text-muted-foreground mt-8 italic">
              More mission details and impact stories coming soon.
            </p>
          </div>
        </section>

        {/* About/Charter Section */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">
              About Intellibus Care Foundation
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-3 text-center">
                <h3 className="text-lg font-semibold text-primary">
                  Our Purpose
                </h3>
                <p className="text-foreground/80 leading-relaxed">
                  We exist to provide care, relief, and revitalization in places
                  where shocks such as natural disasters, economic disruption,
                  or systemic gaps leave people without adequate support. We do
                  this through direct services, grantmaking, and partnerships
                  that strengthen local capacity rather than replace it.
                </p>
              </div>
              <div className="space-y-3 text-center">
                <h3 className="text-lg font-semibold text-primary">
                  Legal & Governance
                </h3>
                <p className="text-foreground/80 leading-relaxed">
                  Intellibus Care Foundation is an independent nonprofit
                  foundation established by Intellibus and aligned with the
                  World Digital Governance (WDG) mission. The foundation is
                  overseen by an independent board and program directors who
                  ensure that funding, programs, and technology are used
                  ethically, transparently, and in the best interests of the
                  communities we serve
                </p>
              </div>
              <div className="space-y-3 text-center">
                <h3 className="text-lg font-semibold text-primary">
                  Technology Backbone
                </h3>
                <p className="text-foreground/80 leading-relaxed">
                  Our programs are powered by Atlas Mesh and the DigitalJamaica
                  grant ledger, enabling transparent tracking of resources,
                  needs, and impact. This infrastructure helps us match
                  volunteers and medical professionals with real-time needs on
                  the ground and ensures that every intervention can be measured
                  and continuously improved.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Three Core Areas Section */}
        <section className="h-[500px] flex items-center px-4 bg-gradient-to-br from-primary via-primary/95 to-blue-600">
          <div className="max-w-7xl mx-auto w-full h-full py-8 flex flex-col">
            <div className="mb-6">
              <h3 className="text-4xl font-bold text-primary-foreground mb-3">
                Three Core Areas
              </h3>
              <p className="text-lg text-primary-foreground/90 leading-relaxed max-w-2xl">
                Our mission is built on three interconnected pillars that work
                together to create lasting positive change
              </p>
            </div>
            <div className="flex-1 min-h-0 h-[400px]">
              <VerticalValuesScroll values={coreValues} />
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">
              What We Support
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {focusAreas.map((area, idx) => {
                const Icon = area.icon;
                return (
                  <Card
                    key={idx}
                    className="p-6 bg-card hover:shadow-lg transition-shadow border border-border"
                  >
                    <div className="flex items-start gap-4">
                      <Icon className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <h3 className="text-base font-semibold mb-1">
                          {area.title}
                        </h3>
                        <p className="text-sm text-foreground/70">
                          {area.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center">
              Doctor's Journey with Us
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              From registration to impact: A clear path to making a difference
            </p>

            <div className="grid md:grid-cols-5 gap-6">
              {journeySteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="text-center space-y-4">
                    <div className="flex justify-center">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-primary/40">
                      {step.number}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-2">
                        {step.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="text-center mt-10">
              <Link href="/register" onClick={scrollToTop}>
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer"
                >
                  Start Your Journey
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Telemedicine Innovation Section */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Technology-Enabled Healthcare
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Bridging distances through telemedicine and collaborative care
                platforms to ensure no community is left behind.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src="/telemedicine-1.png"
                    alt="Virtual consultation"
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    Virtual Consultations
                  </h3>
                  <p className="text-muted-foreground">
                    Connecting patients with healthcare professionals through
                    secure video platforms for real-time medical guidance.
                  </p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src="/team-meeting.png"
                    alt="Team collaboration"
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    Global Collaboration
                  </h3>
                  <p className="text-muted-foreground">
                    Multi-disciplinary teams working together across borders to
                    provide comprehensive care solutions.
                  </p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src="/telemedicine-2.png"
                    alt="Remote care coordination"
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
                  <p className="text-muted-foreground">
                    Round-the-clock access to medical professionals ensuring
                    continuous care and emergency response capabilities.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-primary via-primary/95 to-blue-600 text-primary-foreground">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Make an Impact?
            </h2>
            <p className="text-xl mb-8 leading-relaxed text-primary-foreground/90">
              Join healthcare professionals from around the world providing
              critical psycho-social health support and first medical aid to
              Jamaica
            </p>
            <Link href="/register" onClick={scrollToTop}>
              <Button
                size="lg"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-8 py-6 text-lg cursor-pointer"
              >
                Register Now
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-primary text-primary-foreground p-3 rounded-full shadow-lg hover:bg-primary/90 transition-all z-50"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}