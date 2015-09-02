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
export function getAllCats(obj){
  let output = []
  for(let key in obj){
    output.push({name: key, data:obj[key][0]["total"]})
  }
  return output
}