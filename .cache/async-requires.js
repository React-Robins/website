// prefer default export if available
const preferDefault = m => m && m.default || m

exports.components = {
  "component---src-templates-post-js": () => import("/Users/monica/Dev/React-Ladies/src/templates/post.js" /* webpackChunkName: "component---src-templates-post-js" */),
  "component---src-templates-category-js": () => import("/Users/monica/Dev/React-Ladies/src/templates/category.js" /* webpackChunkName: "component---src-templates-category-js" */),
  "component---cache-dev-404-page-js": () => import("/Users/monica/Dev/React-Ladies/.cache/dev-404-page.js" /* webpackChunkName: "component---cache-dev-404-page-js" */),
  "component---src-pages-categories-js": () => import("/Users/monica/Dev/React-Ladies/src/pages/categories.js" /* webpackChunkName: "component---src-pages-categories-js" */),
  "component---src-pages-contact-js": () => import("/Users/monica/Dev/React-Ladies/src/pages/contact.js" /* webpackChunkName: "component---src-pages-contact-js" */),
  "component---src-pages-index-js": () => import("/Users/monica/Dev/React-Ladies/src/pages/index.js" /* webpackChunkName: "component---src-pages-index-js" */),
  "component---src-pages-success-js": () => import("/Users/monica/Dev/React-Ladies/src/pages/success.js" /* webpackChunkName: "component---src-pages-success-js" */)
}

exports.data = () => import("/Users/monica/Dev/React-Ladies/.cache/data.json")

