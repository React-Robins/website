'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _postcss = require('postcss');

var _postcssValueParser = require('postcss-value-parser');

var _postcssValueParser2 = _interopRequireDefault(_postcssValueParser);

var _cssnanoUtilGetArguments = require('cssnano-util-get-arguments');

var _cssnanoUtilGetArguments2 = _interopRequireDefault(_cssnanoUtilGetArguments);

var _has = require('has');

var _has2 = _interopRequireDefault(_has);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const directions = ['top', 'right', 'bottom', 'left', 'center'];

const center = '50%';

const horizontal = {
    right: '100%',
    left: '0'
};

const vertical = {
    bottom: '100%',
    top: '0'
};

function transform(decl) {
    const values = (0, _postcssValueParser2.default)(decl.value);
    const args = (0, _cssnanoUtilGetArguments2.default)(values);
    const relevant = [];
    args.forEach(arg => {
        relevant.push({
            start: null,
            end: null
        });
        arg.forEach((part, index) => {
            const isPosition = ~directions.indexOf(part.value) || (0, _postcssValueParser.unit)(part.value);
            const len = relevant.length - 1;
            if (relevant[len].start === null && isPosition) {
                relevant[len].start = index;
                relevant[len].end = index;
                return;
            }
            if (relevant[len].start !== null) {
                if (part.type === 'space') {
                    return;
                } else if (isPosition) {
                    relevant[len].end = index;
                    return;
                }
                return;
            }
        });
    });
    relevant.forEach((range, index) => {
        if (range.start === null) {
            return;
        }
        const position = args[index].slice(range.start, range.end + 1);
        if (position.length > 3) {
            return;
        }
        if (position.length === 1 || position[2].value === 'center') {
            if (position[2]) {
                position[2].value = position[1].value = '';
            }
            const { value } = position[0];
            const map = Object.assign({}, horizontal, {
                center
            });
            if ((0, _has2.default)(map, value)) {
                position[0].value = map[value];
            }
            return;
        }
        if (position[0].value === 'center' && ~directions.indexOf(position[2].value)) {
            position[0].value = position[1].value = '';
            const { value } = position[2];
            if ((0, _has2.default)(horizontal, value)) {
                position[2].value = horizontal[value];
            }
            return;
        }
        if ((0, _has2.default)(horizontal, position[0].value) && (0, _has2.default)(vertical, position[2].value)) {
            position[0].value = horizontal[position[0].value];
            position[2].value = vertical[position[2].value];
            return;
        } else if ((0, _has2.default)(vertical, position[0].value) && (0, _has2.default)(horizontal, position[2].value)) {
            let first = position[0].value;
            position[0].value = horizontal[position[2].value];
            position[2].value = vertical[first];
            return;
        }
    });
    decl.value = values.toString();
}

exports.default = (0, _postcss.plugin)('postcss-normalize-positions', () => {
    return css => css.walkDecls(/^(background(-position)?|(-webkit-)?perspective-origin)$/i, transform);
});
module.exports = exports['default'];