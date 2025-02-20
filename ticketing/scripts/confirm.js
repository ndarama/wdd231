document.addEventListener('DOMContentLoaded', () => {
  // 1. Parse the query string from the URL
  const params = new URLSearchParams(window.location.search);

  // 2. Extract relevant fields (adjust if you want email, address, etc.)
  const fullName = params.get('fullname') || 'Guest';
  const phone = params.get('phone') || 'Not provided';
  const ticketPrice = params.get('ticketPrice') || '0';

  // 3. Generate a random eTicket ID (e.g., ETK-123456)
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  const eticketId = `ETK-${randomNum}`;

  // 4. Current date/time (time of record)
  const now = new Date();
  const timeOfRecord = now.toLocaleString(); // e.g. "2/28/2025, 3:15:00 PM"

  // 5. Expiration date (30 days from now)
  const expiration = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
  const expirationDate = expiration.toLocaleDateString(); // e.g. "3/29/2025"

  // 6. Insert data into the DOM
  document.getElementById('userName').textContent = `Hello, ${fullName}!`;
  document.getElementById('phoneDisplay').textContent = `Phone: ${phone}`;
  document.getElementById('receivedAmount').textContent = `Received Amount: $${ticketPrice}`;
  document.getElementById('eticketId').textContent = `Your eTicket ID: ${eticketId}`;
  document.getElementById('validityMsg').textContent = 'Your eTicket is valid for 30 days.';
  document.getElementById('timeOfRecord').textContent = `Time of Record: ${timeOfRecord}`;
  document.getElementById('expirationDate').textContent = `Expiration Date: ${expirationDate}`;
});
