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

export type TeamMember = {
  slug: string;
  name: string;
  title: string;
  jobTitle: string;
  portrait: string;
  portraitAlt: string;
  shortBio?: string;
  homepageSummary?: string;
  profilePath?: string;
  sortOrder: number;
};

export type DetailedTeamMember = TeamMember & {
  location: string;
  professionalIdentity: readonly string[];
  experienceSummary: string;
  education: TeamEducation;
  experience: readonly TeamExperience[];
  community: {
    organization: string;
    since: string;
    activities: readonly string[];
  };
  socialLinks: readonly { label: string; href: string }[];
};

export const minaDemian: DetailedTeamMember = {
    slug: "mina-demian",
    name: "Mina Demian",
    title: "Principal, Demian Insurance Agency",
    jobTitle: "Principal",
    location: "Southwest Florida",
    portrait: "/team/mina-demian.jpg",
    portraitAlt: "Mina Demian, Principal of Demian Insurance Agency",
    shortBio:
      "Mina brings more than a decade of experience across insurance, financial services, employee benefits, banking, and client advisory work to a personal approach grounded in clear guidance.",
    homepageSummary:
      "A husband, father, and Florida-licensed insurance professional, Mina brings more than a decade of experience across insurance, financial services, employee benefits, banking, and client advisory work.",
    profilePath: "/about/mina-demian",
    sortOrder: 1,
    professionalIdentity: ["Father", "Husband", "Employee Benefits Strategist"],
    experienceSummary:
      "12+ years across insurance, financial services, employee benefits, and client advisory work",
    education: {
      institution: "San Diego State University",
      degree: "B.S. Business Administration & Management",
    },
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
        role: "Principal",
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
};

export const mattAlexander: TeamMember = {
  slug: "matt-alexander",
  name: "Matt Alexander",
  title: "Licensed Insurance Professional",
  jobTitle: "Licensed Insurance Professional",
  portrait: "/images/team/matt-alexander.jpg",
  portraitAlt: "Matt Alexander of Demian Insurance Agency",
  sortOrder: 2,
};

export const teamMembers: readonly TeamMember[] = [minaDemian, mattAlexander].sort((a, b) => a.sortOrder - b.sortOrder);
