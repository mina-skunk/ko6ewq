import { glob, file } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const radioClubs = defineCollection({
  loader: glob({ base: "./src/content/radio-clubs", pattern: "**/*.{md,mdx}" }),
  // Type-check frontmatter using a schema
  schema: z.object({
    name: z.string(),
    callsign: z.string().optional(),
    website: z.string().url()
  })
});

const stations = defineCollection({
  loader: glob({ base: "./src/content/stations", pattern: "**/*.{md,mdx}" }),
  // Type-check frontmatter using a schema
  schema: z.object({
    name: z.string(),
    callsign: z.string(),
    frequency: z.coerce.number(),
    website: z.string().url().optional(),
    offset: z.coerce.number().optional(),
    tone: z.coerce.number().optional(),
    echolink: z.coerce.string().optional(),
    allstarlink: z.coerce.string().optional(),
    grid: z.string().optional(),
    club: z.string().optional(),
    repeaterworld: z.string().optional(),
    repeaterbook: z.object({
      stateid: z.coerce.string(),
      id: z.coerce.string(),
    }).optional(),
    preview: z.string().optional(),
    tags: z.array(z.string()).optional(),
    categories: z.array(z.string()).optional(),
  }),
});

const links = defineCollection({
  loader: file("./src/content/links.json"),
  // Type-check frontmatter using a schema
  schema: z.object({
    name: z.string(),
    url: z.string().url()
  }),
});

export const collections = {
  radioClubs,
  stations,
  links
};
