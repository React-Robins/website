export default {
  name: 'speaker',
  type: 'document',
  title: 'Speaker',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name'
    },
    {
      name: 'ghLink',
      type: 'string',
      title: 'Github URL'
    },
    {
      name: 'twitterLink',
      type: 'string',
      title: 'Twitter URL'
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'twitterLink'
    }
  }
}
