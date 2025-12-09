// Shared doctor database - single source of truth for all doctor data
// Both the listings page and detail page import from this file

export const doctorDatabase = {
  "ilya-rabkin": {
    doctor: {
      doctor_id: "ilya-rabkin",
      name: "Dr. Ilya Rabkin",
      specialty: "Family Medicine",
      country: "United States",
      medical_role: "Family Physician / General Practitioner",
      work_preference: "Both",
      availability: "20 hours/week",
      experience_years: 10,
      photo_url: "/images/dsc-2404-5b1-5d.jpg",
    },
    profile: {
      bio: "Experienced family physician with nearly 10 years of independent practice. Owner of Novi Med, a concierge-style medical practice providing comprehensive home-based healthcare. Known as the 'Swiss Army knife' of medicine with expertise spanning from pediatrics to geriatrics.",
      education:
        "Medical Degree from University at Buffalo, New York. Family Medicine Residency at Fairfax, Virginia (2013-2016). MBA from Johns Hopkins University.",
      certifications: [
        "Board Certified in Family Medicine",
        "Chief Resident (Final Year)",
        "Faculty Teaching Certification",
        "Advanced Procedures: Vasectomies, Circumcisions, Sports Injections, Skin Procedures",
      ],
      languages: ["English", "Russian"],
      personal_story:
        "Born in the former USSR, I come from a family of physicians - my mother and three out of four grandparents were doctors. My practice, Novi Med, is named after my grandfather who did home visits back in the old country. Growing up surrounded by medicine, I was always drawn to science, physics, and math. As I matured, I realized I didn't just want to do research - I wanted direct impact, to build relationships with people and help them face-to-face. That's what led me to family medicine.",
      academic_journey:
        "After earning my medical degree in Buffalo, I completed my family medicine residency in Fairfax, Virginia, where I became chief resident in my final year. I initially thought I wanted to be a surgeon because I liked working with my hands, but I realized I preferred my patients awake - I wanted that relationship and continuity of care. While working as faculty teaching residents and medical students, I pursued my MBA at Johns Hopkins to better understand the business side of medicine. This combination of clinical expertise and business acumen eventually led me to open my own concierge practice.",
      professional_experience:
        "After residency, I joined my residency program as faculty, teaching medical students and residents while seeing my own patients. I became a partner in the practice and helped with financial modeling and business organization. I also took over the global health track, leading medical mission trips. After the practice was bought by a hospital system, I explored different opportunities before deciding to open Novi Med, my own concierge-style practice where I provide full home visits and telehealth services. I've participated in numerous global health missions to Honduras, Haiti, and the Dominican Republic, working with organizations like Shoulder to Shoulder (Hombro a Hombro).",
      memorable_case:
        "Some of my most memorable and rewarding experiences have been helping people at the end of their life pass peacefully through hospice care. I learned early on that many doctors want to 'do, do, do' - more procedures, more treatments - but sometimes doing nothing is the best treatment. I've been privileged to sit with patients in their final moments and hear what they truly value. Not a single person has ever said 'I wish I worked more.' They always wish they'd traveled more, spent more time with family and friends, had that extra beer or ice cream. This wisdom has profoundly shaped my perspective on life and medicine.",
      strengths:
        "My greatest strengths are in preventative and longevity medicine, particularly hormone replacement therapy for both men and women. I'm seeing tremendous improvements in people's quality of life, especially women who've been denied this care or received it improperly. I'm also highly skilled in procedures - vasectomies, circumcisions, sports injections, and dermatological procedures. As a family doctor, I'm the 'Swiss Army knife' of medicine, trained to handle everything from newborn care to geriatrics, though I know when to refer to specialists for highly specialized care.",
      areas_for_growth:
        "I'm constantly learning about the latest advances in longevity medicine and biohacking, being careful to separate evidence-based medicine from pseudoscience. I'm working to get back into more global health relief work after focusing on building my practice.",
      personality:
        "I'm science-minded and analytical, but I deeply value human connection and relationships with my patients. I like volunteering and making a direct impact. I'm not particularly artistic or musical - I'm very much drawn to science, physics, and math. I enjoy working with my hands and doing procedures, which is why I love the variety family medicine offers.",
      core_values:
        "Building meaningful relationships with patients, continuity of care, global health equity, end-of-life dignity, preventative medicine, work-life balance, family time, travel, and living without regrets.",
      values:
        "I believe in doing work that I won't regret at the end of my life - that's why I'm drawn to global health missions where I encounter people with different perspectives than those in Washington, D.C.",
      goals:
        "I'm looking to get back into global health medical relief work while continuing to grow my concierge practice. I want to balance doing rewarding work with spending quality time with family. I'm passionate about bringing modern preventative and longevity medicine to underserved populations and continuing to learn and grow as a physician.",
      hobbies:
        "Spending quality time with family, traveling (which I wish I did more of), and staying current with medical podcasts and literature, particularly following thought leaders like Peter Attia in the longevity medicine space.",
    },
    transcripts: [],
  }, 

  "abigail-cameron": {
  doctor: {
    doctor_id: "abigail-cameron",
    name: "Dr. Abigail Cameron",
    specialty: "General Medicine .Genral",
    country: "Jamaica",
    medical_role: "General Practitioner / Junior Medical Officer",
    work_preference: " Family Medicine (early-career)",
    availability: "Varies — works across 4–5 practices weekly",
    experience_years: 4,
    photo_url: "/images/abigail-cameron.jpeg" // <-- You can replace or upload later
  },

  profile: {
    bio: "Dedicated Jamaican medical doctor with four years of post-graduate experience working across multiple public and private practices. Known for her compassion, adaptability, and deep commitment to patient care, Dr. Cameron balances high-volume clinical work with pathology experience, community service, and an interest in family medicine and pediatrics. Passionate about high-quality, patient-centered care even within resource-limited environments.",

    education:
      "Doctor of Medicine (MBBS), University of the West Indies (UWI), Mona Campus — Class of 2021. Completed internship and early post-graduate training at Spanish Town Hospital, including rotations in Accident & Emergency and Pathology.",

    certifications: [
      "Medical Degree (MBBS), University of the West Indies",
      "Pathology rotation experience: slide trimming, histology preparation, microscopy",
      "Experience in emergency medicine and general practice across multiple clinical sites"
    ],

    languages: ["English"],

    personal_story:
      "Dr. Cameron expressed a desire to become a doctor as early as age five, inspired by a love for helping others and a natural affinity for the sciences. Although she considered pharmacy during high school, a personality assessment revealed her strengths were better aligned with medicine, reaffirming her calling. After being accepted into medical school, she fully embraced the rigorous path and discovered deep joy in hands-on clinical care during her training at Spanish Town Hospital.",

    academic_journey:
      "During medical school at UWI, she excelled in biology and chemistry but grappled with the intensity of medical training. However, clinical rotations strengthened her passion for medicine. At Spanish Town Hospital, she rotated through pathology—performing autopsies, analyzing tissue samples, and preparing slides—before realizing her heart was in ongoing patient interaction. Her time in emergency medicine taught her rapid decision-making and emotional resilience.",

    professional_experience:
      "Currently balances work across four to five medical practices monthly, often covering additional shifts to support colleagues—especially during demanding periods such as December. Her clinical background includes emergency medicine, general practice, and pathology. In pathology, she assisted with specimen trimming, histology slide preparation, and microscopic analysis but no longer participates in autopsies. She frequently manages high clinical loads, works within understaffed environments, and depends on strong clinical judgment due to limited diagnostic resources such as CT and MRI at Spanish Town Hospital. She is deeply committed to patient communication, often providing empathy where time or staffing limitations challenge other clinicians.",

    memorable_case:
      "One impactful memory occurred in the emergency department when she witnessed a distressed family confront a doctor over perceived insensitivity. The situation escalated, and Dr. Cameron stepped in, de-escalating tensions with empathy and clear communication. She explained staffing shortages and delays, helping the family feel heard despite their frustrations. Although emotionally taxing, the experience reinforced her belief in compassionate care—especially in high-pressure, high-volume environments.",

    strengths:
      "Excellent patient communication and de-escalation skills; strong clinical judgment in resource-limited settings; capable of high-volume work with consistency; passionate about pediatrics and family medicine; adaptable across multiple clinical environments; empathetic listener with a calm, compassionate approach.",

    areas_for_growth:
      "Wants to further explore specialization in family medicine or pediatrics; hopes to gain more experience in well-resourced clinical environments; seeks opportunities to contribute more regularly to organized medical missions with proper equipment and privacy for patients.",

    personality:
      "Compassionate, patient-centered, calm under pressure, highly empathetic, dedicated to service, hardworking, and intrinsically motivated. She thrives in personal patient interactions and values continuity of care. She is also adaptable, reflective, and grounded in realism about Jamaica’s healthcare limitations.",

    core_values:
      "Service to underserved communities, empathy in patient communication, professionalism even under stress, continuous learning, patient dignity, and a commitment to quality care despite resource constraints.",

    values:
      "Believes strongly in accessible and respectful healthcare, community support, and balancing professional demands with compassion and understanding. She is motivated by meaningful patient relationships and the impact of long-term family care.",

    goals:
      "Plans to pursue specialization in either family medicine or pediatrics; wants to continue contributing to community medicals and outreach; hopes to participate in better-organized medical missions with adequate supplies and infrastructure; seeks to improve clinical environments for patient privacy and proper examinations.",

    hobbies:
      "Enjoys community outreach, interacting with patients and families, and stays passionate about pediatrics and family medicine. She values rest and recovery due to her demanding schedule."
  },

  transcripts: [] // You may later store timestamps or text segments here
},

"angie-schafer": {
  doctor: {
    doctor_id: "angie-schafer",
    name: "Dr. Angie Schafer",
    specialty: "Emergency Medicine",
    country: "United States",
    medical_role: "Emergency Medicine Physician",
    work_preference: "Global relief",
    availability: "15–18 shifts/month, mostly nights",
    experience_years: 10,
    photo_url: "/images/angie-schafer.jpeg" // Replace when you get a real photo
  },

  profile: {
    bio: "Emergency Medicine physician with a decade of high-intensity clinical experience and an extensive background in global health, systems development, and international medical education. Known for her adaptability, emotional intelligence, and ability to lead in crises, Dr. Schafer balances emergency room work in the United States with global relief initiatives across multiple countries.",

    education:
      "Bachelor of Science from Purdue University. Doctor of Medicine from Indiana University School of Medicine. Emergency Medicine Residency at the University of Texas, San Antonio. Diploma in Tropical Medicine (Peru). Master's in Global Health Planning and Management from Johns Hopkins University.",

    certifications: [
      "Board Certified in Emergency Medicine",
      "Diploma in Tropical Medicine",
      "Master’s in Global Health Planning & Management",
      "Global Emergency Medicine Fellowship (Vanderbilt University)",
      "WHO Basic Emergency Care Course Instructor"
    ],

    languages: ["English"],

    personal_story:
      "Originally set on becoming a marine biologist, Dr. Schafer’s life changed during a mission trip to Port-au-Prince, Haiti, where she met a young child with severe untreated hydrocephalus. The moment he lifted his heavy head to smile at her altered her path forever. She returned home determined to pursue medicine with no plan B—laser-focused on becoming a physician dedicated to global health. That formative encounter continues to guide her work and purpose.",

    academic_journey:
      "After excelling at Purdue, she shifted fully into medicine and completed her MD at Indiana University. During medical training, she discovered a passion for emergent, high-acuity care and gravitated toward Emergency Medicine for its intensity, diversity, and flexibility. Her residency in San Antonio strengthened this passion, enabling her to participate in global projects while completing rigorous clinical training. She later pursued advanced training in tropical medicine and global systems development, solidifying her identity as both an ER physician and a global relief doctor.",

    professional_experience:
      "Dr. Schafer works primarily as a night-shift Emergency Medicine physician, treating everything from trauma and gunshot wounds to strokes, heart attacks, and complex medical emergencies. She has practiced in Haiti, Guyana, Zambia, Guatemala, El Salvador, and Jamaica. Her global work includes teaching emergency medicine clinicians, helping establish residency programs, training mid-level providers, and participating in large-scale capacity-building initiatives. She helped launch Guyana’s first antivenom program and taught WHO emergency care courses across multiple countries. She is skilled in high-pressure, resource-limited environments and is known for her adaptability, leadership, and operational problem-solving.",

    memorable_case:
      "Among countless emergencies, several stand out: a patient impaled by a tree after being thrown from a car; a patient with a glucose level of 2,468 mg/dL; and a man severely lacerated by a boat propeller. She has witnessed dramatic trauma, devastating strokes, and countless life-or-death moments. But the cases that impact her most deeply are the ones where she knew the patient personally before they coded—people she had spoken with or comforted minutes before their condition deteriorated. She is known for honoring every life with a moment of silence after death, a ritual that has touched families and coworkers alike.",

    strengths:
      "Crisis leadership, rapid decision-making, trauma care, adaptability in low-resource environments, global health systems development, teaching, emotional intelligence, and maintaining compassion under stress. Highly skilled at managing multiple high-acuity patients simultaneously and thriving in unpredictable, high-pressure settings.",

    areas_for_growth:
      "Continuing to expand long-term global health strategy, building sustainable emergency care systems internationally, and balancing extensive travel with future personal commitments such as family life.",

    personality:
      "Adventurous, resilient, compassionate, emotionally attuned, highly adaptable, and energized by high-stakes environments. She describes herself as an 'adrenaline junkie' who thrives in fast-paced situations. She is deeply empathetic—often crying with families during loss—and believes vulnerability is part of authentic patient care.",

    core_values:
      "Compassion, global health equity, respect for human life, sustainability in healthcare systems, education, adaptability, and maintaining humanity in medicine. She believes losing emotional sensitivity to death is the moment a doctor should leave medicine.",

    values:
      "She values meaningful patient connection, global partnerships built on trust, long-term sustainable impact, and continuous learning. She rejects the idea of waiting until retirement to serve and instead integrates global relief into her active career.",

    goals:
      "To continue doing global relief work throughout her life, help build emergency medicine systems internationally, expand telemedicine and EMS development in Jamaica, and contribute to long-term medical capacity building. She envisions global health work as her lifelong mission—before and after retirement.",

    hobbies:
      "Skiing, scuba diving, hiking, biking, camping, and adventurous outdoor travel. Raised in an outdoors-oriented family, she is comfortable 'roughing it' and enjoys immersing herself in nature. These passions support her work in remote environments worldwide."
  },

  transcripts: [] // Optional: you can later store transcript segments here
},

"tarek-simpson": {
  doctor: {
    doctor_id: "tarek-simpson",
    name: "Dr. Tarek Simpson",
    specialty: "General Medicine / Future OBGYN",
    country: "Jamaica",
    medical_role: "Medical Doctor",
    work_preference: "Obstetrics Gynocology",
    availability: "Availability TBD",
    experience_years: 3,
    photo_url: "/images/tarek-simpson.jpeg"
  },

  profile: {
    bio: "Jamaican medical doctor with three years of clinical experience and a strong passion for Obstetrics and Gynecology. Trained internationally, Dr. Simpson completed his medical degree in Ukraine during the onset of the war, developing profound crisis resilience and adaptability. Now practicing in Jamaica, he brings a unique blend of global insight, compassionate patient care, and dedication to community service.",

    education:
      "Bachelor’s degree in Environmental Biology. Master's degree in a biology-related discipline. Medical Degree completed in Kharkiv, Ukraine in 2022, during the outbreak of the Russian invasion.",

    certifications: [
      "Medical Degree (MD), Kharkiv, Ukraine",
      "Clinical experience in emergency and general medicine",
      "Fluency in English with conversational Russian and Spanish"
    ],

    languages: ["English", "Russian (conversational)", "Spanish (basic)"],

    personal_story:
      "Dr. Simpson’s medical journey took an unexpected turn when he found himself graduating in a war zone. He survived the first day of the Russian invasion while living in a dormitory, an experience that deeply shaped his perspective on life, mortality, and the purpose of medicine. Returning to Jamaica, he carried with him a renewed sense of duty and gratitude, recognizing the fragility of stability and the importance of compassionate care.",

    academic_journey:
      "After completing undergraduate and graduate studies in the sciences, Dr. Simpson pursued medicine in Ukraine. His final years of training occurred during extreme geopolitical instability, forcing rapid adaptation and maturity. Language immersion allowed him to learn Russian, improving patient communication abroad. Graduation in 2022 marked the end of a challenging yet transformative medical education.",

    professional_experience:
      "Currently practicing as a Medical Doctor at Port Antonio Hospital, Dr. Simpson has three years of clinical experience managing diverse patient populations. His work includes general medicine, emergency exposure, and community relief efforts. He played an active role in post-hurricane community outreach, assisting with meal distribution, care packages, and supporting displaced families. His training has equipped him to perform under pressure and deliver patient-centered care amidst resource constraints.",

    memorable_case:
      "Although not tied to a single medical case, one of the most defining experiences of his life was evacuating Ukraine as the war began. This event shaped his commitment to serving communities in crisis and strengthened his resolve to bring empathy and stability to his patients.",

    strengths:
      "Exceptional crisis resilience, strong interest and aptitude for Obstetrics & Gynecology, multilingual communication skills, adaptability, emotional intelligence, and a deep commitment to patient welfare. Able to remain calm and effective in unpredictable or high-stress situations.",

    areas_for_growth:
      "Further specialization training in Obstetrics and Gynecology, managing work-life balance, and creating structure around demanding clinical schedules. Interested in gaining more exposure in advanced OBGYN practice environments.",

    personality:
      "Compassionate, introspective, adaptive, and quietly resilient. Dr. Simpson demonstrates emotional maturity beyond his years, shaped by global hardship and local service. He is gentle with patients, thoughtful in decision-making, and grounded in a deep understanding of human vulnerability.",

    core_values:
      "Service to community, empathy, resilience, continuous learning, and providing care to people facing trauma or instability. Values integrity, humility, and meaningful human connection.",

    values:
      "Believes in supporting underserved communities, rebuilding after crises, and offering care with dignity and respect. Holds strong belief in perseverance and using personal hardships as a foundation for stronger, more compassionate practice.",

    goals:
      "To specialize in Obstetrics & Gynecology, continue participating in community relief missions, possibly engage in international humanitarian work if his schedule allows, pursue further medical training, and expand his impact in maternal and reproductive health.",

    hobbies:
      "Not specified"
  },

  transcripts: []
},

"david-clarke": {
  doctor: {
    doctor_id: "david-clarke",
    name: "Lt. Colonel David Clarke",
    specialty: "Emergency Medical Coordination",
    country: "Barbados",
    medical_role: "Force Medical Liaison Officer / Contingent Commander, Barbados Defence Force",
    work_preference: "Field Hospital",
    availability: "Mission-dependent",
    experience_years: 37, // based on 33–37 years logistics career + 5 years military return
    photo_url: "/images/david-clarke2.jpeg"
  },

  profile: {
    bio: "Lieutenant Colonel David Clarke is a highly accomplished operational leader in disaster response, medical logistics, and field hospital deployment. As the Force Medical Liaison Officer and Contingent Commander of the Barbados Defence Force, he leads the Caribbean’s only World Health Organization–accredited Emergency Medical Team (Type 1 and progressing to Type 2). With decades of experience coordinating high-stakes missions, COVID-19 vaccination campaigns, and international field operations, he is known for exceptional leadership, logistical mastery, and humanitarian commitment.",

    education:
      "Extensive non-formal education background including Duke of Edinburgh Gold Award, Queen Scout Award, Black Belt in Karate, and Dive Master certification. Formally trained through decades of military, emergency response, and international logistics experience. Developed advanced expertise through WHO Emergency Medical Team accreditation processes.",

    certifications: [
      "WHO Emergency Medical Team Type II Field Hospital Commander",
      "COVID-19 National Vaccination Rollout Coordinator (Barbados)",
      "Duke of Edinburgh Gold Award recipient",
      "Queen Scout Award recipient",
      "Black Belt in Karate",
      "Dive Master Certification"
    ],

    languages: ["English"],

    personal_story:
      "Born into a family full of medical professionals, Colonel Clarke is the only one who did not become a doctor—yet his life path led him deeply into the world of medical humanitarian work. His father, an Anglican priest, raised him and his brothers with strict expectations of discipline and purpose. To avoid being in church multiple times per day, he pursued an enormous portfolio of non-formal education achievements. These opened doors to global adventure programs, Royal family engagements, and ultimately a lifelong career in logistics, emergency response, and medical deployment systems.",

    academic_journey:
      "His unconventional trajectory began with youth leadership programs and evolved into global expedition work. This led him into logistics planning for British Royal Family visits and international operations. After over three decades of high-level coordination roles, he was called back into military service during the COVID-19 crisis to write national policies for the Barbados Defence Force. This eventually positioned him as the national coordinator for the vaccination rollout before transitioning into command of the WHO-accredited field hospital system.",

    professional_experience:
      "Lieutenant Colonel Clarke has commanded the Barbados Defence Force Emergency Medical Team through major regional crises including Hurricane Irma, Hurricane Maria, and Hurricane Melissa. He led the COVID-19 vaccination rollout for Barbados, vaccinating approximately 72% of the eligible population. He oversees deployment logistics, accreditation, clinical integration, water purification systems, surgical and outpatient field operations, and multi-country medical staffing. Under his leadership, the BDF EMT has deployed to Jamaica as a fully operational Type II field hospital, providing 24-hour surgical care, outpatient services, mental health support, radiology, laboratory operations, and more. He manages rotating teams of 50–60 clinical professionals from Barbados and the Eastern Caribbean.",

    memorable_case:
      "Rather than a single case, Colonel Clarke’s defining experiences are large-scale humanitarian deployments. He coordinated multi-million-dollar medical missions, supported devastated health systems in Dominica, and now oversees the Type II field hospital in Jamaica serving up to 100 patients per day. His most memorable accomplishments revolve around restoring access to healthcare in times of crisis and ensuring that deployed teams remain self-sustaining, safe, and effective.",

    strengths:
      "Exceptional organizational leadership, mastery of medical logistics, disaster response coordination, field hospital operations, cross-country deployment management, crisis planning, and multi-disciplinary team command. Highly skilled in adapting complex systems to unstable environments, ensuring medical teams operate at international standards.",

    areas_for_growth:
      "Approaching mandatory military retirement; exploring future opportunities to continue humanitarian service beyond uniformed duty. Interested in long-term sustainability planning for Caribbean regional medical response systems.",

    personality:
      "Disciplined, strategic, decisive, and deeply service-oriented. Colonel Clarke blends military precision with humanitarian empathy. His background in youth leadership, adventure expeditions, and royal logistics has shaped him into a calm, confident, and adaptable leader who thrives in high-pressure environments.",

    core_values:
      "Service, discipline, humanitarian impact, operational excellence, resilience, community protection, and empowering health systems during crisis.",

    values:
      "Believes strongly in self-sufficiency during deployment, minimizing burden on host nations, delivering world-class medical care in resource-limited environments, and upholding international standards of readiness and patient safety.",

    goals:
      "To complete his final major deployment as commanding officer, ensure a successful multi-month medical mission in Jamaica, secure funding for continued field operations, and transition into retirement while remaining available for international humanitarian or advisory work.",

    hobbies:
      "Scuba diving, adventure expeditions, physical training, non-formal education programs, and international travel."
  },

  transcripts: []
},

"owen-waugh": {
  doctor: {
    doctor_id: "owen-waugh",
    name: "Dr. Owen Waugh",
    specialty: "General Medicine / Obstetrics & Gynecology",
    country: "Jamaica",
    medical_role: "Medical Officer, Linstead Hospital",
    work_preference: "Oncology & Orthodontics",
    availability: "Flexible (short-staffed but able to make time)",
    experience_years: 3,
    photo_url: "/images/owen-waugh.jpeg"
  },

  profile: {
    bio: "Dr. Owen Waugh is a Jamaican medical doctor currently serving at Linstead Hospital. With a foundation in zoology and botany, he transitioned into medicine and completed his MBBS training in Ukraine—remaining there through the outbreak of war before evacuating fellow Jamaican students to safety. He has clinical experience in internship and senior house officer roles at Spanish Town Hospital and now holds a permanent medical post at Linstead Hospital. His interests span obstetrics & gynecology, pediatrics, ultrasonography, and community-focused patient care.",

    education:
      "Bachelor of Science in Zoology and Botany (Double Major) from the University of the West Indies. MBBS completed in Ukraine. Completed internship and senior house officer roles at Spanish Town Hospital. Currently a Medical Officer at Linstead Hospital.",

    certifications: [
      "MBBS (Ukraine)",
      "Russian Language Training (3.5 years as part of medical program)",
      "Experience coordinating emergency evacuation of Jamaican students during the Ukraine War"
    ],

    languages: ["English", "Russian", "Basic French"],

    personal_story:
      "Dr. Waugh was born and raised in Jamaica and initially pursued zoology and botany due to financial constraints around medical school. After a year and a half in the Forestry Department, he felt the work had become repetitive and decided to pursue medicine. He trained in Ukraine for six years and lived through the early days of the war, helping organize the evacuation of Jamaican students. Returning to Jamaica in 2022, he completed his exams remotely due to the conflict and began his medical career shortly after.",

    academic_journey:
      "Dr. Waugh completed his first degree at UWI before transitioning into medicine. His MBBS journey was shaped not only by academics but also by the geopolitical reality of the Russia–Ukraine conflict. While in Ukraine, he studied Russian, formed strong international connections, and gained resilience through crisis management. After evacuation and completion of his exams, he returned to Jamaica to complete internship and SHO duties before earning a permanent post at Linstead Hospital.",

    professional_experience:
      "Experience includes internship and senior house officer work at Spanish Town Hospital, followed by a permanent appointment at Linstead Hospital (Type C). At Linstead, Dr. Waugh works across a wide range of cases due to the hospital serving multiple parishes—Clarendon, St. Catherine, St. Mary, and surrounding areas. Despite limited resources such as lack of 24-hour imaging and lab services, he and his team manage urgent cases effectively through clinical judgment and coordinated transfers to Spanish Town, KPH, or UWI when necessary. He also previously volunteered at swim meets, providing medical assistance during competitions.",

    memorable_case:
      "Rather than a single clinical case, the defining experience of Dr. Waugh’s early career was coordinating the escape of Jamaican students from Ukraine during the war. He helped account for, organize, and evacuate students from the eastern region of Kharkiv to the Polish border—enduring missile fire, destroyed tanks, dangerous detours, extreme cold, and a 30 km trek on foot. Every student survived. This moment continues to shape his dedication to relief work and service.",

    strengths:
      "Calm under pressure, strong interpersonal communication, fluency in multiple languages, empathetic bedside manner, excellent with pediatric and maternal reassurance, adaptable in low-resource environments, leadership under crisis, strong interest in procedural and diagnostic skills such as ultrasonography.",

    areas_for_growth:
      "Seeking formal training in ultrasonography to improve diagnostic capability in resource-limited hospitals. Interested in applying for postgraduate training in pediatrics or obstetrics & gynecology within the next one to two years.",

    personality:
      "Warm, composed, thoughtful, and service-oriented. Dr. Waugh is highly empathetic, loves working with families, enjoys reassuring anxious parents, and maintains a calm presence even in high-stress situations. His experiences in Ukraine reinforced a deep sense of responsibility and compassion.",

    core_values:
      "Helping others, relieving suffering, community service, resilience, continuous learning, and providing care even when resources are limited.",

    values:
      "Believes strongly in Maya Angelou’s philosophy: 'I am human and nothing human is alien to me.' He sees suffering as part of the human experience and feels compelled to help alleviate it wherever possible.",

    goals:
      "To apply for and complete specialist training in pediatrics or obstetrics & gynecology. To become certified in ultrasonography. To participate in official medical relief missions. To continue growing clinically while supporting underserved communities.",

    hobbies:
      "Learning languages, volunteering at swim meets, interacting with children, and maintaining connections with peers from his time in Ukraine."
  },

  transcripts: []
},

"ramone-williamson": {
  doctor: {
    doctor_id: "ramone-williamson",
    name: "Dr. Ramone A. Williamson",
    specialty: "Oncology & Orthopedics",
    country: "Jamaica",
    medical_role: "Medical Doctor / Orthopedics & Oncology",
    work_preference: "Both", // Field + Telemedicine (he supports both)
    availability: "Part-time (varies with clinical schedule)",
    experience_years: 5,
    photo_url: "/images/ramone-williamson.jpeg",
  },

  profile: {
    bio:
      "Dr. Ramone A. Williamson is a Jamaican medical doctor specializing in orthopedics and oncology, with five years of clinical experience. His work spans emergency care of orthopedic trauma, cancer-related bone disease, and multidisciplinary oncology management. Known for his calm presence and analytical approach, he provides patient-centered care informed by both hospital experience and academic research.",

    education:
      "Bachelor of Medicine and Bachelor of Surgery (MBBS) from The University of the West Indies, Mona. Completed internship and subsequent medical rotations in oncology and orthopedics. Authored over 15 peer-reviewed oncology research publications.",

    certifications: [
      "Licensed Medical Doctor, Jamaica",
      "Specialized clinical experience in Orthopedics",
      "Oncology research contributor with 15+ academic publications",
      "Emergency and acute care clinical training"
    ],

    languages: ["English"],

    personal_story:
      "Growing up in Jamaica, Dr. Williamson was drawn to medicine as a way to create meaningful impact in communities with limited resources. During his medical training, he gravitated toward oncology because of the depth of human connection involved in caring for cancer patients. His later clinical work in orthopedics broadened his scope, giving him the ability to treat traumatic injuries, fractures, and bone diseases—including cancer-related orthopedic conditions.",

    academic_journey:
      "Throughout medical school and clinical training, Dr. Williamson developed a strong interest in oncology research, resulting in more than 15 published papers across cancer care, epidemiology, and treatment outcomes. His work straddles both oncology and orthopedics, giving him a unique dual perspective on patient care, especially for individuals whose orthopedic issues stem from or overlap with cancer diagnoses.",

    professional_experience:
      "With five years of clinical experience, Dr. Williamson has served in hospital settings managing acute orthopedic trauma, fractures, emergency cases, and soft tissue injuries. He also works with oncology patients, supporting diagnosis, clinical management, and follow-up care. His blended expertise allows him to provide holistic guidance to patients with complex musculoskeletal conditions, including those impacted by cancer.",

    memorable_case:
      "Dr. Williamson recalls multiple cases involving patients with advanced cancer who developed severe orthopedic complications. Providing relief, triage, and compassionate counseling for families during these difficult situations has shaped his understanding of dignity in care and the emotional weight of patient support.",

    strengths:
      "Strong foundation in oncology research and clinical oncology support. Skilled in orthopedic trauma assessment, fracture management, and musculoskeletal diagnostics. Excellent communicator, calm under pressure, and capable of providing empathetic guidance to patients and families.",

    areas_for_growth:
      "Continuing to develop procedural orthopedics skills and expanding capabilities in telemedicine for remote patient monitoring. Seeking opportunities to participate in global orthopedic-oncology partnerships and further research collaborations.",

    personality:
      "Calm, analytical, compassionate, and deeply patient-focused. Balances scientific rigor with emotional sensitivity, particularly in oncology care. Values teamwork, humility, and continuous learning.",

    core_values:
      "Patient dignity, evidence-based medicine, compassionate communication, lifelong learning, family-centered care, and service to underserved communities.",

    values:
      "Grounded in the belief that every patient deserves to be seen, heard, and supported throughout the entire healing process—physically, emotionally, and socially.",

    goals:
      "To deepen expertise in orthopedic surgery and oncology. To expand clinical reach through telemedicine. To continue publishing research that improves cancer outcomes. To serve in relief missions and support communities facing medical crises.",

    hobbies:
      "Reading, academic research, mentorship, fitness, and volunteering in community health initiatives.",
  },

  transcripts: [],
},

"hajauni-parsons": {
  doctor: {
    doctor_id: "hajauni-parsons",
    name: "Dr. Hajauni Parsons",
    specialty: "General Medicine",
    country: "Jamaica",
    medical_role: "Medical Doctor",
    work_preference: "Both",
    availability: "Not specified",
    experience_years: 2,
    photo_url: "/images/hajauni-parsons.jpeg",
  },

  profile: {
    bio: "Dr. Hajauni Parsons is a Jamaican medical doctor with experience in both hospital and community clinical settings. Currently working at Spanish Town Hospital, he manages a wide range of general medical cases with a hands-on, practical approach to patient care. He is deeply motivated by service, skill development, and the opportunity to grow into a more specialized clinical role in the future.",

    education:
      "Bachelor of Medicine. Bachelor of Surgery (MBBS). followed by two years of practical clinical experience across various hospital departments.",

    certifications: [
      "Medical Doctor (Registered)",
      "Clinical experience across General Medicine and Emergency rotations",
      "Procedural skills development within hospital settings"
    ],

    languages: ["English"],

    personal_story:
      "Growing up in Jamaica, Dr. Parsons built a strong desire to serve his community and advance his medical skills. He thrives in hands-on environments and values being part of a team that provides immediate and meaningful impact. His dedication to patient care comes from a desire to support others during moments of crisis and uncertainty, especially in underserved communities.",

    academic_journey:
      "After graduating from medical school, Dr. Parsons entered clinical practice and has since worked for two years in general hospital settings. He has gained early exposure to emergency care, general medicine, and procedural work, and continues to build his clinical judgment and hands-on skill set. His long-term aspiration is to pursue advanced training in surgery, particularly general surgery with potential interest in cardiothoracic care.",

    professional_experience:
      "Currently serving at Spanish Town Hospital, Dr. Parsons manages general medical patients, coordinates care with multidisciplinary teams, and assists with procedural and emergency tasks. His work emphasizes adaptability, critical thinking, and the ability to stabilize, assess, and manage a wide range of conditions in a resource-constrained environment.",

    memorable_case:
      "One of his most meaningful clinical moments was supporting patients and families during emotionally difficult circumstances. These experiences strengthened his desire to provide compassionate, grounded, skillful care while maintaining a calm presence in challenging situations.",

    strengths:
      "Strong clinical adaptability, growing procedural competence, willingness to take initiative, clear communication, team-oriented mindset, and a natural ability to stay calm under pressure. He is committed to learning and motivated to improve his skill set continuously.",

    areas_for_growth:
      "Further development of surgical proficiency, increased exposure to advanced medical procedures, and strengthening his clinical decision-making through mentorship and specialty training.",

    personality:
      "Calm, thoughtful, hands-on, and service-oriented. Dr. Parsons is motivated by purpose, teamwork, and growth. He values honesty, reliability, and consistency in both personal and professional environments.",

    core_values:
      "Service, discipline, continuous improvement, compassion, teamwork, and dedication to community impact.",

    values:
      "He believes deeply in helping others through direct action and sees medicine as both a responsibility and an opportunity to uplift vulnerable communities.",

    goals:
      "To continue building clinical experience. To pursue advanced surgical training in the future. To contribute to Jamaica’s healthcare system and expand his practical skill set.",

    hobbies:
      "Working out, learning new procedures, spending time with friends, exploring new interests, and maintaining a balanced lifestyle.",
  },

  transcripts: [],
},



}
