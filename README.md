# GoldDigger 🏆

A real-time gold price tracking and investment calculator web application.

## Overview

GoldDigger provides live gold prices in GBP per troy ounce and allows users to calculate how much gold they can purchase with their investment amount. The application features a sleek, gold-themed interface with real-time price updates.

## Features

- **Live Price Updates**: Real-time gold price tracking with WebSocket connection
- **Investment Calculator**: Instantly calculate how many troy ounces you can buy
- **Connection Status**: Visual indicator showing live data connection status
- **Responsive Design**: Mobile-first CSS approach with responsive layouts for larger screens
- **Accessible UI**: ARIA labels and semantic HTML for better accessibility

## Getting Started

### Prerequisites

- Node.js (version 12 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/IsahiRea/gold-digger.git
cd gold-digger
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:3000` (or the port specified by the server)

## Project Structure

```
gold-digger/
├── public/           # Static frontend files
│   ├── index.html    # Main application page
│   ├── index.css     # Styling and themes
│   ├── index.js      # Client-side JavaScript (WebSocket, form handling)
│   ├── gold.png      # Gold image asset
│   └── 404.html      # Error page
├── server.js         # Node.js server (static file serving, WebSocket)
└── package.json      # Project configuration
```

## Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6 modules)
- **Backend**: Node.js
- **Real-time Communication**: Server-Sent Events
- **Styling**: Custom CSS with CSS variables for theming

## Development Status

🚧 **This project is currently under development**

### Completed
- ✅ Frontend UI design and styling
- ✅ Responsive layout with mobile-first approach
- ✅ Accessible form controls and ARIA labels

### In Progress
- 🔨 Server implementation
- 🔨 Client-side JavaScript (WebSocket client, form handling)
- 🔨 Gold price API integration
- 🔨 Real-time price update mechanism

## License

ISC

## Acknowledgments

- Gold price data will be sourced from a public API (TBD)
- Font: Poppins, Roboto, and Saira Stencil One from Google Fonts
