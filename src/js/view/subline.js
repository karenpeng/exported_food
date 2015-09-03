export function makeSubline(arr){
  
    let chart = new Highcharts.Chart({
    chart:{
      renderTo: 'bottom',
      type: 'spline',
      width: window.innerWidth - 70,
      height: 260
    },
    title:{
      text:''
    },
    subtitle: {
      text: ''
    },
    xAxis: {
      title: {
        text: 'Year'
      },
      categories: [1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014]
    },
    yAxis: {
      //min: 0,
      title: {
        text: 'Million $'
      },
      labels: {
        //enabled: false
      },
      gridLineWidth: 0
    },
    tooltip: {
      crosshairs: true,
      // headerFormat: "{point.x:} {point.key}",
      // pointFormat: "{point.y:,.1f} Million$"
      formatter(){
        return "<b>"+this.x+" <b>"+this.series.name+":<br/>"+this.y+" Million$"
      }
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
      borderWidth: 0,
      symbolHeight: 10,
      y: - 30
    },
    plotOptions: {
      spline: {
        lineWidth: 1,
              states: {
            hover: {
              lineWidth: 6
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