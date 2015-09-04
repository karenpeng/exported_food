import React from 'react'

//data model
//dimension1
import {cntsInOneCatForPie} from '../dataModel/cntsInOneCatForPie.js'
import {cntsInOneCatForLine} from '../dataModel/cntsInOneCatForLine.js'
import {cntsInOneCatForMapEachYear} from '../dataModel/cntsInOneCatForMapEachYear.js'
import {subcatsInOneCat} from '../dataModel/subcatsInOneCat.js'
import {cntsInOneCatForPieEachYear, cntsInOneCatForPieEachYearJustY} 
  from '../dataModel/cntsInOneCatForPieEachYear.js'
import {cntsInOneSubcatForPie} from '../dataModel/cntsInOneSubcatForPie.js'
import {cntsInOneSubcatForPieEachYear, cntsInOneSubcatForPieEachYearJustY} 
  from '../dataModel/cntsInOneSubcatForPieEachYear.js'
import {cntsInOneSubcatForMapEachYear} from '../dataModel/cntsInOneSubcatForMapEachYear.js'
import {cntsInOneSubcatForLine} from '../dataModel/cntsInOneSubcatForLine.js'

//dimension2
import {catsInOneCntForBar} from '../dataModel/catsInOneCntForBar.js'
import {catsInOneCntForLine} from '../dataModel/catsInOneCntForLine.js'
import {subcatsInOneCnt} from '../dataModel/subcatsInOneCnt.js'

//control
import {Year} from './year.js'
import {Cat} from './cat.js'
import {sendData} from './message.js'
import {Dimension} from './dimension.js'

//view
import {makeLine} from '../view/line.js'
import {makeSubline} from '../view/subline.js'
import {makePie, updatePie} from '../view/pie.js'
import {makeBar, updateBar} from '../view/bar.js'

let cntsCatLineData, cntsSubcatLineData
let catsCntLineData, subcatsInOneCntData

