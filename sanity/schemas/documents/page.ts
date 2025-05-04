import { defineField, defineType } from "sanity";
import { orderRankField } from "@sanity/orderable-document-list";
import { isUniqueOtherThanLanguage } from "@/sanity/lib/isUnique";

const sections = [
    "hero",
    "featured_projects",
    "studio",
    "services",
    "approach"

]

const mappedSections = sections.map((section) => ({ type: section }));

export default defineType({
  name: "page",
  type: "document",
  title: "Page",
  groups: [
    {
      name: "content",
      title: "Content",
    },
    {
      name: "seo",
      title: "SEO",
    },
    {
      name: "settings",
      title: "Settings",
    },
  ],
  fieldsets: [
    {
      name: 'seoSettings',
      title: 'SEO Settings',
      options: {
        collapsible: true,
        collapsed: true, // Set to true to make it collapsed by default
      },
    },
  ],
  fields: [
    defineField({ 
      name: "title", type: "string", group: "content" 
    }),
    defineField({
        name: "slug",
        title: "Slug",
        type: "slug",
        options: {
          isUnique: isUniqueOtherThanLanguage,
          source: "title",
          maxLength: 96,
          documentInternationalization: {
            exclude: true,
          },
        },
        group: "settings",
        validation: (Rule) => Rule.required(),
    }),
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
  ]
});