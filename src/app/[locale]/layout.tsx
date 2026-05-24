import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
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

const locales = ["en"];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://skillio-app.uk"),
  title: {
    default: "Skillio | AAC App for Autism & Non-Verbal Communication",
    template: "%s | Skillio"
  },
  description: "Skillio is a sensory-safe, offline AAC app for autistic children and non-verbal communication. Trusted by parents, SLPs, and schools. One-time purchase, lifetime access.",
  keywords: ["AAC app for autism", "non-verbal communication app", "speech therapy app for autistic children", "sensory-safe communication tool", "offline AAC app", "autism communication tools", "SLP recommended apps", "school communication software", "alternative augmentative communication", "picture exchange communication"],
  authors: [{ name: "Skillio Team" }],
  creator: "Skillio",
  publisher: "Skillio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Skillio | AAC App for Autism & Non-Verbal Communication",
    description: "Sensory-safe, offline AAC app for autistic children. Trusted by parents, SLPs, and schools. One-time purchase, lifetime access.",
    url: "https://skillio-app.uk",
    siteName: "Skillio",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "https://skillio-app.uk/og-image.png",
        width: 1200,
        height: 630,
        alt: "Skillio AAC App - Sensory-Safe Communication for Autism"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Skillio | AAC App for Autism & Non-Verbal Communication",
    description: "Sensory-safe, offline AAC app for autistic children. Trusted by parents, SLPs, and schools.",
    images: ["https://skillio-app.uk/og-image.png"]
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


export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} h-full antialiased scroll-smooth scroll-pt-20`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Skillio",
              "applicationCategory": "HealthApplication",
              "operatingSystem": "iOS, iPadOS",
              "description": "Skillio is a sensory-safe, offline AAC app for autistic children and non-verbal communication. Trusted by parents, SLPs, and schools.",
              "offers": {
                "@type": "Offer",
                "price": "30.00",
                "priceCurrency": "GBP",
                "availability": "https://schema.org/InStock"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "150"
              },
              "featureList": [
                "100% offline AAC communication",
                "Sensory-safe design for autism",
                "Customizable vocabulary grids",
                "Emotional regulation tools",
                "Social practice games",
                "Up to 8 student profiles"
              ],
              "audience": {
                "@type": "Audience",
                "audienceType": ["Parents", "Speech-Language Pathologists", "Schools", "Special Education Teachers"]
              },
              "keywords": "AAC app for autism, non-verbal communication app, speech therapy app for autistic children, sensory-safe communication tool, offline AAC app"
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Skillio",
              "url": "https://skillio-app.uk",
              "logo": "https://skillio-app.uk/logo.png",
              "description": "Skillio develops sensory-safe AAC communication tools for autistic children and non-verbal individuals.",
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer support",
                "email": "support@skillio.com"
              },
              "sameAs": [
                "https://twitter.com/skillioapp",
                "https://linkedin.com/company/skillioapp"
              ]
            })
          }}
        />
      </head>
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
          <NextIntlClientProvider messages={messages}>
            <Header />
            <div className="relative flex flex-col flex-1">
               <main className="flex-auto">{children}</main>
               <Footer />
            </div>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

