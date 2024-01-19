const audioFiles = [
    'sounds/camera-capture.mp3',
    'sounds/horror.mp3',
    'sounds/violin.mp3',
    'sounds/samsung.mp3',
    'sounds/short-call.mp3',
    'sounds/jump-scares.mp3',
    'sounds/whoosh.mp3',
    ];
    
  let sequence = [];
  let userSequence = [];
  let level = 1;
  let playing = false;

  function startGame() {
    if (!playing) {
      playing = true;
      generateSequence();
      playSequence();
    }
  }

  function resetGame() {
    playing = false;
    sequence = [];
    userSequence = [];
    level = 1;
  }

  function generateSequence() {
    for (let i = 0; i < level; i++) {
      const randomIndex = Math.floor(Math.random() * audioFiles.length);
      sequence.push(audioFiles[randomIndex]);
    }
  }

  function playSequence() {
    sequence.forEach((sound, index) => {
      setTimeout(() => {
        playSound(sound);
      }, index * 1000);
    });

    setTimeout(() => {
      userTurn();
    }, sequence.length * 1000);
  }

  function playSound(sound) {
    const audio = new Audio(sound);
    audio.play();
  }

  function userTurn() {
    alert('Your turn! Arrange the sounds in the correct order.');
    userSequence = [];
  }

  function checkUserInput(sound) {
    userSequence.push(sound);
    playSound(sound);

    if (userSequence.length === sequence.length) {
      if (arraysEqual(sequence, userSequence)) {
        level++;
        alert('Correct! Next level.');
        playSequence();
      } else {
        alert('Wrong sequence. Game over!');
        resetGame();
      }
    }
  }

  function arraysEqual(arr1, arr2) {
    return arr1.every((value, index) => value === arr2[index]);
  }

  document.addEventListener('DOMContentLoaded', function () {
    audioFiles.forEach(function (sound) {
      const button = document.createElement('button');
      button.className = 'button';
      button.textContent = sound;
      button.addEventListener('click', function () {
        if (playing) {
          checkUserInput(sound);
        } else {
          alert('Click "Start Game" to begin.');
        }
      });
      document.getElementById('game-container').appendChild(button);
    });
  });