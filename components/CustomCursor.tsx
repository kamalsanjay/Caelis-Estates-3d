"use client";

import { useEffect } from "react";

export default function CustomCursor() {
  useEffect(() => {
    // Ensure native hardware-accelerated cursor is active with zero input latency
    document.body.style.cursor = "auto";
  }, []);

  return null;
}
