export function getSubcatsInOneCat(arr){

  let output = []

  arr.forEach((d, i)=>{
    if(i>0){
      var key = Object.keys(d)[0]
      output.push(key)
    }
  })
  output.unshift('All')
  //console.dir(output)
  return output
}