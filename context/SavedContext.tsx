"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { storageKeys } from "@/lib/constants";
import { readStorage, writeStorage } from "@/lib/storage";
import { useOpportunities } from "@/context/OpportunityContext";
import type { Opportunity } from "@/types/opportunity";

type SavedContextValue = {
  savedIds: string[];
  savedOpportunities: Opportunity[];
  isSaved: (id: string) => boolean;
  toggleSaved: (id: string) => void;
  clearSaved: () => void;
};

const SavedContext = createContext<SavedContextValue | null>(null);

export function SavedProvider({ children }: { children: React.ReactNode }) {
  const { opportunities } = useOpportunities();
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setSavedIds(readStorage<string[]>(storageKeys.saved, []));
      setIsReady(true);
    }, 0);

    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (isReady) {
      writeStorage(storageKeys.saved, savedIds);
    }
  }, [isReady, savedIds]);

  const isSaved = useCallback(
    (id: string) => savedIds.includes(id),
    [savedIds],
  );

  const toggleSaved = useCallback((id: string) => {
    setSavedIds((current) =>
      current.includes(id)
        ? current.filter((savedId) => savedId !== id)
        : [...current, id],
    );
  }, []);

  const clearSaved = useCallback(() => {
    setSavedIds([]);
  }, []);

  const savedOpportunities = useMemo(
    () => opportunities.filter((item) => savedIds.includes(item.id)),
    [opportunities, savedIds],
  );

  const value = useMemo(
    () => ({
      savedIds,
      savedOpportunities,
      isSaved,
      toggleSaved,
      clearSaved,
    }),
    [clearSaved, isSaved, savedIds, savedOpportunities, toggleSaved],
  );

  return (
    <SavedContext.Provider value={value}>{children}</SavedContext.Provider>
  );
}

export function useSaved() {
  const context = useContext(SavedContext);

  if (!context) {
    throw new Error("useSaved must be used inside SavedProvider.");
  }

  return context;
}
