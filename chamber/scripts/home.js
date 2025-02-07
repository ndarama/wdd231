// Fetch and display weather data using the OpenWeatherMap API
document.addEventListener("DOMContentLoaded", () => {
    // Initialize all features on page load
    initializeMembersFeature();
    initializeEventsFeature();
    initializeSpotlightsFeature();
    initializeWeatherFeature();
    updateFooterDates();
});

// Helper: Fetch data from a URL and return JSON
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch data from ${url}`);
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}

// Members Feature
async function initializeMembersFeature() {
    const memberList = document.getElementById("member-list");
    const gridViewButton = document.getElementById("grid-view");
    const listViewButton = document.getElementById("list-view");

    const membersData = await fetchData("data/members.json");
    if (!membersData) {
        memberList.innerHTML = `<p style="color:red; text-align:center;">⚠ Failed to load members.</p>`;
        return;
    }

    displayMembers(membersData, "grid");

    gridViewButton.addEventListener("click", () => displayMembers(membersData, "grid"));
    listViewButton.addEventListener("click", () => displayMembers(membersData, "list"));

    function displayMembers(data, view) {
        memberList.innerHTML = "";
        memberList.className = view === "grid" ? "grid-view" : "list-view";

        if (data.length === 0) {
            memberList.innerHTML = `<p style="text-align:center;">No members found.</p>`;
            return;
        }

        data.forEach(member => {
            const card = document.createElement("div");
            card.className = `card ${getMembershipClass(member.membership)}`;
            card.innerHTML = `
                <div class="membership-badge">${getMembershipBadge(member.membership)}</div>
                <img src="${member.logo}" alt="${member.name} Logo" class="business-logo">
                <div class="card-content">
                    <h3>${member.name}</h3>
                    <p><strong>Address:</strong> ${member.address}</p>
                    <p><strong>Phone:</strong> ${member.phone}</p>
                    <a href="${member.website}" target="_blank">🌐 Visit Website</a>
                </div>
            `;
            if (view === "list") card.classList.add("list-item");
            memberList.appendChild(card);
        });
    }

    function getMembershipClass(level) {
        return level === 3 ? "gold-member" : level === 2 ? "silver-member" : "regular-member";
    }

    function getMembershipBadge(level) {
        return level === 3 ? "🏆 Gold Member" : level === 2 ? "🥈 Silver Member" : "👤 Regular Member";
    }
}

// Events Feature
function initializeEventsFeature() {
    const eventsContent = document.querySelector(".events-content");

    const eventsData = [
        {
            title: "Annual Business Meeting",
            date: "March 10, 2025",
            description: "Join us for our annual meeting where key business strategies and updates will be discussed.",
            location: "Kigali Conference Center",
            image: "../images/rwandatravel (6).webp",
        },
        {
            title: "Tech Innovations Exhibition",
            date: "April 22, 2025",
            description: "Showcasing the latest technological advancements in various industries.",
            location: "Expo Grounds, Kigali",
            image: "../images/rwandatravel (4).webp",
        },
        {
            title: "Networking Dinner",
            date: "May 15, 2025",
            description: "An exclusive opportunity to connect with top business professionals over dinner.",
            location: "The Prestige Hotel, Kigali",
            image: "../images/rwandatravel (1).webp",
        },
    ];

    displayEvents(eventsData);

    function displayEvents(data) {
        if (data.length === 0) {
            eventsContent.innerHTML = "<p>No events currently scheduled. Check back soon!</p>";
            return;
        }

        let eventsHtml = '<div class="event-slider">';
        data.forEach(event => {
            eventsHtml += `
                <div class="event-slide">
                    <img src="${event.image}" alt="${event.location}" class="event-image" style="width:100%; max-width:600px; border-radius:8px; margin-bottom:10px;">
                    <h3>📅 ${event.title}</h3>
                    <p><strong>📍 Location:</strong> ${event.location}</p>
                    <p><strong>🗓️ Date:</strong> ${event.date}</p>
                    <p>${event.description}</p>
                </div>
            `;
        });
        eventsHtml += "</div>";
        eventsContent.innerHTML = eventsHtml;
        initializeSlider();
    }

    function initializeSlider() {
        let currentSlide = 0;
        const slides = document.querySelectorAll(".event-slide");
        slides.forEach((slide, index) => (index === currentSlide ? slide.style.display = "block" : slide.style.display = "none"));

        setInterval(() => {
            slides[currentSlide].style.display = "none";
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].style.display = "block";
        }, 5000);
    }
}

// Spotlights Feature
async function initializeSpotlightsFeature() {
    const spotlightContainer = document.getElementById("spotlight-container");

    try {
        const membersData = await fetchData("data/members.json");
        if (!membersData || membersData.length === 0) {
            spotlightContainer.innerHTML = '<p>No spotlight members available.</p>';
            return;
        }

        console.log("Members data for spotlight:", membersData);

        // Filter for gold and silver members
        const filteredMembers = membersData.filter(member => member.membership === 3 || member.membership === 2);

        if (filteredMembers.length === 0) {
            spotlightContainer.innerHTML = '<p>No spotlight members available.</p>';
            return;
        }

        // Randomly select up to 3 members to display
        const selectedMembers = filteredMembers.sort(() => 0.5 - Math.random()).slice(0, 3);

        selectedMembers.forEach(member => {
            const card = document.createElement("div");
            card.className = "spotlight-card";
            card.innerHTML = `
                <div class="membership-badge">${getMembershipBadge(member.membership)}</div>
                <img src="${member.logo}" alt="${member.name} Logo" class="business-logo" style="max-width: 50%; height: auto; margin: 0 auto;">
                <div class="card-content">
                    <h3>${member.name}</h3>
                    <p><strong>Address:</strong> ${member.address}</p>
                    <p><strong>Phone:</strong> ${member.phone}</p>
                    <a href="${member.website}" target="_blank">🌐 Visit Website</a>
                </div>
            `;
            spotlightContainer.appendChild(card);
        });
    } catch (error) {
        console.error('Error fetching spotlight data:', error);
        spotlightContainer.innerHTML = '<p style="color:red;">Failed to load business spotlights. Please try again later.</p>';
    }
}

function getMembershipBadge(level) {
    switch (level) {
        case 3: return "🏆 Gold Member";
        case 2: return "🥈 Silver Member";
        default: return "👤 Regular Member";
    }
}

// Weather Feature
async function initializeWeatherFeature() {
    const weatherInfo = document.getElementById('weather-info');

        try {
            const apiKey = 'd851c34112f3955f9eb20b20b6fdcbc5';  // OpenWeatherMap API key
            const lat = -1.9535;  // Latitude for Kigali
            const lon = 30.0438;  // Longitude for Kigali
            const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);

            if (!response.ok) throw new Error('Failed to fetch weather data');

            const data = await response.json();
            displayWeather(data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            weatherInfo.innerHTML = '<p style="color:red;">❌ Failed to load weather data. Please try again later.</p>';
        }


    function displayWeather(data) {
        const currentWeather = data.current;
        const descriptions = currentWeather.weather.map(w => capitalizeWords(w.description)).join(', ');
        const temp = Math.round(currentWeather.temp);

        let forecastHtml = `<p><strong>🌡️ Current Temperature:</strong> ${temp}&deg;C</p>`;
        forecastHtml += `<p><strong>☁️ Weather:</strong> ${descriptions}</p>`;
        forecastHtml += `<h3>📅 3-Day Forecast</h3><ul>`;

        // Generate a 3-day weather forecast with emoji icons
        for (let i = 1; i <= 3; i++) {
            const forecast = data.daily[i];
            const date = new Date(forecast.dt * 1000).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
            const forecastDesc = capitalizeWords(forecast.weather[0].description);
            const tempDay = Math.round(forecast.temp.day);
            const weatherIcon = getWeatherIcon(forecast.weather[0].main);

            forecastHtml += `<li>📆 ${date}: ${tempDay}&deg;C ${weatherIcon} ${forecastDesc}</li>`;
        }
        forecastHtml += '</ul>';

        weatherInfo.innerHTML = forecastHtml;
    }

    function capitalizeWords(str) {
        return str.replace(/\b\w/g, char => char.toUpperCase());
    }

    function getWeatherIcon(condition) {
        switch (condition.toLowerCase()) {
            case 'clear': return '☀️';
            case 'clouds': return '☁️';
            case 'rain': return '🌧️';
            case 'thunderstorm': return '⛈️';
            case 'snow': return '❄️';
            case 'mist': return '🌫️';
            default: return '🌤️';
        }
    }
}

// 5. Footer Updates
function updateFooterDates() {
    document.getElementById("currentyear").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = `Last Modification: ${document.lastModified}`;
}

updateFooterDates();

// Populate the thank-you page with form data from the query parameters
const params = new URLSearchParams(window.location.search);
document.getElementById('display-first-name').textContent = params.get('firstName');
document.getElementById('display-last-name').textContent = params.get('lastName');
document.getElementById('display-email').textContent = params.get('email');
document.getElementById('display-phone').textContent = params.get('phone');
document.getElementById('display-business-name').textContent = params.get('businessName');
document.getElementById('display-timestamp').textContent = params.get('timestamp');

 // Generate current date if timestamp is missing and display it
 const timestamp = params.get('timestamp') || new Date().toLocaleString();
 document.getElementById('display-timestamp').textContent = timestamp;
