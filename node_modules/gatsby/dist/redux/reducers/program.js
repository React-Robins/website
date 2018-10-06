"use strict";

module.exports = (state = {
  directory: `/`
}, action) => {
  switch (action.type) {
    case `SET_PROGRAM`:
      return Object.assign({}, action.payload);

    case `SET_PROGRAM_EXTENSIONS`:
      return Object.assign({}, state, {
        extensions: action.payload
      });

    default:
      return state;
  }
};
//# sourceMappingURL=program.js.map