let game = {
  field: document.querySelectorAll('.field-item'),
  positions: [],
  properties: {
    name: '',
    difficulty: '',
    userScore: '0',
    mindScore: '0',
  },

  init: () => {
    let name = document.querySelector('.header-name input').value;
    let difficultyInput = document.querySelector('.header-difficult input:checked');

    game.initPositions();
    game.clearField();
    game.properties.name = (name) ? name : 'User';
    game.properties.difficulty = difficultyInput.value;
    game.field.forEach((cell) => {
      cell.addEventListener('click', game.user);
    });
  },

  mind: () => {
    if (game.checkGamesEnd()) {
      game.stopGame();
    }
    else {
      if (game.properties.difficulty === 'easy') {
        game.difficultyEasy();
      }
      else {
        game.difficultyHard();
      }
    }
    game.checkWinner();
  },

  user: (event) => {
    let id = event.target.getAttribute('meta-id');
    let cellAviable = game.checkPosition(id);

    if (cellAviable) {
      game.fillPosition(id, 1);
      game.addCrossIcon(id);
      if(!game.checkWinner()) {
        game.mind();        
      }
    }
  },

  difficultyHard: () => {
    let centralPosition = 4;
    let cellNumber;

    if (game.checkPosition(centralPosition)) {
      cellNumber = centralPosition;
    }
    else {
      let combinations = game.getWinCombinations();
      cellNumber = checkCombinations(combinations);
    }

    game.fillPosition(cellNumber, -1);
    game.addCircleIcon(cellNumber);

    function checkCombinations(item) {
      let position;

      for (let i = 0; i < item.length; i++) {
        let counter = 0;

        for (let j = 0; j < item[i].length; j++) {
          if (item[i][j] < 0 ) {
            counter--;
          }
          else if (item[i][j] > 0 ) {
            counter++;
          }
          else {
            if (i % 3 === 0) {
              position = Math.floor(i / 3) * 3 + j;
            }
            else if (i % 3 === 1) {
              position = Math.floor(i / 3) + j * 3;
            }
            else if (i === 2) {
              position = j * 4;
            }
            else {
              position = 6 - 2 * j; 
            }
          }
        }
        if (counter > 1) {
          return position;
        }
      }

      while (!game.checkPosition(position)) {
        position = Math.floor(Math.random() * game.field.length);
      }
      return position;
    }
  },

  difficultyEasy: () => {
    let cellNumber = Math.floor(Math.random() * game.field.length);
    let cellAviable = game.checkPosition(cellNumber);
    
    if (cellAviable) {
      game.fillPosition(cellNumber, -1);
      game.addCircleIcon(cellNumber);
    } 
    else {
      game.difficultyEasy();
    }
  },

  initPositions: () => {
    for (let j = 0; j < 3; j++) {
      game.positions[j] = [];

      for (let i = 0; i < 3; i++) {
        game.positions[j][i] = NaN;
      }
    }
  },

  checkPosition: (id) => {
    if (!id) {
      return false
    }

    let row = Math.floor(id/3);
    let col = id % 3;
    if (!game.positions[row][col])
      return true;
  },

  fillPosition: (id, item) => {
    let row = Math.floor(id/3);
    let col = id % 3;
    game.positions[row][col] = item;
  },

  checkGamesEnd: () => {
    let counter = 0;
    
    for (let i = 0; i < game.positions.length; i++) {
      for (let j = 0; j < game.positions.length; j++) {
        if (game.positions[i][j]) {
          counter++;
        }
      }
    }

    if (counter === game.positions.length * game.positions.length) {
      page.notify(`It's draw!`, `Try it again`);
      return true;
    }
  },

  getWinCombinations: () => {
    let combinations = [];
    
    for (let i = 0; i < game.positions.length; i++) {
      let line = [];
      let col = [];
      let diog = [];

      for (let j = 0; j < game.positions.length; j++) {
        line.push(game.positions[i][j] * (i * game.positions.length + j  + 0.5));
        col.push(game.positions[j][i] * (j * game.positions.length + i + 0.5));

        if (i < 1) {
          diog.push(game.positions[j][j] * (j * 4 + 0.5));
        }
        else {
          diog.push(game.positions[game.positions.length - j - 1][j] *  (- j * 2 + 6.5));
        }
      }

      combinations.push(line);
      combinations.push(col);
      combinations.push(diog);
    }
    return combinations;
  },

  checkWinner: () => {
    let combinations = game.getWinCombinations();

    for (let i = 0; i < combinations.length; i++) {
      let status = !!combinations[i].reduce((a, b) => {
        return (Math.sign(a) === Math.sign(b)) ? a : NaN;
      });

      if (status) {
        paintCells(combinations[i]);
        if (combinations[i][0] > 0) {
          game.properties.userScore++;
          page.notify(
            `You win!!!`, 
            `<b>${game.properties.name}</b> ${game.properties.userScore} - ${game.properties.mindScore} <b>Mind</b>`
          );
        }
        else {
          game.properties.mindScore++
          page.notify(
            `You loooooose!`, 
            `<b>${game.properties.name}</b> ${game.properties.userScore} - ${game.properties.mindScore} <b>Mind</b>`
          );
        }

        game.changeScore();
        game.initPositions();
        game.stopGame();

        return status;
      }
    }

    function paintCells(line) {
      for (let i = 0; i < line.length; i++) {
        let id = Math.abs(line[i]) - 0.5;
        game.field[id].className += ' win';
      }
    }
  },

  stopGame: () => {
    game.field.forEach((cell) => {
      cell.removeEventListener('click', game.user);
    });
  },

  addCrossIcon: (id) => {
    game.field[id].className += ' cross';
  },

  addCircleIcon: (id) => {
    setTimeout(() => {
      game.field[id].className += ' circle';
    }, 500)
  },

  clearField: () => {
    for (let i = 0; i < game.field.length; i++) {
      game.field[i].className = 'field-item';
    }
  },

  changeScore: () => {
    let user = document.querySelector('.header-score-user');
    let mind = document.querySelector('.header-score-mind');
    user.innerHTML = game.properties.userScore;
    mind.innerHTML = game.properties.mindScore;
  }
}