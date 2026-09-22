import { BriefcaseBusiness, CarFront, HeartHandshake, House } from "lucide-react";

export const siteConfig = {
  businessName: "Demian Insurance Agency",
  displayName: "Demian",
  region: "Southwest Florida",
  phone: null,
  email: null,
  officeAddress: null,
  hours: null,
  licenseInformation: null,
  socialLinks: [],
  navigation: [
    { label: "Insurance", href: "/insurance" },
    { label: "About", href: "/about" },
    { label: "Claims & Resources", href: "/claims-resources" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export const services = [
  {
    index: "01",
    name: "Auto",
    href: "/insurance/auto",
    description: "Protection for the vehicles and drivers that keep life moving.",
    icon: CarFront,
  },
  {
    index: "02",
    name: "Home",
    href: "/insurance/home",
    description: "Thoughtful coverage for your home, belongings, and everyday life.",
    icon: House,
  },
  {
    index: "03",
    name: "Life",
    href: "/insurance/life",
    description: "A clearer way to plan for the people who depend on you.",
    icon: HeartHandshake,
  },
  {
    index: "04",
    name: "Business",
    href: "/insurance/business",
    description: "Practical guidance for protecting the work you have built.",
    icon: BriefcaseBusiness,
  },
] as const;

export const requestTypes = [
  "Auto",
  "Home",
  "Life",
  "Business",
  "Claims help",
  "Policy change",
  "Billing / question",
  "New coverage",
  "Other",
] as const;

export const missingBusinessInformation = [
  "phone",
  "email",
  "officeAddress",
  "hours",
  "licenseInformation",
  "agentNames",
  "approvedPhotography",
] as const;
