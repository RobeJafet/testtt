import { defineField, defineType } from "sanity";

export default defineType({
    name: "approach",
    title: "Approach",
    type: "object",
    fields: [
        defineField({
            name: "heading",
            type: "string",
            title: "Heading",
            validation: (Rule) => Rule.required().error("Heading is required"),
        }),
        defineField({
            name: "title",
            type: "string",
            title: "Title",
        }),
        defineField({
            name: "description",
            type: "text",
        }),
        defineField({
            name: "image",
            type: "image",
            fields: [
                defineField({
                    name: "alt",
                    type: "string",
                    title: "Alt text",
                }),
            ],
        }),
        defineField({
            name: "link",
            type: "link"
        })
    ],
    preview: {
        select: {
            title: "title",
        },
        prepare(selection) {
            return {
                title: "Approach",
            };
        },
    },
});