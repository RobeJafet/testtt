import { locales } from "@/i18n/i18n-config";
import { fetchSanityHeader, fetchSanityFooter, fetchTranslations } from "@/sanity/sevices/fetchSettings";
import Header from "@/components/components/Header";
import Footer from "@/components/components/Footer";
import { PageTransitionHandler } from "@/components/components/PageTransitionHandler";

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
  const translations = await fetchTranslations();


  return (
    <>
      <Header navigation={navigation} lang={lang} translations={translations} />
      <PageTransitionHandler />
      <main className="bg-white text-black">
        {children}
      </main>
      {
        footer && (
          <Footer footer={footer} />
        )
      }
    </>
  );
}