/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "build/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(2);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

	module.exports = require("babel-polyfill");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';

	var _express = __webpack_require__(3);

	var _express2 = _interopRequireDefault(_express);

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _server = __webpack_require__(5);

	var _reactRedux = __webpack_require__(6);

	var _store = __webpack_require__(7);

	var _store2 = _interopRequireDefault(_store);

	var _renderhtml = __webpack_require__(11);

	var _renderhtml2 = _interopRequireDefault(_renderhtml);

	var _app = __webpack_require__(12);

	var _app2 = _interopRequireDefault(_app);

	var _path = __webpack_require__(17);

	var _path2 = _interopRequireDefault(_path);

	var _axios = __webpack_require__(18);

	var _axios2 = _interopRequireDefault(_axios);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

	var server = (0, _express2.default)();
	server.disable('x-powered-by');
	server.use('/images', _express2.default.static(_path2.default.join(__dirname, '../src/assets/images')));
	server.use('/scripts', _express2.default.static('build'));
	server.use('/styles', _express2.default.static('lib'));
	server.use('/build', _express2.default.static(_path2.default.join(__dirname, 'build')));
	server.use('/build', _express2.default.static('build'));
	server.use(_express2.default.static(_path2.default.join(__dirname, '../')));
	server.get('/favicon.ico', function (req, res) {
	  return res.send('');
	});

	server.get('*', function () {
	  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
	    var data, store, intialHTML, state;
	    return regeneratorRuntime.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            data = {};

	            try {
	              _axios2.default.get('http://api.tvmaze.com/search/shows?q=girls').then(function (res) {
	                data = { shows: res.data };
	                console.log(res.data);
	              }).catch(function (error) {
	                console.log(error);
	              });
	              store = (0, _store2.default)({ data: data });
	              intialHTML = (0, _server.renderToString)(_react2.default.createElement(
	                _reactRedux.Provider,
	                { store: store },
	                _react2.default.createElement(_app2.default, null)
	              ));
	              state = store.getState();

	              res.send((0, _renderhtml2.default)(intialHTML, state));
	            } catch (err) {
	              console.error('error', err);
	              res.status(500).send('' + err);
	            }

	          case 2:
	          case 'end':
	            return _context.stop();
	        }
	      }
	    }, _callee, undefined);
	  }));

	  return function (_x, _x2) {
	    return _ref.apply(this, arguments);
	  };
	}());

	var PORT = process.env.PORT || 3000;

	server.listen(PORT, function () {
	  return console.log('listening on ', PORT);
	});
	/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	module.exports = require("express");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	module.exports = require("react");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	module.exports = require("react-dom/server");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	module.exports = require("react-redux");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = configureStore;

	var _redux = __webpack_require__(8);

	var _reduxThunk = __webpack_require__(9);

	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

	var _index = __webpack_require__(10);

	var _index2 = _interopRequireDefault(_index);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var middleware = [_reduxThunk2.default];

	function configureStore(initialState) {
	  var store = (0, _redux.createStore)(_index2.default, initialState, (0, _redux.compose)(_redux.applyMiddleware.apply(undefined, middleware)));

	  if (false) {
	    module.hot.accept('./reducers/index', function () {
	      store.replaceReducer(require('./reducers/index').default);
	    });
	  }

	  return store;
	}

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	module.exports = require("redux");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	module.exports = require("redux-thunk");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _redux = __webpack_require__(8);

	var rootReducer = (0, _redux.combineReducers)({
	  data: function data() {
	    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { data: '' };
	    return state;
	  }
	});

	exports.default = rootReducer;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = renderhtml;

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _server = __webpack_require__(5);

	var _server2 = _interopRequireDefault(_server);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function renderhtml(stringifyHTML, initialState) {
	  return '<!doctype html>' + _server2.default.renderToStaticMarkup(_react2.default.createElement(
	    'html',
	    null,
	    _react2.default.createElement(
	      'head',
	      null,
	      _react2.default.createElement(
	        'title',
	        null,
	        'server side rendering'
	      )
	    ),
	    _react2.default.createElement(
	      'body',
	      null,
	      _react2.default.createElement('div', { id: 'root', dangerouslySetInnerHTML: { __html: stringifyHTML } }),
	      _react2.default.createElement('script', { dangerouslySetInnerHTML: { __html: 'window.__PRELOADED_STATE__ = ' + JSON.stringify(initialState) + ';' } }),
	      _react2.default.createElement('script', { src: '/scripts/bundle.js' })
	    )
	  ));
	}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.App = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(6);

	var _history = __webpack_require__(13);

	var _junctions = __webpack_require__(14);

	var _reactJunctions = __webpack_require__(15);

	var _invoice = __webpack_require__(16);

	var _invoice2 = _interopRequireDefault(_invoice);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	//


	var history;
	if (typeof window !== 'undefined') {
	  history = (0, _history.createBrowserHistory)();
	} else {
	  history = (0, _history.createMemoryHistory)();
	}

	var junction = (0, _junctions.createJunction)({
	  Dashboard: {
	    default: true
	  },
	  Invoices: {
	    next: _invoice2.default.junction
	  }
	});

	var AppContent = function (_Component) {
	  _inherits(AppContent, _Component);

	  function AppContent() {
	    _classCallCheck(this, AppContent);

	    return _possibleConstructorReturn(this, (AppContent.__proto__ || Object.getPrototypeOf(AppContent)).apply(this, arguments));
	  }

	  _createClass(AppContent, [{
	    key: 'renderRoute',
	    value: function renderRoute(route, locate) {
	      switch (route && route.key) {
	        case 'Invoices':
	          return _react2.default.createElement(_invoice2.default, { route: route.next, locate: route.locate });

	        case undefined:
	          return _react2.default.createElement(
	            'h1',
	            null,
	            '404'
	          );

	        default:
	          return _react2.default.createElement(
	            'h1',
	            null,
	            route.key
	          );
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          'div',
	          { style: { fontSize: '20px' } },
	          this.props.title
	        ),
	        _react2.default.createElement(
	          'nav',
	          null,
	          _react2.default.createElement(
	            _reactJunctions.Link,
	            { to: { pathname: "/dashboard" } },
	            'Dashboard'
	          ),
	          _react2.default.createElement('br', null),
	          _react2.default.createElement(
	            _reactJunctions.Link,
	            { to: { pathname: "/invoices" } },
	            'Invoices'
	          )
	        ),
	        this.renderRoute(this.props.route, this.props.locate)
	      );
	    }
	  }]);

	  return AppContent;
	}(_react.Component);

	var App = exports.App = function (_Component2) {
	  _inherits(App, _Component2);

	  function App(props) {
	    _classCallCheck(this, App);

	    var _this2 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

	    _this2.state = {
	      initialMessage: 'Test Content'
	    };
	    return _this2;
	  }

	  _createClass(App, [{
	    key: 'render',
	    value: function render() {
	      var initialMessage = this.state.initialMessage;

	      return _react2.default.createElement(_reactJunctions.Router, {
	        history: history,
	        junction: junction,
	        render: _react2.default.createElement(AppContent, { title: 'Junctions' })
	      });
	    }
	  }]);

	  return App;
	}(_react.Component);

	function mapStateToProps(state) {
	  return {
	    data: state.data
	  };
	}

	exports.default = (0, _reactRedux.connect)(mapStateToProps)(App);

