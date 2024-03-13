function printHighscores() {
  var highscores = JSON.parse(localStorage.getItem('highscores')) || [];

  highscores.sort((a, b) => b.score - a.score);

  for (var i = 0; i < highscores.length; i++) {
    var liTag = document.createElement('li');
    liTag.textContent = `${highscores[i].initials} - ${highscores[i].score}`;

    var olEl = document.getElementById('highscores');
    olEl.appendChild(liTag);
  }
}

function clearHighscores() {
  localStorage.removeItem('highscores');
  location.reload();
}

document.getElementById('clear').addEventListener('click', clearHighscores);

printHighscores();
