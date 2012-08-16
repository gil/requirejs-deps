requirejs-deps
==============

Little [RequireJS](https://github.com/jrburke/requirejs/) plugin to load all dependencies, from your "shim" configuration, before starting your app.

## How?

Copy the file `deps.js` to the same directory as your `require.js` file and load RequireJS as always:

```html
<script data-main="js/main" src="js/require.js"></script>
```

Now configure your `main.js` file like this:

```javascript
require.config({

	// Load external libs here
	shim: {
		"libs/jquery" : [],
		"libs/chosen.jquery" : ["libs/jquery"],
		"libs/underscore" : [],
		"libs/backbone" : ["libs/jquery", "libs/underscore"]
	}

});

require(["deps!App"], function(App){
	// Start your app here
});
```

## Why?

When you use libraries that doesn't support [AMD](https://github.com/amdjs/amdjs-api/wiki/AMD), RequireJS can't decide the correct order to load all libs and their dependencies. To solve this problem, RequireJS 1.0 had a plugin called `order.js`, and you could do something like this:

```javascript
require([
	"order!libs/jquery",
	"order!libs/chosen.jquery",
	"order!libs/underscore",
	"order!libs/backbone",
	"order!App"
], function(App){
	// Start your app here
});
```

But this was slow and you needed to control the order by yourself!

Since version 2.0, RequireJS introduced a new config option called **shim** that you can use to define all libraries with their dependencies and RequireJS will define the correct order to load them. The problem is that your `App.js` still need all your libs as dependencies, to load before starting your app. You could do this:

```javascript
require.config({

	// Load external libs here
	shim: {
		"libs/jquery" : [],
		"libs/chosen.jquery" : ["libs/jquery"],
		"libs/underscore" : [],
		"libs/backbone" : ["libs/jquery", "libs/underscore"],
		"App" : ["libs/jquery", "libs/chosen.jquery", "libs/underscore", "libs/backbone"]
	}

});

require(["App"], function(App){
	// Start your app here
});
```

But as your dependency list keeps growing, you'll always need to define it twice.

So this tiny plugin will do the job for you. It will load all your libs from shim before loading your main app file and starting your app.