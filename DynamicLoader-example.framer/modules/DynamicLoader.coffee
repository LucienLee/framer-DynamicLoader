###
DynamicLoader Module for FramerJS
https://github.com/LucienLee/framer-DynamicLoader/

Created by Lucien Lee (@luciendeer), Jan. 12th, 2016

DynamicLoader braeks the barriars between 3rd party web development libraries and Framer, which
help you load local, external stylesheets and scripts dynamically.

Add the following line to your project in Framer Studio.
	{DynamicLoader} = require 'DynamicLoader'

[Load one file]
DynamicLoader.add('script.js').then(->
# when script.js loaded successfully
...
).catch(->
# when script.js loaded failed
...
)

[Load file in series]
DynamicLoader.series(['one.js', 'two.css', ...]).then( successCallback, failCallback )

[Load file in parallel]
DynamicLoader.series(['one.js', 'two.css', ...]).then( successCallback, failCallback )

###




class exports.DynamicLoader

	# Promisify single dynamic script loading
	@add = (url) ->
		promise = new Promise((resolve, reject) ->
			if url.substr( url.lastIndexOf('.') ) is ".js"
				# load script once
				loaded = Array.prototype.find.call document.getElementsByTagName('script'), (element) ->
					if element.getAttribute('src') is url then return element
				if loaded isnt undefined then return resolve 'have loaded'

				file = document.createElement 'script'
				file.src = url
			else if url.substr( url.lastIndexOf('.') ) is ".css"
				# load style once
				loaded = Array.prototype.find.call document.getElementsByTagName('link'), (element) ->
					if element.getAttribute('rel') is url then return element
				if loaded isnt undefined then return resolve 'have loaded'

				file = document.createElement 'link'
				file.rel = "stylesheet"
				file.href = url

			file.addEventListener 'load', ->
				resolve file
			file.addEventListener 'error', ->
				reject file
			document.body.appendChild file
		)

		return promise

	# Dynamic file loading in series
	@series = (urls) ->
		if !Array.isArray(urls) or urls.length is 0 then throw "ERROR: NO URL IN ARRAY!"

		return urls.reduce(
			(promise, url) =>
				return promise.then( => @add(url) )
			,
			Promise.resolve())

	# Dynamic file loading in parallel
	@parallel = (urls) ->
		if !Array.isArray(urls) or urls.length is 0 then throw "ERROR: NO URL IN ARRAY!"

		Promise.all(
			urls.map( (url) =>
				return @add(url)
		))