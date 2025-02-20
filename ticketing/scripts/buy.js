const categoryPrices = {
  regular: 50,
  economy: 80,
  premium: 120,
  vip: 200
};

document.addEventListener('DOMContentLoaded', () => {
  const ticketCategories = document.getElementsByName('ticketCategory');
  const totalPriceElem = document.getElementById('totalPrice');
  const ticketPriceInput = document.getElementById('ticketPrice');

  // On page load or radio change, update the total
  ticketCategories.forEach(radio => {
    radio.addEventListener('change', () => {
      const selectedCategory = radio.value;
      const price = categoryPrices[selectedCategory] || 50;
      // Update hidden input and displayed total
      ticketPriceInput.value = price;
      totalPriceElem.textContent = 'Total: $' + price;
    });
  });
});