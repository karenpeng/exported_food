/*
 {
   max: 111,
   data:
    [
      {
        name: "Canada",
        id: "Canada",
        tooltip:{
            headerFormat: '<span style="color:{point.color}">{point.y:.1f} Million$</span><br/>',
            pointFormat: ''
        },
        dataLabels:{
          enabled: true,
          format: '{point.y:.1f}'
        },
        data: [
          [
            "Bovine",
            [123, 12, 12,...]
          ],
          [
            "Sheep",
            [123, 12, 12,...]
          ],
        ]
      },
      {
        name: "Mexico",
        id: "Mexico",
        tooltip:{
          headerFormat: '<span style="color:{point.color}">{point.y:.1f} Million$</span><br/>',
          pointFormat: ''
        },
        dataLabels:{
          enabled: true,
          format: '{point.y:.1f}'
        },
        data: [
          [
            "Bovine",
            [123, 12, 12,...]
          ],
          [
            "Sheep",
            [123, 12, 12,...]
          ],
        ]
      }
    ]
  }
*/

export function getDrilldown(catAllData, countryData){
  let output = {
    max: 0,
    data: []
  }
  let max = 0
  countryData.data[0].data.forEach((d, i)=>{

    let obj = {
      name: d.name,
      id: d.name,
      tooltip:{
        headerFormat: '',
        pointFormat: ''
      },
      dataLabels:{
        enabled: true,
        format: '{point.y:.1f} Million$'
      },
      data:[]
    }

    catAllData.forEach((dd, ii) =>{
      if(ii > 0){
        let key = Object.keys(dd)[0]
        
        dd[key].forEach((ddd) =>{
          if(ddd[d.name] !== undefined){

            obj.data.push([
                key,
                ddd[d.name]
              ])

          ddd[d.name].forEach((dddd)=>{
            max = Math.max(max, dddd)
          })

          }

        })

      }
    })

    obj.data.sort((a, b)=>{
      return b[1][b[1].length-1] - a[1][a[1].length-1]
    })

    output.data.push(obj)
  })

  output.max = max

  //console.dir(output)
  return output
}