# Demo DynamicLoader module with chartist.js and its plugin, fill-donut.js
{DynamicLoader} = require "DynamicLoader"

# Info 
Framer.Info =
	title: "DynamicLoader modules demo"
	author: "Lucien Lee"
	twitter: "luciendeer"
	description: "DynamicLoader module loads external chartist.js and its plugin, fill-donut.js into Framer. Please check: https://github.com/LucienLee/framer-DynamicLoader/"

# List script and stylesheets' paths, jquery for donut plugin
CHARTIST = [
	"./vendor/chartist.min.css",
	"./vendor/chartist.min.js",
	"//cdn.jsdelivr.net/jquery/2.1.4/jquery.min.js"
	"./vendor/chartist-plugin-fill-donut.js",
	"./vendor/custom.css"
]

## Import file "stats" (sizes and positions are scaled 1:2)
Sketch = Framer.Importer.load("imported/stats@2x")
for layerGroupName of Sketch
	window[layerGroupName] = Sketch[layerGroupName]

## Constants
LINE_CHART_HEIGHT = 400
DATA_AMOUNT = 15
FADE_CURVE = curve: "spring(100, 0, 10)"
FILL_COLOR = 'rgb(46, 59, 71)'
GRADIENT_COLOR1_1 = '#FF4E50'
GRADIENT_COLOR1_2 = '#F9D423'
GRADIENT_COLOR2_1 = '#4ED6EE'
GRADIENT_COLOR2_2 = '#CDC01D'
GRADIENT_COLOR3_1 = '#B455FF'
GRADIENT_COLOR3_2 = '#3B6CEE'

## Data
days = []
newData = []
activedData = []
remainedData = []
returnRate = Utils.randomNumber 1, 100
churnRate = Utils.randomNumber 1, 100
	
for i in [0...DATA_AMOUNT]
	days.push "Aug #{i+1}"
	newData.push i*10 + Utils.randomNumber 20, 40
	activedData.push newData[i] + Utils.randomNumber -30, 30
	remainedData.push newData[i] * Utils.randomNumber .1, .5

## Chartist Options
lineOptions =
	height: "#{LINE_CHART_HEIGHT}px"
	width: "#{2*Screen.width}px"
	showPoint: true
	chartPadding: 
		left: 16
		top: 30
	axisX:
		showGrid: false
	axisY:
		onlyInteger: true
		offset: 80
		scaleMinSpace: 60
		labelInterpolationFnc: (value) ->
			"#{value}K"

pieOptions =
	width: "#{ReturnRatePlaceholder.width}px"
	height: "#{ReturnRatePlaceholder.width}px"
	donut: true
	donutWidth: 14
	total: 100,
	showLabel: false

## Layer Init
NewUsersActived.states.add hide: opacity: 0
NewUsersActived.states.animationOptions = FADE_CURVE

ActivedUsersActived.states.add hide: opacity: 0
ActivedUsersActived.states.animationOptions = FADE_CURVE
ActivedUsersActived.states.switchInstant 'hide'

RemainedUsersActived.states.add hide: opacity: 0
RemainedUsersActived.states.animationOptions = FADE_CURVE
RemainedUsersActived.states.switchInstant 'hide'
# Loading tip
Utils.labelLayer(TrendChartPlaceholder, "Loading...")
TrendChartPlaceholder.style = "font-size": "1em"

## Until Function
pieChartDrawing = (data)->
	if data.type is 'slice' and data.index is 0
		# create bounding box for gradient color
		data.element.attr
			x1: data.x1 + 0.001
		# animate pie chart
		pathLength = data.element._node.getTotalLength()
		data.element.attr 
			'stroke-dasharray': "#{pathLength}px #{pathLength}px"
		animationDefinition = 'stroke-dashoffset':
			id: "anim#{data.index}"
			dur: 1200
			from: "#{-pathLength}px"
			to: '0px'
			easing: Chartist.Svg.Easing.easeOutQuint
			fill: 'freeze'
		data.element.attr 'stroke-dashoffset': "#{-pathLength}px"
		data.element.animate animationDefinition

defGradient = (ctx, name, startColor, endColor)->
	defs = ctx.svg.elem('defs')
	defs.elem('linearGradient', { id: name, x1: 0, y1: 1, x2: 0, y2: 0})
			.elem('stop', offset: 0, 'stop-color': startColor)
			.parent().elem( 'stop', offset: 1, 'stop-color': endColor )

