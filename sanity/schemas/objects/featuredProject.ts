import { defineField, defineType } from "sanity";


export default defineType({
    name: "featured_project",
    title: "Project",
    type: "object",
    fields: [
      defineField(
        {
          title: "Project",
          name: "project",
          type: "reference",
          to: [{ type: "project.post" }],
          options: {
            filter: ({ document }) => {
              const { language } = document
              if (language) {
                  return {
                      filter: 'language == $language',
                      params: {
                          language: language,
                      },
                  }
              }
              return {}
          },
            disableNew: true,
            documentInternationalization: {
              exclude: true,
            },
          },
          validation: Rule => Rule.required().error('Project is required')
        }
      ),
      defineField(
        {
          name: "images",
          type: "array",
          of: [
            {
              type: "image",
            },
          ],
          validation: Rule => Rule.length(2).error('Exactly two images are required'),
        }
      ),
      defineField(
        {
          title: "Description",
          name: "description",
          type: "text"
        }
      )
    ],
    preview: {
      select: {
        title: "project.title",
      },
      prepare(selection) {
        return {
          title: selection.title || "Project",
        };
      },
    },
  });