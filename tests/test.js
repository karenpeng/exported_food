var fs = require('fs')
var wholeData 
  fs.readFile('./data/json/data.json', 'utf8', function(err, str){
  if(err) {
    console.log(err)
    return
  }
  wholeData = JSON.parse(str)
})

require('./build/main.build.js')

describe('test subcatsInOneCat', function(){
  describe('when given an object', function(){
    it('should return an array of keys except the first element is "All"', function(done){
      assert(subcatsInOneCat({
        a: 1,
        b: 2,
        c: 3
      })) === ['All','b', 'c']
      done()
    })
  })
})

describe('test allCats', function(){
  describe('when given the whole data', function(){
    it('should return an array of objects of each category and its total array', function(done){
      assert(typeof allCats(wholeData)) === 'array'
      done()
    })
  })
})

describe('test subcatsInOneCat', function(){
  describe('when given an object', function(){
    it('should return an array of keys except the first element is "All"', function(done){
      assert(subcatsInOneCat({
        a: 1,
        b: 2,
        c: 3
      })) === ['All','b', 'c']
      done()
    })
  })
})

describe('test subcatsInOneCat', function(){
  describe('when given an object', function(){
    it('should return an array of keys except the first element is "All"', function(done){
      assert(subcatsInOneCat({
        a: 1,
        b: 2,
        c: 3
      })) === ['All','b', 'c']
      done()
    })
  })
})

describe('test subcatsInOneCat', function(){
  describe('when given an object', function(){
    it('should return an array of keys except the first element is "All"', function(done){
      assert(subcatsInOneCat({
        a: 1,
        b: 2,
        c: 3
      })) === ['All','b', 'c']
      done()
    })
  })
})
