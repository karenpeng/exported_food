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

/**
 * get all the cats in all countries, for the init page
 * @param  {obj}    obj  the whole data
 * @return {array}       as above 
 */
export function allCats(obj){
  let output = []
  for(let key in obj){
    output.push({name: key, data:obj[key]["total"]})
  }
  return output
}