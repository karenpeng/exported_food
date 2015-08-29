import d3 from 'd3'

//problem:
//1. how to only update index if data does not change
//2. how to not put 'world' and 'quntity' in the data?

export function pie(data, index){

  const svg = d3.select('svg')
  let width = window.innerWidth - 600
  let height = window.innerHeight - 100
      
  svg.attr('width',width).attr('height', height)

  let interval = width / data.length

  const c = d3.scale.linear()
  .range([0, 100])
  .domain([10, 2000])

  const rr = d3.scale.linear()
  .range([10, interval/2])
  .domain([10, 2000])
  
  let circle = svg.selectAll('circle')
  .data(data, (d) =>{
    if(d["country"] !== undefined)
    return d["country"]
  })

  circle
  .attr('cy', height/2)
  .attr('cx', (d, i) => {return i * interval + 10})
  .attr('r', 0)
  .transition()
  .attr('r', (d) => {
    return d["money"] ? rr(d["money"][index]) : null
  })
  // .each((d) =>{
  //   d._cur = d["money"] ? rr(d["money"][index]) : null
  // })

  circle.exit()
  .transition()
  .attr('r', 0)
  .remove()

  circle.enter().append('circle')
  .attr('cy', height/2)
  .attr('cx', (d, i) => {
    return i * interval + 10;
  })
  .style('fill', (d) => {
    if(d["money"]){
      let h = c(d["money"][index])
      //console.log(h)
      return 'hsl(200,' + h + '% , 50%)'
    }
    //return d3.hsl(c(d["money"]), 100%, 50%)
  })
  .text((d) => {
    return d["country"] ? d["country"] : null
  })
  //@TODO: figure out to store previous radius
  // .attr('r', (d) => {
  //   console.log(d._cur)
  //   return d._cur
  // })
  .attr('r', 0)
  .transition()
  //.duration(10)
  //.ease("linear")
  .attr('r', (d) => {
    return d["money"] ? rr(d["money"][index]) : null
  })
}