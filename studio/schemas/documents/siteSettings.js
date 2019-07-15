export default {
  name: 'siteSettings',
  type: 'document',
  title: 'Site Settings',
  __experimental_actions: [/* 'create', */ 'update', /* 'delete', */ 'publish'],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title'
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      description: 'Describe your blog for search engines and social media.'
    },
    {
      name: 'location',
      type: 'string',
      title: 'Location'
    },
    {
      name: 'googleMapsLink',
      type: 'string',
      title: 'Google Maps Link'
    },
    {
      name: 'date',
      type: 'datetime',
      title: 'Date'
    },
    {
      name: 'calendarLink',
      type: 'string',
      title: 'Calendar Link(https://jennamolby.com/tools/google-calendar-link-generator/)'
    },
    {
      name: 'cfp',
      type: 'boolean',
      title: 'Is CFP open?'
    },
    {
      name: 'organizers',
      type: 'array',
      title: 'Organizers',
      description: 'The meetup organizers',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      }
    }
  ]
}
