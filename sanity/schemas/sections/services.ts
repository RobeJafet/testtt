import { defineField, defineType } from "sanity";

export default defineType({
    name: "services",
    title: "Services",
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
            name: "allServices",
            type: "array",
            of: [
                {
                    type: "service",
                },
            ],
        }),
    ],
    preview: {
        select: {
            title: "title",
        },
        prepare(selection) {
            return {
                title: "Services",
            };
        },
    },
});