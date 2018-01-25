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
  var board = new Board({n: n});
  
  // create a column variable
  var col = 0;
  
  // loop through the rows
  for (var row = 0; row < n; row++) {
    // toggle at the current row at column
    board.togglePiece(row, col);
    // after we toggle, increment col by one
    col += 1;
  }

  // set sol'n equal to board rows
  solution = board.rows();
  
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  // create an empty sol'n array
  var solutions = [];
  var solutionCount = 0;
  // loop through the col
  var possibleRows = [];
  for (var col = 0; col < n; col++) {
    // generate an array where col is 1, but all other are 0
    var row = _.range(n).map(function(item, i) {
      if (i === col) {
        return 1;
      } else {
        return 0;
      }
    });
    
    possibleRows.push(row);
  }
  
  // inner function - depth first search - paramater current board, remaining possibilites
  var depthFirstSearch = function(rowsSoFar, remainingPossibleRows) {
    // if remaining poss is none
    if (remainingPossibleRows.length === 0) {
      // push the current board into solution array
      // solutions.push(rowsSoFar);
      solutionCount++;
    } else {
    // else recurse for each possibility decrement remaining possibilities by 'one'
      for (var i = 0; i < remainingPossibleRows.length; i++) {
        var copySoFar = rowsSoFar.slice();
        copySoFar.push(remainingPossibleRows[i]);
        var copyPossibleRows = remainingPossibleRows.filter(function(item, j) {
          return i !== j;
        });
        depthFirstSearch(copySoFar, copyPossibleRows);
      }
    }
  };
  depthFirstSearch([], possibleRows);
  // invoke inner function on each possible rows
  // solutionCount = solutions.length;
  // solutionCount set to solution array length
  return solutionCount;
  // return solutionCount;
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
  // console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  // declare solutionList
  var solutionList = [];
  // genereate possible rows from 0 to n-1
  var possibleRows = _.range(n);
  
  // inner recursive function - param: array up to that point, possible remaining rows
  var depthFirstSearch = function(currentBoard, remainingPossibleRows) {
    // if PRR is 0
    if (remainingPossibleRows.length === 0) {
      // push to solution list
      solutionList.push(currentBoard);
      return;
    }
    // loop through possible remaining rows
    for (var i = 0; i < remainingPossibleRows.length; i++) {
      // make a copy of array up to that point
      var newBoard = currentBoard.slice();
      newBoard.push(remainingPossibleRows[i]);
      // check for diagonal conflicts
      var conflict = false;
      var last = newBoard.length - 1;
      for (var j = 0; j < last; j++) {
        if (Math.abs(newBoard[j] - newBoard[last]) === last - j) {
          conflict = true;
          break;
        }
      }
      // make copy PRR and filter i vs j
      if (!conflict) {
        var copyRemainingRows = remainingPossibleRows.filter(function(item) {
          return item !== remainingPossibleRows[i];
        });
        depthFirstSearch(newBoard, copyRemainingRows);
      }
      // if no conflict
        // recurse - copy of array at that point, possible remaining rows - what we added
      // else just return
    }
  };
  depthFirstSearch([], possibleRows);
  
  console.log(JSON.stringify(solutionList));
  return solutionList.length;
  //invoke inner function - passing [] and list of all possible rows
  
  // return length of solution list
  
  
  // var solutionCount = 0; //fixme

  // // create an empty sol'n array
  // var solutions = [];
  // // loop through the col
  // var possibleRows = [];
  // for (var col = 0; col < n; col++) {
  //   // generate an array where col is 1, but all other are 0
  //   var row = _.range(n).map(function(item, i) {
  //     if (i === col) {
  //       return 1;
  //     } else {
  //       return 0;
  //     }
  //   });
    
  //   possibleRows.push(row);
  // }
  // // inner function - depth first search - paramater current board, remaining possibilites
  // var depthFirstSearch = function(rowsSoFar, remainingPossibleRows) {
  //   // if remaining poss is none
  //   if (remainingPossibleRows.length === 0) {
  //     // push the current board into solution array
  //     solutions.push(rowsSoFar);
      
  //     // var board = new Board(rowsSoFar);
  //     // if (!(board.hasAnyMajorDiagonalConflicts() || board.hasAnyMinorDiagonalConflicts())) {
  //     //   solutionCount++;
  //     // }
  //   } else {
  //   // else recurse for each possibility decrement remaining possibilities by 'one'
  //     for (var i = 0; i < remainingPossibleRows.length; i++) {
  //       var copySoFar = rowsSoFar.slice();
  //       copySoFar.push(remainingPossibleRows[i]);
  //       // var copyPossibleRows = remainingPossibleRows.slice();
  //       // copyPossibleRows.splice(i, 1);
  //       var copyPossibleRows = remainingPossibleRows.filter(function(item, j) {
  //         return i !== j;
  //       });
  //       depthFirstSearch(copySoFar, copyPossibleRows);
  //     }
  //   }
  // };
  // depthFirstSearch([], possibleRows);

  // // declare QueensSol'n
  // // solutions filter
  // var queensSolutions = solutions.filter(function(soln) {
  //   var board = new Board(soln);
  //   return !(board.hasAnyMajorDiagonalConflicts() || board.hasAnyMinorDiagonalConflicts());
  // });
  
  // // console.log('Rooks solns', solutions.length);
  // // console.log('Queens solns', queensSolutions.length);
  // // console.log(JSON.stringify(queensSolutions));

  // solutionCount = queensSolutions.length;
  // // solutionCount set to solution array length
  // return solutionCount;
  // // return solutionCount;

  // console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  // return solutionCount;
};
