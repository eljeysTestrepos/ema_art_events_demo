import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

import ThemeWrapper from "../components/global/ThemeWrapper";

export const metadata = {
  title: "SMK",
  description: "Exams Project",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        {/* <motion.div {...anim(opacity)}> */}
        <ThemeWrapper>{children}</ThemeWrapper>
        {/* </motion.div> */}
      </html>
    </ClerkProvider>
  );
}
