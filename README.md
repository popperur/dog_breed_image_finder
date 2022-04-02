# Dog Breed Image Finder

This project is my solution for the [Estatesearch Coding Challenge](doc/Estatesearch_Coding_Challenge_Instruction.pdf) .

Tech Stack:
- rails 6
- react 17.0
- typescript 4.6
- bootstrap, axios, styled-components, typeahead

[Live demo is available under Heroku.](https://popperur-db-image-finder.herokuapp.com/)

Please be patient, Heroku needs to spin-up at the first open. 

## Setup for Local Dev (Mac)

* Install/update [homebrew](https://brew.sh/) to the latest version
* Install bundler with `brew bundle` and `gem install bundler`
* `bundle`
* `yarn`
* `rails db:migrate`
* `rails s`
* Open the image finder UI at http://localhost:3000 .

## Tests

To run tests (including system tests) execute `rails test:all` . 

## Development Hints

### Fast Refresh (Hot Module Replacement)

HMR is setup through [pmmmwh's plugin](https://github.com/pmmmwh/react-refresh-webpack-plugin) .

* `yarn dev` to start the dev-server
* refresh the page in the browser before doing code changes

### JS Linting
* Based on eslint ([docs](https://eslint.org/))
* `yarn install` to install tools
* `yarn lint` to lint once
* `yarn run lint:fix` to fix errors
