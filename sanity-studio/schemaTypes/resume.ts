import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'resume',
  title: 'Resume',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Professional Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 4,
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
      name: 'experience',
      title: 'Experience',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'company', type: 'string', title: 'Company'},
            {name: 'role', type: 'string', title: 'Role'},
            {name: 'period', type: 'string', title: 'Period (e.g., 2022 → Present)'},
          ],
        },
      ],
    }),
    defineField({
      name: 'education',
      title: 'Education',
      type: 'object',
      fields: [
        {name: 'institution', type: 'string', title: 'Institution'},
        {name: 'period', type: 'string', title: 'Period'},
      ],
    }),
    defineField({
      name: 'skills',
      title: 'Skills',
      type: 'object',
      fields: [
        {
          name: 'design',
          type: 'array',
          title: 'Design Skills',
          of: [{type: 'string'}],
        },
        {
          name: 'tools',
          type: 'array',
          title: 'Tools',
          of: [{type: 'string'}],
        },
      ],
    }),
    defineField({
      name: 'resumeUrl',
      title: 'Resume/CV URL',
      type: 'url',
      description: 'Link to your resume PDF (Google Drive, Dropbox, etc.)',
      validation: (Rule) => Rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fields: [
        {name: 'linkedin', type: 'url', title: 'LinkedIn'},
        {name: 'behance', type: 'url', title: 'Behance'},
        {name: 'instagram', type: 'url', title: 'Instagram'},
        {name: 'email', type: 'string', title: 'Email'},
      ],
    }),
  ],
})
