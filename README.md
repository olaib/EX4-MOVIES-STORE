# Movies Store - PopcornFlex

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Contents

* [About the project](#about-the-project)
* [Screenshots](#screenshots)
* [Available Scripts](#available-scripts)
* [Learn More](#learn-more)
* [Installation](#installation)
* [Running](#running)
* [Credits](#credits)

## About the project

* option for selecting multiple items in cart to delete
* prevent duplicate items in cart
* at beginning we added a corusel for popular items
* validation of form - handled by server
* handle race condition - I sent mail to the teacher, and she told us that its ok

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.

This project is an online movie store, using an api to get the movie's data. The website allows users to browse movies,
add them to cart, and proceed with the checkout process.
The website also keeps track of payments made by customers and stores them in MYSQL DB.
The stock of the movies is automatically updated when a payment is completed. If a movie becomes unavailable, the
payment is canceled, and an appropriate message is displayed.

The website utilizes session beans to implement the shopping cart functionality.

using the Spring MVS(Model View Controller) architecture,
using scoped beans and inversion of control (IOC).
Thymeleaf is used for views, including validation, and annotations are used for various features.

## Screenshots
#### Home Page
![Home Page](/assets/images/home.png)

#### Store Page
![Store Page](/assets/images/store-page.png)

#### Cart Page
![Cart Page](/assets/images/shopping-cart.png)

#### Checkout Page
![Checkout Page](/assets/images/checkout-page.png)

#### Filter List
![Filter List](/assets/images/filter.png)

#### Order Confirmation
![Order Confirmation](/assets/images/order-confirm.png)

## Available Scripts

In the project directory, you can run:

 ```bash
npm start
```

```bash
npm test
```

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more
information.

```bash
npm run build`
```

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

```bash 
npm run eject
```

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will
remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right
into your project so you have full control over them. All of the commands except `eject` will still work, but they will
point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you
shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't
customize it when you are ready for it.

## Learn More

You can learn more in
the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved
here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved
here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved
here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved
here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved
here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

`npm run build` fails to minify

This section has moved
here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## Installation

To install and run the project, follow these steps:

1. Download and install XAMPP.app and all the required Spring plugins.
2. Set up a MySQL database named "ex4" in XAMPP.app.
3. in the terminal run the following commands:

## Running

1. Make sure the project is running and the server is up and the mysql is running
2. Run the frontend make sure you are in the root folder of the project

- ```bash
    cd movie-app
    npm install
    npm start

2. Open a web browser.
3. then browse to http://localhost:3000
4.

## Credits

* [React](https://reactjs.org/)
* [Bootstrap 5](https://getbootstrap.com/docs/5.0/getting-started/introduction/)
* [Spring Boot](https://spring.io/projects/spring-boot)
* [Spring](https://spring.io/)
* [MySQL](https://www.mysql.com/)
* [Thymeleaf](https://www.thymeleaf.org/)
* [React Router](https://reactrouter.com/)
* [React Bootstrap](https://react-bootstrap.github.io/)
