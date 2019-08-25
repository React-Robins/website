# queerjs-web

## Add a city

- Go to `/studio/sanity.json` and add a new space in `__experimental_spaces`
- Duplicate a page in `web/studio` and name it the new city.
- Replace all old city names with new
- Add graphql endpoint to `gatsby-config`
- run `yarn sanity graphql deploy --dataset cityName`
