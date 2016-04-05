# Ionic 2 Generator

[![Build Status](https://travis-ci.org/jadsalhani/ionic2-generator.svg?branch=master)](https://travis-ci.org/jadsalhani/ionic2-generator)
[![downloads per day](https://img.shields.io/badge/downloads-20%2Fday-green.svg)](https://www.npmjs.org/package/i2g)


===================


Welcome to the Ionic 2 Generator! You might wonder why this is called an Ionic 2 generator when it contains Angular 2 components generations as well, but fret not all your questions shall be answered!

This generator is specialised for Ionic 2 application projects. I.e. you created your project using `ionic start myApp blank --v2 --ts` and are too lazy to create the pages files or the components.

**i2g** generator comes to the rescue!

## Installation

Simply run 

`npm install -g i2g` 

to have the generator globally available and voila! Creating Ionic pages and components has never been so easy!

## Available commands

This generator is very simple to use, and might be to the liking of those used to the famous `artisan` commands.

For any help while using the generator, just run

`i2g --help`

to see the available commands and what they do

### Creating Ionic 2 Page Files

Generating the files has never been easier! Simply run 

`i2g make:page PAGE_NAME`

and the files will be created in `app/pages/PAGE_NAME/`

You could even pass the `--nav` to have an Ionic 2 page wired up with the Ionic 2 `NavController`, like so:

`i2g make:page PAGE_NAME --nav`

### Creating Angular 2 Components

Angular 2 component files generation is pretty much the same, run

`i2g make:component COMPONENT_NAME`

and it will automagically create the component files in `app/components/COMPONENT_NAME/`

## Contribution

If you liked this generator and want to propose some improvements, feel free to send a pull request!

Just `git clone` the repository and run `npm install`

Make sure to have `eslint` and `editorconfig` plugins installed to conform to the format and codestyle of the project
