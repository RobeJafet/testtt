import { defineField, defineType } from "sanity";

export default defineType({
    name: "featured_projects",
    title: "Featured Projects",
    type: "object",
    fields: [
      defineField(
        { 
          name: "heading", 
          type: "string", 
          title: "Heading",
          validation: Rule => Rule.required().error('Heading is required')
        },
       
      ),
      defineField({
        name: "projects",
        title: "Projects",
        type: "array",
        of: [
          {
            type: "featured_project",
          },
        ],
      }),
      defineField({
        name: "linkText",
        type: "string",
        title: "Link Text",
        validation: Rule => Rule.required().error('Link Text is required')
      }),
    ],
    preview: {
      select: {
        title: "title",
      },
      prepare(selection) {
        return {
          title: "Featured Projects",
        };
      },
    },
  });