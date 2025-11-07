// DOM Elements
const priceDisplay = document.getElementById('price-display');
const connectionStatus = document.getElementById('connection-status');
const investmentForm = document.querySelector('form');
const investmentAmountInput = document.getElementById('investment-amount');
const dialog = document.querySelector('dialog');
const dialogSummary = document.getElementById('investment-summary');
const dialogCloseBtn = dialog.querySelector('button');

// Current gold price (updated via SSE)
let currentGoldPrice = null;

// Initialize SSE connection for live price updates
function initializePriceStream() {
  const eventSource = new EventSource('/api/price-stream');

  eventSource.onopen = () => {
    console.log('Connected to price stream');
    updateConnectionStatus(true);
  };

  eventSource.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);

      if (data.price) {
        currentGoldPrice = data.price;
        updatePriceDisplay(data.price);
      }
    } catch (error) {
      console.error('Error parsing price data:', error);
    }
  };

  eventSource.onerror = (error) => {
    console.error('SSE error:', error);
    updateConnectionStatus(false);

    // Attempt to reconnect after 5 seconds
    setTimeout(() => {
      eventSource.close();
      initializePriceStream();
    }, 5000);
  };

  return eventSource;
}

// Update price display
function updatePriceDisplay(price) {
  if (priceDisplay) {
    priceDisplay.textContent = price.toFixed(2);
  }
}

// Update connection status indicator
function updateConnectionStatus(isConnected) {
  if (connectionStatus) {
    connectionStatus.textContent = isConnected ? 'Live Price 🟢' : 'Live Price 🔴';
  }
}

// Calculate gold purchase
function calculateGoldPurchase(investmentAmount) {
  if (!currentGoldPrice || currentGoldPrice <= 0) {
    throw new Error('Price not available');
  }

  const ounces = investmentAmount / currentGoldPrice;
  return ounces;
}

// Handle form submission
async function handleInvestment(event) {
  event.preventDefault();

  const investmentAmount = parseFloat(investmentAmountInput.value);

  if (isNaN(investmentAmount) || investmentAmount <= 0) {
    alert('Please enter a valid investment amount');
    return;
  }

  if (!currentGoldPrice) {
    alert('Price data not available. Please wait for connection.');
    return;
  }

  try {
    const ounces = calculateGoldPurchase(investmentAmount);

    // Send purchase to server
    const response = await fetch('/api/purchase', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        investmentAmount: investmentAmount,
        goldOunces: ounces,
        priceAtPurchase: currentGoldPrice,
      }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      alert('Purchase failed: ' + (result.error || 'Unknown error'));
      return;
    }

    // Show success dialog with purchase ID
    showPurchaseSummary(ounces, investmentAmount, result.purchase.id);
  } catch (error) {
    alert('Unable to process purchase: ' + error.message);
  }
}

// Show purchase summary dialog
function showPurchaseSummary(ounces, amount, purchaseId) {
  dialogSummary.textContent = `You just bought ${ounces.toFixed(2)} ounces (ozt) for £${amount.toFixed(2)}.\n\nReference: ${purchaseId}\n\nYou will receive documentation shortly.`;
  dialog.showModal();
}

// Close dialog
function closeDialog() {
  dialog.close();
  investmentAmountInput.value = '';
}

// Event listeners
investmentForm.addEventListener('submit', handleInvestment);
dialogCloseBtn.addEventListener('click', closeDialog);

// Close dialog with Escape key
dialog.addEventListener('cancel', closeDialog);

// Initialize price stream on page load
const eventSource = initializePriceStream();

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  eventSource.close();
});
