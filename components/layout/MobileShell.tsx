"use client";

import { BottomNav } from "@/components/layout/BottomNav";
import { TopBar } from "@/components/layout/TopBar";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";

export function MobileShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-stone-100 text-charcoal">
      <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col bg-[#f7f6f4] shadow-[0_0_80px_rgba(0,0,0,0.08)] md:my-6 md:min-h-[calc(100dvh-3rem)] md:rounded-[2rem] md:border md:border-stone-200/80 md:overflow-hidden">
        <TopBar />
        <div className="flex-1 overflow-y-auto pb-24">{children}</div>
        <WhatsAppFab />
        <BottomNav />
      </div>
    </div>
  );
}
