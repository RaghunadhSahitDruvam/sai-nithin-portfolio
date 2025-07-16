import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProviderWrapper from "@/components/providers/theme-provider-wrapper";
import NavbarWrapper from "@/components/ui/navbar-wrapper";
import Footer from "@/components/ui/footer";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Sai Nithin K - Telugu Tech YouTuber & Content Creator | sainithintech.com",
    template: "%s | Sai Nithin K - sainithintech.com"
  },
  description: "Sai Nithin K is a prominent Telugu tech content creator and YouTuber with 856K+ subscribers. Specializing in tech reviews, gadget tutorials, and digital content creation courses. Based in Hyderabad, India.",
  keywords: [
    "Sai Nithin K",
    "sainithintech",
    "Telugu tech YouTuber",
    "Tech content creator",
    "YouTube tech channel",
    "Telugu tech reviews",
    "Gadget reviews",
    "Tech tutorials Telugu",
    "Tech news Telugu",
    "Content creation courses",
    "Digital marketing",
    "Online earning",
    "YouTube growth",
    "Instagram reels",
    "Tech hacks",
    "Productivity tips",
    "Hyderabad YouTuber",
    "Telugu content creator",
    "Tech influencer",
    "Digital education",
    "sainithintech"
  ],
  authors: [{ name: "Sai Nithin K", url: "https://sainithintech.com" }],
  creator: "Sai Nithin K",
  publisher: "Sai Nithin K",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://sainithintech.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sainithintech.com",
    title: "Sai Nithin K - Telugu Tech YouTuber & Content Creator",
    description: "Prominent Telugu tech content creator and YouTuber with 856K+ subscribers, specializing in tech reviews, tutorials, and digital education.",
    siteName: "Sai Nithin Tech",
    images: [
      {
        url: "/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Sai Nithin K - Telugu Tech YouTuber & Content Creator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sai Nithin K - Telugu Tech YouTuber & Content Creator",
    description: "Prominent Telugu tech content creator and YouTuber with 856K+ subscribers, specializing in tech reviews, tutorials, and digital education.",
    images: ["/profile.jpg"],
    creator: "@sainithintech",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  icons: {
    icon: '/profile.svg',
    shortcut: '/profile.svg',
    apple: '/profile.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Sai Nithin K",
    "alternateName": ["sainithintech", "Sai Nithin Tech"],
    "url": "https://sainithintech.com",
    "image": "https://sainithintech.com/profile.jpg",
    "sameAs": [
      "https://youtube.com/@sainithintech",
      "https://instagram.com/sainithintech",
      "https://instagram.com/sainithin97",
      "https://facebook.com/sainithintech",
      "https://linkedin.com/in/sainithintech",
      "https://twitter.com/sainithintech"
    ],
    "jobTitle": "Tech Content Creator & YouTuber",
    "worksFor": {
      "@type": "Organization",
      "name": "Sai Nithin Tech",
      "url": "https://sainithintech.com"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Hyderabad",
      "addressRegion": "Telangana",
      "addressCountry": "India"
    },
    "knowsAbout": [
      "Tech Reviews",
      "Gadget Reviews",
      "YouTube Content Creation",
      "Digital Marketing",
      "Content Creation",
      "Online Earning",
      "Tech Tutorials",
      "Instagram Reels",
      "Social Media Growth",
      "Telugu Tech Content"
    ],
    "description": "Prominent Telugu tech content creator and YouTuber with 856K+ subscribers, specializing in tech reviews, gadget tutorials, and digital content creation courses. Based in Hyderabad, India.",
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Tech Content Creator & YouTuber",
      "occupationLocation": {
        "@type": "City",
        "name": "Hyderabad, Telangana, India"
      },
      "skills": [
        "Video Content Creation",
        "Tech Reviews",
        "YouTube Channel Management",
        "Instagram Content",
        "Digital Marketing",
        "Course Creation",
        "Telugu Content",
        "Social Media Growth",
        "Brand Collaborations",
        "Online Education"
      ]
    }
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <link rel="canonical" href="https://sainithintech.com" />
        <link rel="icon" href="/profile.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/profile.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/profile.svg" />
        <meta name="google-site-verification" content="your-google-verification-code" />
        <meta name="msvalidate.01" content="your-bing-verification-code" />
        <meta name="yandex-verification" content="your-yandex-verification-code" />
      </head>
      <body className={inter.className}>
        <ThemeProviderWrapper>
          <div className="min-h-screen flex flex-col">
            <div className="h-[100px]">
              <NavbarWrapper />
            </div>
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
