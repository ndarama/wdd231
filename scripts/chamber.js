// Business Directory Array
const businesses = [
    {
        name: "Business One",
        tagline: "Quality Services",
        email: "info@businessone.com",
        phone: "+1 123 456 7890",
        website: "https://www.businessone.com"
    },
    {
        name: "Business Two",
        tagline: "Innovative Solutions",
        email: "contact@businesstwo.com",
        phone: "+1 987 654 3210",
        website: "https://www.businesstwo.com"
    },
    {
        name: "Business Three",
        tagline: "Your Trusted Partner",
        email: "hello@businessthree.com",
        phone: "+1 555 666 7777",
        website: "https://www.businessthree.com"
    }
];

// Recent News Array
const recentNews = [
    {
        title: "Kigali Business Expo 2025",
        description: "A great opportunity for businesses to showcase their products.",
        link: "#"
    },
    {
        title: "New Trade Regulations Announced",
        description: "The government has introduced new measures to support local businesses.",
        link: "#"
    },
    {
        title: "Startup Grant Applications Open",
        description: "Applications are now open for the 2025 Startup Grant Program.",
        link: "#"
    }
];

// Upcoming Events Array
const upcomingEvents = [
    {
        title: "Business Networking Breakfast",
        date: "February 10, 2025",
        location: "Heaven House, Kigali"
    },
    {
        title: "Digital Marketing Workshop",
        date: "March 5, 2025",
        location: "Innovation Hub, Kigali"
    },
    {
        title: "Annual General Meeting",
        date: "March 20, 2025",
        location: "Chamber of Commerce Hall, Kigali"
    }
];

// Display Business Directory
const displayBusinesses = () => {
    const businessContainer = document.querySelector('.business-list');
    businesses.forEach(business => {
        const card = document.createElement('div');
        card.classList.add('business-card');
        card.innerHTML = `
            <h3>${business.name}</h3>
            <p>${business.tagline}</p>
            <p>Email: <a href="mailto:${business.email}">${business.email}</a></p>
            <p>Phone: <a href="tel:${business.phone}">${business.phone}</a></p>
            <p><a href="${business.website}" target="_blank">Visit Website</a></p>
        `;
        businessContainer.appendChild(card);
    });
};

displayBusinesses();

// Display Recent News
const displayRecentNews = () => {
    const newsContainer = document.querySelector('.news ul');
    recentNews.forEach(news => {
        const newsItem = document.createElement('li');
        newsItem.innerHTML = `
            <a href="${news.link}" target="_blank">${news.title}</a>
        `;
        newsContainer.appendChild(newsItem);
    });
};

displayRecentNews();

// Display Upcoming Events
const displayUpcomingEvents = () => {
    const eventsContainer = document.querySelector('.event-list');
    upcomingEvents.forEach(event => {
        const eventItem = document.createElement('div');
        eventItem.classList.add('event-item');
        eventItem.innerHTML = `
            <h3>${event.title}</h3>
            <p>${event.date}</p>
            <p>${event.location}</p>
        `;
        eventsContainer.appendChild(eventItem);
    });
};

displayUpcomingEvents();

// Display Weather and Forecast (Mock Data)
const displayWeather = () => {
    const weatherContainer = document.querySelector('.weather');
    const forecastContainer = document.querySelector('.forecast');

    const weatherData = "Sunny, 25°C"; // Replace with API data if available
    const forecastData = "Tomorrow: Partly Cloudy, 22°C"; // Replace with API data if available

    weatherContainer.innerHTML += `<p>${weatherData}</p>`;
    forecastContainer.innerHTML += `<p>${forecastData}</p>`;
};

displayWeather();

// Join Us Button
const setupJoinUsButton = () => {
    const joinButton = document.querySelector('.intro .btn');
    joinButton.addEventListener('click', () => {
        alert("Thank you for your interest! Please fill out the membership form on our Join page.");
    });
};

setupJoinUsButton();
