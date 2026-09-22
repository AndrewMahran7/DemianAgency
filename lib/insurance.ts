export type InsuranceLineKey = "auto" | "home" | "life" | "business";

export type InsuranceLineSummary = {
  key: InsuranceLineKey;
  name: string;
  href: string;
  audience: string;
  summary: string;
  quoteLabel: string;
  imageLabel: string;
  imageDetail: string;
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
    imageLabel: "Family vehicle lifestyle photography",
    imageDetail: "Approved auto photography",
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
    imageLabel: "Southwest Florida home photography",
    imageDetail: "Approved architectural photography",
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
    imageLabel: "Family / couple lifestyle photography",
    imageDetail: "Approved family photography",
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
    imageLabel: "Local small-business owner photography",
    imageDetail: "Approved business photography",
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
} as const;

export const lifeInsurance = {
  ...insuranceLines.life,
  products: ["Term life", "Whole life", "Universal life", "Final expense", "Key-person / business life"],
  needs: ["Income replacement", "Mortgage protection", "Education costs", "Debts", "Estate needs", "Business succession"],
} as const;

export const businessInsurance = {
  ...insuranceLines.business,
  products: [
    "General liability", "Commercial property", "Commercial auto", "Workers’ compensation",
    "Professional liability / E&O", "Cyber insurance", "Business Owners Policy / BOP",
    "Commercial umbrella", "Employment Practices Liability / EPLI",
  ],
  industries: ["Contractors", "Restaurants", "Professional services", "Medical offices", "Real-estate businesses"],
  exposures: ["Operations", "Property", "Vehicles", "Employees", "Customer interaction", "Digital risks"],
} as const;
