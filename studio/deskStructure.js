import {Iframe} from 'sanity-plugin-iframe-pane'

export const previewUrl = (process.env.SANITY_STUDIO_PREVIEW_BASE_URL || 'https://dicor-paint.vercel.app').replace(/\/+$/, '')

export const SINGLETONS = ['siteSettings']

const documentViews = (S) =>
  S.document().views([
    S.view.form(),
    S.view
      .component(Iframe)
      .title('Preview / معاينة')
      .options({
        url: previewUrl,
        defaultSize: 'desktop',
        showDisplayUrl: true,
        reload: {button: true},
      }),
  ])

export const defaultDocumentNode = (S) => documentViews(S)

export const deskStructure = (S, context) => {
  const {schema} = context
  const types = schema.getTypeNames().filter((t) => !SINGLETONS.includes(t))

  return S.list()
    .title('Content / المحتوى')
    .items([
      S.listItem()
        .title('Site Settings / إعدادات الموقع')
        .id(SINGLETONS[0])
        .icon(() => '⚙️')
        .schemaType(SINGLETONS[0])
        .child(
          S.editor()
            .schemaType(SINGLETONS[0])
            .documentId(SINGLETONS[0])
            .views(documentViews(S)),
        ),
      S.divider(),
      ...types.map((t) => S.documentTypeListItem(t).title(t)),
    ])
}
