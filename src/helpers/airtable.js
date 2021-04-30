import Airtable from 'airtable'

const base = new Airtable({ apiKey: process.env.GATSBY_AIRTABLE_KEY }).base(
  process.env.GATSBY_AIRTABLE_BASE
)

export default doc => {
  base('all').create(doc, (err, record) => {
    if (err) {
      console.error(err)
      return
    }
    console.log(`Human was created, document ID is ${record.getId()}`)
  })
}
