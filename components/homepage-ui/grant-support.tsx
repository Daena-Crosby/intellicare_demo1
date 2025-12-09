"use client";

import React from "react";
import { School, Stethoscope, Ambulance } from "lucide-react";

export default function GrantSection() {
  return (
    <section className="grid md:grid-cols-2 gap-12 items-center px-8 md:px-20">
      {/* Image Section */}
      <div className="relative h-72 md:h-full w-full rounded-2xl overflow-hidden">
        <img
          alt="A person filling out a form on a clipboard, symbolizing the grant application process."
          className="w-full h-full object-cover"
          src="grant-two.jpeg"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent"></div>
      </div>

      {/* Text Section */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
          Empowering Through Grants
        </h2>

        <p className="text-slate-600 dark:text-slate-400">
          Our grant programs are designed to support healthcare initiatives
          that align with our core mission. We fund projects that enhance
          medical infrastructure, support community health workers, and pioneer
          innovative care solutions in underserved regions.
        </p>

        {/* List */}
        <ul className="space-y-3 text-slate-600 dark:text-slate-400">
          <li className="flex items-start">
            <School className="text-primary mr-3 mt-1 w-5 h-5" />
            <span className="flex-1">
              <strong>Research & Innovation Grants:</strong> For projects
              developing new healthcare technologies and methodologies.
            </span>
          </li>

          <li className="flex items-start">
            <Stethoscope className="text-primary mr-3 mt-1 w-5 h-5" />
            <span className="flex-1">
              <strong>Community Health Grants:</strong> To support local clinics
              and healthcare providers in vulnerable areas.
            </span>
          </li>

          <li className="flex items-start">
            <Ambulance className="text-primary mr-3 mt-1 w-5 h-5" />
            <span className="flex-1">
              <strong>Emergency Response Grants:</strong> Providing rapid
              funding for medical teams during natural disasters and crises.
            </span>
          </li>
        </ul>

        {/* Button */}
        <div className="pt-4">
          <button className="bg-primary text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-background-dark transition-colors">
            Apply for a Grant
          </button>
        </div>
      </div>
    </section>
  );
}
