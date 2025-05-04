import { locales } from "@/i18n/i18n-config";
import { fetchSanityHeader, fetchSanityFooter } from "@/sanity/sevices/fetchSettings";
import Header from "@/components/components/Header";
import Footer from "@/components/components/Footer";

export async function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

export default async function MainLayout({
  children,
  params,
}: {
  readonly children: React.ReactNode;
  params: Promise<{ lang: LocalePage }>;
}) {

  const {lang} = await params;
  const navigation = await fetchSanityHeader(lang);
  const footer = await fetchSanityFooter(lang);

  return (
    <>
      <Header navigation={navigation} lang={lang} />
      {children}
      {
        footer && (
          <Footer footer={footer} />
        )
      }
    </>
  );
}