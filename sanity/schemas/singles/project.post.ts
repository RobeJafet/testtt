import { defineField, defineType } from "sanity";
import { isUniqueOtherThanLanguage } from "@/sanity/lib/isUnique";

export default defineType({
  name: "project.post",
  title: "Project",
  type: "document",
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
        collapsed: true, 
      },
    },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      group: "content",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "settings",
      options: {
        source: "title",
        maxLength: 96,
        isUnique: isUniqueOtherThanLanguage,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "services_text",
      title: "Services",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "team_members",
      title: "Team",
      type: "array",
      group: "content",
      of: [
        {
          type: "team",
        },
      ],
    }),
    defineField({
      name: "link",
      type: "link",
      title: "Website Link",
    }),
    defineField({
      name: "first_images",
      title: "First Images",
      type: "array",
      group: "content",
      of: [
        {
          type: "image",
          fields: [
            defineField({
                name: "alt",
                type: "string",
                title: "Alt text",
            }),
          ],
          preview: {
            select: {
              media: "asset",
              title: "alt",
            },
            prepare({ media, title }) {
              return {
                media,
                title: title || "Image",
              };
            },
          }
        },
      ],
      validation: (Rule) => Rule.max(3).error("You can only add up to 3 images."),
    }),
    defineField({
      name: "context_title",
      title: "Context Title",
      type: "text",
      group: "content",
    }),
    defineField({
      name: "context_description",
      title: "Context Description",
      type: "text",
      group: "content",
    }),
    defineField({
      name: "context_images",
      title: "Context Images",
      type: "array",
      group: "content",
      of: [
        {
          type: "image",
          fields: [
            defineField({
                name: "alt",
                type: "string",
                title: "Alt text",
            }),
          ],
          preview: {
            select: {
              media: "asset",
              title: "alt",
            },
            prepare({ media, title }) {
              return {
                media,
                title: title || "Image",
              };
            },
          }
        },
      ],
    }),
    defineField({
      name: "meta_title",
      title: "Meta Title",
      type: "string",
      group: "seo",
      fieldset: 'seoSettings'
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
    })
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "client.name",
    },
  },
});
