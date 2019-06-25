export default {
  widgets: [
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              sites: [
                {
                  buildHookId: '5d08e89eff604c1edbcd9bf8',
                  title: 'Sanity Studio',
                  name: 'queerjs-studio',
                  apiId: 'f9e5d790-8654-4f14-b6a5-38fa85ad1916'
                },
                {
                  buildHookId: '5d08e89e3100bec47d0e8a4c',
                  title: 'Blog Website',
                  name: 'queerjs',
                  apiId: 'b7c55a87-1c77-4d9a-bc7d-71e9774d6e7c'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/SaraVieira/queerjs',
            category: 'Code'
          },
          {title: 'Frontend', value: 'https://queerjs.netlify.com', category: 'apps'}
        ]
      }
    },
    {name: 'project-users', layout: {height: 'auto'}},
    {
      name: 'document-list',
      options: {title: 'Recent attendees', order: '_createdAt desc', types: ['attendee']},
      layout: {width: 'medium'}
    }
  ]
}
