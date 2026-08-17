import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const socialImage = `${protocol}://${host}/og.png`;

  return {
    title: "Crowds｜你看見的是一個人，還是一套劇本？",
    description: "觀察貼文、留言與個人主頁，判斷帳號背後的行為模式。",
    icons: { icon: "/og.png" },
    openGraph: {
      title: "Crowds｜你看見的是一個人，還是一套劇本？",
      description: "觀察貼文、留言與個人主頁，判斷帳號背後的行為模式。",
      type: "website",
      images: [{ url: socialImage, width: 1200, height: 630, alt: "Crowds 社群觀察遊戲" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Crowds｜你看見的是一個人，還是一套劇本？",
      description: "觀察貼文、留言與個人主頁，判斷帳號背後的行為模式。",
      images: [socialImage],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  );
}
