document.addEventListener('DOMContentLoaded', () => {
  const eventsSection = document.getElementById('events-section');

  // Modal elements
  const eventModal = document.getElementById('eventModal');
  const closeModalBtn = document.getElementById('closeModal');
  const modalImage = document.getElementById('modalImage');
  const modalTitle = document.getElementById('modalTitle');
  const modallongDescription = document.getElementById('modallongDescription');
  const modalPackage = document.getElementById('modalPackage');
  const modalbasePrice = document.getElementById('modalbasePrice');

  // Fetch events
  fetch('data/events.json')
    .then(response => response.json())
    .then(data => {
      data.events.forEach(event => {
        // Create a card container
        const card = document.createElement('div');
        card.className = 'event-card';

        // Event Image
        const img = document.createElement('img');
        img.className = 'event-image';
        img.src = event.image; // Ensure this path is correct
        img.alt = event.title;

        // Event Title
        const title = document.createElement('h2');
        title.textContent = event.title;

        // Event Description
        const desc = document.createElement('p');
        desc.textContent = event.description;

                // Event Description
        const desc1 = document.createElement('p');
        desc1.textContent = event.longDescription;

        // More Button
        const moreBtn = document.createElement('button');
        moreBtn.className = 'more-button';
        moreBtn.textContent = 'More';
        moreBtn.addEventListener('click', () => {
          openModal(event);
        });

        // Append to card
        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(desc);
        card.appendChild(moreBtn);

        // Append card to the #events-section
        eventsSection.appendChild(card);
      });
    })
    .catch(error => {
      console.error('Error fetching events:', error);
      eventsSection.textContent = 'Failed to load events.';
    });

  // Open the modal with event details
  function openModal(event) {
    modalImage.src = event.image;
    modalTitle.textContent = event.title;
    modallongDescription.textContent = event.longDescription;
    modalPackage.textContent = event.package;
    modalbasePrice.textContent = event.basePrice;
    eventModal.style.display = 'block';
  }

  // Close the modal when user clicks X
  closeModalBtn.addEventListener('click', () => {
    eventModal.style.display = 'none';
  });

  // Optional: Close modal if user clicks outside of modal content
  window.addEventListener('click', (e) => {
    if (e.target === eventModal) {
      eventModal.style.display = 'none';
    }
  });
});
