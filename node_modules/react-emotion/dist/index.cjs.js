'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));
var emotion = require('emotion');
var createEmotionStyled = _interopDefault(require('create-emotion-styled'));

var index = createEmotionStyled(emotion, React);

Object.keys(emotion).forEach(function (key) { exports[key] = emotion[key]; });
exports.default = index;
