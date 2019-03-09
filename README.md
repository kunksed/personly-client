# Personly Trading Platform
[![CircleCI](https://circleci.com/gh/jamesgallagher432/personly-client.svg?style=svg&circle-token=ccf69a9626f2b0a51f065dc25a950eb26954e57d)](https://circleci.com/gh/jamesgallagher432/personly-client)

[![Personly](https://github.com/jamesgallagher432/personly-client/blob/master/personly_logo_full.png?raw=true)](https://github.com/jamesgallagher432/personly-client/blob/master/personly_logo_full.png?raw=true)

Personly is a platform developed by James Gallagher that allows anyone to become a publicly traded person and process investments in themselves.

You can view the accompanying API for this project [here](https://github.com/jamesgallagher432/jamesg-trading-api).

# Documentation

## Getting Started
There are two options for installation:

1. **Clone repo**

    `git clone https://github.com/jamesgallagher432/personly-client.git`

2. **Install dependencies**

    `npm run setup`

3. **Create environment file**
    In order for the server and client to know how to call the API used in this project, you need to complete this file. We've included a `.env.example` file that you can rename to get started with the default values.

    `cp .env.example .env`

4. **Export environmental variables**

   Run the command ```source .env ``` to ensure that environmental variables are stored on your machine.

5. **Run development server**

   `npm run start`

   Your app will be served at: http://localhost:1337

## Deployment

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

You can deploy this application on Heroku by using the above link, or run it on your local machine using the instructions above.

The deploy script is now totally automated and will hook into the server-rendering automatically.  Running `npm run serve:bundle` will set your environment to production and serve these files via Express.  Also, a Procfile is included, which will run the Express server on Heroku when you push your code.

## File Structure
Some files left out for brevity. Below you can find the basic file structure used for this application.

```
.
├── README.md
├── LICENSE
├── index.html
├── package.json
├── webpack.config.js
├── app/
|   ├── fonts
|   ├── images
|   ├── src
|   |   ├── components
|   |   |   ├── FeatureFirstComponent
|   |   |   |   ├── index.js
|   |   |   |   ├── index.module.scss
|   |   |   |   └── tests
|   |   |   |   |   └── index.test.js
|   |   |   ├── styles.js
|   |   |   ├── index.modules.scss
|   |   |   └── index.js
|   |   ├── containers
|   |   |   ├── FeatureFirstContainer
|   |   |   |   ├── index.js
|   |   |   |   ├── index.module.scss
|   |   |   |   ├── styles.js
|   |   |   └── index.js
|   |   ├── pages
|   |   ├── store
|   |   ├── utils
|   |   └── index.js
|   └── styles
├── .eslintignore
├── .eslintrc
├── .gitattributes
└── .gitignore
```

## Scripts
- **npm run setup**
  + Installs the application's dependencies

- **npm run build**
  + Bundles the application

- **npm run dev**
  + Starts webpack development server

- **npm run lint**
  + Runs the linter

- **npm run deploy**
  + Creates the production ready files within the `/server/public` folder

- **npm run clean**
  + Removes the bundled code and the production ready files

- **npm run serve:bundle**
  + Serve production assets from the `/server/public` folder.

## Generators
The boilerplate contains generators for easy project scaffolding.  At the moment, the generator has the following scaffold generating commands built in:
- Container `npm run generate:container`
  - Name: the name of the container, i.e. `Awesome`, which converts to: `AwesomeContainer`
  - Connected / Not connected ES6 Class containers (higher order)
  - SCSS Modules
  - [Styled Components](https://github.com/styled-components/styled-components)
  - Reducers, actions and constants
  - GraphQL: The generator can add collocated queries and mutations using GraphQL / ApolloClient.  Accept the option to use this feature.
  - Tests for all of the above
  - README.md file that documents the container
- Component `npm run generate:component`
  - Name: the name of the component, i.e. `Button`
  - Stateless functional components (recommended)
  - ES6 class components
  - SCSS modules
  - [Styled Components](https://github.com/styled-components/styled-components)
  - Tests for all of the above
  - README.md file that documents the component
- Page `npm run generate:page`
  - Name: The name of the route, i.e. Home, which gets converted to `HomePage`
  - Route: the route that corresponds to the page
  - Container Import: Most of the time, a Route exists only to import a container by the same name.  This is enabled by default, so make sure to run the container generator if you want to use this feature.

To run the generators with a list of options, run
```
npm run generate
```

Follow the on screen prompts to select the options you wish to use.

For convenience, you can bypass the initial selection and scaffold out containers, components and pages by running

```
npm run generate:<type_of_component>
```

where <type_of_component> is one of: component, container or page.

The generators use the same feature-first file organization as the rest of the project, encapsulating components within their own folder.

## Technologies / Libraries

- [Node](https://nodejs.org/en/) - JS runtime environment
- [npm](https://www.npmjs.com/) - package manager
- [Babel](https://babeljs.io/) - ES6 transpiler
- [Webpack](https://webpack.github.io/) - module bundler & task runner
- [React](https://facebook.github.io/react/) - interfaces
- [react-router](https://github.com/rackt/react-router) - react application router
- [react-css-modules](https://github.com/gajus/react-css-modules) - React CSS Modules implement automatic mapping of CSS modules.
- [Immutable](https://github.com/facebook/immutable-js) - data structures
- [Styled Components](https://github.com/styled-components/styled-components) Visual primitives for the component age 💅 http://styled-components.com
- [Apollo Client](https://github.com/apollostack/apollo-client) Collocated GraphQL queries that are intelligently cached.  See [the docs](http://dev.apollodata.com/) and the [configuration file](https://github.com/RyanCCollins/scalable-react-boilerplate/blob/master/app/src/apolloClient.js) to configure in your own project (Note: you will need to connect to a GraphQL Server.  See the [example apps for details](https://github.com/RyanCCollins/scalable-react-boilerplate#example-apps).
- [Graphql](http://graphql.org/)
- [isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch) - API fetch network requests
- [redux-devtools](https://github.com/gaearon/redux-devtools) - redux development tool
- [SASS](http://sass-lang.com/) - styles
- [ESLint](http://eslint.org/) - linter
- [Chai / Immutable](http://chaijs.com/) - assertion library for Immutable JS

## Authors

- **James Gallagher** - [jamesgallagher432](https://github.com/jamesgallagher432)

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://gist.github.com/PurpleBooth/LICENSE.md) file for details

## Acknowledgments

Thank you to the [Scalable React Boilerplate](https://github.com/scalable-react/scalable-react-boilerplate) community for developing such a useful and swift starting point for building an application with React, Grommet, and GraphQL. This README includes content from the Scalable React Boilerplate to make it easy for you to understand how to get started with this project.
