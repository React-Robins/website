# React Ladies

## Getting Started

To run this site locally,

1. Create a file in the project root called `.env.production` with the contents `GATSBY_AIRTABLE_KEY=somekey`. `somekey` needs to be a valid AirTable API key; if you're part of React Ldies and need the real API key, ask another organizer to give it to you.
   
2. add `GATSBY_AIRTABLE_BASE=somebase`. `somebase` needs to be a valid Airtable Base ID.

3. Run the following in terminal: 

```sh
npm i
npm run dev
```

or 

```sh
yarn install
yarn run dev
```

4. Navigate to `http://localhost:8000`.


## Adding a New Meetup City

- Go to data and make a new YAML file for your city
- Website to make google calendar links: https://decomaan.github.io/google-calendar-link-generator/

If you discover any bugs in this site, please [file an issue](https://github.com/react-ladies/React-Ladies/issues/new).

Thank you ✨
