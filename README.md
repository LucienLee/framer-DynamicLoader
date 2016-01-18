# framer-DynamicLoader
A module that  braeks the barriars between 3rd party web development libraries and Framer, which enable loading additional CSS and JS dynamically in Framer.

## Demo
Demo loading [Chartist.js](https://gionkunz.github.io/chartist-js/) with DynamicLoader in Framer. Here is [live demo](http://share.framerjs.com/go6hise0lidu/).
![demo](https://github.com/LucienLee/framer-DynamicLoader/blob/demo/demo.gif)

Please check the [demo](https://github.com/LucienLee/framer-DynamicLoader/tree/demo) branch.

## Getting started
### Add it in your Framer project
- Create a new Framer project
- Download [DynamicLoader.coffee](https://github.com/LucienLee/framer-DynamicLoader/blob/master/DynamicLoader.coffee) and put it in the module folder of the project
- At the top of your code, write `{DynamicLoader} = require "DynamicLoader"`


### Quickstart

If you only have one file to load...

```coffeescript
DynamicLoader.add('script.js').then(->
// When script.js loaded successfully...
// Put your code Here
)
```

If you have many files to load...

```coffeescript
#Load files in series
DynamicLoader.series(['one.js', 'two.css', ...]).then(->
// When all script loaded one by one successfully...
).catch(->
// When a script loaded failed...
)

#Load files in parallel
DynamicLoader.series(['one.js', 'two.css', ...]).then(->
// When all script loaded successfully...
.catch(->
// When a script loaded failed...
)
```

### Usage
Framer-DynamicLoader was built with Promise model and supports Promise operation.  Check the idea about [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

### How to load local script

Put the script under your framer project and use reletive path to link the file.  
Here is my suggested way to load local file:  

```
project.framer  
├── app.coffee  
├── app.js  
├── index.html 
├── module
|		└── DynamicLoader.coffee
├── vendor	<< put the file here  
|		├── A.css
|		└──  B.js	
...
```

In your `app.coffee`

```coffeescript
{DynamicLoader} = require "DynamicLoader"
DynamicLoader.series(['./vendor/A.css', './vendor/B.js').then(->
...
)
```

## Feedback
Feel free to contact me if you have any questions about this project.   
Please send a message to me here on GitHub, [@luciendeer](https://twitter.com/luciendeer) on Twitter. Cheers!