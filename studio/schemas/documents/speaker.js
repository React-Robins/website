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
      name: 'job',
      type: 'string',
      title: 'Job'
    },
    {
      name: 'photo',
      type: 'image',
      title: 'Photo'
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
