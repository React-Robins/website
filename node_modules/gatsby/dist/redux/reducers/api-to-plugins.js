"use strict";

module.exports = (state = [], action) => {
  switch (action.type) {
    case `SET_SITE_API_TO_PLUGINS`:
      return Object.assign({}, action.payload);

    default:
      return state;
  }
};
//# sourceMappingURL=api-to-plugins.js.map