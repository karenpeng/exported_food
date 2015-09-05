import assert from 'assert'
import wholeData from '../data/json/data.json'
import {cntsInOneCatForLine} from '../src/js/dataModel/cntsInOneCatForLine.js'

describe('test cntsInOneCatForLine\n', function(){
  describe('when given an object wholeData["Animals"]', function(){
    it('should return an array of objects containing all the countries and its total value', function(done){
      const result = cntsInOneCatForLine(wholeData['Animals'])
      result.forEach((d)=>{
        assert(typeof d.name === 'string')
        assert(Object.prototype.toString.call(d.data) === '[object Array]')
      })   
      done()
    })
  })
})