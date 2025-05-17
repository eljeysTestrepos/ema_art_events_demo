"use strict";
import Header from "../components/global/Header";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
  title: "SMK",
  description: "Exams Project",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body suppressHydrationWarning>
          <Header />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
