# GoldDigger Setup Guide

## Overview

GoldDigger is a web application that provides live gold price tracking and investment calculations using Server-Sent Events (SSE) for real-time updates.

## Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

## Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd gold-digger
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

## Project Structure

```
gold-digger/
├── public/               # Frontend static files
│   ├── index.html       # Main HTML page
│   ├── index.css        # Styling (mobile-first)
│   ├── index.js         # Client-side JavaScript (SSE client)
│   ├── gold.png         # Gold image asset
│   └── 404.html         # Error page
├── server.js            # Backend server (needs implementation)
├── docs/                # Documentation
│   └── SETUP.md         # This file
├── CLAUDE.md            # Project instructions for Claude Code
├── package.json         # Project dependencies
└── README.md            # Project overview
```

## Running the Application

### Development Mode

```bash
npm start
```

The application will be available at `http://localhost:3000` (or the port specified in your server configuration).

## How It Works

### Frontend (Client-Side)

The frontend (`public/index.js`) uses **Server-Sent Events (SSE)** to receive live gold price updates:

1. **SSE Connection**: Connects to `/api/price-stream` endpoint
2. **Price Updates**: Receives real-time price data in JSON format
3. **Connection Status**: Shows 🟢 when connected, 🔴 when disconnected
4. **Auto-Reconnect**: Automatically reconnects every 5 seconds if connection drops

### Backend (Server-Side)

The backend needs to implement the following:

#### 1. HTTP Server
- Serve static files from the `public/` directory
- Handle SSE endpoint at `/api/price-stream`

#### 2. SSE Endpoint (`/api/price-stream`)

**Required Headers:**
```javascript
{
  'Content-Type': 'text/event-stream',
  'Cache-Control': 'no-cache',
  'Connection': 'keep-alive'
}
```

**Data Format:**
```
data: {"price": 1234.56}

```
*(Note: Two newlines after the data)*

**Example Implementation:**
```javascript
app.get('/api/price-stream', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // Send price updates
  const sendPrice = () => {
    const price = getCurrentGoldPrice(); // Your price source
    res.write(`data: ${JSON.stringify({ price })}\n\n`);
  };

  // Send initial price
  sendPrice();

  // Send updates periodically
  const interval = setInterval(sendPrice, 5000);

  // Cleanup on client disconnect
  req.on('close', () => {
    clearInterval(interval);
    res.end();
  });
});
```

#### 3. Gold Price Data Source

You'll need to integrate with a gold price API. Options include:

- **Metals API** (https://metals-api.com/) - Real-time precious metals rates
- **Gold API** (https://www.goldapi.io/) - Gold price API
- **Alpha Vantage** (https://www.alphavantage.co/) - Free API with commodities data
- **Custom Mock Data** - For development/testing

## API Integration

### Frontend to Backend Flow

1. **Page Load**: Client connects to `/api/price-stream`
2. **SSE Stream**: Server sends price updates as they occur
3. **Price Display**: Client updates UI with new prices
4. **Investment Calculation**: User enters amount, client calculates ounces
5. **Purchase Summary**: Modal shows calculated results

### Event Source API (Client)

```javascript
const eventSource = new EventSource('/api/price-stream');

eventSource.onmessage = (event) => {
  const data = JSON.parse(event.data);
  // Update price display with data.price
};

eventSource.onerror = (error) => {
  // Handle disconnection
};
```

## Configuration

### Environment Variables

Create a `.env` file in the project root:

```env
PORT=3000
GOLD_API_KEY=your_api_key_here
GOLD_API_URL=https://api.example.com/gold-price
UPDATE_INTERVAL=5000  # Price update interval in milliseconds
```

### Server Configuration

In `server.js`, you'll need to:

1. Load environment variables
2. Set up Express server (or your preferred framework)
3. Configure static file serving
4. Implement SSE endpoint
5. Integrate with gold price API

## Development Notes

### Mobile-First Design

The CSS (`public/index.css`) uses a mobile-first approach with responsive breakpoints for larger screens.

### ES6 Modules

The client-side JavaScript uses ES6 module syntax:
```html
<script type="module" src="index.js"></script>
```

### ARIA Accessibility

- Price display uses `aria-live="assertive"` for immediate updates
- Connection status uses `aria-live="polite"` for non-intrusive updates
- Dialog has proper ARIA labels and roles

## Testing

### Manual Testing Checklist

- [ ] SSE connection establishes (🟢 status)
- [ ] Price updates display in real-time
- [ ] Connection status changes to 🔴 when server stops
- [ ] Auto-reconnect works after connection loss
- [ ] Investment calculator works correctly
- [ ] Purchase summary dialog displays accurate information
- [ ] Dialog closes with OK button and Escape key
- [ ] Form validation prevents invalid inputs
- [ ] Mobile responsive design works

### Testing SSE Connection

Use browser DevTools:

1. **Network Tab**: Check for `/api/price-stream` request with type "eventsource"
2. **Console**: Monitor connection logs and errors
3. **Application Tab**: View active EventSource connections

## Troubleshooting

### Connection Issues

**Problem**: Price not updating (🔴 status)
- Check if server is running
- Verify `/api/price-stream` endpoint is implemented
- Check browser console for errors
- Ensure CORS headers are set if frontend/backend on different domains

**Problem**: Auto-reconnect not working
- Check that event source is being recreated after errors
- Verify 5-second timeout is not being blocked
- Check server logs for connection issues

### Price Calculation Issues

**Problem**: "Price not available" error
- Ensure SSE connection is established before investing
- Check that `currentGoldPrice` is being updated
- Verify price data format matches expected JSON structure

## Next Steps

1. **Implement Server**: Complete `server.js` with HTTP server and SSE endpoint
2. **API Integration**: Connect to real gold price API
3. **Error Handling**: Add comprehensive error handling and user feedback
4. **Testing**: Write unit and integration tests
5. **Deployment**: Configure for production environment

## Resources

- [Server-Sent Events Specification](https://html.spec.whatwg.org/multipage/server-sent-events.html)
- [MDN: Using Server-Sent Events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events)
- [Express.js Documentation](https://expressjs.com/)
- [Node.js SSE Tutorial](https://nodejs.org/en/docs/)

## Support

For issues or questions:
- Check `CLAUDE.md` for project-specific guidance
- Review this setup guide
- Check browser console for client-side errors
- Check server logs for backend errors
