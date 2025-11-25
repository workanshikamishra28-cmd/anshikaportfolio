import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'contact',
  title: 'Contact Information',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: "Let's Work Together",
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'socialMedia',
      title: 'Social Media',
      type: 'object',
      fields: [
        {name: 'linkedin', type: 'url', title: 'LinkedIn URL'},
        {name: 'behance', type: 'url', title: 'Behance URL'},
        {name: 'instagram', type: 'url', title: 'Instagram URL'},
      ],
    }),
  ],
})
