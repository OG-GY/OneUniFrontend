// ============================================
// ONEUNI MOCK DATA
// ============================================

// ============================================
// UNIVERSITIES
// ============================================

export const universities = [
    {
      id: "uet-lahore",
      name: "University of Engineering and Technology",
      shortName: "UET Lahore",
      logo: "/logos/uet.png",
      location: "Grand Trunk Road, Lahore, Punjab",
      city: "Lahore",
      website: "https://www.uet.edu.pk",
      established: 1921,
      vcName: "Prof. Dr. Syed Shahid Munir",
      ranking: 4,
      qsRanking: "751-760",
      contact: {
        phone: "042-99029216",
        email: "registrar@uet.edu.pk",
      },
      fees: {
        admissionFee: 1800,
        semester: 79000,
        year: 158000,
        selfFinanceSemester: 135000,
      },
      overview:
        "UET Lahore, established in 1921 as Maclagan Engineering College, is one of Pakistan's premier engineering institutions. With 7 faculties, 35 departments, and over 827 teachers, it has been a cornerstone of engineering education in the country for over a century.",
      admissionRequirements: {
        criteria: [
          "Minimum 60% marks in Matric/SSC (Science subjects)",
          "Minimum 60% marks in FSc/HSSC Pre-Engineering or equivalent",
          "Must appear in ECAT conducted by UET Lahore",
          "Aggregate: 25% Matric + 75% FSc",
        ],
        tests: [
          {
            name: "ECAT",
            minScore: 40,
            totalScore: 400,
            subjects: ["Physics", "Mathematics", "Chemistry/Computer Science", "English"],
          },
        ],
      },
      scholarships: [
        { name: "HEC Need-Based Scholarship", concession: "Up to 100% tuition waiver" },
        { name: "Punjab Educational Endowment Fund (PEEF)", concession: "Annual award for deserving students" },
        { name: "Ehsaas Undergraduate Scholarship", concession: "PKR 70,000 per year" },
        { name: "UET Merit-Based Award", concession: "Up to 50% tuition waiver" },
        { name: "UET Need-Based Scholarship", concession: "Internal university fund" },
        { name: "USAID HESSA Scholarship", concession: "Variable" },
        { name: "CM Punjab Youth Initiative", concession: "Bike + stipend for needy students" },
      ],
      facilities: [
        { name: "Engineering Laboratories", description: "State-of-the-art labs for electrical, mechanical, chemical, and civil engineering" },
        { name: "KICS Computing Labs", description: "Al-Khawarizmi Institute of Computer Science dedicated computing facility" },
        { name: "Central Library", description: "Fully digital library with vast resources and research journals" },
        { name: "Student Hostels", description: "15 halls of residence accommodating approximately 2,700 students" },
        { name: "Sports Complex", description: "Cricket, football, hockey, tennis, basketball grounds and swimming pool" },
        { name: "Research Centres", description: "19 featured research centers across disciplines" },
        { name: "University Mosque", description: "On-campus mosque for students and faculty" },
        { name: "Medical Center", description: "On-campus health facility for students" },
        { name: "Cafeteria", description: "Multiple dining options across campus" },
        { name: "Transport Service", description: "Dedicated bus routes covering Lahore and surrounding areas" },
      ],
      societies: [
        "UET Media Society",
        "UET Literary Society",
        "Zimal Student Society",
        "IEEE Student Chapter",
        "ACM Student Chapter",
        "UET Robotics Society",
        "UET Debating Society",
        "UET Cricket Club",
        "UET Football Club",
      ],
      subCampuses: [
        {
          name: "Kala Shah Kaku (KSK) Campus",
          location: "GT Road, near Lahore",
          image: "/campuses/uet-ksk.jpg",
          focus: "Biomedical Engineering and modern engineering programs",
        },
        {
          name: "Faisalabad Campus",
          location: "Faisalabad, Punjab",
          image: "/campuses/uet-fsd.jpg",
          focus: "Textile Engineering, Electrical and Mechanical Engineering",
        },
        {
          name: "Narowal Campus",
          location: "Narowal, northeastern Punjab",
          image: "/campuses/uet-nwl.jpg",
          focus: "Civil, Electrical and Mechanical Engineering",
        },
        {
          name: "Rachna College of Engineering (RCE)",
          location: "Gujranwala, Punjab",
          image: "/campuses/uet-guj.jpg",
          focus: "Engineering programs for industrial Gujranwala region",
        },
      ],
      departments: [
        {
          name: "Faculty of Civil Engineering",
          programs: [
            { id: "uet-civil-bs", name: "BS Civil Engineering", duration: "4 years", type: "BS", creditHours: 136 },
            { id: "uet-city-bs", name: "BS City and Regional Planning", duration: "4 years", type: "BS", creditHours: 136 },
            { id: "uet-transport-bs", name: "BS Transportation Engineering", duration: "4 years", type: "BS", creditHours: 136 },
            { id: "uet-env-bs", name: "BS Environmental Engineering", duration: "4 years", type: "BS", creditHours: 136 },
            { id: "uet-civil-ms", name: "MS Civil Engineering", duration: "2 years", type: "MS", creditHours: 30 },
            { id: "uet-civil-phd", name: "PhD Civil Engineering", duration: "3-5 years", type: "PhD", creditHours: null },
          ],
        },
        {
          name: "Faculty of Electrical Engineering",
          programs: [
            { id: "uet-ee-bs", name: "BS Electrical Engineering", duration: "4 years", type: "BS", creditHours: 136 },
            { id: "uet-ce-bs", name: "BS Computer Engineering", duration: "4 years", type: "BS", creditHours: 136 },
            { id: "uet-tele-bs", name: "BS Telecommunications Engineering", duration: "4 years", type: "BS", creditHours: 136 },
            { id: "uet-ee-ms", name: "MS Electrical Engineering", duration: "2 years", type: "MS", creditHours: 30 },
            { id: "uet-ee-phd", name: "PhD Electrical Engineering", duration: "3-5 years", type: "PhD", creditHours: null },
          ],
        },
        {
          name: "Faculty of Mechanical Engineering",
          programs: [
            { id: "uet-me-bs", name: "BS Mechanical Engineering", duration: "4 years", type: "BS", creditHours: 136 },
            { id: "uet-mechatronics-bs", name: "BS Mechatronics and Control Engineering", duration: "4 years", type: "BS", creditHours: 136 },
            { id: "uet-auto-bs", name: "BS Automotive Engineering", duration: "4 years", type: "BS", creditHours: 136 },
            { id: "uet-ime-bs", name: "BS Industrial and Manufacturing Engineering", duration: "4 years", type: "BS", creditHours: 136 },
            { id: "uet-me-ms", name: "MS Mechanical Engineering", duration: "2 years", type: "MS", creditHours: 30 },
            { id: "uet-me-phd", name: "PhD Mechanical Engineering", duration: "3-5 years", type: "PhD", creditHours: null },
          ],
        },
        {
          name: "Faculty of Computer Science & Engineering (KICS)",
          programs: [
            { id: "uet-cs-bs", name: "BS Computer Science", duration: "4 years", type: "BS", creditHours: 130 },
            { id: "uet-ai-bs", name: "BS Artificial Intelligence", duration: "4 years", type: "BS", creditHours: 130 },
            { id: "uet-cyber-bs", name: "BS Cyber Security", duration: "4 years", type: "BS", creditHours: 130 },
            { id: "uet-ds-bs", name: "BS Data Science", duration: "4 years", type: "BS", creditHours: 130 },
            { id: "uet-robotics-bs", name: "BS Robotics", duration: "4 years", type: "BS", creditHours: 130 },
            { id: "uet-cs-ms", name: "MS Computer Science", duration: "2 years", type: "MS", creditHours: 30 },
            { id: "uet-cs-phd", name: "PhD Computer Science", duration: "3-5 years", type: "PhD", creditHours: null },
          ],
        },
        {
          name: "Faculty of Chemical, Metallurgical & Polymer Engineering",
          programs: [
            { id: "uet-chem-bs", name: "BS Chemical Engineering", duration: "4 years", type: "BS", creditHours: 136 },
            { id: "uet-polymer-bs", name: "BS Polymer Engineering", duration: "4 years", type: "BS", creditHours: 136 },
            { id: "uet-metal-bs", name: "BS Metallurgical and Materials Engineering", duration: "4 years", type: "BS", creditHours: 136 },
            { id: "uet-chem-ms", name: "MS Chemical Engineering", duration: "2 years", type: "MS", creditHours: 30 },
          ],
        },
        {
          name: "Faculty of Mining & Geological Engineering",
          programs: [
            { id: "uet-geo-bs", name: "BS Geological Engineering", duration: "4 years", type: "BS", creditHours: 136 },
            { id: "uet-mining-bs", name: "BS Mining Engineering", duration: "4 years", type: "BS", creditHours: 136 },
            { id: "uet-petro-bs", name: "BS Petroleum and Gas Engineering", duration: "4 years", type: "BS", creditHours: 136 },
          ],
        },
        {
          name: "Faculty of Architecture & Planning",
          programs: [
            { id: "uet-arch-bs", name: "B.Arch Architecture", duration: "5 years", type: "BS", creditHours: 180 },
            { id: "uet-archeng-bs", name: "BS Architectural Engineering", duration: "4 years", type: "BS", creditHours: 136 },
            { id: "uet-arch-ms", name: "MS Architecture", duration: "2 years", type: "MS", creditHours: 30 },
          ],
        },
        {
          name: "Institute of Business & Management (IB&M)",
          programs: [
            { id: "uet-bba-bs", name: "BBA", duration: "4 years", type: "BS", creditHours: 130 },
            { id: "uet-mba", name: "MBA", duration: "2 years", type: "MS", creditHours: 60 },
            { id: "uet-ms-mgmt", name: "MS Management Sciences", duration: "2 years", type: "MS", creditHours: 30 },
          ],
        },
      ],
    },
  
    // ============================================
    // NUST
    // ============================================
    {
      id: "nust-islamabad",
      name: "National University of Sciences and Technology",
      shortName: "NUST Islamabad",
      logo: "/logos/nust.png",
      location: "Sector H-12, Islamabad, Pakistan",
      city: "Islamabad",
      website: "https://www.nust.edu.pk",
      established: 1991,
      vcName: "Dr. Muhammad Zahid Latif",
      ranking: 2,
      qsRanking: "371",
      contact: {
        phone: "051-90851000",
        email: "admissions@nust.edu.pk",
      },
      fees: {
        admissionFee: 35000,
        semester: 140000,
        year: 280000,
        selfFinanceSemester: 196000,
      },
      overview:
        "NUST, established in 1991, is Pakistan's top-ranked university (QS #371 globally, #2 in Pakistan). With 12,000+ students, 1,637 faculty members, and 40+ undergraduate programs across engineering, computing, business, and social sciences, NUST is home to Pakistan's first IASP-certified science and technology park.",
      admissionRequirements: {
        criteria: [
          "Minimum 60% marks in FSc Pre-Engineering/ICS or A-Level equivalent",
          "Must appear in NET (NUST Entry Test)",
          "Aggregate: 75% NET score + 25% FSc/A-Level marks",
          "SAT/ACT accepted for international or foreign-qualified students",
        ],
        tests: [
          {
            name: "NET",
            minScore: 140,
            totalScore: 200,
            subjects: ["Mathematics", "Physics", "English"],
          },
        ],
      },
      scholarships: [
        { name: "NUST Need-Based Scholarship", concession: "Partial to full tuition waiver" },
        { name: "NUST Merit Scholarship", concession: "GPA-based tuition reduction" },
        { name: "HEC Need-Based Scholarship", concession: "Federal government funded" },
        { name: "PEEF Scholarship", concession: "For Punjab-domiciled students" },
        { name: "Ehsaas Undergraduate Scholarship", concession: "PKR 70,000 per year" },
        { name: "NUST Alumni Scholarship", concession: "Funded by alumni network" },
        { name: "Rector's Gold Medal", concession: "Top graduate honor + scholarship" },
      ],
      facilities: [
        { name: "Sports Complex", description: "Bowling alley, tennis, badminton, soccer, basketball, cricket, skating rink, swimming pools, rock climbing wall, and saddle clubs" },
        { name: "National Science and Technology Park (NSTP)", description: "Pakistan's first IASP-certified science park with tech startups and R&D centers" },
        { name: "Technology Incubation Centre (TIC)", description: "Supporting student and faculty startups" },
        { name: "Central Library", description: "Computerized library with 70,000+ volumes at CEME alone" },
        { name: "Research Laboratories", description: "State-of-the-art labs across all schools" },
        { name: "On-Campus Hostels", description: "Full residential facilities with messing" },
        { name: "Medical & Counseling Center", description: "24/7 medical and mental health support" },
        { name: "Auditorium", description: "Conference halls and event spaces" },
        { name: "Mosque", description: "On-campus mosque" },
        { name: "Cafeteria", description: "Multiple dining halls across campus" },
      ],
      societies: [
        "NUST Computing Society",
        "NUST Business Society",
        "NUST Literary and Debating Society",
        "NUST Dramatics Club",
        "IEEE NUST Student Branch",
        "NUST Robotics Club",
        "NUST Cricket Club",
        "NUST Football Society",
        "Community Service Club",
      ],
      subCampuses: [
        {
          name: "Main Campus",
          location: "Sector H-12, Islamabad",
          image: "/campuses/nust-main.jpg",
          focus: "SEECS, SMME, SCEE, SCME, NBS, S3H, SADA, SNS, ASAB, NLS",
        },
        {
          name: "CEME Campus",
          location: "Grand Trunk Road, Rawalpindi",
          image: "/campuses/nust-ceme.jpg",
          focus: "Electrical and Mechanical Engineering",
        },
        {
          name: "MCS Campus",
          location: "Rawalpindi",
          image: "/campuses/nust-mcs.jpg",
          focus: "Computing, Signals, and Information Security",
        },
        {
          name: "CAE Campus",
          location: "Risalpur",
          image: "/campuses/nust-cae.jpg",
          focus: "Aerospace and Avionics Engineering",
        },
        {
          name: "PNEC Campus",
          location: "Karachi",
          image: "/campuses/nust-pnec.jpg",
          focus: "Naval Engineering and Computer Science",
        },
      ],
      departments: [
        {
          name: "School of Electrical Engineering and Computer Science (SEECS)",
          programs: [
            { id: "nust-ee-bs", name: "BS Electrical Engineering", duration: "4 years", type: "BS", creditHours: 136 },
            { id: "nust-se-bs", name: "BS Software Engineering", duration: "4 years", type: "BS", creditHours: 130 },
            { id: "nust-cs-bs", name: "BS Computer Science", duration: "4 years", type: "BS", creditHours: 130 },
            { id: "nust-it-bs", name: "BS Information Technology", duration: "4 years", type: "BS", creditHours: 130 },
            { id: "nust-is-bs", name: "BS Information Security", duration: "4 years", type: "BS", creditHours: 130 },
            { id: "nust-dsai-bs", name: "BS Data Science and Artificial Intelligence", duration: "4 years", type: "BS", creditHours: 130 },
            { id: "nust-ee-ms", name: "MS Electrical Engineering", duration: "2 years", type: "MS", creditHours: 30 },
            { id: "nust-cs-phd", name: "PhD Computer Science", duration: "3-5 years", type: "PhD", creditHours: null },
          ],
        },
        {
          name: "School of Mechanical and Manufacturing Engineering (SMME)",
          programs: [
            { id: "nust-me-bs", name: "BS Mechanical Engineering", duration: "4 years", type: "BS", creditHours: 136 },
            { id: "nust-dme-bs", name: "BS Design and Manufacturing Engineering", duration: "4 years", type: "BS", creditHours: 136 },
            { id: "nust-rime-bs", name: "BS Robotics and Intelligent Machine Engineering", duration: "4 years", type: "BS", creditHours: 136 },
            { id: "nust-bme-bs", name: "BS Biomedical Engineering", duration: "4 years", type: "BS", creditHours: 136 },
            { id: "nust-me-ms", name: "MS Mechanical Engineering", duration: "2 years", type: "MS", creditHours: 30 },
          ],
        },
        {
          name: "School of Civil and Environmental Engineering (SCEE)",
          programs: [
            { id: "nust-civil-bs", name: "BS Civil Engineering", duration: "4 years", type: "BS", creditHours: 136 },
            { id: "nust-geo-bs", name: "BS Geoinformatics Engineering", duration: "4 years", type: "BS", creditHours: 136 },
            { id: "nust-env-bs", name: "BS Environmental Engineering", duration: "4 years", type: "BS", creditHours: 136 },
            { id: "nust-civil-ms", name: "MS Civil Engineering", duration: "2 years", type: "MS", creditHours: 30 },
          ],
        },
        {
          name: "School of Chemical and Materials Engineering (SCME)",
          programs: [
            { id: "nust-chem-bs", name: "BS Chemical Engineering", duration: "4 years", type: "BS", creditHours: 136 },
            { id: "nust-metal-bs", name: "BS Metallurgy and Materials Engineering", duration: "4 years", type: "BS", creditHours: 136 },
            { id: "nust-nano-bs", name: "BS Nanoscience and Engineering", duration: "4 years", type: "BS", creditHours: 136 },
          ],
        },
        {
          name: "NUST Business School (NBS)",
          programs: [
            { id: "nust-bba-bs", name: "BBA", duration: "4 years", type: "BS", creditHours: 130 },
            { id: "nust-af-bs", name: "BS Accounting and Finance", duration: "4 years", type: "BS", creditHours: 130 },
            { id: "nust-th-bs", name: "BS Tourism and Hospitality Management", duration: "4 years", type: "BS", creditHours: 130 },
            { id: "nust-mba", name: "MBA", duration: "2 years", type: "MS", creditHours: 60 },
          ],
        },
        {
          name: "School of Social Sciences and Humanities (S3H)",
          programs: [
            { id: "nust-eco-bs", name: "BS Economics", duration: "4 years", type: "BS", creditHours: 130 },
            { id: "nust-pa-bs", name: "BS Public Administration", duration: "4 years", type: "BS", creditHours: 130 },
            { id: "nust-mc-bs", name: "BS Mass Communication", duration: "4 years", type: "BS", creditHours: 130 },
            { id: "nust-psy-bs", name: "BS Psychology", duration: "4 years", type: "BS", creditHours: 130 },
          ],
        },
        {
          name: "School of Art, Design and Architecture (SADA)",
          programs: [
            { id: "nust-arch-bs", name: "BS Architecture", duration: "4 years", type: "BS", creditHours: 160 },
            { id: "nust-id-bs", name: "BS Industrial Design", duration: "4 years", type: "BS", creditHours: 130 },
          ],
        },
        {
          name: "Atta-ur-Rahman School of Applied Biosciences (ASAB)",
          programs: [
            { id: "nust-biotech-bs", name: "BS Biotechnology", duration: "4 years", type: "BS", creditHours: 130 },
            { id: "nust-plantbio-bs", name: "BS Plant Biotechnology", duration: "4 years", type: "BS", creditHours: 130 },
            { id: "nust-indbio-bs", name: "BS Industrial Biotechnology", duration: "4 years", type: "BS", creditHours: 130 },
          ],
        },
      ],
    },
  
    // ============================================
    // PU LAHORE
    // ============================================
    {
      id: "pu-lahore",
      name: "University of the Punjab",
      shortName: "PU Lahore",
      logo: "/logos/pu.png",
      location: "Quaid-i-Azam Campus, Lahore, Punjab",
      city: "Lahore",
      website: "https://www.pu.edu.pk",
      established: 1882,
      vcName: "Prof. Dr. Muhammad Ali",
      ranking: 1,
      qsRanking: "542",
      contact: {
        phone: "042-99231102",
        email: "registrar@pu.edu.pk",
      },
      fees: {
        admissionFee: 7500,
        semester: 30000,
        year: 37500,
        selfFinanceSemester: 70000,
      },
      overview:
        "Established in 1882, the University of the Punjab is Pakistan's oldest and largest university with over 45,000 on-campus students. Ranked #542 globally (QS 2026) and #1 in Pakistan for employment outcomes, PU offers 220+ undergraduate programs across 13 faculties and 64 departments, with 658 affiliated colleges.",
      admissionRequirements: {
        criteria: [
          "Minimum 55% marks in FA/FSc/A-Level or equivalent",
          "Must appear in PU Entry Test relevant to your discipline",
          "Aggregate: 75% academic merit (Matric + Inter) + 25% PU Entry Test",
          "ECAT/NET accepted for Engineering programs per PEC regulations",
          "LAT mandatory for LLB programs",
          "MDCAT valid for Pharm-D admission",
        ],
        tests: [
          { name: "PU-E", minScore: 40, totalScore: 100, subjects: ["Pre-Engineering discipline"] },
          { name: "PU-M", minScore: 40, totalScore: 100, subjects: ["Pre-Medical discipline"] },
          { name: "PU-AHS", minScore: 40, totalScore: 100, subjects: ["Arts, Humanities and Social Sciences"] },
          { name: "PU-CSP", minScore: 40, totalScore: 100, subjects: ["ICS with Physics"] },
          { name: "PU-COM", minScore: 40, totalScore: 100, subjects: ["Commerce"] },
        ],
      },
      scholarships: [
        { name: "PU Need-Based Scholarship", concession: "Partial to full tuition waiver" },
        { name: "PU Merit Scholarship", concession: "For students with GPA 3.5+/4.0" },
        { name: "HEC Need-Based Scholarship", concession: "PKR 46,000 per semester" },
        { name: "Punjab Educational Endowment Fund (PEEF)", concession: "PKR 35,000 per year" },
        { name: "Ehsaas Undergraduate Scholarship", concession: "PKR 70,000 per year" },
        { name: "Rehmatul-Lil-Alameen Scholarship", concession: "Through HED Punjab" },
        { name: "BISE Merit-Based Scholarship", concession: "For top BISE position holders" },
        { name: "Sports Scholarship", concession: "For outstanding athletes" },
        { name: "Hafiz-e-Quran Scholarship", concession: "Additional marks and financial incentive" },
      ],
      facilities: [
        { name: "Punjab University Library", description: "One of Pakistan's largest libraries with 500,000+ books in 9 languages, 102,000 sq. ft. two-story building" },
        { name: "Student Hostels", description: "28 hostels — 17 for male and 11 for female students" },
        { name: "Sports Complex", description: "Cricket, hockey, football, athletics, swimming pool, squash courts, and indoor games" },
        { name: "Fiber Optic Network", description: "47 km fiber optic cable with 74 nodes serving all departments and hostels" },
        { name: "Research Centers", description: "19 research centers and institutes across disciplines" },
        { name: "University Transport", description: "Dedicated bus routes connecting both campuses and the city" },
        { name: "Health Center", description: "On-campus university clinic for students and staff" },
        { name: "Mosque", description: "On-campus mosque" },
        { name: "Cafeteria", description: "Dining facilities across both campuses" },
        { name: "Printing Press", description: "University printing press for academic publications" },
      ],
      societies: [
        "PU Debating Society",
        "PU Literary Society",
        "PU Drama Society",
        "PU Sports Clubs (Cricket, Football, Hockey)",
        "PU Nature Club",
        "IEEE Student Chapter (PUCIT)",
        "PU Science Society",
        "PU Law Students Society",
        "PU Arts and Cultural Club",
      ],
      subCampuses: [
        {
          name: "Quaid-i-Azam Campus (New Campus)",
          location: "Lahore (1,800 acres)",
          image: "/campuses/pu-main.jpg",
          focus: "Main academic and administrative campus",
        },
        {
          name: "Allama Iqbal Campus (Old Campus)",
          location: "Central Lahore",
          image: "/campuses/pu-old.jpg",
          focus: "Senate Hall and administrative functions",
        },
        {
          name: "Gujranwala Campus",
          location: "Gujranwala, Punjab",
          image: "/campuses/pu-guj.jpg",
          focus: "Commerce, Economics, Law, Banking & Finance, IT",
        },
        {
          name: "Jhelum Campus",
          location: "Jhelum, Punjab",
          image: "/campuses/pu-jhelum.jpg",
          focus: "Business Administration, Commerce, Law, IT",
        },
        {
          name: "Khanspur Summer Campus",
          location: "Ayubia, Himalayan range (7,000 ft)",
          image: "/campuses/pu-khanspur.jpg",
          focus: "Research and recreation",
        },
      ],
      departments: [
        {
          name: "Faculty of Engineering and Technology (PUCIT)",
          programs: [
            { id: "pu-cs-bs", name: "BS Computer Science", duration: "4 years", type: "BS", creditHours: 130 },
            { id: "pu-it-bs", name: "BS Information Technology", duration: "4 years", type: "BS", creditHours: 130 },
            { id: "pu-se-bs", name: "BS Software Engineering", duration: "4 years", type: "BS", creditHours: 130 },
            { id: "pu-ee-bs", name: "BSc Electrical Engineering", duration: "4 years", type: "BS", creditHours: 136 },
            { id: "pu-civil-bs", name: "BSc Civil Engineering", duration: "4 years", type: "BS", creditHours: 136 },
            { id: "pu-chem-bs", name: "BSc Chemical Engineering", duration: "4 years", type: "BS", creditHours: 136 },
            { id: "pu-energy-bs", name: "BSc Energy Engineering", duration: "4 years", type: "BS", creditHours: 136 },
            { id: "pu-cs-ms", name: "MS Computer Science", duration: "2 years", type: "MS", creditHours: 30 },
            { id: "pu-cs-phd", name: "PhD Computer Science", duration: "3-5 years", type: "PhD", creditHours: null },
          ],
        },
        {
          name: "Faculty of Commerce, Economics and Management Sciences",
          programs: [
            { id: "pu-bba-bs", name: "BBA", duration: "4 years", type: "BS", creditHours: 130 },
            { id: "pu-com-bs", name: "BS Commerce", duration: "4 years", type: "BS", creditHours: 130 },
            { id: "pu-eco-bs", name: "BS Economics", duration: "4 years", type: "BS", creditHours: 130 },
            { id: "pu-af-bs", name: "BS Accounting and Finance", duration: "4 years", type: "BS", creditHours: 130 },
            { id: "pu-mba", name: "MBA", duration: "2 years", type: "MS", creditHours: 60 },
            { id: "pu-eco-phd", name: "PhD Economics", duration: "3-5 years", type: "PhD", creditHours: null },
          ],
        },
        {
          name: "Faculty of Science",
          programs: [
            { id: "pu-math-bs", name: "BS Mathematics", duration: "4 years", type: "BS", creditHours: 130 },
            { id: "pu-phy-bs", name: "BS Physics", duration: "4 years", type: "BS", creditHours: 130 },
            { id: "pu-chem-sci-bs", name: "BS Chemistry", duration: "4 years", type: "BS", creditHours: 130 },
            { id: "pu-stat-bs", name: "BS Statistics", duration: "4 years", type: "BS", creditHours: 130 },
            { id: "pu-geo-bs", name: "BS Geography", duration: "4 years", type: "BS", creditHours: 130 },
            { id: "pu-math-phd", name: "PhD Mathematics", duration: "3-5 years", type: "PhD", creditHours: null },
          ],
        },
        {
          name: "Faculty of Arts and Humanities",
          programs: [
            { id: "pu-eng-bs", name: "BS English Language and Literature", duration: "4 years", type: "BS", creditHours: 130 },
            { id: "pu-urdu-bs", name: "BS Urdu", duration: "4 years", type: "BS", creditHours: 130 },
            { id: "pu-hist-bs", name: "BS History", duration: "4 years", type: "BS", creditHours: 130 },
            { id: "pu-phil-bs", name: "BS Philosophy", duration: "4 years", type: "BS", creditHours: 130 },
            { id: "pu-fa-bs", name: "BS Fine Arts", duration: "4 years", type: "BS", creditHours: 130 },
          ],
        },
        {
          name: "Faculty of Behavioral and Social Sciences",
          programs: [
            { id: "pu-psy-bs", name: "BS Psychology", duration: "4 years", type: "BS", creditHours: 130 },
            { id: "pu-soc-bs", name: "BS Sociology", duration: "4 years", type: "BS", creditHours: 130 },
            { id: "pu-sw-bs", name: "BS Social Work", duration: "4 years", type: "BS", creditHours: 130 },
            { id: "pu-anth-bs", name: "BS Anthropology", duration: "4 years", type: "BS", creditHours: 130 },
          ],
        },
        {
          name: "Faculty of Pharmacy",
          programs: [
            { id: "pu-pharmd", name: "Pharm-D", duration: "5 years", type: "BS", creditHours: 178 },
            { id: "pu-pharmd-ms", name: "MPhil Pharmacy", duration: "2 years", type: "MS", creditHours: 30 },
            { id: "pu-pharmd-phd", name: "PhD Pharmacy", duration: "3-5 years", type: "PhD", creditHours: null },
          ],
        },
        {
          name: "Faculty of Law",
          programs: [
            { id: "pu-llb", name: "LLB (5-Year Integrated)", duration: "5 years", type: "BS", creditHours: 160 },
            { id: "pu-llm", name: "LLM", duration: "1 year", type: "MS", creditHours: 30 },
          ],
        },
        {
          name: "Faculty of Life Sciences",
          programs: [
            { id: "pu-zoo-bs", name: "BS Zoology", duration: "4 years", type: "BS", creditHours: 130 },
            { id: "pu-bot-bs", name: "BS Botany", duration: "4 years", type: "BS", creditHours: 130 },
            { id: "pu-bio-bs", name: "BS Biochemistry", duration: "4 years", type: "BS", creditHours: 130 },
            { id: "pu-envs-bs", name: "BS Environmental Science", duration: "4 years", type: "BS", creditHours: 130 },
            { id: "pu-micro-bs", name: "BS Microbiology", duration: "4 years", type: "BS", creditHours: 130 },
          ],
        },
      ],
    },
  ];
  
  // ============================================
  // PROGRAMS (flattened for explore page)
  // ============================================
  
  export const programs = universities.flatMap((uni) =>
    uni.departments.flatMap((dept) =>
      dept.programs.map((prog) => ({
        ...prog,
        universityId: uni.id,
        universityName: uni.shortName,
        universityLogo: uni.logo,
        location: uni.city,
        fee: uni.fees.semester,
        ranking: uni.ranking,
      }))
    )
  );
  
  // ============================================
  // MENTORS
  // ============================================
  
  export const mentors = [
    {
      id: "mentor-001",
      email: "mentor@oneuni.com",
      user: {
        fullName: "Ahmad Raza Khan",
        profilePictureUrl: "/avatars/mentor1.jpg",
      },
      designation: "Senior Software Engineer",
      currentInstitution: "Systems Limited, Lahore",
      specializations: ["Computer Science", "Web Development", "MERN Stack", "Career Guidance"],
      bio: "7+ years in full-stack development. Graduate of UET Lahore (CS 2017). Helped 80+ students with university selection, entry test prep, and tech career roadmaps. Specializing in guiding FSc students into top CS programs.",
      hourlyRate: 2500,
      averageRating: 4.8,
      totalSessions: 134,
      availability: [
        { day: "Monday", slots: ["6:00 PM", "7:00 PM", "8:00 PM"] },
        { day: "Wednesday", slots: ["6:00 PM", "7:00 PM"] },
        { day: "Saturday", slots: ["10:00 AM", "11:00 AM", "12:00 PM", "2:00 PM"] },
      ],
    },
    {
      id: "mentor-002",
      email: "sara.malik@oneuni.com",
      user: {
        fullName: "Sara Malik",
        profilePictureUrl: "/avatars/mentor2.jpg",
      },
      designation: "Assistant Professor",
      currentInstitution: "NUST Islamabad (SEECS)",
      specializations: ["Electrical Engineering", "Data Science", "AI", "Research Guidance"],
      bio: "PhD in Electrical Engineering from NUST. Currently teaching at SEECS. Passionate about helping O/A-Level and FSc students transition into NUST's competitive programs. NET exam expert with 5+ years of mentoring experience.",
      hourlyRate: 3000,
      averageRating: 4.9,
      totalSessions: 98,
      availability: [
        { day: "Tuesday", slots: ["5:00 PM", "6:00 PM", "7:00 PM"] },
        { day: "Thursday", slots: ["5:00 PM", "6:00 PM"] },
        { day: "Sunday", slots: ["11:00 AM", "12:00 PM", "3:00 PM"] },
      ],
    },
    {
      id: "mentor-003",
      email: "usman.tariq@oneuni.com",
      user: {
        fullName: "Usman Tariq",
        profilePictureUrl: "/avatars/mentor3.jpg",
      },
      designation: "Education Consultant",
      currentInstitution: "EduBridge Pakistan, Lahore",
      specializations: ["University Admissions", "Scholarship Applications", "Business Programs", "PU/Punjab University"],
      bio: "Former admissions officer at PU Lahore with 10 years of experience. Has guided 300+ students through university applications, scholarship forms, and program selection. Specialist in PU, LUMS, and IBA admissions.",
      hourlyRate: 2000,
      averageRating: 4.7,
      totalSessions: 212,
      availability: [
        { day: "Monday", slots: ["4:00 PM", "5:00 PM", "6:00 PM"] },
        { day: "Wednesday", slots: ["4:00 PM", "5:00 PM", "6:00 PM"] },
        { day: "Friday", slots: ["2:00 PM", "3:00 PM", "4:00 PM"] },
      ],
    },
  ];
  
  // ============================================
  // STUDENTS
  // ============================================
  
  export const students = [
    {
      id: "student-001",
      email: "student@oneuni.com",
      fullName: "Ali Hassan",
      fatherName: "Hassan Mahmood",
      cnic: "35201-1234567-1",
      dateOfBirth: "2005-03-14",
      gender: "Male",
      phone: "0300-1234567",
      studentId: "ONU-2024-001",
      profilePictureUrl: "/avatars/student1.jpg",
      applicationStatus: "In Progress",
      completionPercentage: 72,
      interestedCity: "Lahore",
      interests: ["Computer Science", "Artificial Intelligence", "Web Development"],
      shift: "Morning",
      hasDisability: false,
      isHafiz: false,
      sportsQuota: false,
      isOrphan: false,
      needsHostel: true,
      guardianRelation: "Father",
      guardianName: "Hassan Mahmood",
      guardianPhone: "0301-7654321",
      guardianCNIC: "35201-7654321-1",
      permanentAddress: "House 12, Street 4, Gulberg III",
      city: "Lahore",
      annualIncome: 800000,
      educations: [
        { type: "Matric", institute: "Lahore Grammar School", board: "BISE Lahore", year: 2022, marks: 1050, totalMarks: 1100 },
        { type: "Intermediate", institute: "Punjab College Lahore", board: "BISE Lahore", year: 2024, marks: 970, totalMarks: 1100 },
      ],
      entranceTests: [
        { name: "ECAT", score: 320, total: 400, date: "2024-08-15" },
        { name: "NET", score: 162, total: 200, date: "2024-07-20" },
      ],
    },
    {
      id: "student-002",
      email: "fatima.zahra@oneuni.com",
      fullName: "Fatima Zahra",
      fatherName: "Zahra Hussain",
      cnic: "35202-9876543-2",
      dateOfBirth: "2005-07-22",
      gender: "Female",
      phone: "0311-9876543",
      studentId: "ONU-2024-002",
      profilePictureUrl: "/avatars/student2.jpg",
      applicationStatus: "Submitted",
      completionPercentage: 95,
      interestedCity: "Islamabad",
      interests: ["Electrical Engineering", "Data Science", "Research"],
      shift: "Morning",
      hasDisability: false,
      isHafiz: false,
      sportsQuota: false,
      isOrphan: false,
      needsHostel: true,
      guardianRelation: "Father",
      guardianName: "Hussain Ahmed",
      guardianPhone: "0333-1112222",
      guardianCNIC: "35202-1112222-3",
      permanentAddress: "House 5, Block C, Model Town",
      city: "Lahore",
      annualIncome: 1200000,
      educations: [
        { type: "Matric", institute: "Beaconhouse School System", board: "BISE Lahore", year: 2022, marks: 1080, totalMarks: 1100 },
        { type: "Intermediate", institute: "Kinnaird College", board: "BISE Lahore", year: 2024, marks: 1020, totalMarks: 1100 },
      ],
      entranceTests: [
        { name: "NET", score: 178, total: 200, date: "2024-07-20" },
      ],
    },
  ];
  
  // ============================================
  // SESSIONS
  // ============================================
  
  export const sessions = [
    {
      sessionId: "sess-001",
      status: "scheduled",
      topic: "ECAT Preparation Strategy and UET Program Selection",
      scheduledAt: "2025-05-15T18:00:00",
      durationMinutes: 60,
      sessionType: "video",
      feeAmount: 2500,
      student: { id: "student-001", fullName: "Ali Hassan", profilePictureUrl: "/avatars/student1.jpg", university: "UET Lahore (Applied)", major: "CS" },
      mentor: { id: "mentor-001", fullName: "Ahmad Raza Khan", profilePictureUrl: "/avatars/mentor1.jpg" },
    },
    {
      sessionId: "sess-002",
      status: "completed",
      topic: "NET Exam Tips and NUST SEECS Overview",
      scheduledAt: "2025-05-08T17:00:00",
      durationMinutes: 60,
      sessionType: "video",
      feeAmount: 3000,
      student: { id: "student-002", fullName: "Fatima Zahra", profilePictureUrl: "/avatars/student2.jpg", university: "NUST (Applied)", major: "EE" },
      mentor: { id: "mentor-002", fullName: "Sara Malik", profilePictureUrl: "/avatars/mentor2.jpg" },
    },
    {
      sessionId: "sess-003",
      status: "completed",
      topic: "PU Scholarship Applications and Program Comparison",
      scheduledAt: "2025-05-01T16:00:00",
      durationMinutes: 45,
      sessionType: "video",
      feeAmount: 2000,
      student: { id: "student-001", fullName: "Ali Hassan", profilePictureUrl: "/avatars/student1.jpg", university: "PU Lahore (Considering)", major: "CS" },
      mentor: { id: "mentor-003", fullName: "Usman Tariq", profilePictureUrl: "/avatars/mentor3.jpg" },
    },
    {
      sessionId: "sess-004",
      status: "scheduled",
      topic: "University Comparison: UET vs NUST for CS",
      scheduledAt: "2025-05-18T19:00:00",
      durationMinutes: 60,
      sessionType: "video",
      feeAmount: 2500,
      student: { id: "student-002", fullName: "Fatima Zahra", profilePictureUrl: "/avatars/student2.jpg", university: "NUST (Applied)", major: "EE" },
      mentor: { id: "mentor-001", fullName: "Ahmad Raza Khan", profilePictureUrl: "/avatars/mentor1.jpg" },
    },
  ];
  
  // ============================================
  // REVIEWS
  // ============================================
  
  export const reviews = [
    {
      id: "rev-001",
      rating: 5,
      comment: "Ahmad bhai is amazing! He gave me a complete breakdown of UET CS vs FAST CS and helped me finalize my ECAT preparation plan. Highly recommend.",
      date: "2025-05-09",
      sessionTopic: "ECAT Preparation Strategy and UET Program Selection",
      student: { name: "Ali Hassan", avatar: "/avatars/student1.jpg", university: "UET Lahore (Applied)" },
    },
    {
      id: "rev-002",
      rating: 5,
      comment: "Sara ma'am explained the NUST NET pattern in detail and helped me understand which school to apply to. My NET score improved by 18 marks after her guidance.",
      date: "2025-05-08",
      sessionTopic: "NET Exam Tips and NUST SEECS Overview",
      student: { name: "Fatima Zahra", avatar: "/avatars/student2.jpg", university: "NUST (Applied)" },
    },
    {
      id: "rev-003",
      rating: 4,
      comment: "Usman sahab helped me fill out the PU scholarship form and explained the PEEF process. Very experienced and patient. Would definitely book again.",
      date: "2025-05-01",
      sessionTopic: "PU Scholarship Applications and Program Comparison",
      student: { name: "Ali Hassan", avatar: "/avatars/student1.jpg", university: "PU Lahore (Considering)" },
    },
  ];
  
  // ============================================
  // MESSAGES / CONVERSATIONS
  // ============================================
  
  export const conversations = [
    {
      id: "conv-001",
      lastMessage: "See you in the session tomorrow at 6 PM!",
      timestamp: "2025-05-14T20:30:00",
      unreadCount: 1,
      student: { id: "student-001", name: "Ali Hassan", avatar: "/avatars/student1.jpg", university: "UET Lahore (Applied)", major: "CS", status: "active" },
      messages: [
        { id: "msg-001", sender: "student", text: "Assalamu alaikum! I wanted to confirm our session tomorrow.", timestamp: "2025-05-14T20:00:00" },
        { id: "msg-002", sender: "mentor", text: "Wa alaikum assalam! Yes confirmed, 6 PM sharp.", timestamp: "2025-05-14T20:15:00" },
        { id: "msg-003", sender: "student", text: "JazakAllah! Should I prepare any specific topics?", timestamp: "2025-05-14T20:20:00" },
        { id: "msg-004", sender: "mentor", text: "Yes, review your ECAT mock test results and note your weak areas. See you in the session tomorrow at 6 PM!", timestamp: "2025-05-14T20:30:00" },
      ],
    },
    {
      id: "conv-002",
      lastMessage: "Your aggregate calculation looks strong for NUST SEECS.",
      timestamp: "2025-05-09T18:45:00",
      unreadCount: 0,
      student: { id: "student-002", name: "Fatima Zahra", avatar: "/avatars/student2.jpg", university: "NUST (Applied)", major: "EE", status: "active" },
      messages: [
        { id: "msg-005", sender: "student", text: "Ma'am can you check my aggregate? Matric: 98%, Inter: 92.7%, NET: 178/200", timestamp: "2025-05-09T18:00:00" },
        { id: "msg-006", sender: "mentor", text: "Let me calculate. NET 75% + FSc 25% = (178/200)*75 + (92.7)*0.25 = 66.75 + 23.17 = 89.92. That is excellent!", timestamp: "2025-05-09T18:30:00" },
        { id: "msg-007", sender: "student", text: "Is that enough for SEECS EE?", timestamp: "2025-05-09T18:40:00" },
        { id: "msg-008", sender: "mentor", text: "Your aggregate calculation looks strong for NUST SEECS. Last year's closing merit was around 87. You are well above that.", timestamp: "2025-05-09T18:45:00" },
      ],
    },
  ];
  
  // ============================================
  // EARNINGS
  // ============================================
  
  export const earnings = {
    earningsThisMonth: 42500,
    transactions: [
      { id: "txn-001", type: "Session Payment", student: "Ali Hassan", amount: 2500, date: "2025-05-08", status: "completed", method: "JazzCash" },
      { id: "txn-002", type: "Session Payment", student: "Fatima Zahra", amount: 3000, date: "2025-05-08", status: "completed", method: "EasyPaisa" },
      { id: "txn-003", type: "Session Payment", student: "Ali Hassan", amount: 2000, date: "2025-05-01", status: "completed", method: "Bank Transfer" },
      { id: "txn-004", type: "Session Payment", student: "Fatima Zahra", amount: 3000, date: "2025-04-28", status: "completed", method: "JazzCash" },
      { id: "txn-005", type: "Withdrawal", student: "-", amount: -15000, date: "2025-04-30", status: "completed", method: "Bank Transfer" },
      { id: "txn-006", type: "Session Payment", student: "Ali Hassan", amount: 2500, date: "2025-04-20", status: "completed", method: "EasyPaisa" },
    ],
  };
  
  // ============================================
  // APPLICATIONS
  // ============================================
  
  export const applications = [
    {
      id: "app-001",
      university: "UET Lahore",
      program: "BS Computer Science",
      status: "In Process",
      lastUpdated: "2025-05-10",
      universityImage: "/logos/uet.png",
    },
    {
      id: "app-002",
      university: "NUST Islamabad",
      program: "BS Computer Science",
      status: "Submitted",
      lastUpdated: "2025-05-07",
      universityImage: "/logos/nust.png",
    },
    {
      id: "app-003",
      university: "University of the Punjab",
      program: "BS Computer Science (PUCIT)",
      status: "Draft",
      lastUpdated: "2025-05-03",
      universityImage: "/logos/pu.png",
    },
  ];
  
  // ============================================
  // MENTOR DASHBOARD STATS
  // ============================================
  
  export const mentorStats = [
    { label: "Total Earnings", value: "PKR 42,500", icon: "wallet", color: "green" },
    { label: "Sessions This Month", value: "14", icon: "calendar", color: "blue" },
    { label: "Active Students", value: "2", icon: "users", color: "purple" },
    { label: "Average Rating", value: "4.8 / 5", icon: "star", color: "yellow" },
  ];
  
  // ============================================
  // STUDENT DASHBOARD STATS
  // ============================================
  
  export const studentStats = [
    { label: "Applications Sent", value: "3", icon: "file", color: "blue" },
    { label: "Sessions Booked", value: "3", icon: "calendar", color: "purple" },
    { label: "Universities Saved", value: "3", icon: "bookmark", color: "green" },
    { label: "Profile Completion", value: "72%", icon: "user", color: "orange" },
  ];