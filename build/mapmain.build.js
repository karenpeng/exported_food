(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _viewMapJs = require('./view/map.js');

window.addEventListener('message', function (e) {

  var info = JSON.parse(e.data);
  (0, _viewMapJs.makeMap)(info.data);
}, false);


},{"./view/map.js":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.makeMap = makeMap;
exports.updateMap = updateMap;
var map = undefined;

function makeMap(arr) {
  map = new Highcharts.Chart({
    chart: {
      type: 'map',
      renderTo: 'haha' //,
      // width: window.innerWidth / 2 - 20,
      // height: window.innerHeight - 320
    },
    title: {
      text: ''
    },
    xAxis: {
      lineWidth: 0,
      minorGridLineWidth: 0,
      lineColor: 'transparent',
      labels: {
        enabled: false
      },
      minorTickLength: 0,
      tickLength: 0,
      gridLineWidth: 0
    },
    yAxis: {
      title: '',
      lineWidth: 0,
      minorGridLineWidth: 0,
      lineColor: 'transparent',
      labels: {
        enabled: false
      },
      minorTickLength: 0,
      tickLength: 0,
      gridLineWidth: 0
    },
    mapNavigation: {
      enabled: true,
      enableDoubleClickZoomTo: true
    },
    colorAxis: {
      min: 1,
      max: 1000,
      type: 'logarithmic'
    },
    tooltip: {
      headerFormat: '<span class="flag {point.flag}"></span>'
    },
    series: [{
      data: arr,
      mapData: Highcharts.maps['custom/world'],
      joinBy: ['iso-a2', 'code'],
      name: '',
      states: {
        hover: {
          color: '#bee3fd'
        }
      },
      tooltip: {
        valueSuffix: 'Million$'
      }
    }]
  });
}

function updateMap(arr) {
  map.series[0].setData(arr);
}


},{}]},{},[1])


//# sourceMappingURL=mapmain.build.js.map