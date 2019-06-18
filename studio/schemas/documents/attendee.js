export default {
  name: 'attendee',
  type: 'document',
  title: 'Attendee',
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
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'ghLink'
    }
  }
}
