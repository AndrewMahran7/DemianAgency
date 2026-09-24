export type InsuranceLineKey = "auto" | "home" | "life" | "business";

export type InsuranceLineSummary = {
  key: InsuranceLineKey;
  name: string;
  href: string;
  audience: string;
  summary: string;
  quoteLabel: string;
  imageSrc: string;
  imageAlt: string;
  faqs: readonly { question: string; answer: string }[];
};

export const insuranceLines: Record<InsuranceLineKey, InsuranceLineSummary> = {
  auto: {
    key: "auto",
    name: "Auto Insurance",
    href: "/insurance/auto",
    audience: "Drivers, households, and specialty vehicle owners",
    summary: "Coverage shaped around the vehicles, drivers, and routines that keep a household moving.",
    quoteLabel: "Request an Auto Quote",
    imageSrc: "/images/insurance/auto/family-road-trip.jpg",
    imageAlt: "Family beside their car during a road trip",
    // TODO: Add approved FAQs for this insurance line.
    faqs: [],
  },
  home: {
    key: "home",
    name: "Home Insurance",
    href: "/insurance/home",
    audience: "Homeowners, condo owners, renters, and property investors",
    summary: "Florida-focused guidance with access to multiple carriers for eligible home-insurance needs.",
    quoteLabel: "Request a Home Quote",
    imageSrc: "/images/insurance/home/key-west-home.jpg",
    imageAlt: "Florida home with palm trees in Key West",
    // TODO: Add approved FAQs for this insurance line.
    faqs: [],
  },
  life: {
    key: "life",
    name: "Life Insurance",
    href: "/insurance/life",
    audience: "Families, individuals, and business owners",
    summary: "A thoughtful conversation about the people, responsibilities, and plans that depend on you.",
    quoteLabel: "Request a Life Insurance Quote",
    imageSrc: "/images/insurance/life/family-at-home.jpg",
    imageAlt: "Family spending time together at home",
    // TODO: Add approved FAQs for this insurance line.
    faqs: [],
  },
  business: {
    key: "business",
    name: "Business Insurance",
    href: "/insurance/business",
    audience: "Small-business owners across a range of industries",
    summary: "A whole-business view of property, people, vehicles, customer contact, and changing exposures.",
    quoteLabel: "Request a Business Insurance Quote",
    imageSrc: "/images/insurance/business/coffee-shop-owners.jpg",
    imageAlt: "Two small-business owners behind a coffee shop counter",
    // TODO: Add approved FAQs for this insurance line.
    faqs: [],
  },
};

export const autoInsurance = {
  ...insuranceLines.auto,
  coverageOptions: [
    "Liability", "Collision", "Comprehensive", "Uninsured / underinsured motorist",
    "Roadside assistance", "Rental reimbursement", "Umbrella",
  ],
  vehicleTypes: ["Personal vehicles", "Motorcycles", "Classic cars", "RVs", "Boats", "Special-risk auto"],
  discountExamples: ["Bundling", "Safe-driver", "Good-student"],
} as const;

export const homeInsurance = {
  ...insuranceLines.home,
  categories: [
    "Homeowners", "Condo", "Renters", "Landlord / rental property", "Flood",
    "Wind / hurricane", "Umbrella", "High-value homes", "Secondary & vacation homes",
  ],
  considerations: ["Hurricanes", "Flooding", "Wind", "Roof age", "Water damage", "Liability", "Replacement cost"],
  coverageSections: [
    {
      label: "Section I — Property coverages",
      coverages: [
        { code: "A", name: "Dwelling", description: "Pays to repair or rebuild the physical structure of your house and attached items like a garage or deck." },
        { code: "B", name: "Other Structures", description: "Pays to repair or replace detached structures on your property, such as a shed, fence, or guest house." },
        { code: "C", name: "Personal Property", description: "Covers your personal belongings like furniture, clothes, and electronics if they are damaged or stolen." },
        { code: "D", name: "Loss of Use", description: "Pays for temporary housing and extra food costs if a covered disaster makes your home unsafe to live in." },
      ],
    },
    {
      label: "Section II — Liability coverages",
      coverages: [
        { code: "E", name: "Personal Liability", description: "Protects your savings if you are legally responsible for someone else's injury or property damage. It helps pay for legal defense and court costs." },
        { code: "F", name: "Medical Payments to Others", description: "Pays minor medical bills if a guest gets hurt on your property, regardless of who is at fault." },
      ],
    },
  ],
} as const;

export const lifeInsurance = {
  ...insuranceLines.life,
  products: ["Term life", "Whole life", "Universal life", "Final expense", "Key-person / business life"],
  needs: ["Income replacement", "Mortgage protection", "Education costs", "Debts", "Estate needs", "Business succession"],
} as const;

export const businessInsurance = {
  ...insuranceLines.business,
  products: [
    {
      name: "General Liability Insurance",
      points: [
        "Protects against third-party claims.",
        "Covers bodily injury and property damage.",
        "Pays for legal fees and medical expenses.",
      ],
    },
    {
      name: "Commercial Property Insurance",
      points: [
        "Covers your physical location.",
        "Protects buildings, equipment, and inventory.",
        "Replaces items lost to fire, theft, or wind.",
      ],
    },
    {
      name: "Workers' Compensation Insurance",
      points: [
        "Mandatory in most states if you have employees.",
        "Covers employee medical care for job injuries.",
        "Replaces a portion of lost wages.",
      ],
    },
    {
      name: "Commercial Auto Insurance",
      points: [
        "Covers vehicles owned or leased by the company.",
        "Pays for accidents during work-related driving.",
        "Excludes personal auto policy gaps.",
      ],
    },
    {
      name: "Professional Liability Insurance",
      points: [
        "Also called Errors and Omissions (E&O).",
        "Protects service providers and consultants.",
        "Covers claims of mistakes, negligence, or missed deadlines.",
      ],
    },
    {
      name: "Cyber Liability Insurance",
      points: [
        "Safeguards against data breaches and hacks.",
        "Covers customer notification and legal costs.",
        "Assists with ransomware recovery expenses.",
      ],
    },
  ],
  bundles: [
    {
      name: "Business Owner's Policy (BOP)",
      points: [
        "Combines liability, property, and interruption.",
        "Offers discounted rates for small businesses.",
        "Simplifies policy management.",
      ],
    },
    {
      name: "Commercial Umbrella Policy",
      points: [
        "Extends limits of underlying liability policies.",
        "Steps in after major losses are exhausted.",
      ],
    },
  ],
  secondaryProducts: [
    {
      name: "Employment Practices Liability / EPLI",
      points: ["A secondary option that may address certain employment-related claims, subject to policy terms."],
    },
  ],
  industries: ["Contractors", "Restaurants", "Professional services", "Medical offices", "Real-estate businesses"],
  exposures: ["Operations", "Property", "Vehicles", "Employees", "Customer interaction", "Digital risks"],
} as const;
