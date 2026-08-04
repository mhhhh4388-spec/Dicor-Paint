import {useCallback, useEffect, useRef, useState} from 'react'
import {Badge, Box, Button, Card, Code, Flex, Label, Spinner, Stack, Text} from '@sanity/ui'
import {useClient} from 'sanity'
import {RestoreIcon} from '@sanity/icons/Restore'
import previewConfig from '../previewConfig'

const PRODUCTS_Q = `*[_type == 'product'] { title, description, category, "image": image.asset->url, "gallery": gallery[].asset->url, "catalog": catalog.asset->url, catalogLabel }`
const CATEGORIES_Q = `*[_type == 'category'] | order(order asc){ key, name, nameEn, nameAr }`
const BRANCHES_Q = `*[_type == 'branch'] | order(order asc){ name, nameEn, nameAr, region, regionEn, regionAr, phone, whatsapp, "lat": gps.lat, "lng": gps.lng }`
const SETTINGS_Q = `*[_type == 'siteSettings'][0]{ whatsapp, phone1, phone2, facebook, email, slideshowEnabled, slideshowInterval, slideshowPauseOnHover }`

const injectPreviewData = (html, data) => {
  const script = `<script>window.__PREVIEW_DATA__=${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`
  const bodyIdx = html.indexOf('<body')
  if (bodyIdx === -1) return html
  const bodyEnd = html.indexOf('>', bodyIdx) + 1
  if (bodyEnd <= 0) return html
  return html.slice(0, bodyEnd) + script + html.slice(bodyEnd)
}

export default function ProductPreview(props) {
  const docId = (props.document && props.document.documentId) || ''
  const displayed = (props.document && props.document.displayed) || {}
  const docSig = JSON.stringify({
    title: displayed.title,
    description: displayed.description,
    category: displayed.category,
    catalogLabel: displayed.catalogLabel,
    image: displayed.image && displayed.image.asset && displayed.image.asset._ref,
    catalog: displayed.catalog && displayed.catalog.asset && displayed.catalog.asset._ref,
    gallery: (displayed.gallery || []).map((g) => g && g.asset && g.asset._ref),
  })

  const client = useClient({apiVersion: '2026-07-31'})
  const clientRef = useRef(client)
  clientRef.current = client

  const [state, setState] = useState({loading: true, srcDoc: null, error: null})
  const [nonce, setNonce] = useState(0)

  useEffect(() => {
    let cancelled = false
    const timer = setTimeout(async () => {
      setState((s) => ({...s, loading: true, error: null}))
      try {
        const previewClient = clientRef.current.withConfig({perspective: 'previews'})
        const [products, categories, branches, settings] = await Promise.all([
          previewClient.fetch(PRODUCTS_Q),
          previewClient.fetch(CATEGORIES_Q),
          previewClient.fetch(BRANCHES_Q),
          previewClient.fetch(SETTINGS_Q),
        ])
        if (cancelled) return
        if (!previewConfig.baseUrl) {
          setState({loading: false, srcDoc: null, error: 'NO_BASE_URL'})
          return
        }
        const res = await fetch(previewConfig.baseUrl, {cache: 'no-store'})
        if (!res.ok) throw new Error('Le site a répondu HTTP ' + res.status)
        const html = await res.text()
        if (cancelled) return
        const payload = {
          products: products || [],
          categories: categories || [],
          branches: branches || [],
          settings: settings || null,
        }
        setState({loading: false, srcDoc: injectPreviewData(html, payload), error: null})
      } catch (e) {
        if (!cancelled) {
          setState({loading: false, srcDoc: null, error: e && e.message ? e.message : String(e)})
        }
      }
    }, 500)
    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [docId, docSig, nonce])

  const reload = useCallback(() => setNonce((n) => n + 1), [])

  return (
    <Card height="fill" padding={3}>
      <Stack space={3} style={{height: '100%'}}>
        <Flex align="center" justify="space-between" gap={3} paddingX={1}>
          <Flex align="center" gap={2}>
            <Badge tone="caution">Aperçu non publié / معاينة قبل النشر</Badge>
            <Text size={1} muted>
              Site complet — données en cours de modification (drafts). الموقع كامل مع التعديلات غير المنشورة.
            </Text>
          </Flex>
          <Button
            text={state.loading ? 'Rechargement…' : 'Actualiser / تحديث'}
            icon={RestoreIcon}
            tone="primary"
            mode="ghost"
            onClick={reload}
            disabled={state.loading}
          />
        </Flex>

        {state.error === 'NO_BASE_URL' ? (
          <Card padding={4} tone="critical" radius={2} style={{border: '1px solid rgba(255,0,0,.2)'}}>
            <Stack space={3}>
              <Label size={1}>URL du site manquante / عنوان الموقع غير مضبوط</Label>
              <Text size={1}>
                Renseignez l'URL de votre site (ex: <Code>https://dicor-paint.netlify.app</Code>) dans le fichier{' '}
                <Code>studio/previewConfig.js</Code> ou via la variable d'environnement{' '}
                <Code>SANITY_STUDIO_PREVIEW_BASE_URL</Code>, puis redéployez le studio.
              </Text>
              <Text size={1} muted>
                Définissez عنوان الموقع في ملف studio/previewConfig.js ثم أعد نشر الستوديو.
              </Text>
            </Stack>
          </Card>
        ) : state.error ? (
          <Card padding={4} tone="critical" radius={2} style={{border: '1px solid rgba(255,0,0,.2)'}}>
            <Stack space={3}>
              <Label size={1}>Impossible de charger l'aperçu / تعذر تحميل المعاينة</Label>
              <Text size={1}>{state.error}</Text>
              <Text size={1} muted>
                Vérifiez que le site est déployé et que l'en-tête <Code>Access-Control-Allow-Origin: *</Code> est actif
                (déjà ajouté dans <Code>netlify.toml</Code>).
              </Text>
            </Stack>
          </Card>
        ) : !state.srcDoc ? (
          <Flex align="center" justify="center" style={{height: '60vh'}}>
            <Spinner muted />
          </Flex>
        ) : (
          <Box style={{height: 'calc(100vh - 130px)', minHeight: 420, borderRadius: 6, overflow: 'hidden', border: '1px solid rgba(201,164,101,.25)'}}>
            <iframe
              title="Aperçu du site"
              srcDoc={state.srcDoc}
              style={{width: '100%', height: '100%', border: 0, background: '#0d0d0d'}}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
            />
          </Box>
        )}
      </Stack>
    </Card>
  )
}
