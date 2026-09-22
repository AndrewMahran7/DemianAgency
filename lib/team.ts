export type TeamExperience = {
  organization: string;
  role: string;
  period: string;
  focus: readonly string[];
};

export type TeamEducation = {
  institution: string;
  degree: string;
};

export type TeamLicense = {
  authority: string;
  name: string;
  issued: string;
  expires: string;
};

export type TeamMember = {
  slug: string;
  name: string;
  credentials: readonly string[];
  title: string;
  location: string;
  portrait: string;
  portraitAlt: string;
  professionalIdentity: readonly string[];
  experienceSummary: string;
  education: TeamEducation;
  licenses: readonly TeamLicense[];
  experience: readonly TeamExperience[];
  community: {
    organization: string;
    since: string;
    activities: readonly string[];
  };
  socialLinks: readonly { label: string; href: string }[];
};

export const teamMembers: readonly TeamMember[] = [
  {
    slug: "mina-demian",
    name: "Mina Demian",
    credentials: [],
    title: "Founder, Demian Insurance Agency",
    location: "Southwest Florida",
    portrait: "/team/mina-demian.jpg",
    portraitAlt: "Mina Demian, Founder of Demian Insurance Agency",
    professionalIdentity: ["Father", "Husband", "Employee Benefits Strategist"],
    experienceSummary:
      "12+ years across insurance, financial services, employee benefits, and client advisory work",
    education: {
      institution: "San Diego State University",
      degree: "B.S. Business Administration & Management",
    },
    licenses: [
      {
        authority: "Florida Department of Financial Services",
        name: "Life & Health",
        issued: "March 2026",
        expires: "March 2028",
      },
      {
        authority: "Florida Department of Financial Services",
        name: "Property & Casualty",
        issued: "March 2026",
        expires: "March 2028",
      },
    ],
    experience: [
      {
        organization: "Aflac",
        role: "Market Asset Analyst",
        period: "2014–2016",
        focus: ["Employee benefits design", "Client relations"],
      },
      {
        organization: "Bank of America",
        role: "Small Business Consultant",
        period: "2017–2022",
        focus: ["Small-business consulting", "Client relations", "Customer retention"],
      },
      {
        organization: "Colonial Life",
        role: "Territory Sales Trainer",
        period: "2022–2024",
        focus: ["Employee benefits design", "Sales presentations"],
      },
      {
        organization: "USI Insurance Services",
        role: "Employee Benefits Consultant",
        period: "2024–2025",
        focus: ["Employee benefit plan design", "Sales presentations"],
      },
      {
        organization: "Morris & Garritano",
        role: "Employee Benefits Advisor",
        period: "2025–2026",
        focus: ["Employee benefit plan design", "Sales presentations"],
      },
      {
        organization: "Demian Insurance Agency",
        role: "Founder",
        period: "Today",
        focus: ["Personal guidance", "Home, auto, life & business insurance"],
      },
    ],
    community: {
      organization: "The Compton Initiative",
      since: "February 2015",
      activities: [
        "Painting homes",
        "Painting schools and churches",
        "Creating inspirational murals",
        "Neighborhood cleanups",
      ],
    },
    socialLinks: [],
  },
] as const;

export const minaDemian = teamMembers[0];
