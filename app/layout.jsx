import "./globals.css";
export const metadata = {
  title: "Wazah Ahmad — Senior Web Developer",
  description:
    "Senior web developer in Gujranwala, Pakistan. 6+ years building WordPress, PHP, Laravel websites and practical AI automations.",
  alternates: { canonical: "/" },
  metadataBase: new URL("https://wazahahmad.vercel.app"),
  twitter: {
    card: "summary_large_image",
    title: "Wazah Ahmad — Senior Web Developer",
    description:
      "Explore Wazah Ahmad’s portfolio: WordPress and custom websites, e-commerce experiences, and practical AI automations built with care.",
    images: ["/opengraph-image"],
  },
  openGraph: {
    title: "Wazah Ahmad — Senior Web Developer",
    description:
      "Explore Wazah Ahmad’s portfolio: WordPress and custom websites, e-commerce experiences, and practical AI automations built with care.",
    url: "https://wazahahmad.vercel.app",
    type: "website",
    siteName: "Wazah Ahmad",
  },
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/fonts/inter-variable.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
