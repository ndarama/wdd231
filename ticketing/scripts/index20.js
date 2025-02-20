document.addEventListener('DOMContentLoaded', () => {
  loadFifaRankings();
  loadMatches();
  initStadiumGallery();
});

/* --------------------------------------
   1) Load FIFA Rankings from MockFly
-------------------------------------- */
function loadFifaRankings() {
  const rankingList = document.getElementById('ranking-list');

  // Replace with your actual MockFly endpoint:
  const MOCKFLY_FIFA_API_URL = 'https://api.mockfly.dev/mocks/4d439a68-b47f-4c4f-a795-a89d02bd4dfa/fifaranking';

  fetch(MOCKFLY_FIFA_API_URL)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Network response was not OK (status ${response.status})`);
      }
      return response.json();
    })
    .then(data => {
      // Clear any "Loading..." placeholder
      rankingList.innerHTML = '';

      // Assuming your MockFly JSON looks like:
      // {
      //   "rankings": [
      //     { "position": 1, "country": "Brazil", "points": 1840, "flag": "..." },
      //     ...
      //   ]
      // }
      if (data.rankings && Array.isArray(data.rankings)) {
        data.rankings.forEach(item => {
          const li = document.createElement('li');

          // Create an <img> for the country flag
          const flagImg = document.createElement('img');
          flagImg.src = item.flag; // e.g. "https://flagcdn.com/h240/rw.png"
          flagImg.alt = `${item.country} flag`;
          flagImg.width = 40;
          // Optional: add some spacing
          flagImg.style.marginRight = '10px';

          // Create text for position/country/points
          const text = document.createTextNode(
            `${item.position}. ${item.country} - ${item.points} pts`
          );

          // Append the flag and text to the <li>
          li.appendChild(flagImg);
          li.appendChild(text);
          rankingList.appendChild(li);
        });
      } else {
        rankingList.innerHTML = '<li>No rankings data found.</li>';
      }
    })
    .catch(error => {
      console.error('Error fetching FIFA rankings:', error);
      rankingList.innerHTML = '<li>Failed to load rankings.</li>';
    });
}

/* --------------------------------------
   2) Load Upcoming Matches & Recent Results
-------------------------------------- */
function loadMatches() {
  const matchList = document.getElementById('match-list');
  const resultsList = document.getElementById('results-list');

  fetch('data/matches.json')
    .then(response => response.json())
    .then(data => {
      // Upcoming Matches
      data.upcomingMatches.forEach(match => {
        const matchDiv = document.createElement('div');
        matchDiv.className = 'match';

        const img = document.createElement('img');
        img.src = match.image;
        img.alt = match.teams;

        const matchCard = document.createElement('div');
        matchCard.className = 'match-card';

        const title = document.createElement('h3');
        title.textContent = match.teams;

        const desc = document.createElement('p');
        desc.textContent = match.description;

        const infoBtn = document.createElement('button');
        infoBtn.textContent = 'More Info';
        infoBtn.addEventListener('click', () => {
          alert(`Match ID: ${match.id}\n${match.teams}\n${match.description}`);
        });

        matchCard.appendChild(title);
        matchCard.appendChild(desc);
        matchCard.appendChild(infoBtn);

        matchDiv.appendChild(img);
        matchDiv.appendChild(matchCard);
        matchList.appendChild(matchDiv);
      });

      // Recent Results
      data.recentResults.forEach(result => {
        const li = document.createElement('li');
        li.textContent = result.teams;

        const previewBtn = document.createElement('button');
        previewBtn.textContent = 'Preview';
        previewBtn.addEventListener('click', () => {
          alert(`Result ID: ${result.id}\n${result.teams}`);
        });

        li.appendChild(previewBtn);
        resultsList.appendChild(li);
      });
    })
    .catch(error => {
      console.error('Error fetching matches:', error);
      matchList.textContent = 'Failed to load upcoming matches.';
      resultsList.innerHTML = '<li>Failed to load recent results.</li>';
    });
}

/* --------------------------------------
   3) Simple Stadium Gallery
-------------------------------------- */
function initStadiumGallery() {
  // If possible, rename business(8).webp to business8.webp to avoid path issues
  const images = [
    'images/stadium.png',
    'images/stadium1.png',
    'images/stadium2.png'
  ];
  let currentIndex = 0;

  const galleryImage = document.getElementById('gallery-image');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  function updateGallery() {
    galleryImage.src = images[currentIndex];
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateGallery();
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateGallery();
  });

  // Initial image
  updateGallery();
}
