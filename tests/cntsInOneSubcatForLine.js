import assert from 'assert'
import wholeData from '../data/json/data.json'
import {cntsInOneSubcatForLine} from '../src/js/dataModel/cntsInOneSubcatForLine.js'

describe('test cntsInOneSubcatForLine\n', function(){
  describe('when given an object wholeData["Animals"]["Sheep"]', function(){
    it('should return an array of objects containing all the contries and its total value array', function(done){
      const result = cntsInOneSubcatForLine(wholeData['Beverages']['wine'])
      result.forEach((d)=>{
        assert(typeof d.name === 'string')
        assert(Object.prototype.toString.call(d.data) === '[object Array]')
        d.data.forEach((dd)=>{
          assert(typeof dd === 'number')
        })        
      })   
      done()
    })
  })
})

