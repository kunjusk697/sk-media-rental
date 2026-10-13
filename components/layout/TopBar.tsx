import { MapPin } from "lucide-react";

export function TopBar() {
  return (
    <header className="sticky top-0 z-20 border-b border-stone-200/70 bg-[#f7f6f4]/90 px-5 pb-3 pt-4 backdrop-blur-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-500">
            Royal Optical
          </p>
          <h1 className="font-display text-2xl font-semibold tracking-tight text-charcoal">
            Royal Specs
          </h1>
        </div>
        <div className="flex items-center gap-1.5 rounded-full border border-stone-200 bg-white px-3 py-1.5 text-xs font-medium text-stone-600 shadow-sm">
          <MapPin className="h-3.5 w-3.5 text-charcoal" />
          <span>Kochi · Open</span>
        </div>
      </div>
    </header>
  );
}
