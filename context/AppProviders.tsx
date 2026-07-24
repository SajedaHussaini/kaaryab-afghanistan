"use client";

import { AuthProvider } from "@/context/AuthContext";
import { OpportunityProvider } from "@/context/OpportunityContext";
import { SavedProvider } from "@/context/SavedContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { ToastProvider } from "@/context/ToastContext";
import type { ReactNode } from "react";

type AppProvidersProps = {
  children: ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
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
