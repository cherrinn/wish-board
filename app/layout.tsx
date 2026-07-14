import { IBM_Plex_Sans_Thai } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const font = IBM_Plex_Sans_Thai({
  subsets: ["thai"],
  weight: ["400"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`h-full antialiased`}>
      <body className={`${font.className} min-h-full flex flex-col`}>
        {children} <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
