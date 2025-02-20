document.addEventListener('DOMContentLoaded', () => {
    // Fetch the JSON data
    fetch('data/teams.json')
      .then(response => response.json())
      .then(data => {
        const teamsContainer = document.getElementById('teams-container');
  
        data.teams.forEach(team => {
          // Create a row for each team
          const teamRow = document.createElement('div');
          teamRow.className = 'team-row';
  
          // Team logo
          const logoImg = document.createElement('img');
          logoImg.src = team.logo;
          logoImg.alt = team.name;
          logoImg.className = 'team-logo';
  
          // Team info container
          const teamInfo = document.createElement('div');
          teamInfo.className = 'team-info';
  
          // Team name
          const nameElem = document.createElement('h3');
          nameElem.textContent = team.name;
  
          // 5-match form container
          const matchForm = document.createElement('div');
          matchForm.className = 'match-form';
  
          // For each match, compute W, L, or D
          // (Assuming exactly 5 matches in the array)
          team.matches.forEach(match => {
            const outcome = getResult(match.homeGoals, match.awayGoals);
            const span = document.createElement('span');
            span.textContent = outcome;
            span.classList.add(`result-${outcome.toLowerCase()}`);
            matchForm.appendChild(span);
          });
  
          // Assemble everything
          teamInfo.appendChild(nameElem);
          teamInfo.appendChild(matchForm);
          teamRow.appendChild(logoImg);
          teamRow.appendChild(teamInfo);
          teamsContainer.appendChild(teamRow);
        });
      })
      .catch(error => console.error('Error loading teams:', error));
  });
  
  /**
   * Returns 'W' if homeGoals > awayGoals
   *         'L' if homeGoals < awayGoals
   *         'D' if homeGoals === awayGoals
   */
  function getResult(homeGoals, awayGoals) {
    if (homeGoals > awayGoals) return 'W';
    if (homeGoals < awayGoals) return 'L';
    return 'D';
  }
  