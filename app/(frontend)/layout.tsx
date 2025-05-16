import { SanityLive } from "@/sanity/lib/live";
import { VisualEditing } from "next-sanity";
import { draftMode } from "next/headers";
import { Toaster } from "sonner";
import localFont from 'next/font/local'
import DisableDraftMode from "@/components/components/DisableDraftMode";
import "../main.css";

const myFont = localFont({
  src: '../../fonts/FormaDJRText-Medium.woff2',
  variable: '--font-forma-medium',
  display: 'swap',
});

const myFont2 = localFont({
  src: '../../fonts/SuisseIntlMono-Regular.woff2',
  variable: '--font-suisse-mono',
  display: 'swap',
});


export default async function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const { isEnabled: isDraftMode } = await draftMode();
  return (
    <body className={`${myFont2.variable} ${myFont.variable} antialiased bg-white text-black`}>
      {children}
      <Toaster />
        {isDraftMode && (
          <>
            <DisableDraftMode />
            <VisualEditing />
          </>
        )}
      <SanityLive />
    </body>
  );
}
