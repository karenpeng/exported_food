let chart, array

export function makePie(arr, index, func1){

  array = arr

  chart = new Highcharts.Chart({
    chart: {
      type: 'pie',
      renderTo: 'left'//,
      //width: 400
      // height: window.innerHeight - 420,
      // events:{
      //   click(e){
      //     console.log(e)
      //   }
      // }
    },
    title: {
      text: '',
      align: 'center',
      verticalAlign: 'top',
      y: 20
    },
    subtitle: {
      text: ''
    },
    tooltip: {
      headerFormat: '<b>{point.key} <b>:<br>',
      pointFormat: '<b>{point.y:.1f} Million$</b><br>{point.percentage:.1f}% of total'
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true,
          distance: 10,
          style: {
            textShadow: '0px 1px 2px white'
          },
          connectorColor: '#333',
          connectorWidth: 0   ,
          formatter(){
            return(
              "<b>"+this.key+"</b><br/>"+this.percentage.toFixed(1) + "%"
            )
          } 
        },
        //showInLegend: true,
        allowPointSelect: true,
        cursor: 'pointer',
        startAngle: -180,
        endAngle: 180,
        center: ['50%', '50%']
      },
      series:{
        name: 'Browser share',
        innerSize: '20%',
        point:{ 
          events:{
            // select() {
            //   console.log(this.name);
            // },
            // unselect(){
            //   console.log('goneT_T')
            // }
          }
        }       
      }
    },
    series: func1(arr, index)
  })
}

export function updatePie(index, func2){
  chart.series[0].setData(func2(array, index))
}


