export default {
  name: 'bioPortableText',
  type: 'array',
  title: 'Excerpt',
  of: [
    {
      type: 'block',
      title: 'Block',
      styles: [{title: 'Normal', value: 'normal'}],
      lists: [],
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
          {title: 'Code', value: 'code'}
        ]
      }
    }
  ]
}
