import { BriefcaseBusiness, CarFront, HeartHandshake, House } from "lucide-react";
import { serviceRequestTypes } from "@/lib/forms/validation";

export const siteConfig = {
  businessName: "Demian Insurance Agency",
  displayName: "Demian",
  region: "Florida",
  serviceRegion: "Florida's Gulf Coast and nearby inland counties",
  phone: "(941) 377-1806",
  phoneHref: "tel:+19413771806",
  email: null,
  officeAddress: null,
  hours: [
    { days: "Monday–Friday", time: "9 AM–6 PM" },
    { days: "Saturday", time: "9 AM–1 PM" },
  ],
  serviceAreas: [
    "Sarasota", "Hillsborough", "Manatee", "Pinellas", "Hardee", "DeSoto",
    "Charlotte", "Lee", "Hernando", "Pasco", "Highlands", "Collier",
  ],
  requestQuoteHref: "/request-quote",
  clientServiceHref: "/client-service",
  requestServiceHref: "/request-service",
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

export const requestTypes = serviceRequestTypes;

export const missingBusinessInformation = [
  "email",
  "officeAddress",
  "licenseInformation",
] as const;
