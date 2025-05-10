"use strict";
import Header from "./components/global/Header";
import "./globals.css";

export const metadata = {
  title: "SMK",
  description: "Exams Project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <Header></Header>
        {children}
      </body>
    </html>
  );
}
