import d3 from 'd3'

module.exports = function (_data){
  let svg = d3.select('svg')
  let main = d3.select('main')
    
  let width = window.innerWidth - 400
  let height = window.innerHeight - 100
      
  svg.attr('width',width).attr('height', height)
  main.attr('width',width).attr('height', height)

  let x = d3.scale.ordinal()
      .rangeBands([0, width])

  let y = d3.scale.linear()
      .range([0, height])

  let c = d3.scale.linear()
      .range([0, 360])

  let interval = width / _data.length

  let maxHeight = d3.max(_data, (d) =>{
      return d.value2})

  let maxValue = d3.max(_data, (d) =>{
      return d.value;})
  let minValue = d3.min(_data, (d) =>{
      return d.value;})

  x.domain(d3.map((d) =>{return d.key;}))
  y.domain([0, maxHeight])
  c.domain([minValue, maxValue])

  let chart = svg.selectAll('g')
  .data(_data, (d) =>{
      return d.key
  })

  chart
  .transition()
    .attr('transform', (d,i) =>{
       return 'translate('+ i * interval+',0)'
     })

   let chartExit = chart
    .exit()
    .remove()
    
   let chartEnter = chart
    .enter()
    .append('g')
   .attr('transform', (d, i)=>{
       return 'translate('+ i * interval+',0)'
     })
    
   chartEnter
    .append('rect')

  chartEnter
    .append('text')
   
   let rects = d3.selectAll('rect')
    .attr('width', interval - 1)
    .attr('height', (d) =>{
      return y(d.value2)
    })
    .style('fill', (d) =>{
       return 'rgb(' + c(d.value) +',0,0)'
     })
   .attr('y', (d) =>{
       return height - y(d.value2)
   })
}





