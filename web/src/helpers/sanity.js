import sanityClient from '@sanity/client'

export default sanityClient({
  projectId: 'atggkqis',
  dataset: 'production',
  token:
    'skHtAQAA3FfHcKm6kRQmBNaE2Puzw0BqoKkBBJeXCrezlGioYwp3YywbFVRcRiXuptoCOT9CFAI1rBrVq5nqrGw6FdvYWmtitz69eIO5LynHtfgHh0yiM3dfVLaOY9HP98DAasbWwmebtL4ldtKRFjW1ZXx9MjFIDtIG2eTYznHOhIIzifm9', // or leave blank to be anonymous user
  useCdn: true
})
