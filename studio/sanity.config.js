import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {defaultDocumentNode} from './deskStructure'

export default defineConfig({
  name: 'default',
  title: 'dicor piant 2026',

  projectId: 'td7vyie0',
  dataset: 'production',

  plugins: [
    structureTool({defaultDocumentNode}),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
