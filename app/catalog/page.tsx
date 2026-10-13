import { CatalogPageClient } from "@/app/catalog/CatalogPageClient";
import { MobileShell } from "@/components/layout/MobileShell";
import { Suspense } from "react";

export default function CatalogPage() {
  return (
    <MobileShell>
      <Suspense>
        <CatalogPageClient />
      </Suspense>
    </MobileShell>
  );
}
