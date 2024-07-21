# Misbuy-Market

**Misbuy-Market** is an e-commerce project built with React and Node.js that allows users to browse, search, and filter products, add items to a shopping cart, and make online purchases.
The project is designed to demonstrate modern web development technologies with an advanced user interface and data management features.

## Features

- **Homepage with Product List:** Displays products with images, descriptions, and prices.
- **Product Filtering and Sorting:** Filter products by categories, price, and areas, and sort them based on various criteria.
- **Search Engine:** Search for products using keywords.
- **Shopping Cart:** Add and remove items from the cart, view the cart summary.
- **User Dashboard:** Manage user profile, view purchase history.

## Technologies Used

- **Frontend:** React, Redux, CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)

## System Requirements

- [Node.js](https://nodejs.org/) version 14 or higher.
- [MongoDB](https://www.mongodb.com/) version 4.4 or higher.

## Installation and Running

### 1. Clone the Repository
git clone https://github.com/michalk1924/Misbuy-Market.git
cd Misbuy-Market

### 2. Install Dependencies
cd client
npm install
cd ../server
npm install

### 3.  Set Up Environment Variables
Create a .env file in the server directory with the following variables:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

### 4. Start the Server and Frontend
cd server
npm start
cd ../client
npm start

### 5. Access the Application
Once both the server and the client are running, you can access the application at http://localhost:3000.

## Contributors
- Michal Kastner ([@michalk1924](https://github.com/michalk1924))
- Yoni Stern ([@Yoni4517](https://github.com/Yoni4517))
