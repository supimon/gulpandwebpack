# AEM frontend development environment

# on gulp and webpack

<br>

`git clone https://github.com/supimon/gulpandwebpack.git`
<br>

`npm install`
<br>

`gulp fullbuild`
<br>

<br>
Gulp basically is used for tranpiling pug, writing streams to disk, image optimisations and sprites, watching as well as for live-reloading.
<br>
Webpack is used for transpiling, bundling, minifying and chunking css as well as js files.
<br>

## Working with pug files :

- pug files are handled within gulp
- each page will need a corresponding entry in the `paths` object as well as in the `buildPages` function within the `gulpfile.js`
- each page will also need a corresponding entry in the webpack config files, namely in the `entry` object within the `webpack.jsstyles.prod.js` and the `webpack.scripts.prod.js`
- #### I know this is not very intiutive but you are not dumb either
- the other thing to be taken care off is the inclusion on CSS and JS files injection tags.
- basically the format is as follows:

`//- <identifier>:<file extension>`<br>
`//- endinject`

And gulp will inject the files for you.

- all the pages need to mandatorily have these common injections

`//- commons:<file extension>`<br>
`//- endinject`

- take a look any of the page pug files, for e.g. `src/pages/page1/page1.pug`
  <br>
  <br>

## Working with SCSS files (also applicable when working with LESS files):

- css files are bundled, minified and chunked by webpack but written to the disk by gulp
- in order to enable chunking within CSS files, it is mandatory to import them into a JS file. This file would just be a container for scss/less files.
- as an example take a look at how this is done in here: `src/pages/page1/page1scss.js`
- component libraries are included within the `comp_vendor.scss` file (which is then imported into the page JS later on)
- importing bootstrap partials throw error so its better to create own partials by copying the necessary stuff and importing that file wherever necessary
- component scss file (for e.g. `src/components/comp1/comp1.scss`) and component library scss file (`src/components/vendor/comp_vendor.scss`) will need to be imported together with the page scss file (for e.g. `src/pages/page1/page1.scss`) into a js file so that these files can take part in the chunking process.
- the common css file produced as part of the chunking process is written to the `commons` folder and is inserted into the pages.
- ### you will need to copy the sprite images manually to the pages folder as well as the commons folder under the dist folder as found necessary.
- a gulp task `cleanJS` is run to clean the JS files that get created as a byproduct of producing the CSS chunks from within a JS file.
- ### Note: the minimum chunks in the webpack config file should be equal to the total number of pages.
  <br>

## Working with JS files:

- js files are bundled, minified and chunked by webpack but written to the disk by gulp.
- working with JS files is pretty straightforward.
- webpack will watch for duplicate import across multiple files and automatically chunk it into a common file.
- for e.g. `src/components/comp1/comp1.js` and `src/components/comp2/comp2.js` have the jquery import in common and both these files are imported into their corresponding page scripts (`src/pages/page1/page1.js and src/pages/page2/page2.js`). These page scripts also import the `src/pages/vendor/proj_vendor.js` file in common. Therefore both these common files get chunked and get placed in the `commons` folder within the `dist` folder.
- They are also automatically inserted into the html via gulp inject tags.
- ### Note: the minimum chunks in the webpack config file should be equal to the total number of pages.
  <br>

## Remaining things to be done(although will not be done soon):

- automate page configurations to the maximum extent possible
- to prepare an actual dev mode.
- gulp tasks optimisation (as currently watch runs the entire tasks).
- add sourcemaps
  <br>
  <br>

## Contact

- supimon@gmail.com to pick a fight
