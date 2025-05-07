import { locales } from '@/i18n/i18n-config';
import { sanityFetch } from "@/sanity/lib/live";
import { POST_SLUG, POST_QUERY, POST_PAGINATION_QUERY } from "@/sanity/queries/post";


export const fetchSanityPostSlugs = async (): Promise<{lang: LocalePage, slug: string}[]>  => {
    const slugsArrays = await Promise.all(
        locales.map(async (locale) => {
          const { data } = await sanityFetch({
            query: POST_SLUG,
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
}

export const fetchSanityPostBySlug = async ( slug: string, lang: LocalePage ): Promise<Sanity.Post> => {
    const { data } = await sanityFetch({
      query: POST_QUERY,
      params: { slug, lang },
    });
    return data;
}

