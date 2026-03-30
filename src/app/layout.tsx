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
  metadataBase: new URL("https://skillio-app.uk"),
  title: {
    default: "Skillio | Empowering Communication & Social Skills",
    template: "%s | Skillio"
  },
  description: "Skillio is a sensory-safe, AAC-first application designed for neurodivergent minds. Unlock connection with customizable communication tools, emotional regulation, and social practice.",
  keywords: ["AAC", "Neurodivergent", "Autism", "Communication App", "Sensory-Safe", "Social Skills", "Speech Therapy", "Non-verbal communication"],
  authors: [{ name: "Skillio Team" }],
  creator: "Skillio",
  publisher: "Skillio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Skillio | Empowering Communication & Social Skills",
    description: "Unlocking connection for every mind. Discover the leading AAC-first toolkit for neurodivergent individuals.",
    url: "https://skillio-app.uk",
    siteName: "Skillio",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Skillio | Empowering Communication & Social Skills",
    description: "Sensory-safe communication for every mind. Join the Skillio community.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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

