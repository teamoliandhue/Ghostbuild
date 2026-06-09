"use client";

import { useReveal } from "@/lib/useReveal";

/** Mounts the scroll-reveal observer for the whole page. Renders nothing. */
export default function RevealInit() {
  useReveal();
  return null;
}
