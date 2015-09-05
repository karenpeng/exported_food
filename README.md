#where our food comes from?
( interactive U.S. imported food report )

-
####1. Brief
An excersice of data visualization:

Given a dataset provided by the USDA ([Excel format](https://raw.githubusercontent.com/faunadb/exercises/master/viz/importedfoodsbycountry2015.xls) / [HTML format](https://raw.githubusercontent.com/faunadb/exercises/master/viz/importedfoodsbycountry2015.tar.gz)),
present this data in a way that makes sense and allows for exploration.

Original data sources are [here](http://www.ers.usda.gov/data-products/us-food-imports.aspx).
Details and requirements are [here](https://github.com/faunadb/exercises/blob/master/viz.md).

-
#### 2. Insights
#####1. Let's look at the U.S. imported food datasheet:
![datasheet] (https://raw.githubusercontent.com/karenpeng/imported_food/master/images/Screen%20Shot%202015-09-05%20at%202.23.27%20PM.png)
xAxis: years, yAxis: countries inside different sub-categories, each sheet: differet categories. 
Data are in Million dollars and also quantity. But the unit of quantity differs in category to category.

*To sum up, data are formatted in three dimensions:*
<ol>
<li>Years</li>
<li>Categories -> sub-categories</li>
<li>Countries</li>
</ol>
It's not easy to present all the information inside just one graph.


#####2. What information does user hope to get?
People care about the food they eat, where it come from and how it changes from years to years.

 * changes as a macroscopical trend (all year changes)
 * microcosmic detail (each year)
 * be able to compare data (country vs. country / category vs. category)

*Combining Insight1, I come up with a sketch idea:*

Full year changes|
-----------


Year could be changed | Year could be changed
------------ | -------------
Look at countries in categories | Look at categories in countries

-
####3. Process

#####1. Design layout
  a. All year changes
  
  b. Look at countries precentages inside selected category

<img src="https://github.com/karenpeng/imported_food/blob/master/images/IMG_5829.jpg" width="500px"/>


  c. Look at categoris value inside selected country
<img src="https://github.com/karenpeng/imported_food/blob/master/images/IMG_5836.jpg" width="500px"/>

#####2. Structure code base
Some techniques:
 * ```gulp```: build, serve and test the system
 * ```browserify```: bundle different modules
 * ```React```: control user interface
 * ```HighCharts```: create data visualization components
 * ```ES6```: write javascript in a more "functional" way


Javascript modules structure:
```
src
├─js
   ├─main.js(entry of bundle)   
   ├─control
        ├─year controller, category controller, country controller
   ├─dataModel
        ├─all sorts of data structures for different charts
   ├─view
        ├─all charts: pie, column, spline, map
```
 
#####3. Visualization
Actually I used [```D3```](http://d3js.org/) first, but due to the time being for this exercise, switched to ```HighCharts``` instead.

-
####4. Outcome

[Launch website](http://karenpeng.github.io/imported_food/) :smile:

or

[Watch demo video]()
