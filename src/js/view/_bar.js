import d3 from 'd3'

export function updateBar(data, index){
  const svg = d3.select('svg')

  const width = window.innerWidth - 80
  const height = window.innerHeight - 280

  svg
  .attr('width', width)
  .attr('height', height)

  const title = Object.keys(data)[0]

  const interval = width / data.length

  //should it be generalized or not?
  const max = 4000

  const h = d3.scale.linear()
  .range([0, height])
  .domain([0, max])

  const c = d3.scale.linear()
  .range([0, 255])
  .domain([0, max])

  let chart = svg.selectAll('g')
  .data(data, (d) => {
    let name = Object.keys(d)[0]
    return name
  })
  .attr('transform', (d, i) => {
     return 'translate('+ i * interval+', 0)'
   })

   let chartExit = chart
    .exit()
    .style('opacity', 1)
    .transition()
    .style('opacity', 0)
    .remove()
    
   let chartEnter = chart
    .enter()
    .append('g')
    .attr('class', 'group')
    .attr('width', interval)
    .attr('transform', (d, i) => {
       return 'translate('+ i * interval+',0)'
     })
    .append('text')
    .attr('y', height - 20)
    .attr('x', interval/2)
    .style('text-anchor', 'middle')
    .text((d) => {
      let key = Object.keys(d)[0]
      return key
    })

  let subGroup = d3.selectAll('.group')
  .append('g')
  .attr('class', 'subGroup')
 
  let rects = d3.selectAll('.subGroup')
  .selectAll('rect')
  .data((d) => {
    let key = Object.keys(d)[0]
    d[key].forEach( (dd , ii) =>{
      console.log(dd, ii)
      
    })
    
    return d[key]
  })

  let rectsExit = rects
    .exit()
    .style('opacity', 1)
    .transition()
    .style('opacity', 0)
    .remove()

  let lastHeight = 0
  let rectsEnter = rects
  .enter()
  .append('rect')
  .attr('y', (d, i) => {
    var key = Object.keys(d)[0]
    //how could i offset it???
    //console.log(lastHeight)
    //console.log(d[key][index].y0, d[key][index].y1)
    return height - h(d[key][index]) - 40 - lastHeight
  })
  .attr('height', (d) => {
    var key = Object.keys(d)[0]
    lastHeight = h(d[key][index])
    //console.dir(d.y0, d.y1)
    return h(d[key][index])
  })
  .attr('width', interval)
  .style('fill', (d) => {
    var key = Object.keys(d)[0]
    //console.log(c(d[key][index]))
    return 'rgb(10, 10, '+ c(d[key][index]) +')'
  })
  // .append('text')
  // .text((d) => {
  //   var key = Object.keys(d)[0]
  //   //console.dir(d[key][index])
  //   return d[key][index]
  // })
  // .style('fill', 'white')
}




