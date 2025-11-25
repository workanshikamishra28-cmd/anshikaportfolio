import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'anshikaOSDesktop',
  title: 'AnshikaOS Desktop',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Configuration Name',
      type: 'string',
      description: 'Internal name for this configuration',
      initialValue: 'Desktop Configuration',
      validation: (Rule) => Rule.required(),
    }),
    
    // Sticky Note Configuration
    defineField({
      name: 'stickyNote',
      title: 'Sticky Note (To-Do List)',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Note Title',
          type: 'string',
          initialValue: 'To do:',
        },
        {
          name: 'items',
          title: 'To-Do Items',
          type: 'array',
          of: [{type: 'string'}],
          description: 'List of to-do items',
        },
        {
          name: 'backgroundColor',
          title: 'Background Color',
          type: 'string',
          description: 'Hex color for sticky note background',
          initialValue: '#fef3c7',
        },
        {
          name: 'rotation',
          title: 'Rotation (degrees)',
          type: 'number',
          description: 'Rotation angle in degrees (e.g., -1.5)',
          initialValue: -1.5,
        },
        {
          name: 'position',
          title: 'Position',
          type: 'object',
          fields: [
            {name: 'top', type: 'number', initialValue: 32},
            {name: 'left', type: 'number', initialValue: 32},
          ],
        },
      ],
    }),

    // Welcome Text Configuration
    defineField({
      name: 'welcomeText',
      title: 'Welcome Text',
      type: 'object',
      fields: [
        {
          name: 'line1',
          title: 'First Line',
          type: 'string',
          initialValue: 'welcome to my',
        },
        {
          name: 'line2',
          title: 'Second Line',
          type: 'string',
          initialValue: 'portfolio.',
        },
        {
          name: 'visible',
          title: 'Show Welcome Text',
          type: 'boolean',
          initialValue: true,
        },
      ],
    }),

    // Desktop Icons Configuration
    defineField({
      name: 'desktopIcons',
      title: 'Desktop Icons',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'id',
              title: 'Icon ID',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'iconType',
              title: 'Icon Type',
              type: 'string',
              options: {
                list: [
                  {title: 'Folder', value: 'folder'},
                  {title: 'PDF', value: 'pdf'},
                  {title: 'Text File', value: 'text'},
                  {title: 'Image', value: 'image'},
                  {title: 'Trash', value: 'trash'},
                ],
              },
            },
            {
              name: 'badge',
              title: 'Badge Icon',
              type: 'string',
              description: 'Optional badge icon (e.g., AWS logo)',
            },
            {
              name: 'position',
              title: 'Position',
              type: 'object',
              fields: [
                {
                  name: 'top',
                  title: 'Top (px)',
                  type: 'number',
                },
                {
                  name: 'bottom',
                  title: 'Bottom (px)',
                  type: 'number',
                },
                {
                  name: 'left',
                  title: 'Left (px)',
                  type: 'number',
                },
                {
                  name: 'right',
                  title: 'Right (px)',
                  type: 'number',
                },
              ],
            },
            {
              name: 'linkedApp',
              title: 'Linked App',
              type: 'reference',
              to: [{type: 'osApp'}],
              description: 'Link to an OS app to open when clicked',
            },
            {
              name: 'order',
              title: 'Display Order',
              type: 'number',
            },
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'iconType',
            },
          },
        },
      ],
    }),

    // Background Configuration
    defineField({
      name: 'background',
      title: 'Desktop Background',
      type: 'object',
      fields: [
        {
          name: 'color',
          title: 'Background Color',
          type: 'string',
          initialValue: '#e8e8e8',
        },
        {
          name: 'gridEnabled',
          title: 'Show Grid',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'gridSize',
          title: 'Grid Size (px)',
          type: 'number',
          initialValue: 30,
        },
        {
          name: 'gridOpacity',
          title: 'Grid Opacity',
          type: 'number',
          description: 'Value between 0 and 1',
          initialValue: 0.2,
          validation: (Rule) => Rule.min(0).max(1),
        },
      ],
    }),

    // Menu Bar Configuration
    defineField({
      name: 'menuBar',
      title: 'Menu Bar',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Portfolio Title',
          type: 'string',
          initialValue: 'Anshika Mishra Portfolio',
        },
        {
          name: 'menuItems',
          title: 'Menu Items',
          type: 'array',
          of: [{type: 'string'}],
          initialValue: ['Contact', 'Resume'],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
