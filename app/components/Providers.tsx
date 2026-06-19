"use client";

import { FormspreeProvider } from "@formspree/react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <FormspreeProvider project="3027576853054356567">
      {children}
    </FormspreeProvider>
  );
}
