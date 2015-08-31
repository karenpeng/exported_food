/*
[
  {
    name: "Canada",
    id: "Canada",
    tooltip:{
      pointFormat: '<span style="color:{point.color}">{point.y:.1f} Million$</span><br/>',
    },
    dataLabels:{
      enabled: false
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
      pointFormat: '<span style="color:{point.color}">{point.y:.1f} Million$</span><br/>',
    },
    dataLabels:{
      enabled: false
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
        headerFormat: '<span style="color:{point.color}">{point.y:.1f} Million$</span><br/>',
        pointFormat: ''
      },
      dataLabels:{
        enabled: true,
        format: '{point.y:.1f}'
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

    output.push(obj)
  })

  //console.dir(output)
  return output
}