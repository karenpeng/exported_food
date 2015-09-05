import assert from 'assert'
import wholeData from '../data/json/data.json'
import {allCnts} from '../src/js/dataModel/allCnts.js'
import {allCntsName} from '../src/js/dataModel/allCntsName.js'

describe('test allCntsName\n', function(){
  describe('when given an array of objects', function(){
    it('should return an array of holding all the name property in each object from the array', function(done){
      const result = allCntsName(allCnts(wholeData))
      assert(result.length) === Object.keys(allCnts(wholeData)).length
      result.forEach((d)=>{
        assert(typeof d === 'string')
      })   
      done()
    })
  })
})