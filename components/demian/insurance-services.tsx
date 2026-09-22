"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { services } from "@/lib/site-config";

export function InsuranceServices() {
  const reduceMotion = useReducedMotion();
  return (
    <div className="service-grid">
      {services.map((service, index) => {
        const Icon = service.icon;
        return (
          <motion.article
            className="service-card"
            key={service.name}
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: .52, delay: index * .07, ease: [0.22, 1, 0.36, 1] }}
            whileHover={reduceMotion ? undefined : { y: -6 }}
          >
            <div className="service-top"><span>{service.index}</span><Icon aria-hidden="true" size={23} strokeWidth={1.5} /></div>
            <div>
              <h3>{service.name}</h3>
              <p>{service.description}</p>
            </div>
            <Link href={service.href} aria-label={`Learn more about ${service.name} insurance`}>
              Learn more <ArrowUpRight aria-hidden="true" size={17} />
            </Link>
          </motion.article>
        );
      })}
    </div>
  );
}
