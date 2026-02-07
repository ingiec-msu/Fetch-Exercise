// Fetch and display a character from the Rick and Morty API

const API_BASE_URL = 'https://rickandmortyapi.com/api/character';

// Alpine.js component
function characterApp() {
  return {
    loading: false,

    // Initialize the app and load first character
    async init() {
      await this.getNextCharacter();
    },

    // Fetch a new random character
    async getNextCharacter() {
      this.loading = true;
      const randomId = this.getRandomCharacterId();
      await this.fetchCharacter(randomId);
      this.loading = false;
    },

    // Function to fetch a character by ID
    async fetchCharacter(characterId) {
      try {
        const response = await fetch(`${API_BASE_URL}/${characterId}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const character = await response.json();
        this.displayCharacter(character);
      } catch (error) {
        console.error('Error fetching character:', error);
        document.getElementById('character-info').innerHTML = 
          '<p>Error loading character. Please try again.</p>';
      }
    },

    // Function to display character information
    displayCharacter(character) {
      const characterInfo = document.getElementById('character-info');
      
      characterInfo.innerHTML = `
        <div class="character">
          <img src="${character.image}" alt="${character.name}" class="character-image">
          <div class="character-details">
            <h2>${character.name}</h2>
            <p><strong>Species:</strong> ${character.species}</p>
            <p><strong>Gender:</strong> ${character.gender}</p>
            <p><strong>Origin:</strong> ${character.origin.name}</p>
          </div>
        </div>
      `;
    },

    // Function to get a random character (there are 826 characters in the API)
    getRandomCharacterId() {
      return Math.floor(Math.random() * 826) + 1;
    }
  };
}