# Load all files we need in serial, after loaded run the code in then function
DynamicLoader.series(CHARTIST).then(->
	init = true
	lastPath = undefined

	# Draw return rate chart
	ReturnRatePlaceholder.html = '<div id="return" class="pie ct-square"></div>'
	returnChartOptions = _.clone pieOptions
	returnChartOptions.plugins = [Chartist.plugins.fillDonut
		items: [ content: 
			"<h3 class='label'>#{Math.round returnRate}<span>%</span></h3>" ]]
	returnChart = new Chartist.Pie "#return",
		{ series: [returnRate, 100-returnRate] },
		returnChartOptions
	# Set pie chart animation
	returnChart.on 'draw', pieChartDrawing
		
	# Draw churn rate chart
	ChurnRatePlaceholder.html = '<div id="churn" class="pie ct-square"></div>'
	churnChartOptions = _.clone pieOptions
	churnChartOptions.plugins = [Chartist.plugins.fillDonut
		items: [ content: 
			"<h3 class='label'>#{Math.round churnRate}<span>%</span></h3>" ]]
	churnChart = new Chartist.Pie "#churn",
		{ series: [churnRate, 100-churnRate] },
		churnChartOptions
	# Set pie chart animation
	churnChart.on 'draw', pieChartDrawing
		
	# Draw trend line chart
	TrendChartPlaceholder.width = Screen.width * 2
	TrendChartPlaceholder.html = '<div id="trend"></div>'
	trendChart = new Chartist.Line '#trend',
		{ labels: days, series: [newData] },
		lineOptions
		
	trendChart.on 'created', (ctx)->
		init = true
		#align center  		
		ctx.svg.querySelectorAll('.ct-series')
			.attr 'transform':"translate( #{ctx.axisX.stepLength / 2} )"
		#craete svg gradient 		
		defGradient ctx, 'gradient1', GRADIENT_COLOR1_1, GRADIENT_COLOR1_2
		defGradient ctx, 'gradient2', GRADIENT_COLOR2_1, GRADIENT_COLOR2_2
		defGradient ctx, 'gradient3', GRADIENT_COLOR3_1, GRADIENT_COLOR3_2
			
	trendChart.on 'draw', (data)->
		if data.type is 'label' and data.axis is 'y' or data.type is 'grid'
			data.element.animate
				opacity:
					dur: 500
					from: 0
					to: 1
					easing: Chartist.Svg.Easing.easeOut

		if data.type is 'point'
			# Dynamic color point 				
			data.element.attr 
				style: "stroke: #{Color.mix(GRADIENT_COLOR1_1, GRADIENT_COLOR1_2, Chartist.getMultiValue(data.value) / _.max(data.series))}"
			# Animate point 			
			data.element.animate
				opacity: 
					dur: 250
					begin: 800
					from: 0
					to: 1
					easing: Chartist.Svg.Easing.easeOutQuint
		 					 			
		if data.type is 'line'
			# create bounding box for gradient color
			data.element.attr
				x1: data.x1 + 0.001
			# Animate line
			data.element.animate 
				d: 
					dur: 1000
					from: if lastPath is undefined then data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify() else lastPath
					to: data.path.clone().stringify()
					easing: Chartist.Svg.Easing.easeOutQuint
			# Save previous line path  			
			if init is true
				lastPath = data.path.clone().stringify()
				init = false


	# Enable trendChart to scroll
	scrollChart = ScrollComponent.wrap(TrendChartPlaceholder)
	scrollChart.scrollVertical = false
	#Listen button events
	NewUsers.on Events.Click, ->
		NewUsersActived.states.switch 'default'
		ActivedUsersActived.states.switch 'hide'
		RemainedUsersActived.states.switch 'hide'
		trendChart.update({labels: days, series: [newData]})
	
	ActivedUsers.on Events.Click, ->
		NewUsersActived.states.switch 'hide'
		ActivedUsersActived.states.switch 'default'
		RemainedUsersActived.states.switch 'hide'
		trendChart.update({labels: days, series: [activedData]})
		
	RemainedUsers.on Events.Click, ->
		NewUsersActived.states.switch 'hide'
		ActivedUsersActived.states.switch 'hide'
		RemainedUsersActived.states.switch 'default'
		trendChart.update({labels: days, series: [remainedData]})
	
)