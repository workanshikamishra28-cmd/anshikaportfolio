import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'about',
  title: 'About Section',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Main Heading',
      type: 'object',
      fields: [
        {name: 'line1', type: 'string', title: 'Line 1'},
        {name: 'line2', type: 'string', title: 'Line 2 (Italic/Accent)'},
        {name: 'line3', type: 'string', title: 'Line 3'},
      ],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
    }),
    defineField({
      name: 'designPhilosophy',
      title: 'Design Philosophy',
      type: 'object',
      fields: [
        {name: 'title', type: 'string', title: 'Title'},
        {name: 'content', type: 'text', title: 'Content', rows: 5},
      ],
    }),
    defineField({
      name: 'marqueeText',
      title: 'Marquee Text',
      type: 'string',
      initialValue: 'about me',
    }),
  ],
})