/***/ }),
/* 13 */
/***/ (function(module, exports) {

	module.exports = require("history");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

	module.exports = require("junctions");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

	module.exports = require("react-junctions");

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _junctions = __webpack_require__(14);

	var _reactJunctions = __webpack_require__(15);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var junction = (0, _junctions.createJunction)({
	  Invoice: {
	    path: '/:invoiceId',
	    paramTypes: {
	      invoiceId: { required: true }
	    }
	  },
	  Delete: {
	    path: '/delete/:invoiceId',
	    paramTypes: {
	      invoiceId: { required: true }
	    }
	  },
	  Add: {}
	});

	var Invoice = function (_Component) {
	  _inherits(Invoice, _Component);

	  function Invoice() {
	    _classCallCheck(this, Invoice);

	    return _possibleConstructorReturn(this, (Invoice.__proto__ || Object.getPrototypeOf(Invoice)).apply(this, arguments));
	  }

	  _createClass(Invoice, [{
	    key: 'render',
	    value: function render() {
	      var route = this.props.route;
	      var locate = this.props.locate;

	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          'ul',
	          null,
	          _react2.default.createElement(
	            'li',
	            null,
	            _react2.default.createElement(
	              _reactJunctions.Link,
	              { to: locate(junction.createRoute('Add')) },
	              'Add Invoice'
	            )
	          ),
	          _react2.default.createElement(
	            'li',
	            null,
	            _react2.default.createElement(
	              _reactJunctions.Link,
	              { to: locate(junction.createRoute('Invoice', { invoiceId: 1 })) },
	              'Invoice 1'
	            )
	          ),
	          _react2.default.createElement(
	            'li',
	            null,
	            _react2.default.createElement(
	              _reactJunctions.Link,
	              { to: locate(junction.createRoute('Invoice', { invoiceId: 2 })) },
	              'Invoice 2'
	            )
	          ),
	          _react2.default.createElement(
	            'li',
	            null,
	            _react2.default.createElement(
	              _reactJunctions.Link,
	              { to: locate(junction.createRoute('Delete', { invoiceId: 1 })) },
	              'Delete 1'
	            )
	          ),
	          _react2.default.createElement(
	            'li',
	            null,
	            _react2.default.createElement(
	              _reactJunctions.Link,
	              { to: locate(junction.createRoute('Delete', { invoiceId: 2 })) },
	              'Delete 2'
	            )
	          )
	        ),
	        route && _react2.default.createElement(
	          'div',
	          null,
	          route.key,
	          ' ',
	          _react2.default.createElement(
	            'small',
	            null,
	            route.params.invoiceId
	          )
	        )
	      );
	    }
	  }]);

	  return Invoice;
	}(_react.Component);

	Invoice.junction = junction;
	exports.default = Invoice;

/***/ }),
/* 17 */
/***/ (function(module, exports) {

	module.exports = require("path");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

	module.exports = require("axios");

/***/ })
/******/ ]);