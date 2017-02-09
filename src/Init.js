var scripts = [{
    "style.css": "css/style.css"
}, {
    "containers.css": "css/containers.css"
}, {
    "svg.css": "css/svg.css"
}, {
    "container.css": "css/container.css"
}, {
    "roboto": "css/fonts/roboto.css"
}, {
    "opensans": "css/fonts/opensans.css"
}, {
    "jQuery": "lib/jquery-1.11.2.min.js"
}, {
    "bootstrap.min.js": "lib/bootstrap.min.js"
}, {
    "d3.v3.min.js": "lib/d3.v3.min.js"
}, {
    "head.js": "lib/head.js"
}, {
    "immutable.js": "lib/immutable.js"
}, {
    "jquery-1.11.2.min.js": "lib/jquery-1.11.2.min.js"
}, {
    "json2.js": "lib/json2.js"
}, {
    "matchMedia": "lib/fills/matchMedia.js"
}, {
    "matchMediaListener": "lib/fills/matchMedia.addListener.js"
}, {
    "DatasourceMap.js": "src/DatasourceMap.js"
}, {
    "Utilities.js": "src/Utilities.js"
}, {
    "src/Toggles.min.js": "src/Toggles.min.js"
}, {
    "Visualization.js": "src/Visualization.js"
}]

head.js(scripts);

head.ready(Object.keys(scripts[scripts.length - 2])[0], function() {

    head.ready(document, function() {
        head.js({ 'angular-material.css': 'lib/angular/angular-material.css' }, { 'docs.css': 'lib/angular/docs.css' }, { 'angular-animate.min.js': 'lib/angular/angular-animate.min.js' }, { 'angular-route.min.js': 'lib/angular/angular-route.min.js' }, { 'angular-aria.min.js': 'lib/angular/angular-aria.min.js' }, { 'angular-messages.min.js': 'lib/angular/angular-messages.min.js' }, { 'svg-assets-cache.js': 'lib/angular/svg-assets-cache.js' }, { 'angular-material.js': 'lib/angular/angular-material.js' }, { 'App.js': 'src/App.js' }, { 'ViewControllers': 'src/ViewControllers.js' });

    });
});

/** @global 
    @description If set to true, will provide details on visualization binding. */
var verbose = false;
