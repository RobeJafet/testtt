import { defineField, defineType } from "sanity";

export default defineType({
    name: "studio",
    title: "Studio",
    type: "object",
    fields: [
        defineField({
            name: "heading",
            type: "string",
            title: "Heading",
            validation: (Rule) => Rule.required().error("Heading is required"),
        }),
        defineField({
            title: "Title",
            name: "title",
            type: "string",
        }),
        defineField({
            name: "description",
            type: "text",
            title: "Description",
        }),
        defineField({
            name: "link",
            type: "link",
        }),
        defineField({
            name: "images",
            type: "array",
            of: [
                {
                    type: "image",
                },
            ],
            validation: (Rule) => Rule.max(2)
        }),
    ],
    preview: {
        select: {
            title: "title",
        },
        prepare(selection) {
            return {
                title: "Studio",
            };
        },
    },
});