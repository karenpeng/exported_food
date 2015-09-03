let map

export function makeMap(arr){
  map = new Highcharts.Chart({
    chart:{
      type: 'map',
      renderTo: 'haha',
      // width: window.innerWidth / 2 - 20,
      // height: window.innerHeight - 320
    },
    title:{
      text : ''
    },
    xAxis:{
      lineWidth: 0,
      minorGridLineWidth: 0,
      lineColor: 'transparent',
      labels:{
        enabled: false
      },
      minorTickLength: 0,
      tickLength: 0,
      gridLineWidth: 0
    },
    yAxis:{
      title:'',
      lineWidth: 0,
      minorGridLineWidth: 0,
      lineColor: 'transparent',
      labels:{
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
      max: 10000,
      type: 'logarithmic'
    },
    tooltip: {
      headerFormat: ''
    },
    series : [{
        data : arr,
        mapData: Highcharts.maps['custom/world'],
        joinBy: ['iso-a2', 'code'],
        name: '',
        states: {
          hover: {
            color: '#BADA55'
          }
        },
        tooltip: {
          valueSuffix: 'Million$'
        }
    }]
  })
}


export function updateMap(arr){
  map.series[0].setData(arr)
}