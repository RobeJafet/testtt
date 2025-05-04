import { defineField, defineType } from "sanity";
import { orderRankField } from "@sanity/orderable-document-list";

const sections = [
    "hero",
    "featured_projects",
    "studio",
    "services",
    "approach"
]

const mappedSections = sections.map((section) => ({ type: section }));

export default defineType({
  name: "home",
  type: "document",
  title: "Home Page",
  groups: [
    {
      name: "content",
      title: "Content",
    },
    {
      name: "seo",
      title: "SEO",
    },
  ],
  fieldsets: [
    {
      name: 'seoSettings',
      title: 'SEO Settings',
      options: {
        collapsible: true,
        collapsed: true, 
      },
    },
  ],
  fields: [
    defineField({
      name: "sections",
      type: "array",
      group: "content",
      of: mappedSections,
      options: {
        insertMenu: {
          views: [
            {
              name: 'grid',
              previewImageUrl: (section) => 
                `/assets/cms/${section}.png`,
            },
            { name: 'list' },
          ]
        }
      },
      
    }),
    defineField({
      name: "meta_title",
      title: "Meta Title",
      type: "string",
      group: "seo",
      fieldset: 'seoSettings',
    }),
    defineField({
      name: "meta_description",
      title: "Meta Description",
      type: "text",
      group: "seo",
      fieldset: 'seoSettings',
    }),
    defineField({
        name: "noindex",
        title: "No Index",
        type: "boolean",
        initialValue: false,
        group: "seo",
        fieldset: 'seoSettings',
      }),
    defineField({
      name: "ogImage",
      title: "Open Graph Image - [1200x630]",
      type: "image",
      group: "seo",
      fieldset: 'seoSettings',
    }),
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
    orderRankField({ type: "page" }),
  ],
  preview: {
    select: {
      language: "language",
      media: "ogImage",
    },
    prepare({ language, media }) {
      return {
        title: `Home (${language.toUpperCase()})`,
        media: media,
      };
    },
  },
});