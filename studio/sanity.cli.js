import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'td7vyie0',
    dataset: 'production'
  },
  deployment: {
    appId: 'o8sxkwjh527uuv8vl3wsjixs',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  },
})
