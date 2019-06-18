export default {
  name: 'siteSettings',
  type: 'document',
  title: 'Site Settings',
  __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'],
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
      name: 'date',
      type: 'datetime',
      title: 'Date'
    },
    {
      name: 'organizers',
      type: 'array',
      title: 'Keywords',
      description: 'The meetup organizers',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    }
  ]
}
