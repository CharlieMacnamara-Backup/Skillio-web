import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Skillio | Empowering Communication & Social Skills",
  description: "Skillio is a cutting-edge AAC application designed to help individuals develop social skills and communicate more effectively.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} h-full antialiased scroll-smooth scroll-pt-20`}
    >
      <body className="flex min-h-screen flex-col bg-zinc-50 transition-colors duration-300 dark:bg-black">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="fixed inset-0 flex justify-center sm:px-8">
            <div className="flex w-full max-w-7xl lg:px-8">
              <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
            </div>
          </div>
          <Header />
          <div className="relative flex flex-col flex-1">
             <main className="flex-auto">{children}</main>
             <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

