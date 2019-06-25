export default {
  name: 'organizer',
  type: 'document',
  title: 'Organizer',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name'
    },
    {
      name: 'twitterHandle',
      type: 'string',
      title: 'Twitter Handle'
    },
    {
      name: 'email',
      type: 'string',
      title: 'Email'
    },
    {
      name: 'phone-number',
      type: 'string',
      title: 'Phone Number'
    },
    {
      name: 'main',
      type: 'boolean',
      title: 'Main Organizer?'
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'email'
    }
  }
}
