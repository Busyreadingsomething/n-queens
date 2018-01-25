/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = undefined; //fixme
  
  // create a new board
  let board = new Board({n: n});
  let boardArray = board.rows();
  
  // declare remainingRooks
  let remainingRooks = n;
  
  // for loop looping through rows
  for (let row = 0; row < boardArray.length; row++) {
    
    // for loop looping through cols
    for (let col = 0; col < boardArray.length; col++) {
      // check to see if there's any conflict (hasRookConflict?)
      // console.log('toggling', row, col, board.rows());
      
      board.togglePiece(row, col);
      if (!board.hasAnyRooksConflicts()) {
        // if it doesn't, toggle at that position
        // decrease remainingRooks by 1
        remainingRooks -= 1;
        break;
        // what if remainingRooks never gets to 0??
      } else {
        board.togglePiece(row, col);
      }
    }
  }

  // set solution to our .rows()
  solution = board.rows();
  
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionList = [];
  
  // inner recrusive function that takes, chessboard and remaining pieces
  var exploreBoard = function(board, remainingRooks) {
    // if remaining pieces equal zero
    if (remainingRooks === 0) {
      // increment solution count
      var res = JSON.stringify(board.rows());
      if (!solutionList.includes(res)) {
        solutionList.push(res);
      }
      return;
    }
    // for loop through the rows
    for (let row = 0; row < board.get('n'); row++) {
      // for loop through the columns
      for (let col = 0; col < board.get('n'); col++) {
        // check to see if piece is already there
        if (board.get(row)[col] > 0) {
          // continue
          continue;
        } else {
          // toggle at that position
          board.togglePiece(row, col);
          // check for conflicts
          if (!board.hasAnyRooksConflicts()) {
            // if no conflict - explore
            exploreBoard(new Board(board.rows()), remainingRooks - 1);
            // recurse passing new chessboard and remaining pieces - 1
          }
          board.togglePiece(row, col);
          // else do nothing
        }
      }
    }
  };
  
  exploreBoard(new Board({n: n}), n);
  var solutionCount = solutionList.length;
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme
  // debugger;
  // declare initial row var
  let initRow = 0;
  // declare initial col var
  let initCol = 0;
  
  // while initial row is less than n && solution is undefined
  while (initRow < n && solution === undefined && n !== 0) {
    
    // create a new board
    let board = new Board({n: n});
    let boardArray = board.rows();
    
    // declare remainingRooks
    let remainingQueens = n;
    // toggle initial piece
    board.togglePiece(initRow, initCol);
    remainingQueens--;
    
    // for loop looping through rows
    for (let row = 0; row < boardArray.length; row++) {
      
      // for loop looping through cols
      for (let col = 0; col < boardArray.length; col++) {
        // check to see if there's any conflict (hasRookConflict?)
        // console.log('toggling', row, col, board.rows());
        
        // if row is initial row and col is initial col
        if (row === initRow && col === initCol) {
          // continue
          continue;
        }
        
        board.togglePiece(row, col);
        if (!board.hasAnyQueensConflicts()) {
          // if it doesn't, toggle at that position
          // decrease remainingRooks by 1
          remainingQueens -= 1;
          break;
          // what if remainingRooks never gets to 0??
        } else {
          board.togglePiece(row, col);
        }
      }
    }
    // check if remaining queens is 0
    if (remainingQueens === 0) {
      solution = board.rows();
    }
    
    // if col is at edge
    if (initCol === n - 1) {
      // set col to 0
      initCol = 0;
      // increment row by one
      initRow++;
    } else {
      // else increment col
      initCol++;
    }
  }
  solution = solution ? solution : new Board({n: n}).rows();
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
