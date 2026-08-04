import {Iframe} from 'sanity-plugin-iframe-pane'

export const previewUrl = (process.env.SANITY_STUDIO_PREVIEW_BASE_URL || 'https://dicor-paint.vercel.app').replace(/\/+$/, '')

export const defaultDocumentNode = (S) =>
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
