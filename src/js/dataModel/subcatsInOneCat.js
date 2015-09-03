export function subcatsInOneCat(arr){

  let output = []

  arr.forEach((d, i)=>{
    if(i>0){
      let key = Object.keys(d)[0]
      output.push(key)
    }
  })
  output.unshift('All')
  //console.dir(output)
  return output
}