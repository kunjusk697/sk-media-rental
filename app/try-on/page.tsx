import { TryOnStudio } from "@/components/try-on/TryOnStudio";
import { MobileShell } from "@/components/layout/MobileShell";

export default async function TryOnPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>;
}) {
  const params = await searchParams;
  return (
    <MobileShell>
      <TryOnStudio initialProductId={params.product} />
    </MobileShell>
  );
}
