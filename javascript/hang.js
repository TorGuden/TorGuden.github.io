let wordList = [
  "Suspicious",
  "Attack-Helicopter",
  "Battle-Pass",
  "Velociraptor",
  "Among-Us",
  "Anime",
  "Genshin-Inpact",
  "Man-I-Love-Frogs",
  "Peter-Griffin",
  "Griddy",
  "Hentai",
  "fuck-you",
  "Retarded",
  "Quandale-Dingle",
  "Legalize-nuclear-bombs",
] //Word list for random to choose from

const random = Math.floor(Math.random() * wordList.length) //Chooses a random word from the word list
const word = wordList[random]; // Word to be guessed

//Sets up confetti
const jsConfetti = new JSConfetti()
function confettiFY(){
  jsConfetti.addConfetti()
}

// Get container element to append to.
const container = document.getElementById('buttons-container');
const displayElement = document.getElementById('word-display');
const failElement = document.getElementById('fail-counter');

// Create array to hold underscores for each letter in the word
let display = [];
for (let i = 0; i < word.length; i++) {
  if (word[i].match(/[a-z]/i)) { // Checks if character is a letter
    display.push('_');
  } else {
    display.push(word[i]); // Preserves non-letter characters (e.g. spaces or punctuation)
  }
}

// Create display element to show underscores for each letter in the word
displayElement.innerHTML = display.join(' ');

// Array of letters
const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

// Loop through alphabet array and create buttons
alphabet.forEach(letter => {
  const button = document.createElement('button');
  button.innerHTML = letter;
  button.classList.add('letter-button');
  button.setAttribute('id', letter);
  container.appendChild(button);

  // Adds the click event to the buttons
  button.addEventListener('click', () => {
    button.disabled = true; // Disable button once it has been pressed
    checkLetter(letter.toLowerCase()); // Call checkLetter function with the pressed letter as argument
  });
});

let fails = 0; // Initialize fail counter
let maxfailures = 6; // Mazimum number of failures
failElement.innerHTML = `Tries: ${fails} out of ${maxfailures}`

// Function to update display with correctly guessed letters
function updateDisplay(letter) {
  for (let i = 0; i < word.length; i++) {
    if (word.toLowerCase()[i] === letter) { //Checks if letter matches the word
      display[i] = word[i]; 
    }
  }
  displayElement.innerHTML = display.join(' '); //Updates display to show the letter
}

// Checks if the letter is either correct or incorrect
function checkLetter(letter) {
  // Check if guessed letter is in the word
  if (word.toLowerCase().includes(letter)) {
    updateDisplay(letter); // Update display with correctly guessed letter
    // Check if all letters have been guessed
    if (!display.includes('_')) {
      alert('Congratulations, you guessed the word!');
      confettiFY();
      failElement.innerHTML = '';
      container.innerHTML = '';
    }
  } else {
    fails++; //Increses fail count
    failElement.innerHTML = `Tries: ${fails} out of ${maxfailures}`; //Updates failure display
    if (fails >= 6) { //Checks if all tries have been used
      alert(`Sorry, you have run out of tries. The word was "${word}".`);
      displayElement.innerHTML = `GAME OVER`;
      failElement.innerHTML = ''; //removes failure display
      container.innerHTML = ''; // disable all buttons
    } else {
    }
  }
}