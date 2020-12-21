// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/slider.js":[function(require,module,exports) {
'use strict';

var multiItemSlider = function () {
  function _isElementVisible(element) {
    var rect = element.getBoundingClientRect(),
        vWidth = window.innerWidth || doc.documentElement.clientWidth,
        vHeight = window.innerHeight || doc.documentElement.clientHeight,
        elemFromPoint = function elemFromPoint(x, y) {
      return document.elementFromPoint(x, y);
    };

    if (rect.right < 0 || rect.bottom < 0 || rect.left > vWidth || rect.top > vHeight) return false;
    return element.contains(elemFromPoint(rect.left, rect.top)) || element.contains(elemFromPoint(rect.right, rect.top)) || element.contains(elemFromPoint(rect.right, rect.bottom)) || element.contains(elemFromPoint(rect.left, rect.bottom));
  }

  return function (selector, config) {
    var _mainElement = document.querySelector(selector),
        _sliderWrapper = _mainElement.querySelector('.slider__wrapper'),
        _sliderItems = _mainElement.querySelectorAll('.slider__item'),
        _sliderControls = _mainElement.querySelectorAll('.slider__control'),
        _sliderControlLeft = _mainElement.querySelector('.slider__control_left'),
        _sliderControlRight = _mainElement.querySelector('.slider__control_right'),
        _wrapperWidth = parseFloat(getComputedStyle(_sliderWrapper).width),
        _itemWidth = parseFloat(getComputedStyle(_sliderItems[0]).width),
        _html = _mainElement.innerHTML,
        _indexIndicator = 0,
        _maxIndexIndicator = _sliderItems.length - 1,
        _indicatorItems,
        _positionLeftItem = 0,
        _transform = 0,
        _step = _itemWidth / _wrapperWidth * 100,
        _items = [],
        _interval = 0,
        _states = [{
      active: false,
      minWidth: 0,
      count: 1
    }],
        _config = {
      isCycling: false,
      direction: 'right',
      interval: 4000,
      pause: true
    };

    for (var key in config) {
      if (key in _config) {
        _config[key] = config[key];
      }
    }

    _sliderItems.forEach(function (item, index) {
      _items.push({
        item: item,
        position: index,
        transform: 0
      });
    });

    var _setActive = function _setActive() {
      var _index = 0;
      var width = parseFloat(document.body.clientWidth);

      _states.forEach(function (item, index, arr) {
        _states[index].active = false;
        if (width >= _states[index].minWidth) _index = index;
      });

      _states[_index].active = true;
    };

    var _getActive = function _getActive() {
      var _index;

      _states.forEach(function (item, index, arr) {
        if (_states[index].active) {
          _index = index;
        }
      });

      return _index;
    };

    var position = {
      getItemMin: function getItemMin() {
        var indexItem = 0;

        _items.forEach(function (item, index) {
          if (item.position < _items[indexItem].position) {
            indexItem = index;
          }
        });

        return indexItem;
      },
      getItemMax: function getItemMax() {
        var indexItem = 0;

        _items.forEach(function (item, index) {
          if (item.position > _items[indexItem].position) {
            indexItem = index;
          }
        });

        return indexItem;
      },
      getMin: function getMin() {
        return _items[position.getItemMin()].position;
      },
      getMax: function getMax() {
        return _items[position.getItemMax()].position;
      }
    };

    var _transformItem = function _transformItem(direction) {
      var nextItem,
          currentIndicator = _indexIndicator;

      if (!_isElementVisible(_mainElement)) {
        return;
      }

      if (direction === 'right') {
        _positionLeftItem++;

        if (_positionLeftItem + _wrapperWidth / _itemWidth - 1 > position.getMax()) {
          nextItem = position.getItemMin();
          _items[nextItem].position = position.getMax() + 1;
          _items[nextItem].transform += _items.length * 100;
          _items[nextItem].item.style.transform = 'translateX(' + _items[nextItem].transform + '%)';
        }

        _transform -= _step;
        _indexIndicator = _indexIndicator + 1;

        if (_indexIndicator > _maxIndexIndicator) {
          _indexIndicator = 0;
        }
      }

      if (direction === 'left') {
        _positionLeftItem--;

        if (_positionLeftItem < position.getMin()) {
          nextItem = position.getItemMax();
          _items[nextItem].position = position.getMin() - 1;
          _items[nextItem].transform -= _items.length * 100;
          _items[nextItem].item.style.transform = 'translateX(' + _items[nextItem].transform + '%)';
        }

        _transform += _step;
        _indexIndicator = _indexIndicator - 1;

        if (_indexIndicator < 0) {
          _indexIndicator = _maxIndexIndicator;
        }
      }

      _sliderWrapper.style.transform = 'translateX(' + _transform + '%)';

      _indicatorItems[currentIndicator].classList.remove('active');

      _indicatorItems[_indexIndicator].classList.add('active');
    };

    var _slideTo = function _slideTo(to) {
      var i = 0,
          direction = to > _indexIndicator ? 'right' : 'left';

      while (to !== _indexIndicator && i <= _maxIndexIndicator) {
        _transformItem(direction);

        i++;
      }
    };

    var _cycle = function _cycle(direction) {
      if (!_config.isCycling) {
        return;
      }

      _interval = setInterval(function () {
        _transformItem(direction);
      }, _config.interval);
    };

    var _controlClick = function _controlClick(e) {
      if (e.target.classList.contains('slider__control')) {
        e.preventDefault();
        var direction = e.target.classList.contains('slider__control_right') ? 'right' : 'left';

        _transformItem(direction);

        clearInterval(_interval);

        _cycle(_config.direction);
      }

      if (e.target.getAttribute('data-slide-to')) {
        e.preventDefault();

        _slideTo(parseInt(e.target.getAttribute('data-slide-to')));

        clearInterval(_interval);

        _cycle(_config.direction);
      }
    };

    var _handleVisibilityChange = function _handleVisibilityChange() {
      if (document.visibilityState === 'hidden') {
        clearInterval(_interval);
      } else {
        clearInterval(_interval);

        _cycle(_config.direction);
      }
    };

    var _refresh = function _refresh() {
      clearInterval(_interval);
      _mainElement.innerHTML = _html;
      _sliderWrapper = _mainElement.querySelector('.slider__wrapper');
      _sliderItems = _mainElement.querySelectorAll('.slider__item');
      _sliderControls = _mainElement.querySelectorAll('.slider__control');
      _sliderControlLeft = _mainElement.querySelector('.slider__control_left');
      _sliderControlRight = _mainElement.querySelector('.slider__control_right');
      _wrapperWidth = parseFloat(getComputedStyle(_sliderWrapper).width);
      _itemWidth = parseFloat(getComputedStyle(_sliderItems[0]).width);
      _positionLeftItem = 0;
      _transform = 0;
      _indexIndicator = 0;
      _maxIndexIndicator = _sliderItems.length - 1;
      _step = _itemWidth / _wrapperWidth * 100;
      _items = [];

      _sliderItems.forEach(function (item, index) {
        _items.push({
          item: item,
          position: index,
          transform: 0
        });
      });

      _addIndicators();
    };

    var _setUpListeners = function _setUpListeners() {
      _mainElement.addEventListener('click', _controlClick);

      if (_config.pause && _config.isCycling) {
        _mainElement.addEventListener('mouseenter', function () {
          clearInterval(_interval);
        });

        _mainElement.addEventListener('mouseleave', function () {
          clearInterval(_interval);

          _cycle(_config.direction);
        });
      }

      document.addEventListener('visibilitychange', _handleVisibilityChange, false);
      window.addEventListener('resize', function () {
        var _index = 0,
            width = parseFloat(document.body.clientWidth);

        _states.forEach(function (item, index, arr) {
          if (width >= _states[index].minWidth) _index = index;
        });

        if (_index !== _getActive()) {
          _setActive();

          _refresh();
        }
      });
    };

    var _addIndicators = function _addIndicators() {
      var sliderIndicators = document.createElement('ol');
      sliderIndicators.classList.add('slider__indicators');

      for (var i = 0; i < _sliderItems.length; i++) {
        var sliderIndicatorsItem = document.createElement('li');

        if (i === 0) {
          sliderIndicatorsItem.classList.add('active');
        }

        sliderIndicatorsItem.setAttribute('data-slide-to', i);
        sliderIndicators.appendChild(sliderIndicatorsItem);
      }

      _mainElement.appendChild(sliderIndicators);

      _indicatorItems = _mainElement.querySelectorAll('.slider__indicators > li');
    }; // добавляем индикаторы


    _addIndicators(); // инициализация


    _setUpListeners();

    if (document.visibilityState === 'visible') {
      _cycle(_config.direction);
    }

    _setActive();

    return {
      right: function right() {
        _transformItem('right');
      },
      left: function left() {
        _transformItem('left');
      },
      stop: function stop() {
        _config.isCycling = false;
        clearInterval(_interval);
      },
      cycle: function cycle() {
        _config.isCycling = true;
        clearInterval(_interval);

        _cycle();
      }
    };
  };
}();

var slider = multiItemSlider('.slider', {
  isCycling: true
});
},{}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51831" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/slider.js"], null)
//# sourceMappingURL=/slider.d16eec5e.js.map