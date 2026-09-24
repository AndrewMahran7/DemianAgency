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
        { code: "A", name: "Dwelling", description: "Generally relates to repairing or rebuilding the home and attached structures after a covered loss." },
        { code: "B", name: "Other Structures", description: "May apply to detached structures such as a shed, detached garage, fence, or guest structure." },
        { code: "C", name: "Personal Property", description: "Can cover belongings such as furniture, clothing, electronics, and other possessions after a covered cause of loss." },
        { code: "D", name: "Loss of Use", description: "Can help with qualifying additional living expenses when a covered loss makes the home temporarily uninhabitable." },
      ],
    },
    {
      label: "Section II — Liability coverages",
      coverages: [
        { code: "E", name: "Personal Liability", description: "May respond to certain claims when an insured is legally responsible for injury or property damage to others, including qualifying defense costs." },
        { code: "F", name: "Medical Payments to Others", description: "May help with certain minor medical expenses when a guest is injured on the property." },
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
    { name: "General Liability", description: "Can address certain third-party bodily injury, property damage, and qualifying defense-cost claims." },
    { name: "Commercial Property", description: "Can protect insured buildings, equipment, inventory, and other physical business property against covered causes of loss." },
    { name: "Workers’ Compensation", description: "Can provide benefits for qualifying work-related injuries or illnesses, potentially including medical care and portions of lost wages." },
    { name: "Commercial Auto", description: "For eligible owned, leased, or used business vehicles, with options for liability, physical damage, and other qualifying exposures." },
    { name: "Professional Liability / E&O", description: "May respond to certain claims involving professional mistakes, negligence allegations, or failures in professional services." },
    { name: "Cyber Liability", description: "May address certain costs from qualifying data breaches or cyber incidents, including notification, response, and recovery expenses." },
    { name: "Business Owner’s Policy / BOP", description: "Commonly packages general liability and commercial property, with additional protections depending on the policy." },
    { name: "Commercial Umbrella", description: "Can add liability limits over certain underlying policies after applicable underlying limits are exhausted." },
    { name: "Employment Practices Liability / EPLI", description: "A secondary option that may address certain employment-related claims, subject to policy terms.", secondary: true },
  ],
  industries: ["Contractors", "Restaurants", "Professional services", "Medical offices", "Real-estate businesses"],
  exposures: ["Operations", "Property", "Vehicles", "Employees", "Customer interaction", "Digital risks"],
} as const;
