"use server";
import { HOME_QUERY, PAGE_QUERY } from "@/sanity/queries/page";
import { sanityFetch } from "@/sanity/lib/live";
import { PAGE_SLUG } from "@/sanity/queries/page";
import { locales } from '@/i18n/i18n-config';


export const fetchSanityPageBySlug = async ( slug: string ): Promise<Sanity.Page> => {
  const { data } = await sanityFetch({
    query: PAGE_QUERY,
    params: { slug },
  });
  
  return data;
};

export const fetchSanityHome = async (lang: LocalePage ): Promise<Sanity.Page> => {
  const { data } = await sanityFetch({
    query: HOME_QUERY,
    params: { lang },
  });
  return data;
}

export const fetchSanityPageSlugs = async (): Promise<{lang: LocalePage, slug: string}[]> => {
  const slugsArrays = await Promise.all(
    locales.map(async (locale) => {
      const { data } = await sanityFetch({
        query: PAGE_SLUG,
        params: { lang: locale },
        perspective: "published",
        stega: false,
      });

      return data.map((item: { slug: { current: string } }) => ({
          lang: locale,
          slug: item.slug.current,
        }));
    })
  );

  return slugsArrays.flat();
};