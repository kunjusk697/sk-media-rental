"use client";

import { RoyalLogo } from "@/components/brand/RoyalLogo";
import { Button } from "@/components/ui/Button";
import { setAdminSession, verifyAdminPin } from "@/lib/admin-auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLoginPage() {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-forest px-6 text-white">
      <RoyalLogo linked={false} className="mb-8 h-14 brightness-0 invert" />
      <div className="w-full max-w-sm rounded-3xl bg-white p-8 text-charcoal shadow-xl">
        <h1 className="font-display text-2xl text-forest">Admin access</h1>
        <p className="mt-1 text-sm text-stone-500">
          Enter your store PIN to manage catalog, orders, and accounts.
        </p>
        <form
          className="mt-6 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (verifyAdminPin(pin)) {
              setAdminSession(true);
              router.push("/admin");
            } else {
              setError("Invalid PIN. Try again.");
            }
          }}
        >
          <input
            type="password"
            inputMode="numeric"
            className="input"
            placeholder="Admin PIN"
            value={pin}
            onChange={(e) => {
              setPin(e.target.value);
              setError("");
            }}
          />
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <Button type="submit" className="w-full">Unlock dashboard</Button>
        </form>
        <p className="mt-4 text-center text-xs text-stone-400">
          Default demo PIN: last 6 digits of WhatsApp (see README)
        </p>
      </div>
    </div>
  );
}
