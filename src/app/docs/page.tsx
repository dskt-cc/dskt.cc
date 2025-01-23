"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DocsPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/docs/getting-started/installation");
  }, [router]);

  return null;
}
