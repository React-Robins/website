// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// document schemas
import attendee from './documents/attendee'
import speaker from './documents/speaker'
import sponsor from './documents/sponsor'
import thanks from './documents/thanks'
import organizer from './documents/organizer'
import siteSettings from './documents/siteSettings'

export default createSchema({
  name: 'queerjs',
  types: schemaTypes.concat([siteSettings, speaker, sponsor, attendee, thanks, organizer])
})
