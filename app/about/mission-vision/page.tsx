"use client"

import React from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import CoreValues from "@/components/core-values"


export default function MissionVision() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans">
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-10 space-y-16">
        <section className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white tracking-tight">
              Mission & Vision
            </h1>
            <p className="mt-6 text-lg md:text-xl text-slate-600 dark:text-slate-400">
              Care, resilience, dignity — delivered through people, technology, and purpose.
            </p>
          </section>

          {/* Mission & Vision Section */}
          <section className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Our Mission</h2>
                <p className="mt-4 text-slate-600 dark:text-slate-400">
                  The Intellibus Care Foundation delivers world-class healthcare to the communities that need it most. We serve disaster-impacted populations, veterans, seniors, and underserved communities through rapid medical response, telemedicine innovation, and long-term community health programs.
                </p>
                <p className="mt-4 text-slate-600 dark:text-slate-400">
                  Our mission is to ensure that every person—regardless of geography, income, or circumstance—has access to <strong className="text-slate-800 dark:text-slate-200">affordable, accessible, and accurate care.</strong> We combine clinical excellence, field operations, and responsible AI to close the healthcare gap for millions.
                </p>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Our Vision</h2>
                <p className="mt-4 text-slate-600 dark:text-slate-400">
                  We envision a future where no community is out of reach, no patient is invisible, and no crisis prevents access to care.
                </p>
                <p className="mt-4 font-semibold text-slate-800 dark:text-slate-200">A future where:</p>
                <ul className="mt-4 space-y-3 text-slate-600 dark:text-slate-400">
                  <li className="flex items-start">
                    <span className="text-blue-700 mr-3 mt-0.5">✓</span>
                    Every disaster-affected community receives fast, coordinated medical relief.
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-700 mr-3 mt-0.5">✓</span>
                    Every veteran gains the long-term support they earned.
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-700 mr-3 mt-0.5">✓</span>
                    Every senior ages with dignity through preventive, continuous, telemedicine-enabled care.
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-700 mr-3 mt-0.5">✓</span>
                    Clinicians across the world can serve across borders, using secure digital platforms and mission-ready tools.
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-700 mr-3 mt-0.5">✓</span>
                    Humanitarian healthcare is strengthened—not replaced—by telemedicine and AI.
                  </li>
                </ul>
                <p className="mt-6 font-bold text-slate-800 dark:text-slate-200">
                  This is the global network of care we are building.
                </p>
              </div>
            </div>
            <div className="relative h-96 md:h-full w-full rounded-2xl overflow-hidden bg-slate-200 dark:bg-slate-700">
              <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </section>

        {/* Who We Are */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 md:h-full w-full rounded-2xl overflow-hidden bg-slate-200 dark:bg-slate-700 order-last md:order-first">
              <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Who We Are</h2>
              <p className="mt-4 text-slate-600 dark:text-slate-400">
                The Intellibus Care Foundation brings together leading physicians, mission teams, and national partners across Jamaica, the Caribbean, the United States, and the global diaspora. We are building a modern humanitarian healthcare ecosystem—fast, agile, technology-enabled, and driven by compassion.
              </p>
              <p className="mt-4 text-slate-800 dark:text-slate-200 font-semibold text-lg">
                Our purpose is direct and urgent: Deliver excellent care where it has never been reliably accessible before.
              </p>
            </div>
          </section>

        {/* Jamaica Impact */}
        <section>
          <h2 className="text-3xl font-bold mb-4">What We've Already Done in Jamaica</h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-border text-card-foreground text-sm">
              <thead className="bg-muted text-muted-foreground">
                <tr>
                  <th className="p-3 border border-border text-left">Impact Area</th>
                  <th className="p-3 border border-border text-left">Actions Taken</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border border-border">Frontline Support</td>
                  <td className="p-3 border border-border">Emergency trauma and clinician aid with structured mission workflows</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border">Telemedicine</td>
                  <td className="p-3 border border-border">Sessions to identify urgent needs</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border">Medical Coordination</td>
                  <td className="p-3 border border-border">Care between local and international teams</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border">Restoring Access</td>
                  <td className="p-3 border border-border">Reconnected remote/elder communities to essential care</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-card-foreground text-lg leading-relaxed">
            These missions revealed a clear need to help regions reconnect to care, strengthen local systems, and improve the efficiency of the existing medical response system.
          </p>
        </section>
        {/* Core Pillars */}
        <section>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                Our Three Core Pillars of Service
              </h2>
            </div>
            <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="bg-blue-100 dark:bg-blue-900/50 text-blue-700 p-3 rounded-md inline-block">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">
                  Disaster-Impacted Communities
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-400 list-disc list-inside">
                  <li>Rapid deployment teams</li>
                  <li>Remote triage and follow-up</li>
                  <li>Mobile clinics for continuity of care</li>
                </ul>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="bg-blue-100 dark:bg-blue-900/50 text-blue-700 p-3 rounded-md inline-block">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">Veterans</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-400 list-disc list-inside">
                  <li>Chronic care management</li>
                  <li>Mental health pathways</li>
                  <li>Secure telemedicine consultations</li>
                </ul>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="bg-blue-100 dark:bg-blue-900/50 text-blue-700 p-3 rounded-md inline-block">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">Seniors</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-400 list-disc list-inside">
                  <li>Preventive care and remote monitoring</li>
                  <li>Community-based telemedicine</li>
                  <li>Programs designed around local constraints</li>
                </ul>
              </div>
              <div className="relative rounded-lg overflow-hidden h-64 md:h-auto bg-slate-200 dark:bg-slate-700">
                <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                  <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>
            <p className="text-center mt-12 text-slate-600 dark:text-slate-400">
              These pillars anchor our long-term commitment to resilience, dignity, and equitable access.
            </p>
          </section>

        {/* Telemedicine */}
        <section>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                Telemedicine: The New Backbone of Humanitarian Care
              </h2>
              <p className="mt-4 text-slate-600 dark:text-slate-400">
                We are building a global network of certified physicians who can deliver high-quality care across borders.
              </p>
            </div>
            <div className="mt-12 max-w-4xl mx-auto bg-slate-50 dark:bg-slate-800/50 rounded-lg shadow-sm overflow-hidden border border-slate-200 dark:border-slate-700">
              <table className="w-full text-left">
                <thead className="bg-slate-100 dark:bg-slate-800">
                  <tr>
                    <th className="p-4 font-semibold text-slate-700 dark:text-slate-300">Benefit</th>
                    <th className="p-4 font-semibold text-slate-700 dark:text-slate-300">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700 text-slate-600 dark:text-slate-400">
                  <tr>
                    <td className="p-4 font-medium text-slate-800 dark:text-slate-200">Faster Access</td>
                    <td className="p-4">Immediate connection to specialists</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-slate-800 dark:text-slate-200">Consistent Follow-Up</td>
                    <td className="p-4">Reliable continuity of care</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-slate-800 dark:text-slate-200">Lower Cost</td>
                    <td className="p-4">Affordable pathways for patients</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-slate-800 dark:text-slate-200">Global Service</td>
                    <td className="p-4">Clinicians can serve from anywhere</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-center mt-6 text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              This model strengthens local systems while expanding the reach of expert doctors worldwide.
            </p>
          </section>

          {/* AI in Medicine Section */}
          <section className="bg-slate-50 dark:bg-slate-900/50 py-20 rounded-2xl">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                  AI in Medicine — Guided by Clinicians, Designed for Humanity
                </h2>
                <p className="mt-4 text-slate-600 dark:text-slate-400">
                  AI is a tool that supports clinicians and improves care delivery.
                </p>
              </div>
              <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
                  <h3 className="font-bold text-slate-900 dark:text-white">Decision-Support Systems</h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                    Enhanced clinical decision-making with AI-powered insights
                  </p>
                </div>
                <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
                  <h3 className="font-bold text-slate-900 dark:text-white">Remote Diagnostics</h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                    AI-assisted diagnostic tools for remote assessments
                  </p>
                </div>
                <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
                  <h3 className="font-bold text-slate-900 dark:text-white">Triage Assistance</h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                    Intelligent prioritization of patient needs
                  </p>
                </div>
                <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
                  <h3 className="font-bold text-slate-900 dark:text-white">Reduced Administrative Workloads</h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                    Automated workflows allowing clinicians to focus on care
                  </p>
                </div>
              </div>
              <p className="text-center mt-8 font-semibold text-slate-800 dark:text-slate-200">
                AI enhances precision. Clinicians remain in control.
              </p>
            </div>
          </section>

          {/* Outcomes Section */}
          <section>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                Our Outcomes: Affordable • Accessible • Accurate
              </h2>
            </div>
            <div className="mt-12 max-w-4xl mx-auto bg-slate-50 dark:bg-slate-800/50 rounded-lg shadow-sm overflow-hidden border border-slate-200 dark:border-slate-700">
              <table className="w-full text-left">
                <thead className="bg-slate-100 dark:bg-slate-800">
                  <tr>
                    <th className="p-4 font-semibold text-slate-700 dark:text-slate-300">Outcome</th>
                    <th className="p-4 font-semibold text-slate-700 dark:text-slate-300">What It Means</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700 text-slate-600 dark:text-slate-400">
                  <tr>
                    <td className="p-4 font-medium text-slate-800 dark:text-slate-200">Affordable Care</td>
                    <td className="p-4">Technology reduces financial barriers to high-quality treatment</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-slate-800 dark:text-slate-200">Accessible Care</td>
                    <td className="p-4">Care reaches remote communities, seniors, and disaster zones</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-slate-800 dark:text-slate-200">Accurate Care</td>
                    <td className="p-4">AI-supported workflows enhance diagnostic confidence and consistency</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-center mt-6 text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              This is our community-first, AI-powered model of humanitarian healthcare.
            </p>
          </section>

        {/* Core Values */}
        <CoreValues />
      </main>
      <Footer />
    </div>
  )
}