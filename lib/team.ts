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

export const kingsleyBenecke: TeamMember = {
  slug: "kingsley-benecke",
  name: "Kingsley Benecke",
  title: "Customer Service Representative",
  jobTitle: "Customer Service Representative",
  portrait: "/team/kingsley-benecke.png",
  portraitAlt: "Kingsley Benecke, Customer Service Representative",
  shortBio:
    "Hi, I’m Kingsley, a Customer Service Representative with Allstate here in beautiful Sarasota, Florida.\n\nOriginally from South Africa, I made Sarasota my home in 2006 and have loved being a part of this vibrant Gulf Coast community ever since. For the past three years, I’ve had the privilege of helping local families and business owners protect what matters most to them. Whether you need help navigating your coverage options, updating a policy, or simply getting answers to your questions, I pride myself on providing friendly, clear, and dependable guidance every step of the way.\n\nOutside of work, you can usually find me enjoying everything Sarasota has to offer. I look forward to serving you and ensuring you always feel like you’re in good hands!",
  sortOrder: 3,
};

export const teamMembers: readonly TeamMember[] = [minaDemian, mattAlexander, kingsleyBenecke].sort((a, b) => a.sortOrder - b.sortOrder);
