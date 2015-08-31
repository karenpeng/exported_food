/*
[
 {
  name: 'Animals',
  data:[1, 2, 3...]
 }
 ]
 */
export function getCatForLine(totals, cat){
  function isCat(obj){
    return obj['name'] === cat
  }
  return totals.filter(isCat)
}