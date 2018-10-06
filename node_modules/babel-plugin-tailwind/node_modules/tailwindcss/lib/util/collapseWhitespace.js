'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = collapseWhitespace;
function collapseWhitespace(str) {
  return str.replace(/(\n|\r|\r\n)/g, ' ').replace(/\s+/g, ' ');
}