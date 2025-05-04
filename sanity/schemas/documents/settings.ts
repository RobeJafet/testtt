import { defineType, defineField, defineArrayMember } from "sanity";

export default defineType({
    name: "settings",
    type: "document",
    title: "Settings",
    fields: [
        defineField({
            name: 'header',
            type: 'array',
            of: [
                {
					type: 'link',
				},
            ],
            options: {
                insertMenu: {
                  views: [
                    { name: 'list' },
                  ]
                }
            },
        }),
        defineField({
            name: 'sitemap',
            type: 'array',
            of: [
                {
                    type: 'link',
                },
            ],
            options: {
                insertMenu: {
                  views: [
                    { name: 'list' },
                  ]
                }
            },
        }),
        defineField({
            name: "social_links",
            type: "array",
            of: [
                {
                    type: "link",
                },
            ],
            options: {
                insertMenu: {
                  views: [
                    { name: 'list' },
                  ]
                }
            },
        }),
        defineField({
            name: 'locations',
            type: 'string'
        }),
        defineField({
            name: 'mail_contact',
            type: 'link'
        }),
        defineField({
            name: 'terms_link',
            type: 'link'
        }),
        defineField({
            name: 'language',
            type: 'string',
            readOnly: true,
            hidden: true,
        }),
    ],
    preview: {
        select: {
            title: "title",
            language: "language",
        },
        prepare(selection) {
            const { language } = selection;
            return {
                title: `Settings (${language.toUpperCase()})`,
            };
        },
    },

});