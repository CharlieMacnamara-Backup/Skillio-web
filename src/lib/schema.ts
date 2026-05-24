interface SoftwareApplicationSchema {
  "@context": string;
  "@type": "SoftwareApplication";
  name: string;
  applicationCategory: string;
  operatingSystem: string;
  description: string;
  offers: {
    "@type": "Offer";
    price: string;
    priceCurrency: string;
    availability: string;
    priceValidUntil?: string;
  };
  aggregateRating?: {
    "@type": "AggregateRating";
    ratingValue: string;
    ratingCount: string;
  };
  featureList: string[];
  audience: {
    "@type": "Audience";
    audienceType: string[];
  };
  keywords: string;
  url?: string;
  applicationSubCategory?: string;
  softwareVersion?: string;
  releaseNotes?: string;
  downloadUrl?: string;
  operatingSystemVersion?: string;
}

interface OrganizationSchema {
  "@context": string;
  "@type": "Organization";
  name: string;
  url: string;
  logo: string;
  description: string;
  contactPoint: {
    "@type": "ContactPoint";
    contactType: string;
    email: string;
    telephone?: string;
    areaServed?: string | string[];
    availableLanguage?: string[];
  };
  sameAs?: string[];
  foundingDate?: string;
  address?: {
    "@type": "PostalAddress";
    addressCountry: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    streetAddress?: string;
  };
  areaServed?: string | string[];
  location?: {
    "@type": "Place";
    geo?: {
      "@type": "GeoCoordinates";
      latitude?: number;
      longitude?: number;
    };
  };
}

interface FAQPageSchema {
  "@context": string;
  "@type": "FAQPage";
  mainEntity: Array<{
    "@type": "Question";
    name: string;
    acceptedAnswer: {
      "@type": "Answer";
      text: string;
    };
  }>;
}

const BASE_URL = "https://skillio-app.uk";

export const softwareApplicationSchema: SoftwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Skillio",
  applicationCategory: "HealthApplication",
  applicationSubCategory: "AAC Communication Tool",
  operatingSystem: "iOS, iPadOS",
  operatingSystemVersion: "iOS 15.0+, iPadOS 15.0+",
  description: "Skillio is a sensory-safe, offline AAC app for autistic children and non-verbal communication. Trusted by parents, SLPs, and schools. One-time purchase, lifetime access with no subscription fees.",
  url: BASE_URL,
  offers: {
    "@type": "Offer",
    price: "30.00",
    priceCurrency: "GBP",
    availability: "https://schema.org/InStock",
    priceValidUntil: "2027-12-31"
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "150"
  },
  featureList: [
    "100% offline AAC communication without internet dependency",
    "Sensory-safe design optimized for autistic children",
    "Customizable Fitzgerald Key vocabulary grids",
    "Emotional regulation tools with visual breathing guides",
    "Social practice games for turn-taking skills",
    "Up to 8 independent student profiles",
    "Local voice synthesis with zero cloud latency",
    "On-device vocabulary customization",
    "VPP-ready for school deployment",
    "No subscription fees - one-time lifetime purchase"
  ],
  audience: {
    "@type": "Audience",
    audienceType: ["Parents", "Speech-Language Pathologists", "Schools", "Special Education Teachers", "Autism Support Organizations"]
  },
  keywords: "AAC app for autism, non-verbal communication app, speech therapy app for autistic children, sensory-safe communication tool, offline AAC app, autism communication tools, SLP recommended apps, school communication software, alternative augmentative communication, picture exchange communication",
  softwareVersion: "1.0.0",
  releaseNotes: "Initial release with full AAC functionality, sensory regulation tools, and social practice features"
};

