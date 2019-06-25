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

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'queerjs',
  // Then proceed to concatenate our our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    siteSettings,
    speaker,
    sponsor,
    attendee,
    thanks,
    organizer

    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
  ])
})
