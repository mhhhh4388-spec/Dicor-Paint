import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {EyeOpenIcon} from '@sanity/icons/EyeOpen'
import {schemaTypes} from './schemaTypes'
import ProductPreview from './components/ProductPreview'

export default defineConfig({
  name: 'default',
  title: 'dicor piant 2026',

  projectId: 'td7vyie0',
  dataset: 'production',

  plugins: [
    structureTool({
      defaultDocumentNode: (S) =>
        S.document().views([
          S.view.form(),
          S.view.component(ProductPreview).title('Aperçu / معاينة').icon(EyeOpenIcon),
        ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
