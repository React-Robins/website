export default {
  name: 'thanks',
  type: 'document',
  title: 'Special Thanks',
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
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'link'
    }
  }
}
