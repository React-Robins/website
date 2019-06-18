export default {
  name: 'sponsor',
  type: 'document',
  title: 'Sponsor',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name'
    },
    {
      name: 'link',
      type: 'string',
      title: 'Link'
    },
    {
      name: 'media',
      type: 'image',
      title: 'Image'
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'ghLink'
    }
  }
}
