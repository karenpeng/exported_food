export function map(arr){
  let data = [
  {
    "code": "AF",
    "value": 53,
    "name": "Afghanistan"
  },
  {
    "code": "AL",
    "value": 117,
    "name": "Albania"
  },
  {
    "code": "DZ",
    "value": 15,
    "name": "Algeria"
  },
  {
    "code": "AS",
    "value": 342,
    "name": "American Samoa"
  }]

  let map = new Highcharts.Chart({
    chart:{
      type: 'map',
      renderTo: 'right',
      width: window.innerWidth / 2 - 20,
      height: window.innerHeight - 320
    },
     title:{
        text : 'Zoom in on country by double click'
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
      series : [{
          data : data,
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