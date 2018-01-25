// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      // get a row variable
      let row = this.get(rowIndex);
      // reduce the value into a variable
      let count = row.reduce(function(acc, piece) {
        return acc += piece;
      });
      // return the comparison of the pieceCount to 1
      return count > 1;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      // declare a board var
      let board = this.rows();
      
      // for loop that loops through the board
      for (let row = 0; row < board.length; row++) {
        // if row has a conflict, return true
        if (this.hasRowConflictAt(row)) {
          return true;
        }
      }
      // after the loop, return false
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      // declare board variabl calling rows() on this
      let board = this.rows();
      let count = 0;
      // iterate through the rows
      for (let row = 0; row < board.length; row++) {
        // summing the values through colIndex
        count += board[row][colIndex];
      }
      //return the sum compared to 1
      return count > 1;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      // declare default to false
      let output = false;
      // loop through every column
      for (let i = 0; i < this.get('n'); i++) {
        // set the output to prior output || hasColConflictAt
        output = output || this.hasColConflictAt(i);
      }
      //return the default
      return output;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow, n) {

      n = n === undefined ? this.get('n') : n;
      
      // declare count
      let startRow, col;
      let count = 0;
      
      // if the major > 0
      if (majorDiagonalColumnIndexAtFirstRow > 0) {
        //   set the row to 0;
        startRow = 0;        
        //   set the col to major
        col = majorDiagonalColumnIndexAtFirstRow;
      } else {
        // if major < 0
        //   set col to 0;
        col = 0;
        //   set row to abs(major);
        startRow = -majorDiagonalColumnIndexAtFirstRow;
      }
      
      // loop through the rows
      for (let row = startRow; row < n; row++) {
        // add to the count board at row , at col
        count += this.get(row)[col];
        // increment col by 1
        col++;
        // if col === n, break out of loop
        if (col === n) {
          break;
        }
      }
      
      // return comparison
      return count > 1;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      
      let n = this.get('n');
      // declare output var
      let output = false;
      // loop through -(get(n)) to +(get(n))
      for (let i = -n + 1; i < n; i++) {
        // output will be output OR result of check
        output = output || this.hasMajorDiagonalConflictAt(i, n);
        if (output) {
          return true;
        }
      }
      // return output
      return output; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      // declare the count var
      let count = 0;
      // declare a board var
      let board = this.rows();
      // loop through the rows
      for (let row = 0; row < board.length; row++) {
        // loop through the cols
        for (let col = 0; col < board[row].length; col++) {
          // if col + row is mDCIARS
          if (col + row === minorDiagonalColumnIndexAtFirstRow) {
            // add to count
            count += board[row][col];
          }
        }
      }
      //return count compared to 1
      return count > 1;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      // declare output var set to false
      let output = false;
      // loop through from 0 to 2n
      for (let i = 0; i <= this.get('n') * 2; i++) {
        // call hMDCA OR output
        output = output || this.hasMinorDiagonalConflictAt(i);
      }
      //return output
      return output;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
