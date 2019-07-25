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
      name: 'photo',
      type: 'image',
      title: 'Photo'
    },
    {
      name: 'twitterLink',
      type: 'string',
      title: 'Twitter URL'
    },
    {
      name: 'mc',
      type: 'boolean',
      title: 'MC'
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'twitterLink'
    }
  }
}
