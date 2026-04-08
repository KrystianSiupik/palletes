"use client";

import { RouterProvider } from "react-router";
import { ThemeProvider } from "./theme/theme-context";
import { router } from "./routes";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}
