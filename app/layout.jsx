import "./globals.css";

export const metadata = {
  title: "Wazah Ahmad — Web Developer",
  description: "Wazah Ahmad is a web developer building thoughtful, modern digital experiences with React, WordPress, and the web.",
  metadataBase: new URL("https://wazahahmad.vercel.app"),
  openGraph: { title: "Wazah Ahmad — Web Developer", description: "Thoughtful web experiences, made with care.", url: "https://wazahahmad.vercel.app", siteName: "Wazah Ahmad", type: "website" },
};

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}
