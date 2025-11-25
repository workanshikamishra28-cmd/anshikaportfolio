import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'osApp',
  title: 'AnshikaOS Apps',
  type: 'document',
  fields: [
    defineField({
      name: 'appId',
      title: 'App ID',
      type: 'string',
      description: 'Unique identifier (e.g., about-me, work, resume)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'App Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon Name',
      type: 'string',
      description: 'React Icons name (e.g., FaUser, FaBriefcase)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'iconColor',
      title: 'Icon Color',
      type: 'string',
      description: 'Hex color for the icon background',
      initialValue: '#78201B',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in desktop and dock',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'appType',
      title: 'App Type',
      type: 'string',
      options: {
        list: [
          {title: 'About Me', value: 'about'},
          {title: 'Work/Projects', value: 'work'},
          {title: 'Resume', value: 'resume'},
          {title: 'To-Do List', value: 'todo'},
          {title: 'Gallery', value: 'gallery'},
          {title: 'Spotify', value: 'spotify'},
          {title: 'Text File', value: 'text'},
          {title: 'Trash', value: 'trash'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Text Content',
          type: 'text',
          rows: 10,
        },
        {
          name: 'image',
          title: 'Image',
          type: 'image',
          options: {hotspot: true},
        },
        {
          name: 'items',
          title: 'List Items',
          type: 'array',
          of: [{type: 'string'}],
        },
        {
          name: 'fileUrl',
          title: 'File URL',
          type: 'url',
        },
      ],
    }),
    defineField({
      name: 'defaultSize',
      title: 'Default Window Size',
      type: 'object',
      fields: [
        {name: 'width', type: 'number', initialValue: 600},
        {name: 'height', type: 'number', initialValue: 500},
      ],
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
})
