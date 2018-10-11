/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

'use strict';

var babelGenerator = require('babel-generator')['default'];


/**
 * babel-generator has a bug where it doesn't correctly adds parens around
 * some flow types. This mokey patches the code generator.
 *
 * TODO(T22289880): remove this module once the babel issue is fixed
 * https://github.com/babel/babel/issues/6333
 */
function generate(ast) {
  var originalUnionTypeAnnotation = require('babel-generator/lib/printer').prototype.UnionTypeAnnotation;
  var originalIntersectionTypeAnnotation = require('babel-generator/lib/printer').prototype.IntersectionTypeAnnotation;
  require('babel-generator/lib/printer').prototype.UnionTypeAnnotation = function (node) {
    var needsParens = node.types.length > 1;
    if (needsParens) {
      this.token('(');
    }
    originalUnionTypeAnnotation.call(this, node);
    if (needsParens) {
      this.token(')');
    }
  };
  require('babel-generator/lib/printer').prototype.IntersectionTypeAnnotation = function (node) {
    var needsParens = node.types.length > 1;
    if (needsParens) {
      this.token('(');
    }
    originalIntersectionTypeAnnotation.call(this, node);
    if (needsParens) {
      this.token(')');
    }
  };
  try {
    return babelGenerator(ast, {
      flowCommaSeparator: true,
      quotes: 'single'
    }).code;
  } finally {
    require('babel-generator/lib/printer').prototype.UnionTypeAnnotation = originalUnionTypeAnnotation;
    require('babel-generator/lib/printer').prototype.IntersectionTypeAnnotation = originalIntersectionTypeAnnotation;
  }
}

module.exports = {
  generate: generate
};