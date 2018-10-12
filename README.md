
# React-Ladies

We're a group of women and non-binary ReactJS enthusiasts in New York City (and beyond).

Gatsby website is currently under-construction 🚧 and contributions are welcome! **Please contribute to the `home-v1` branch.**

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

Install dependencies 

```npm install```

then:
```gatsby develop``` — Gatsby will start a hot-reloading development environment accessible at localhost:8000
Try editing the JavaScript pages in src/pages. Saved changes will live reload in the browser.

```gatsby build``` — Gatsby will perform an optimized production build for your site generating static HTML and per-route JavaScript code bundles.

```gatsby serve``` — Gatsby starts a local HTML server for testing your built site.

Copy the content of the ``public`` folder to your webhost or use a website like Netlify which automates that for you.

**Attention:** You also need to edit ``static/robots.txt`` to include your domain!
