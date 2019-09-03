# Remanining things to be done:

- automate page configurations to the maximum extent possible
- minimise htmls
- optimise images
- set up development environment

# Working with SCSS files (also applicable when working with LESS files):

- in order to enable chunking within CSS files, it is mandatory to import them into a JS file. This file would just be a container for scss/less files.
- component libraries are included within the comp_vendor.scss file (which is then imported into the page JS later on)
- importing bootstrap partials throw error so its better to create own partials by copying the necessary stuff and importing that file wherever necessary
- CSS hierarchy is such that component scss file, page scss file, component library scss file and page library scss file are all imported into the page JS. This is so that these files can take part in the chunking process.
- a gulp task "cleanJS" is run to clean the JS files that get created as a byproduct of producing the CSS chunks from within a JS file.
