# Working with pug files :

- the only thing to be taken care of is the inclusion on CSS and JS files injection tags.
- basically the format is as follows:

`//- <identifier>:<file extension>`<br>
`//- endinject`

And gulp will inject the files for you.

- all the pages need to mandatorily have these common injections

`//- commons:<file extension>`<br>
`//- endinject`

- take a look any of the page pug files, for e.g. src/pages/page1/page1.pug

# Working with SCSS files (also applicable when working with LESS files):

- in order to enable chunking within CSS files, it is mandatory to import them into a JS file. This file would just be a container for scss/less files.
- as an example take a look at how this is done in here: src/pages/page1/page1scss.js
- component libraries are included within the comp_vendor.scss file (which is then imported into the page JS later on)
- importing bootstrap partials throw error so its better to create own partials by copying the necessary stuff and importing that file wherever necessary
- component scss file (for e.g. src/components/comp1/comp1.scss) and component library scss file (src/components/vendor/comp_vendor.scss) will need to be imported together with the page scss file (for e.g. src/pages/page1/page1.scss) into a js file so that these files can take part in the chunking process.
- the common css file produced as part of the chunking process is written to the common folder and is inserted into the pages.
- a gulp task "cleanJS" is run to clean the JS files that get created as a byproduct of producing the CSS chunks from within a JS file.

# Working with JS files:

- working with JS files is pretty straightforward.
- webpack will watch for duplicate import across multiple files and automatically chunk it into a common file.
- for e.g. src/components/comp1/comp1.js and src/components/comp2/comp2.js have the jquery import in common and both these files are imported into their corresponding page scripts (src/pages/page1/page1.js and src/pages/page2/page2.js). These page scripts also import the src/pages/vendor/proj_vendor.js file in common. Therefore both these common files get chunked and get placed in the commons folder within the dist folder.
- They are also automatically inserted into the html via gulp inject tags.

# Remaining things to be done:

- automate page configurations to the maximum extent possible
- incorporate LESS flow
- optimise images

# Cons:

- there is no dev mode.
- changing any file runs the entire list of tasks.
- no sourcemaps
