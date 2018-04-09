function startUp() {
  var boardEl = document.querySelector('#chess .board'),
    board = chess.board = new chess.Board();

  resetGame();
  chess.team = {};

  var white = chess.team.white = new chess.Pieces('white'),
    black = chess.team.black = new chess.Pieces('black');

  chess.setup.init(board, boardEl, white, black);

  chess.game = new chess.Game(board);

  chess.ui.init();
}

startUp();

function resetGame() {
  var boardEl = document.querySelector('#chess .board'),
      log = document.querySelector('#chess .log');

  clearInterval(chess.autoPlay);
  clear(boardEl);
  clear(log);
}

function clear(el) {
  while (el.firstChild) el.removeChild(el.firstChild);
}

var byrne_fischer =  'g1f3 g8f6 c2c4 g7g6 b1c3 f8g7 \
d2d4 e8g8 c1f4 d7d5 d1b3 d5c4 b3c4 c7c6 e2e4 b8d7 a1d1 \
d7b6 c4c5 c8g4 f4g5 b6a4 c5a3 a4c3 b2c3 f6e4 g5e7 d8b6 \
f1c4 e4c3 e7c5 f8e8 e1f1 g4e6 c5b6 e6c4 f1g1 c3e2 g1f1 \
e2d4 f1g1 d4e2 g1f1 e2c3 f1g1 a7b6 a3b4 a8a4 b4b6 c3d1 \
h2h3 a4a2 g1h2 d1f2 h1e1 e8e1 b6d8 g7f8 f3e1 c4d5 e1f3 \
f2e4 d8b8 b7b5 h3h4 h7h5 f3e5 g8g7 h2g1 f8c5 g1f1 e4g3 \
f1e1 c5b4 e1d1 d5b3 d1c1 g3e2 c1b1 e2c3 b1c1 a2c2 0-1';

var anderssen_kieseritzky =  'e2e4 e7e5 f2f4 e5f4 f1c4 \
d8h4 e1f1 b7b5 c4b5 g8f6 g1f3 h4h6 d2d3 f6h5 f3h4 h6g5 h4f5 \
c7c6 g2g4 h5f6 h1g1 c6b5 h2h4 g5g6 h4h5 g6g5 d1f3 f6g8 c1f4 \
g5f6 b1c3 f8c5 c3d5 f6b2 f4d6 c5g1 e4e5 b2a1 f1e2 b8a6 f5g7 \
e8d8 f3f6 g8f6 d6e7 1-0';

var kasparov_topalov =  'e2e4 d7d6 d2d4 g8f6 b1c3 g7g6 \
c1e3 f8g7 d1d2 c7c6 f2f3 b7b5 g1e2 b8d7 e3h6 g7h6 d2h6 c8b7 \
a2a3 e7e5 e1c1 d8e7 c1b1 a7a6 e2c1 e8c8 c1b3 e5d4 d1d4 c6c5 \
d4d1 d7b6 g2g3 c8b8 b3a5 b7a8 f1h3 d6d5 h6f4 b8a7 h1e1 d5d4 \
c3d5 b6d5 e4d5 e7d6 d1d4 c5d4 e1e7 a7b6 f4d4 b6a5 b2b4 a5a4 \
d4c3 d6d5 e7a7 a8b7 a7b7 d5c4 c3f6 a4a3 f6a6 a3b4 c2c3 b4c3 \
a6a1 c3d2 a1b2 d2d1 h3f1 d8d2 b7d7 d2d7 f1c4 b5c4 b2h8 d7d3 \
h8a8 c4c3 a8a4 d1e1 f3f4 f7f5 b1c1 d3d2 a4a7 1-0';

var map = {
    byrne_fischer: byrne_fischer,
    anderssen_kieseritzky: anderssen_kieseritzky,
    kasparov_topalov: kasparov_topalov
  },
  resetButton = document.querySelector('#chess button[type="reset"]'),
  buttons = document.querySelectorAll('#chess button.play'),
  range = document.querySelector('#chess input[type="range"]');

resetButton.addEventListener('click', startUp);

buttons.forEach(function(button) {
  button.addEventListener('click', function(event) {
    var li = event.target.parentElement,
      prev = li.parentElement.querySelector('#chess .focus'),
      game = event.target.dataset.game,
      factor = parseInt(range.value) + 20,
      speed = factor * 15;

    if (prev) prev.classList.remove('focus');
    li.classList.add('focus');

    startUp()
    chess.parser.handle(map[game], speed);
  });
});

