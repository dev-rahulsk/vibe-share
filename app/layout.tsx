import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import '@stream-io/video-react-sdk/dist/css/styles.css';
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VibeShare",
  description: "Video Calling App",
  icons: {
    icon: "/icons/logo.svg"
  },

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        layout: {
          logoImageUrl: '/icons/logo.svg',
          socialButtonsVariant: 'iconButton',
        },
        variables: {
          colorText: '#FFF',
          colorInputText: '#FFF',
          colorPrimary: '#0E78F9',
          colorBackground: '#1C1F2E',
          colorInputBackground: '#252A41',
        }
      }}
    >
      <html lang="en">
        <head>
          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2559454197596106"
            crossOrigin="anonymous"></script>
        </head>
        <body className={`${inter.className} bg-dark-2`}>
          <Providers>
            {children}
            <Toaster />
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
