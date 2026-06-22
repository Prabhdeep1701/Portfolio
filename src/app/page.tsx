"use client";

import { useEffect, useState } from "react";
import BootSequence from "@/components/BootSequence";
import Desktop from "@/components/Desktop";

export default function Home() {
  const [bootComplete, setBootComplete] = useState(false);

  useEffect(() => {
    const bootTimer = setTimeout(() => {
      setBootComplete(true);
    }, 4000);

    return () => clearTimeout(bootTimer);
  }, []);

  if (!bootComplete) {
    return <BootSequence />;
  }

  return <Desktop />;
}
