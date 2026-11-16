import "./globals.css";
export const metadata = {
  title: "Wazah Ahmad — Senior Web Developer",
  description:
    "Senior web developer in Gujranwala, Pakistan. 6+ years building WordPress, PHP, Laravel websites and practical AI automations.",
  metadataBase: new URL("https://wazahahmad.vercel.app"),
  openGraph: {
    title: "Wazah Ahmad — Senior Web Developer",
    description: "Websites, commerce, and automations built with care.",
    url: "https://wazahahmad.vercel.app",
    type: "website",
  },
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
