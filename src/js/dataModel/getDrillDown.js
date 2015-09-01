/*
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
*/

export function getDrilldown(catAllData, countryData){
  let output = []
  
  countryData[0].data.forEach((d, i)=>{

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
          }
        })

      }
    })

    obj.data.sort((a, b)=>{
      return b[1][b[1].length-1] - a[1][a[1].length-1]
    })

    output.push(obj)
  })

  //console.dir(output)
  return output
}