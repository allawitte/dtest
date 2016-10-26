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

for metronic scss files needs to downgrade npm-sass version:
$ cd node_modules/gulp-sass/

$ npm install node-sass@3.3.2

$ cd ../..

## 2. Watch files
```bash
gulp watch
```
- all custom CSS/JS will be watched for changes and injected into browser thanks to BrowserSync

## 3. Builds develpment version in separate folder version
```bash
gulp dev

You get _dev folder
```
- this will process following tasks:
* creates config.js in app/config folder based on config.json file
* concat all external js libraries into libs.js
* concat all external css files into themes.css
* concat all customer's js files into app.js
* concat all customer's scss files into app.css
* concat all metronic sccs files into metronic.css
*starts webserver in _dev directory
*starts watch task, what follows all changes in html vies, all customer js and scss. This tracks no libraries. If you anew file to library - you have to run gulp dev:js or gulp dev:css


## 4. Builds a production version in directory _prod
```bash
gulp prod

*Does all what dev, but all js and css are minified.
*Has no watch task
```

## 5. You can run a webserver in original folder
gulp js
gulp css
gulp server
gulp watch

In case you  change you customers js or scss files, but no libraries, you can run
    gulp app instead gulp js and gulp css


```

//===============================================

To remove # from address bar you can by removing comments from lines 11 and 19 in app/js/app.rputing.js
This will not work properly on lockal machine node server. On external hosting or on OpenServer you can use .htcaccess file

        RewriteEngine On
        Options FollowSymLinks

        RewriteBase /

        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule ^(.*)$ /#/$1 [L]

/=================================================
if any error with sass import happened, try to downgrade sass:
```
$ cd node_modules/gulp-sass/

$ npm install node-sass@3.3.2
```
/================================================
##6. Configures access to APIs
creates config.js in app/config folder
```
gulp config
```


