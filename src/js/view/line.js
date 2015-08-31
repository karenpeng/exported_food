export function line(arr){
  let chart = new Highcharts.Chart({
    chart:{
      renderTo: 'left',
      type: 'spline',
      height: window.innerHeight - 160,
      width: window.innerWidth - 40
    },
    title:{
      text:''
    },
    subtitle: {
      text: 'Source USDA, www.fas.usda.gov/gats',
      x: -20
    },
    xAxis: {
      title: {
        text: 'year'
      },
      categories: [1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014]
    },
    yAxis: {
      title: {
        text: 'Million $'
      },
      plotLines: [{
        value: 0,
        width: 1,
        color: '#808080'
      }]
    },
    tooltip: {
      crosshairs: true,
      shared: true//,
      //pointFormat: "{point.y:.1f}"
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
      borderWidth: 0
    },
    plotOptions: {
      spline: {
        lineWidth: 2,
        states: {
          hover: {
            lineWidth: 8
          }
        },
        marker: {
          enabled: false
        }
      }
    },
    series: arr
  })
}