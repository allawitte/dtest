# Features
* SASS support including sourceMaps
* Minimal CSS styling of the view
* Gulp watch, build and local server tasks
* minified CSS and JS build files


## Download
```bash
bower install 
```

## 1. Setup
```bash
npm install
```
- install all npm and bower dependencies

## 2. Watch files
```bash
gulp watch
```
- all custom CSS/JS will be watched for changes and injected into browser thanks to BrowserSync

## 3. Build production version
```bash
gulp dev 
```
- this will process following tasks:
* creates config.js in app/config folder based on config.json file
* concat all external js libraries into libs.js
* concat all external css files into themes.css
* concat all customer's js files into app.js
* concat all customer's scss files into app.css
* concat all metronic sccs files into metronic.css

## 4. Start webserver without watch task
```bash
gulp server
```

## 5. Rebuild all customers js and scss files including all changes in metronic fiels
``` bash
gulp app
```

if any error with sass import happened, try to downgrade sass:
```
$ cd node_modules/gulp-sass/

$ npm install node-sass@3.3.2
```

##6. Configures access to APIs
creates config.js in app/config folder
```
gulp config
```


