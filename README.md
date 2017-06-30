Food & Mood
----------

#### Build informations: ####

use gulp to build the app.
http://gulpjs.com/
The gulpfile.js is intended to build the project and the custom webgl render engine into the same file (dist/js/app.js).

A version of the app is already built in dist/js.

The source files are stored in src/js and the data files are stored in dist/resources/data. All the data used in the visualization is stored in .json files parsed from .csv files. I removed several sections of the original files to reduce their weight.

#### Dependencies: ####

npm dependencies are included in the nodes_modules file.
To be sure, just do npm install.

This data visualization uses a custom webgl render engine named P3D.
You can find more infos about it at: https://github.com/PTRRR/P3D

For a production release it would be nice to implement the project unsing THREE.js: https://threejs.org/
