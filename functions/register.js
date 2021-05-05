const Airtable = require('airtable')
const base = new Airtable({ apiKey: process.env.AIRTABLE_KEY }).base(process.env.AIRTABLE_BASE)

exports.handler = async function(event) {
  // ?name=Katherine Johnson&github=nasa&city=online-2021-may
  const { name, github = 'react-ladies', city, email } = event.queryStringParameters

  console.log('email', decodeURI(email))

  if (!name || !city || !email) {
    console.error(err)
    return {
      statusCode: 500,
      body: `Something went wrong. Double check if you sent a valid name and city.`
    }
  }

  try {
    return await base(process.env.AIRTABLE_TABLE)
      .create({
        name: name,
        city: city,
        ghLink: github,
        email: decodeURI(email)
      })
      .then(record => {
        return {
          statusCode: 200,
          body: `Successfully added ${event.queryStringParameters.name}. document ID is ${record.id}`
        }
      })
  } catch (err) {
    const errorMsg = `Error. Something went wrong. Airtable returned: ${err}`
    console.log(errorMsg)
    return {
      statusCode: 500,
      body: errorMsg
    }
  }
}
