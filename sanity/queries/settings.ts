import { groq } from "next-sanity";

export const HEADER_QUERY = groq`
    *[_type == "settings" && language == $lang][0]{
        header[]{
            ...,
            linkType == 'page' => {
                "page": page->{
                    _type,
                    "slug": slug.current
                }
            }
        }
    }
`;

export const FOOTER_QUERY = groq`
  *[_type == "settings" && language == $lang][0]{
    sitemap[]{
      ...,
      linkType == 'page' => {
        "page": page->{
          _type,
          "slug": slug.current
        }
      }
    },
    social_links[]{
      ...,
      linkType == 'page' => {
        "page": page->{
          _type,
          "slug": slug.current
        }
      }
    },
    mail_contact{
      ...,
      linkType == 'page' => {
        "page": page->{
          _type,
          "slug": slug.current
        }
      }
    },
    terms_link{
      ...,
      linkType == 'page' => {
        "page": page->{
          _type,
          "slug": slug.current
        }
      }
    },
    locations
  }
`;