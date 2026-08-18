import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { ModalProvider } from "@/providers/ModalProvider";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "@/hooks/useUser";


const nunitoFont = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "SevaWidget",
  description: "Seva",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${nunitoFont.variable} h-full antialiased`}>
      <body className="min-h-full">
        <UserProvider>
          <ThemeProvider>
            <ModalProvider />
            <ToastContainer />
            <main className="min-h-dvh">{children}</main>
          </ThemeProvider>
        </UserProvider>
      </body>
    </html>
  );
}