export const BigBrother = React.createClass({
  PropTypes:{
    data: React.PropTypes.object.isRequired,
    cats: React.PropTypes.array.isRequired,
    cnts: React.PropTypes.array.isRequired,
    allCats: React.PropTypes.array.isRequired,
    allCnts: React.PropTypes.array.isRequired
  },
  getInitialState(){
    return{
      demension: 'Country',
      index: 15,
      cat: "All",
      subCat: null,
      windowWidth: window.innerWidth,
      didMount: false
    }
  },

  //window resize
  handleResize(){
    this.setState({windowWidth: window.innerWidth})
  },

  componentDidMount(){
    window.addEventListener('resize', this.handleResize, false)
    this.setState({
      didMount: true
    })
  },
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize, false)
  },

  //no render when year is being changed
  shouldComponentUpdate(nextProps, nextState){

    if(nextState.demension !== this.state.demension) return true

    if(nextState.subCat === null){
      return nextState.cat !== this.state.cat || 
        nextState.windowWidth !== this.state.windowWidth ||
        nextState.didMount !== this.state.didMount
    }

    return nextState.cat !== this.state.cat || 
      nextState.subCat !== this.state.subCat ||
      nextState.windowWidth !== this.state.windowWidth ||
      nextState.didMount !== this.state.didMount
  },

  //user change dimension
  handleDimension(val){
    
    this.setState({
      demension: val,
      cat: 'All',
      subCat: null
    })

    document.getElementById('catMenu1').value = 'All'
  },

  //user drag year bar
  handleYear(year){
    this.setState({
      index: year - 1999
    })
   
    if(this.state.cat !== 'All'){
       if(this.state.demension === 'Country'){
        if(this.state.subCat === null || this.state.subCat === 'All'){
          updatePie((year-1999), cntsInOneCatForPieEachYearJustY)
          sendData(cntsInOneCatForMapEachYear(cntsCatLineData, (year-1999)))
        }else{
          updatePie((year-1999), cntsInOneSubcatForPieEachYearJustY)
          sendData(cntsInOneSubcatForMapEachYear(cntsSubcatLineData, (year-1999)))
        }
      }else{
        updateBar((year-1999))
      }
    }
  },

  //user change category
  handleCat(val){
    this.setState({
      cat: val,
      subCat: 'All'
    })
    if(val !== 'All'){
      if(this.state.demension === 'Country'){
        cntsCatLineData = cntsInOneCatForLine(this.props.data[val])
        sendData(cntsInOneCatForMapEachYear(cntsCatLineData, this.state.index))
      }else{
        catsCntLineData = catsInOneCntForLine(this.props.data, val)
        subcatsInOneCntData = subcatsInOneCnt(this.props.data, catsCntLineData, val)
      }
      document.getElementById('catMenu2').value = 'All'
    }
  },

  //user change subcategory
  handleSubcat(val){
    this.setState({
      subCat: val
    })
    if(val === 'All'){
      sendData(cntsInOneCatForMapEachYear(cntsCatLineData, this.state.index))
    }else{
      cntsSubcatLineData = cntsInOneSubcatForLine(this.props.data[this.state.cat][val])
      sendData(cntsInOneSubcatForMapEachYear(cntsSubcatLineData, this.state.index))
    }
  },

  render(){

    let peek1, peek2, peek3, peek4

    let subCats

    if(this.state.demension === 'Category' || this.state.cat === 'All') subCats = null
    else subCats = subcatsInOneCat(this.props.data[this.state.cat])

    if(this.state.cat === "All"){
      peek1 = {display :'none'}
      peek2 = {display :'block'}

      if(this.state.didMount){

        this.state.demension === 'Country' ?
        makeLine(this.props.allCnts) : makeLine(this.props.allCats)
      }

      peek3 = {display: 'none'}
      peek4 = {display: 'none'}

    }else{
      peek1 = {display :'block'}
      peek2 = {display :'none'}

      peek3 = this.state.demension === 'Country' ? {display :'block'} : {display :'none'}
      peek4 = this.state.demension === 'Country' ? {display :'none'} : {display :'block'}

      if(this.state.didMount){

        if(this.state.demension === 'Country'){
          if(this.state.subCat === null || this.state.subCat === 'All'){
            makeSubline(cntsInOneCatForLine(this.props.data[this.state.cat]))
            makePie(cntsInOneCatForPie(cntsCatLineData), this.state.index, cntsInOneCatForPieEachYear)
          }else{
            makeSubline(cntsInOneSubcatForLine(this.props.data[this.state.cat][this.state.subCat]))
            makePie(cntsInOneSubcatForPie(cntsSubcatLineData), this.state.index, cntsInOneSubcatForPieEachYear)
          }
        }else{
            makeSubline(catsInOneCntForLine(this.props.data, this.state.cat))
            makeBar(catsInOneCntForBar(catsCntLineData), subcatsInOneCntData, this.state.index)
        }
      }
    }

    return(
      <div id="container">

        <div className="row" id="top">
          <Dimension handleDimension={this.handleDimension}></Dimension>
          <Cat
            options1={this.state.demension === 'Country' ? this.props.cats : this.props.cnts} 
            options2={subCats}
            handleCat={this.handleCat} handleSubcat={this.handleSubcat}
            name={this.state.demension === 'Country' ? 'Category' : 'Country'}>
          </Cat>
        </div>

        <div id="main" style={peek2}></div>

        <div className="row" id="group1" style={peek3}>
          <div style={peek3} className="five columns" id="left"></div>
          
            <iframe style={peek3} className="seven columns" id="ifr" src="map.html" scrolling="no"></iframe>
        </div>
        <div className="row" id="group2" style={peek4}></div>

        <div className="row" id="bottom" style={peek1}></div>

        
        <div className="row"  id="above" style={peek1}>
          <Year handleYear={this.handleYear}></Year>
        </div>

      </div>
    )
  }
})