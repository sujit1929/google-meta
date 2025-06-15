import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { AuthProvider } from "@/context/AuthContext";
import QueryProvider from "./providers/QueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sujeet Sharma - Frontend Developer",
  description:
    "Practicing frontend magic, one component at a time. A developer-focused playground showcasing creative solutions and UI experiments.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <QueryProvider>{children}</QueryProvider>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
