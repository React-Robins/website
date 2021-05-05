# React Ladies

## Getting Started

To run this site locally you will need to configure an AIRTABLE_KEY (user-level access to your Airtable account), 
AIRTABLE_BASE (spreadsheet level access to an Airtable base) and AIRTABLE_TABLE (table level access within an Airtable base).

1. Create a file in the project root called `.env.production` with the contents `AIRTABLE_KEY=somekey`. `somekey` needs to be a valid AirTable API key; if you're part of React Ldies and need the real API key, ask another organizer to give it to you.
   
2. add `AIRTABLE_BASE=somebase`. `somebase` needs to be a valid Airtable Base ID.

3. add `AIRTABLE_TABLE=tablename`. `tablename` needs to be a valid Airtable Table ID.

3. Run the following in terminal: 
To install the `netlify-cli` in order to be able to run the registration function locally. 

```sh
npm install -g netlify-cli
npm i
npm run start
```

or 

```sh
yarn add -g netlify-cli 
yarn install
yarn start
```

1. Navigate to `http://localhost:8888`.

If you'd like to run the site without setting up Netlify functions locally then you can run `yarn dev` or `npm run dev` instead of `start` and then navigate to the site at  `http://localhost:8000`.


## Adding a New Event

- Go to data and make a new YAML file for your location
- Website to make google calendar links: https://decomaan.github.io/google-calendar-link-generator/

If you discover any bugs in this site, please [file an issue](https://github.com/react-ladies/website/issues/new).

This website was originally based off of a fork of -> https://github.com/queerjs/website. 

Thank you ✨
