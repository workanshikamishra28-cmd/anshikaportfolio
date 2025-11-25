import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({
      name: 'experienceBadge',
      title: 'Experience Badge',
      type: 'string',
      description: 'Text shown in the experience badge (e.g., "+6 YEARS")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'portfolioTitle',
      title: 'Portfolio Title',
      type: 'object',
      fields: [
        {name: 'line1', type: 'string', title: 'Line 1', initialValue: 'Port'},
        {name: 'line2', type: 'string', title: 'Line 2', initialValue: 'folio'},
      ],
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'object',
      fields: [
        {name: 'line1', type: 'string', title: 'Line 1'},
        {name: 'line2', type: 'string', title: 'Line 2'},
      ],
    }),
    defineField({
      name: 'metadata',
      title: 'Metadata',
      type: 'object',
      fields: [
        {name: 'copyright', type: 'string', title: 'Copyright Text'},
        {name: 'year', type: 'string', title: 'Year'},
      ],
    }),
    defineField({
      name: 'ctaButton',
      title: 'CTA Button',
      type: 'object',
      fields: [
        {name: 'text', type: 'string', title: 'Button Text'},
        {name: 'icon', type: 'string', title: 'Button Icon (emoji)'},
      ],
    }),
  ],
})
