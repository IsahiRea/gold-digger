# GoldDigger 🏆

A real-time gold price tracking and investment calculator web application.

## Overview

GoldDigger provides live gold prices in GBP per troy ounce and allows users to calculate and record gold purchases with their investment amount. The application features a sleek, gold-themed interface with real-time price updates via Server-Sent Events (SSE).

## Features

- **Live Price Updates**: Real-time gold price tracking via SSE with simulated market fluctuations
- **Investment Calculator**: Instantly calculate how many troy ounces you can buy
- **Purchase Recording**: Submit and persist investment purchases to local storage
- **Connection Status**: Visual indicator showing live data connection status
- **Responsive Design**: Mobile-first CSS approach with responsive layouts for larger screens
- **Accessible UI**: ARIA labels and semantic HTML for better accessibility

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/IsahiRea/gold-digger.git
cd gold-digger
```

2. Install dependencies (if any are added in the future):
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

Or use development mode with auto-reload:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:8080`

## Project Structure

```
gold-digger/
├── src/                          # Backend source code
│   ├── server.js                 # Application entry point
│   ├── config/                   # Configuration
│   │   └── constants.js          # Centralized constants (port, paths, etc.)
│   ├── routes/                   # Route definitions
│   │   └── api.js                # API route handler
│   ├── controllers/              # Request handlers
│   │   ├── priceController.js    # Price streaming logic
│   │   └── purchaseController.js # Purchase handling logic
│   ├── services/                 # Business logic
│   │   ├── priceSimulator.js     # Gold price simulation service
│   │   └── purchaseService.js    # Purchase management service
│   ├── middleware/               # Middleware functions
│   │   └── staticFiles.js        # Static file serving
│   └── utils/                    # Utility functions
│       ├── requestHelpers.js     # Request parsing utilities
│       ├── storageHelpers.js     # File storage utilities
│       ├── getContentType.js     # MIME type detection
│       └── sendResponse.js       # Response formatting
├── public/                       # Frontend assets
│   ├── index.html                # Main application page
│   ├── index.css                 # Styling and themes
│   ├── index.js                  # Client-side JavaScript
│   ├── gold.png                  # Gold image asset
│   └── 404.html                  # Error page
├── data/                         # Runtime data (gitignored)
│   └── purchases.json            # Stored purchase records
└── package.json                  # Project configuration
```

## Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6 modules)
- **Backend**: Node.js (native HTTP module)
- **Real-time Communication**: Server-Sent Events (SSE)
- **Data Storage**: JSON file-based storage
- **Styling**: Custom CSS with CSS variables for theming
- **Architecture**: MVC-inspired pattern (Routes → Controllers → Services)

## API Endpoints

### GET `/api/price-stream`
Server-Sent Events endpoint for real-time gold price updates.
- Broadcasts price updates every second
- Returns JSON format: `{"price": 1900.50}`

### POST `/api/purchase`
Record a gold purchase transaction.

**Request Body:**
```json
{
  "investmentAmount": 1000,
  "goldOunces": 0.52,
  "priceAtPurchase": 1920.50
}
```

**Response:**
```json
{
  "success": true,
  "purchase": {
    "id": "1762556694014",
    "investmentAmount": 1000,
    "goldOunces": 0.52,
    "priceAtPurchase": 1920.5,
    "timestamp": "2025-11-07T23:04:54.014Z"
  },
  "message": "Purchase recorded successfully"
}
```

## Development Status

✅ **Fully Functional**

### Completed Features
- ✅ Frontend UI design and styling
- ✅ Responsive layout with mobile-first approach
- ✅ Accessible form controls and ARIA labels
- ✅ Server implementation with SSE
- ✅ Client-side JavaScript (SSE client, form handling, price calculations)
- ✅ Real-time price simulation
- ✅ Purchase recording and persistence
- ✅ MVC-inspired architecture
- ✅ Graceful shutdown handling

### Future Enhancements
- 🔮 Real gold price API integration
- 🔮 User authentication
- 🔮 Purchase history view
- 🔮 Database integration (PostgreSQL/MongoDB)
- 🔮 Historical price charts
- 🔮 Email notifications for purchases

## Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server with auto-reload

## License

ISC

## Author

Cesar I. Rea

## Acknowledgments

- Price simulation uses realistic market behavior modeling (random walk with mean reversion)
- Font: Poppins, Roboto, and Saira Stencil One from Google Fonts
