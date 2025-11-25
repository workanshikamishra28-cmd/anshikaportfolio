import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Anshika Portfolio CMS',

  projectId: '7yt3l4pv',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Hero Section')
              .child(S.document().schemaType('hero').documentId('hero')),
            S.listItem()
              .title('About Section')
              .child(S.document().schemaType('about').documentId('about')),
            S.divider(),
            S.listItem()
              .title('Projects')
              .child(S.documentTypeList('project').title('All Projects')),
            S.listItem()
              .title('Selected Works')
              .child(S.documentTypeList('selectedWork').title('Featured Works')),
            S.divider(),
            S.listItem()
              .title('Resume')
              .child(S.document().schemaType('resume').documentId('resume')),
            S.listItem()
              .title('Contact Information')
              .child(S.document().schemaType('contact').documentId('contact')),
            S.divider(),
            S.listItem()
              .title('🖥️ AnshikaOS Desktop')
              .child(S.document().schemaType('anshikaOSDesktop').documentId('anshikaOSDesktop')),
            S.listItem()
              .title('📱 AnshikaOS Apps')
              .child(S.documentTypeList('osApp').title('All OS Apps')),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },

  theme: {
    colors: {
      default: {
        base: {
          bg: '#F8EDEA',
          fg: '#78201B',
          border: '#D4A574',
          focusRing: '#78201B',
          shadow: {
            outline: 'rgba(120, 32, 27, 0.5)',
            umbra: 'rgba(120, 32, 27, 0.2)',
            penumbra: 'rgba(120, 32, 27, 0.14)',
            ambient: 'rgba(120, 32, 27, 0.12)',
          },
        },
        button: {
          default: {
            bg: '#78201B',
            fg: '#F8EDEA',
            border: '#78201B',
          },
          primary: {
            bg: '#78201B',
            fg: '#F8EDEA',
            border: '#78201B',
          },
        },
      },
    },
  },
})
