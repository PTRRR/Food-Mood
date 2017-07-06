Food & Mood
----------

#### Build informations: ####

use gulp to build the app: http://gulpjs.com/.
The gulpfile.js is intended to build the project into the app.js file (dist/js/app.js).

A version of the app is already built in dist (/dist/).

The source files are stored in src/js and the data files are stored in dist/resources/data. All the data used in the visualization is stored in .json files parsed from .csv files. I removed several sections of the original files to reduce their weight.

#### Dependencies: ####

npm dependencies are included in the nodes_modules file.
To be sure, just do npm install.

This data visualization uses three js to render the particles.
More infos at: https://threejs.org/
