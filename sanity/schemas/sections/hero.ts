import { defineField, defineType } from "sanity";

export default defineType({
    name: "hero",
    title: "Hero",
    type: "object",
    fields: [
      defineField(
        { 
          name: "principal_text", 
          type: "text", 
          title: "Principal Text" 
        },
      ),
      defineField(  {
        name: "image_desktop",
        type: "image",
        title: "Image Desktop",
        validation: Rule => Rule.required().error('Image Desktop is required')
      }),
      defineField({
        name: "image_tablet",
        type: "image",
        title: "Image Tablet",
      }),
      defineField({
        name: "image_mobile",
        type: "image",
        title: "Image Mobile",
      }),
    ],
    preview: {
      select: {
        title: "title",
      },
      prepare(selection) {
        return {
          title: "Hero",
        };
      },
    },
  });