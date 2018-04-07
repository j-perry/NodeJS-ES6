'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var People = function (_mongoose$Schema) {
    _inherits(People, _mongoose$Schema);

    function People() {
        _classCallCheck(this, People);

        return _possibleConstructorReturn(this, (People.__proto__ || Object.getPrototypeOf(People)).call(this, {
            name: {
                type: String,
                required: true
            },
            surname: {
                type: String,
                required: true
            }
        }, {
            collection: 'es6'
        }));
    }

    return People;
}(_mongoose2.default.Schema);

exports.default = _mongoose2.default.model('People', new People());