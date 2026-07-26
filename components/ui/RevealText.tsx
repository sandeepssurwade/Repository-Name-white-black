"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function RevealText({
  text,
  className,
  delay = 0,
  by = "word",
}: {
  text: string;
  className?: string;
  delay?: number;
  by?: "word" | "char";
}) {
  const units = by === "word" ? text.split(" ") : text.split("");

  return (
    <span className={cn("inline-block", className)} aria-label={text}>
      {units.map((unit, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{
              duration: 0.9,
              delay: delay + i * (by === "word" ? 0.06 : 0.02),
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {unit === " " ? "\u00A0" : unit}
            {by === "word" && i < units.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
