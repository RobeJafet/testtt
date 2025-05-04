import { defineField, defineType } from "sanity";

export default defineType({
    name: "manifesto",
    title: "Manifesto",
    type: "object",
    fields: [
      defineField({ name: "title", type: "string" }),
      defineField({ name: "body", type: "text" }),
    ],
    preview: {
      select: {
        title: "title",
        subtitle: "_type", 
      },
    },
  });