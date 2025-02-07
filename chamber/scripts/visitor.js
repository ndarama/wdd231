// Visitor Message Script with improved checks and logging
document.addEventListener('DOMContentLoaded', function () {
    const messageElement = document.getElementById('visitor-message');
    const lastVisit = localStorage.getItem('lastVisit');
    const now = Date.now();

    if (!messageElement) {
        console.error('Visitor message element not found.');
        return;
    }

    if (!lastVisit) {
        console.log('First visit detected.');
        messageElement.textContent = 'Welcome! Let us know if you have any questions.';
    } else {
        const timeDifference = now - parseInt(lastVisit);
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        console.log(`Last visit was ${daysDifference} days ago.`);

        if (daysDifference < 1) {
            messageElement.textContent = 'Back so soon! Awesome!';
        } else {
            const dayLabel = daysDifference === 1 ? 'day' : 'days';
            messageElement.textContent = `You last visited ${daysDifference} ${dayLabel} ago.`;
        }
    }

    // Update the last visit date
    localStorage.setItem('lastVisit', now);

    // Footer date updates
    document.getElementById('currentyear').textContent = new Date().getFullYear();
    document.getElementById('lastModified').textContent = `Last Modification: ${document.lastModified}`;
});