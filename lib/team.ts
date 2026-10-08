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
  role: string;
  image: string;
  imageAlt: string;
  shortBio?: string;
  longBio?: readonly string[];
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
    role: "Principal",
    location: "Southwest Florida",
    image: "/team/mina-demian.jpg",
    imageAlt: "Mina Demian, Principal of Demian Insurance Agency",
    shortBio:
      "Mina brings more than a decade of experience across insurance, financial services, employee benefits, banking, and client advisory work to a personal approach grounded in clear guidance.",
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
  role: "Licensed Insurance Professional",
  image: "/images/team/matt-alexander.jpg",
  imageAlt: "Matt Alexander of Demian Insurance Agency",
  sortOrder: 2,
};

export const kingsleyBenecke: TeamMember = {
  slug: "kingsley-benecke",
  name: "Kingsley Benecke",
  role: "Licensed Sales Professional",
  image: "/team/kingsley-benecke.webp",
  imageAlt: "Kingsley Benecke, Licensed Sales Professional",
  shortBio:
    "Originally from South Africa, Kingsley has called Sarasota home since 2006. He brings three years of experience helping local families and business owners with friendly, clear, and dependable service.",
  longBio: [
    "Hi, I’m Kingsley, a Licensed Sales Professional here in beautiful Sarasota, Florida.",
    "Originally from South Africa, I made Sarasota my home in 2006 and have loved being a part of this vibrant Gulf Coast community ever since. For the past three years, I’ve had the privilege of helping local families and business owners protect what matters most to them. Whether you need help navigating your coverage options, updating a policy, or simply getting answers to your questions, I pride myself on providing friendly, clear, and dependable guidance every step of the way.",
    "Outside of work, you can usually find me enjoying everything Sarasota has to offer. I look forward to serving you and ensuring you always feel like you’re in good hands!",
  ],
  sortOrder: 3,
};

export const christianSantarelli: TeamMember = {
  slug: "christian-santarelli",
  name: "Christian Santarelli",
  role: "Licensed Property & Casualty and Life Insurance Professional",
  image: "/team/christian-santarelli.webp",
  imageAlt: "Christian Santarelli of Demian Insurance Agency",
  shortBio:
    "Christian takes a straightforward, relationship-focused approach to helping clients understand their coverage and make informed decisions that fit their individual needs.",
  longBio: [
    "Christian is a licensed Property & Casualty and Life Insurance professional with the Demian Agency, where he takes a straightforward, relationship-focused approach to helping clients protect what matters most.",
    "Christian believes insurance should be more than simply selecting limits and checking boxes. One of his main goals during every insurance review is to make sure his clients actually understand the coverage options they are choosing and how those coverages can help protect them, their loved ones, their property, and the property of others. He takes the time to explain coverage in everyday terms so clients can make informed decisions that fit their individual needs.",
    "Outside of insurance, Christian is heavily involved in the local pool community and serves as a division representative for one of his local leagues. He enjoys the competitive side of pool, as well as the friendships and sense of community that come with it. When he’s not around the pool table, you’ll often find him on the golf course or enjoying time outdoors and exploring nature.",
    "Christian brings that same combination of competition, community, and genuine personal connection into his work with clients. His goal is to build lasting relationships and be someone his clients can turn to when they have questions about their insurance—not just someone they hear from when it’s time to renew a policy.",
  ],
  sortOrder: 4,
};

export const miaWalker: TeamMember = {
  slug: "mia-walker",
  name: "Mia Walker",
  role: "Office Manager",
  image: "/team/mia-walker.png",
  imageAlt: "Mia Walker, Office Manager",
  shortBio:
    "Mia brings 17 years of insurance experience and a client-centered approach to creating thoughtful coverage solutions, simplifying complex topics, and building lasting relationships.",
  longBio: [
    "With a rich and rewarding 17-year career in the insurance industry, I am Mia Walker, a dedicated insurance professional passionate about safeguarding my clients and their valuable assets.",
    "Bringing extensive expertise to the table, I have served in various capacities within the insurance sector, specializing in crafting comprehensive coverage solutions that mitigate risks and provide peace of mind to my clients. My journey has allowed me to witness the ever-evolving landscape of insurance, adapting and growing alongside the industry.",
    "Throughout my career, I have received accolades for my dedication to client satisfaction and innovative approaches to insurance solutions. My ability to tailor coverage plans to meet the unique needs of each client has been a cornerstone of my success.",
    "One aspect of my professional journey that brings me immense joy is the opportunity to educate my clients. I believe in empowering them with knowledge, helping them make informed decisions about their coverage. I aim to demystify insurance complexities, making the process more transparent and accessible.",
    "My passion lies in not just selling insurance but in building lasting relationships and being a trusted advisor to my clients. I am committed to creating a positive impact on their lives by ensuring they are well-protected and informed in an ever-changing world.",
  ],
  sortOrder: 5,
};

export const teamMembers: readonly TeamMember[] = [
  minaDemian,
  mattAlexander,
  kingsleyBenecke,
  christianSantarelli,
  miaWalker,
].sort((a, b) => a.sortOrder - b.sortOrder);
