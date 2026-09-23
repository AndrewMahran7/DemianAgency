"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { trackEvent, type AnalyticsEventMap, type AnalyticsEventName } from "@/lib/analytics";

type TrackedLinkProps<Event extends AnalyticsEventName> = ComponentProps<typeof Link> & {
  event: Event;
  properties: AnalyticsEventMap[Event];
};

export function TrackedLink<Event extends AnalyticsEventName>({ event, properties, onClick, ...props }: TrackedLinkProps<Event>) {
  return <Link {...props} onClick={(clickEvent) => { trackEvent(event, properties); onClick?.(clickEvent); }} />;
}

type TrackedPhoneLinkProps = ComponentProps<"a"> & {
  location: AnalyticsEventMap["phone_click"]["location"];
};

export function TrackedPhoneLink({ location, onClick, ...props }: TrackedPhoneLinkProps) {
  return <a {...props} onClick={(clickEvent) => { trackEvent("phone_click", { location }); onClick?.(clickEvent); }} />;
}
