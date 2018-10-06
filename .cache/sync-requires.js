// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---src-templates-post-js": preferDefault(require("/Users/monica/Dev/React-Ladies/src/templates/post.js")),
  "component---src-templates-category-js": preferDefault(require("/Users/monica/Dev/React-Ladies/src/templates/category.js")),
  "component---cache-dev-404-page-js": preferDefault(require("/Users/monica/Dev/React-Ladies/.cache/dev-404-page.js")),
  "component---src-pages-categories-js": preferDefault(require("/Users/monica/Dev/React-Ladies/src/pages/categories.js")),
  "component---src-pages-contact-js": preferDefault(require("/Users/monica/Dev/React-Ladies/src/pages/contact.js")),
  "component---src-pages-index-js": preferDefault(require("/Users/monica/Dev/React-Ladies/src/pages/index.js")),
  "component---src-pages-success-js": preferDefault(require("/Users/monica/Dev/React-Ladies/src/pages/success.js"))
}

