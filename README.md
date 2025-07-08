# 🍽️ Recipe Finder - MealDB API Project

A responsive web application that allows users to discover and explore recipes from around the world using TheMealDB API. Built with HTML, CSS, JavaScript, and Bootstrap for a modern, user-friendly experience.

## 📋 Table of Contents

- [Features](#-features)
- [Technologies Used](#-technologies-used)
- [Installation](#-installation)
- [Usage](#-usage)
- [API Endpoints](#-api-endpoints)
- [Project Structure](#-project-structure)
- [Features Breakdown](#-features-breakdown)
- [Screenshots](#-screenshots)

## ✨ Features

### 🏠 Homepage

- **Search Functionality**: Search for recipes by name with real-time results
- **Random Recipes**: Display 6 random recipes by default
- **Recipe Cards**: Beautiful cards showing recipe name, image, category, area, and description
- **Pagination**: Navigate through search results with 6 recipes per page
- **Modal Details**: Click "more info" to view complete recipe details

### 🔍 Filter Page

- **Category Filter**: Dropdown with all available recipe categories
- **Area Filter**: Dropdown with all available regions/countries
- **Combined Filtering**: Filter by both category and area simultaneously
- **Default Selection**: "Lamb" category and "Moroccan" region pre-selected
- **Responsive Design**: Works perfectly on all device sizes

### 🎨 Enhanced UI/UX

- **Modern Design**: Clean, professional interface with Bootstrap styling
- **Smooth Animations**: Modal slide-in effects and hover interactions
- **Unique Descriptions**: Each recipe card has a special, engaging description
- **Enhanced Modal**: Detailed recipe information with ingredients and instructions
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Bootstrap 5.0.2
- **API**: TheMealDB REST API
- **HTTP Requests**: Fetch API
- **Icons**: Custom close icon for modal
- **Animations**: CSS3 transitions and keyframes

## 🚀 Installation

1. **Clone or Download** the project files
2. **Open** `index.html` in your web browser
3. **No build process required** - it's a pure frontend application

## 📖 Usage

### Homepage Navigation

1. **View Random Recipes**: The homepage displays 6 random recipes by default
2. **Search Recipes**: Use the search bar to find specific recipes by name
3. **View Details**: Click "more info" on any recipe card to see full details
4. **Navigate Results**: Use pagination buttons to browse through search results

### Filter Page

1. **Access Filters**: Click "Filter Meals" in the navigation
2. **Select Category**: Choose from the category dropdown (default: Lamb)
3. **Select Area**: Choose from the area dropdown (default: Moroccan)
4. **Apply Filters**: Results update automatically based on your selections
5. **View Results**: Browse filtered recipes with pagination

### Recipe Details Modal

- **Recipe Information**: Name, category, and area
- **High-Quality Image**: Large recipe photo
- **Complete Instructions**: Step-by-step cooking directions
- **Ingredients List**: All required ingredients with measurements
- **Close Modal**: Click the X icon or outside the modal

## 🔌 API Endpoints

The application uses TheMealDB API with the following endpoints:

- **Random Meals**: `https://www.themealdb.com/api/json/v1/1/random.php`
- **Search by Name**: `https://www.themealdb.com/api/json/v1/1/search.php?s={meal_name}`
- **Filter by Category**: `https://www.themealdb.com/api/json/v1/1/filter.php?c={category}`
- **Filter by Area**: `https://www.themealdb.com/api/json/v1/1/filter.php?a={area}`
- **Meal Details**: `https://www.themealdb.com/api/json/v1/1/lookup.php?i={meal_id}`
- **Categories List**: `https://www.themealdb.com/api/json/v1/1/categories.php`
- **Areas List**: `https://www.themealdb.com/api/json/v1/1/list.php?a=list`

## 📁 Project Structure

```
MealDb-API-/
├── index.html          # Main homepage
├── sorted.html         # Filter page
├── script.js           # Main JavaScript functionality
├── sorted.js           # Filter page JavaScript
├── style.css           # Main stylesheet
├── logo.png            # Application logo
├── close-icon.png      # Modal close icon
└── README.md           # Project documentation
```

## 🎯 Features Breakdown

### Search Functionality

- Real-time search
- Displays up to 6 results per page
- Pagination for large result sets
- "No items found" message for empty results

### Recipe Cards

- Responsive card layout
- Recipe image, name, category, and area
- Unique descriptions for each recipe
- Hover effects and smooth transitions
- "More info" button for detailed view

### Modal System

- Enhanced modal with smooth animations
- Complete recipe information display
- Ingredients list with proper formatting
- Step-by-step cooking instructions
- Responsive design for all screen sizes

### Filter System

- Dual dropdown filtering (category + area)
- Default selections for immediate results
- Real-time filter updates
- Pagination for filtered results

## 📱 Responsive Design

The application is fully responsive and optimized for:

- **Desktop**: Full-featured experience with hover effects
- **Tablet**: Touch-friendly interface with appropriate spacing
- **Mobile**: Optimized layout with easy navigation

## 🎨 Design Features

- **Color Scheme**: Warm bisque background with professional styling
- **Typography**: Clear, readable fonts with proper hierarchy
- **Animations**: Smooth transitions and hover effects
- **Shadows**: Subtle depth and modern appearance
- **Spacing**: Consistent padding and margins throughout

## 🔧 Technical Implementation

### JavaScript Features

- **ES6+ Syntax**: Modern JavaScript with arrow functions and template literals
- **Async/Await**: Clean asynchronous code for API calls
- **Event Delegation**: Efficient event handling
- **Dynamic Content**: Real-time DOM manipulation
- **Error Handling**: Graceful error management

### CSS Features

- **Flexbox & Grid**: Modern layout techniques
- **CSS Variables**: Consistent theming
- **Keyframe Animations**: Smooth transitions
- **Media Queries**: Responsive breakpoints
- **Pseudo-elements**: Enhanced styling
