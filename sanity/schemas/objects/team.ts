import { defineField, defineType } from "sanity";

export default defineType({
  name: "team",
  title: "Team",
  type: "object",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "name",
    },
  },
});