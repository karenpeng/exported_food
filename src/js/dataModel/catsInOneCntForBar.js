/*
[{
  name: "Category",
  data: [{
    name: "Animals",
    y: [56.33, 65, 25, ...]
  }, {
    name: "Fish",
    y: [24.03, 23, 3...]
  }, 
  ...
  ]
}]
 */

/**
 * [catsInOneCntForBar description]
 * @param  {object} obj    the whole data
 * @param  {array}  names  output from the allCntsName function
 * @return {array}
 */
export function catsInOneCntForBar(obj, names){
  let output = [{
    name: "Category",
    data: []
  }]
  let hash = {}
  names.forEach((n)=>{
    hash[n] = []
  })

  names.forEach((d)=>{



  })

}