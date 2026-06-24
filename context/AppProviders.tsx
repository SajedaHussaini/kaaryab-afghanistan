"use client";

import { AuthProvider } from "@/context/AuthContext";
import { OpportunityProvider } from "@/context/OpportunityContext";
import { SavedProvider } from "@/context/SavedContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { ToastProvider } from "@/context/ToastContext";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <OpportunityProvider>
            <SavedProvider>{children}</SavedProvider>
          </OpportunityProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
