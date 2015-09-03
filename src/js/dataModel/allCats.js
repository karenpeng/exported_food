/**
 * get all the cats in all countries, for the init page
 * @param  {obj}    obj  the whole data
 * @return {array}       as below 
 */
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
  for(let cat in obj){
    output.push({
      name: cat, 
      data: obj[cat]["total"]
    })
  }
  return output
}