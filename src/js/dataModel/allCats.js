/*
[
 {
  name: 'Animals',
  data:[1, 2, 3...]
 },
 {
  name: 'Meat',
  data:[1, 2, 3...]
 }, 
 ...
]
 */
export function allCats(obj){
  let output = []
  for(let key in obj){
    output.push({name: key, data:obj[key]["total"]})
  }
  return output
}