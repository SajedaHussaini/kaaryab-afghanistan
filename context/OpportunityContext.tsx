"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { opportunities as seedOpportunities } from "@/data/opportunities";
import { storageKeys } from "@/lib/constants";
import { createId } from "@/lib/utils";
import { readStorage, writeStorage } from "@/lib/storage";
import type {
  Opportunity,
  OpportunityInput,
  OpportunityStatus,
} from "@/types/opportunity";

type OpportunityContextValue = {
  opportunities: Opportunity[];
  isReady: boolean;
  createOpportunity: (input: OpportunityInput) => string;
  updateOpportunity: (id: string, input: OpportunityInput) => void;
  deleteOpportunity: (id: string) => void;
  setOpportunityStatus: (id: string, status: OpportunityStatus) => void;
  toggleFeatured: (id: string) => void;
  resetDemoData: () => void;
  getOpportunityById: (id: string) => Opportunity | undefined;
};

const OpportunityContext = createContext<OpportunityContextValue | null>(null);

export function OpportunityProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [opportunities, setOpportunities] =
    useState<Opportunity[]>(seedOpportunities);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const stored = readStorage<Opportunity[] | null>(
        storageKeys.opportunities,
        null,
      );

      if (stored?.length) {
        setOpportunities(stored);
      } else {
        writeStorage(storageKeys.opportunities, seedOpportunities);
      }

      setIsReady(true);
    }, 0);

    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (isReady) {
      writeStorage(storageKeys.opportunities, opportunities);
    }
  }, [isReady, opportunities]);

  const createOpportunity = useCallback((input: OpportunityInput) => {
    const now = new Date().toISOString();
    const nextOpportunity: Opportunity = {
      ...input,
      id: createId("opportunity"),
      source: "user",
      createdAt: now,
      updatedAt: now,
    };

    setOpportunities((current) => [nextOpportunity, ...current]);
    return nextOpportunity.id;
  }, []);

  const updateOpportunity = useCallback(
    (id: string, input: OpportunityInput) => {
      setOpportunities((current) =>
        current.map((item) =>
          item.id === id
            ? {
                ...item,
                ...input,
                updatedAt: new Date().toISOString(),
              }
            : item,
        ),
      );
    },
    [],
  );

  const deleteOpportunity = useCallback((id: string) => {
    setOpportunities((current) => current.filter((item) => item.id !== id));
  }, []);

  const setOpportunityStatus = useCallback(
    (id: string, status: OpportunityStatus) => {
      setOpportunities((current) =>
        current.map((item) =>
          item.id === id
            ? { ...item, status, updatedAt: new Date().toISOString() }
            : item,
        ),
      );
    },
    [],
  );

  const toggleFeatured = useCallback((id: string) => {
    setOpportunities((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              featured: !item.featured,
              updatedAt: new Date().toISOString(),
            }
          : item,
      ),
    );
  }, []);

  const resetDemoData = useCallback(() => {
    setOpportunities(seedOpportunities);
    writeStorage(storageKeys.opportunities, seedOpportunities);
  }, []);

  const getOpportunityById = useCallback(
    (id: string) => opportunities.find((item) => item.id === id),
    [opportunities],
  );

  const value = useMemo(
    () => ({
      opportunities,
      isReady,
      createOpportunity,
      updateOpportunity,
      deleteOpportunity,
      setOpportunityStatus,
      toggleFeatured,
      resetDemoData,
      getOpportunityById,
    }),
    [
      createOpportunity,
      deleteOpportunity,
      getOpportunityById,
      isReady,
      opportunities,
      resetDemoData,
      setOpportunityStatus,
      toggleFeatured,
      updateOpportunity,
    ],
  );

  return (
    <OpportunityContext.Provider value={value}>
      {children}
    </OpportunityContext.Provider>
  );
}

export function useOpportunities() {
  const context = useContext(OpportunityContext);

  if (!context) {
    throw new Error("useOpportunities must be used inside OpportunityProvider.");
  }

  return context;
}