export const organizationSchema: OrganizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Skillio",
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  description: "Skillio develops sensory-safe AAC communication tools for autistic children and non-verbal individuals. Our mission is to provide accessible, affordable, and privacy-focused communication solutions that work entirely offline.",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: "support@skillio.com",
    areaServed: ["GB", "US"],
    availableLanguage: ["en-GB", "en-US"]
  },
  sameAs: [
    "https://twitter.com/skillioapp",
    "https://linkedin.com/company/skillioapp"
  ],
  foundingDate: "2025",
  address: {
    "@type": "PostalAddress",
    addressCountry: "GB",
    addressLocality: "London",
    addressRegion: "England",
    postalCode: "EC1A",
    streetAddress: "London"
  },
  areaServed: ["GB", "US"],
  location: {
    "@type": "Place",
    geo: {
      "@type": "GeoCoordinates",
      latitude: 51.5074,
      longitude: -0.1278
    }
  }
};

export const faqPageSchema: FAQPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is Skillio AAC app suitable for non-verbal autistic children?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, Skillio is specifically designed as an AAC (Augmentative and Alternative Communication) app for non-verbal autistic children. It features sensory-safe design, customizable vocabulary grids, and emotional regulation tools to support communication development in children with autism spectrum disorder."
      }
    },
    {
      "@type": "Question",
      name: "Does Skillio require an internet connection to work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, Skillio works 100% offline. The app runs entirely on-device with local voice synthesis, eliminating dependency on school Wi-Fi or cloud services. This ensures reliable communication in classrooms, clinics, and home environments without internet access."
      }
    },
    {
      "@type": "Question",
      name: "What is the pricing model for Skillio AAC app?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Skillio uses a one-time purchase model with no subscription fees. The lifetime unlock costs £30.00 GBP and includes all features, updates, and support. There are no monthly payments, hidden costs, or expiration dates - you pay once and own the app forever."
      }
    },
    {
      "@type": "Question",
      name: "Can Speech-Language Pathologists (SLPs) use Skillio in therapy sessions?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. Skillio is designed with SLP input and supports clinical AAC workflows including Fitzgerald Key color-coded grids, customizable vocabulary for therapy goals, and progress tracking features. The app is compatible with individual therapy sessions and school-based speech therapy programs."
      }
    },
    {
      "@type": "Question",
      name: "Is Skillio compatible with school VPP (Volume Purchase Program)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, Skillio is fully compatible with Apple's Volume Purchase Program (VPP) for educational institutions. Schools can deploy the app across multiple iPads without requiring individual student accounts or email verification, making it ideal for special education classrooms and therapy centers."
      }
    },
    {
      "@type": "Question",
      name: "How many student profiles can I create in Skillio?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Skillio supports up to 8 independent student profiles with the lifetime unlock. Each profile can have customized vocabulary grids, settings, and preferences, making it suitable for families with multiple children or therapists working with several students."
      }
    },
    {
      "@type": "Question",
      name: "Does Skillio collect or share student data?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, Skillio is privacy-first and runs entirely on-device. We never collect, upload, or share voice recordings, custom vocabulary grids, or student profile data. All data remains encrypted on the device, ensuring complete privacy for children and compliance with data protection regulations."
      }
    },
    {
      "@type": "Question",
      name: "What makes Skillio different from other AAC apps like Proloquo2Go?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Skillio differentiates itself through three key advantages: 1) 100% offline operation with no cloud dependency, 2) One-time lifetime purchase (£30) vs expensive subscriptions (£200+ upfront or £10+/month), and 3) Sensory-safe design specifically optimized for autistic children with reduced visual overload and calming regulation tools built directly into the communication interface."
      }
    },
    {
      "@type": "Question",
      name: "Can I customize the vocabulary grids in Skillio?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, Skillio includes a Vocabulary Studio that allows parents, SLPs, and teachers to customize vocabulary grids on-device without internet access. You can create custom tiles with built-in icons, use the on-device synonym assistant to expand vocabulary naturally, and export/sync customized boards across multiple devices."
      }
    },
    {
      "@type": "Question",
      name: "Does Skillio work on Android devices?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Currently, Skillio is available for iOS and iPadOS. An Android version is in development and will be released in the future. The app is optimized for iPad and iPhone devices running iOS 15.0 or later."
      }
    }
  ]
};
