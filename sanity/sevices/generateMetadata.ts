import { urlFor } from "@/sanity/lib/image";
import { isLive } from "@/sanity/env";

const isProduction = isLive === "production";

export function generatePageMetadata({
  page,
  slug,
  locale,
}: {
  page: Sanity.Page | Sanity.Post;
  slug: string;
  locale: LocalePage;
}) {

  return {
    title: page?.meta_title || page?.title,
    description: page?.meta_description,
    openGraph: {
      images: [
        {
          url: page?.ogImage
            ? urlFor(page?.ogImage).auto("format").fit("max").quality(100).url()
            : `${process.env.NEXT_PUBLIC_SITE_URL}/images/og-image.jpg`,
          width: page?.ogImage?.asset?.metadata?.dimensions?.width || 1200,
          height: page?.ogImage?.asset?.metadata?.dimensions?.height || 630,
        },
      ],
      type: "website",
      locale: locale,
    },
    robots: !isProduction
      ? "noindex, nofollow"
      : page?.noindex
        ? "noindex"
        : "index, follow",
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/${slug === 'home' ? "" : slug}`,
    },
  };
}
