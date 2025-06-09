import React, { useState, createContext, useContext, ReactNode } from "react";

interface TabsProps {
  value: string;
  onValueChange: (val: string) => void;
  children: ReactNode;
}

const TabsContext = createContext<{
  value: string;
  setValue: (val: string) => void;
} | null>(null);

export function Tabs({ value, onValueChange, children }: TabsProps) {
  return (
    <TabsContext.Provider value={{ value, setValue: onValueChange }}>
      <div>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={"flex gap-2 border-b " + (className || "")}>{children}</div>;
}

export function TabsTrigger({ value, children }: { value: string; children: ReactNode }) {
  const ctx = useContext(TabsContext);
  if (!ctx) return null;
  const active = ctx.value === value;
  return (
    <button
      type="button"
      onClick={() => ctx.setValue(value)}
      className={
        "px-4 py-2 font-medium border-b-2 " +
        (active ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-blue-500")
      }
      style={{ background: "none" }}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children }: { value: string; children: ReactNode }) {
  const ctx = useContext(TabsContext);
  if (!ctx) return null;
  if (ctx.value !== value) return null;
  return <div>{children}</div>;
}
