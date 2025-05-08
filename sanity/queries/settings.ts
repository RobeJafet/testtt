import { groq } from "next-sanity";

export const HEADER_QUERY = groq`
    *[_type == "settings" && language == $lang][0]{
        header[]{
            ...,
            linkType == 'page' => {
                "page": page->{
                    _type,
                    "slug": slug.current,
                    language
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
          "slug": slug.current,
          language
        }
      }
    },
    social_links[]{
      ...,
      linkType == 'page' => {
        "page": page->{
          _type,
          "slug": slug.current,
          language
        }
      }
    },
    mail_contact{
      ...,
      linkType == 'page' => {
        "page": page->{
          _type,
          "slug": slug.current,
          language
        }
      }
    },
    terms_link{
      ...,
      linkType == 'page' => {
        "page": page->{
          _type,
          "slug": slug.current,
          language
        }
      }
    },
    locations
  }
`;


export const TRANSLATION_QUERY = groq`
*[
  _type == "translation.metadata" &&
  count(schemaTypes[@ in ["page", "project.post"]]) > 0 &&
  defined(translations[_key == "en"][0].value->slug.current) &&
  defined(translations[_key == "es"][0].value->slug.current)
]{
  "en": {
    "slug": translations[_key == "en"][0].value->slug.current,
    "type": translations[_key == "en"][0].value->_type
  },
  "es": {
    "slug": translations[_key == "es"][0].value->slug.current,
    "type": translations[_key == "es"][0].value->_type
  }
}

`