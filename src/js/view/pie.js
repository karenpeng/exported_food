import d3 from 'd3'

module.exports = function(data, index){

  console.dir(data)
  console.log(index)

  let svg = d3.select('svg')
  let width = window.innerWidth - 400
  let height = window.innerHeight - 100
      
  svg.attr('width',width).attr('height', height)

  let interval = width / data.length

  let maxValue = d3.max(data, (d) => {
    console.log(d)
    return d["money"] ? d["money"][index] : null
  })
  let minValue = d3.min(data, (d) =>{
    return d["money"] ? d["money"][index] : null
  })

  let c = d3.scale.linear()
  .range([10, interval/2])
  .domain([minValue, maxValue])
  
  let circle = svg.selectAll('circle')
  .data(data, (d) =>{
    return d["country"] ? d["country"] : null
  })
  circle
  .attr('cy', height/2)
  .attr('cx', (d, i) => {return i * interval + 10})
  .attr('r', 0)
  .transition()
  .attr('r', (d) => {
    return d["money"] ? c(d["money"][index]) : null
  })

  circle.exit()
  .transition()
  .attr('r', 0)
  .remove()

  circle.enter().append('circle')
  .attr('cy', height/2)
  .attr('cx', (d, i) => {
    return i * interval + 10;
  })
  .attr('r', 0)
  .transition()
  .attr('r', (d) => {
    return d["money"] ? c(d["money"][index]) : null
  })
  .style('fill', 'red')
  .text((d) => {
    return d["country"] ? d["country"] : null
  })
}