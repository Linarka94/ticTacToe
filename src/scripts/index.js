let page = {
  field: document.querySelectorAll('.field-item'),
  startBtn: document.querySelector('.header-start button'),
  positions: new Array(3),
  properties: {
    name: '',
    difficulty: '',
    userScore: '0',
    mindScore: '0',
  },
  difficulty: 'easy',

  init: () => {
    document.addEventListener('DOMContentLoaded', () => {
      page.listeners();
    });
  },

  listeners: () => {
    page.startBtn.addEventListener('click', () => {
      let name = document.querySelector('.header-name input').value;
      let difficultyInput = document.querySelector('.header-dificult-easy input');

      page.initPositions();
      page.clearField();
      page.properties.name = (name) ? name : 'user';
      page.properties.difficulty = difficultyInput.value;
      page.field.forEach((cell) => {
        cell.addEventListener('click', page.user);
      });
    });
  },

  mind: () => {
    let id = undefined;

    if (page.checkGamesEnd()) {
      page.stopGame();
      alert('Финиш БЛЕАТЬ!!!');
    }
    else {
      if(page.difficulty === 'easy') {
        getRandomEmptyCell();
        page.fillPosition(id, 'O');
        page.addCircleIcon(id);
      }
    }
    page.checkWinner();

    function getRandomEmptyCell() {
      let cellNumber = Math.floor(Math.random() * page.field.length);
      let cellAviable = page.checkPosition(cellNumber);
      id = cellNumber;
      
      if (cellAviable) {
        return id;
      } 
      else {
        getRandomEmptyCell();
      }
    }
  },

  user: (event) => {
    let id = event.target.getAttribute('meta-id');
    let cellAviable = page.checkPosition(id);

    if (cellAviable) {
      page.fillPosition(id, 'X');
      page.addCrossIcon(id);
      if(!page.checkWinner()) {
        page.mind();        
      }
    }
  },

  initPositions: () => {
    for (let j = 0; j < 3; j++) {
      page.positions[j] = new Array(3);

      for (let i = 0; i < 3; i++) {
        page.positions[j][i] = NaN;
      }
    }
  },

  checkPosition: (id) => {
    let row = Math.floor(id/3);
    let col = id % 3;
    if (!page.positions[row][col])
      return true;
  },

  fillPosition: (id, item) => {
    let row = Math.floor(id/3);
    let col = id % 3;
    page.positions[row][col] = item;
  },

  checkGamesEnd: () => {
    let counter = 0;
    
    for (let i = 0; i < page.positions.length; i++) {
      for (let j = 0; j < page.positions.length; j++) {
        if (page.positions[i][j]) {
          counter++;
        }
      }
    }

    if (counter === page.positions.length * page.positions.length) {
      return true;
    }
  },

  checkWinner: () => {
    let combinations = [];
    
    for (let i = 0; i < page.positions.length; i++) {
      let col = [];
      let diog = [];

      for (let j = 0; j < page.positions.length; j++) {
        col.push(page.positions[j][i]);

        if (i < 1) {
          diog.push(page.positions[j][j]);
        }
        else {
          diog.push(page.positions[page.positions.length - j - 1][j]);
        }
      }

      combinations.push(page.positions[i]);
      combinations.push(col);
      combinations.push(diog);
    }

    for (let i = 0; i < combinations.length; i++) {
      let status = !!combinations[i].reduce((a, b) => {
        return (a === b) ? a : NaN;
      });

      if (status) {
        paintCells(i);
        if (combinations[i][0] === 'X') {
          page.properties.userScore++;
          console.log(`You win!!!! The score is:
            ${page.properties.name}: ${page.properties.userScore} - mind: ${page.properties.mindScore}`);
        }
        else {
          page.properties.mindScore++
          console.log(`You loooooose! The score is:
            ${page.properties.name}: ${page.properties.userScore} - mind: ${page.properties.mindScore}`);
        }

        page.changeScore();
        page.initPositions();
        page.stopGame();

        return status;
      }
    }
    function paintCells(line) {
      let main = Math.floor(line / page.positions.length);
      let remainder = line % page.positions.length;
      if (remainder === 0) {
        for (let i = 0; i < page.positions.length; i++) {
          let id = page.positions.length * main + i;
          page.field[id].className += ' win';
        }
      }
      else if (remainder === 1) {
        for (let i = 0; i < page.positions.length; i++) {
          let id = page.positions.length * i + main;
          page.field[id].className += ' win';
        }
      }
      else {
        for (let i = 0; i < page.positions.length; i++) {
          let id = (page.positions.length + 1) * i;
          if (main) {
            id = i * remainder + remainder;
          }
          page.field[id].className += ' win';
        }
      }
    }
  },

  stopGame: () => {
    page.field.forEach((cell) => {
      cell.removeEventListener('click', page.user);
    });
  },

  addCrossIcon: (id) => {
    page.field[id].className += ' cross';
  },

  addCircleIcon: (id) => {
    setTimeout(() => {
      page.field[id].className += ' circle';
    }, 500)
  },

  clearField: () => {
    for (let i = 0; i < page.field.length; i++) {
      page.field[i].className = 'field-item';
    }
  },

  changeScore: () => {
    let user = document.querySelector('.header-score-user');
    let mind = document.querySelector('.header-score-mind');
    user.innerHTML = page.properties.userScore;
    mind.innerHTML = page.properties.mindScore;
  }
}

page.init();