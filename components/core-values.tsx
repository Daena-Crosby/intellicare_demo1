"use client";

import React from "react";
import {
  Heart,
  Award,
  Bolt,
  Eye,
  Users,
  RefreshCw,
} from "lucide-react";

interface ValueItem {
  icon: React.ElementType;
  title: string;
  description: string;
}

const values: ValueItem[] = [
  {
    icon: Heart,
    title: "Compassion",
    description: "Every patient receives dignity, respect, and genuine care",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "High clinical standards in every mission and interaction",
  },
  {
    icon: Bolt,
    title: "Innovation",
    description: "Technology used to overcome barriers to care",
  },
  {
    icon: Eye,
    title: "Transparency",
    description: "Open operations, reporting, and impact tracking",
  },
  {
    icon: Users,
    title: "Collaboration",
    description:
      "Strong partnerships with communities, governments, and global teams",
  },
  {
    icon: RefreshCw,
    title: "Sustainability",
    description: "Long-term systems that strengthen local capacity",
  },
];

export default function CoreValues() {
  return (
    <section>
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
          Our Core Values
        </h2>
      </div>

      <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
        {values.map((value) => {
          const Icon = value.icon;
          return (
            <div key={value.title} className="flex flex-col items-center">
              <div className="bg-blue-100 dark:bg-blue-900/50 text-primary p-4 rounded-full">
                <Icon className="w-6 h-6" />
              </div>

              <h3 className="mt-4 font-bold text-slate-900 dark:text-white">
                {value.title}
              </h3>

              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                {value.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
