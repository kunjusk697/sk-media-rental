import { cn } from "@/lib/cn";
import Image from "next/image";
import Link from "next/link";

type RoyalLogoProps = {
  className?: string;
  href?: string;
  linked?: boolean;
  priority?: boolean;
};

export function RoyalLogo({
  className,
  href = "/",
  linked = true,
  priority = false,
}: RoyalLogoProps) {
  const image = (
    <Image
      src="/royal-specs-logo.png"
      alt="Royol Opticals"
      width={472}
      height={448}
      priority={priority}
      className={cn("h-9 w-auto object-contain object-left", className)}
    />
  );

  if (!linked) return image;

  return (
    <Link href={href} className="inline-flex shrink-0 items-center" aria-label="Royal Specs home">
      {image}
    </Link>
  );
}
