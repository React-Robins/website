<<<<<<< HEAD

# React-Ladies

We're a group of women and non-binary ReactJS enthusiasts in New York City (and beyond).

Gatsby website is currently under-construction 🚧 and contributions are welcome! Please contribute to the `home-v1` branch.

![Screenshot of React Ladies Website](https://raw.githubusercontent.com/M0nica/React-Ladies/home-v1/ReactLadies.png)

## Features

Current features:

- Gatsby v2.0.0
- Articles in Markdown
- Styled Components 💅
- Netlify Contact Form
- Categories
- Offline Support
- WebApp Manifest Support
- Typography.js
- SEO
    - Sitemap
    - Schema.org JSONLD
    - OpenGraph Tags
    - Twitter Tags
- Favicons

## Getting Started

Check your development environment! You'll need [Node.js](https://nodejs.org/en/), the [Gatsby CLI](https://www.gatsbyjs.org/docs/) and [node-gyp](https://github.com/nodejs/node-gyp#installation) installed. The official Gatsby website also lists two articles regarding this topic:
- [Gatsby on Windows](https://www.gatsbyjs.org/docs/gatsby-on-windows/)
- [Check your development environment](https://www.gatsbyjs.org/tutorial/part-zero/)


### Building your site

```
npm run build
```

Copy the content of the ``public`` folder to your webhost or use a website like Netlify which automates that for you.

**Attention:** You also need to edit ``static/robots.txt`` to include your domain!
=======
# gatsby-absurd

An absurd Gatsby starter. The collection of illustrations, [absurd.design](https://absurd.design/) by [Diana Valeanu](https://twitter.com/diana_valeanu) is a very fascinating and beautiful project with some pretty thoughtful concepts. Experimentation on how that could be put together on a site ended up as this starter.

[Live Demo](https://gatsby-absurd.netlify.com/)

## Installation

Install the dependencies:

### `yarn install`

Run the development server:

### `yarn dev`

Production build to `/public`:

### `yarn build`

Cleanup cache (often fixes misc errors when run before `yarn dev`):

### `yarn clean`

## Content

Each of the sections in the site are placed in `src/sections`. Data is usually separated out into objects/arrays to be rendered in the component.

## SEO

The component `src/components/common/SEO.js` handles all meta data and SEO content, modify the `SEO_DATA` variable to add the data automatically. For application manifest data and favicon, modify the `gatsby-plugin-manifest` configuration in `gatsby-config.js`.

## Styling

This project uses [styled-components]() to handle styling: `src/styles/theme.js` defines the styling base and `src/styles/GlobalStyles.js` includes basic element styles along with the CSS Reset.
>>>>>>> refresh/master
