(function(){
  var chess = window.chess = window.chess || {};

  function handle(data, speed) {
    var string = data.replace(/\[.*\]|\n/g, ''),
      moves = string.split(' ');
    play(moves, speed);
  }

  function play(moves, duration) {
    var counter = 0;

    console.log('duration', duration)

    chess.autoPlay = setInterval(function() {
      if (counter === moves.length - 1)
        return clearInterval(chess.autoPlay)

      var move = moves[counter],
        sq1 = chess.board[move.slice(0,2)],
        sq2 = chess.board[move.slice(2)];

      checkIfCastling(sq1, sq2);
      chess.game.movePiece(sq1, sq2);
      counter++;

    }, duration);
  }

  function checkIfCastling(sq1, sq2) {
    var isKing = sq1.man.name === 'king',
      diff = sq2.coords[0] - sq1.coords[0],
      files = { '2': ['h','f'], '-2': ['a','d'] },
      rank, file1, file2, cSq1, cSq2;

    if (isKing && Math.abs(diff) === 2) {
      rank = sq1.name[1];
      file1 = files[diff][0];
      file2 = files[diff][1];
      cSq1 = chess.board[file1 + rank];
      cSq2 = chess.board[file2 + rank];
      chess.game.movePiece(cSq1, cSq2);
    }
  }

  chess.parser = {
    handle: handle
  }
})();