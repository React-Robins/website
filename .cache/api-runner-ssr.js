var plugins = [{
      plugin: require('/Users/monica/Dev/React-Ladies/node_modules/gatsby-plugin-react-helmet/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/monica/Dev/React-Ladies/node_modules/gatsby-plugin-emotion/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/monica/Dev/React-Ladies/node_modules/gatsby-plugin-manifest/gatsby-ssr'),
      options: {"plugins":[],"name":"Cara - Gatsby Starter Portfolio","short_name":"Cara","description":"Playful & Colorful One-Page website with Parallax effect","start_url":"/","background_color":"#a0d8f1","theme_color":"#e07628","display":"fullscreen","icons":[{"src":"/favicons/android-chrome-192x192.png","sizes":"192x192","type":"image/png"},{"src":"/favicons/android-chrome-512x512.png","sizes":"512x512","type":"image/png"}]},
    }]
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`)

// Run the specified API in any plugins that have implemented it
module.exports = (api, args, defaultReturn, argTransform) => {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  // Run each plugin in series.
  // eslint-disable-next-line no-undef
  let results = plugins.map(plugin => {
    if (!plugin.plugin[api]) {
      return undefined
    }
    const result = plugin.plugin[api](args, plugin.options)
    if (result && argTransform) {
      args = argTransform({ args, result })
    }
    return result
  })

  // Filter out undefined results.
  results = results.filter(result => typeof result !== `undefined`)

  if (results.length > 0) {
    return results
  } else {
    return [defaultReturn]
  }
}
