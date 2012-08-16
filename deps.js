/*
 * RequireJS Shim Dependency Loader Plugin 0.0.1
 * by André Gil, http://andregil.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */
define(function () {
    return {

        version: '0.0.1',

        load: function (name, req, onLoad, config) {

            // Generate an array with all dependencies from config.shim
            var deps = [];

            for( var dep in config.shim ) {
                deps.push(dep);
            }

            // Load all dependencies, before loading main app file
            req(deps, function() {

                // Now load main app file
                req([name], onLoad);

            });
        }
        
    };
});