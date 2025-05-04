import { defineField, defineType } from "sanity";


export default defineType({
    name: "service",
    title: "Service",
    type: "object",
    fields: [
      defineField(
        {
          title: "Title",
          name: "title",
          type: "string",
        },
        
      ),
      defineField(
        {
            name: "description",
            type: "array",
            of: [
              {
                type: "string",
              },
            ],
        }
      )
      
    ],
    preview: {
      select: {
        title: "title",
      },
      prepare(selection) {
        return {
          title: selection.title || "Service",
        };
      },
    },
  });