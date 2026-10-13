"use client";

import { BottomNav } from "@/components/layout/BottomNav";
import { TopBar } from "@/components/layout/TopBar";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";

export function MobileShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-stone-300 text-charcoal">
      <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col bg-white shadow-[0_0_80px_rgba(0,0,0,0.12)] md:my-6 md:min-h-[calc(100dvh-3rem)] md:rounded-[2rem] md:overflow-hidden">
        <TopBar />
        <div className="flex-1 overflow-y-auto bg-white pb-24">{children}</div>
        <WhatsAppFab />
        <BottomNav />
      </div>
    </div>
  );
}
