$(document).ready(function() {
	across = true;
	column = 0;
	row = 0;
	wordComplete = false;
	emptyCell = false;
	activeClue = 1;
	activeHint = new Object();
	clueNumber = 1;
	firstCell = new Object();
	selectedCell = new Object();
	symCell = new Object();
	move = true;
	diagramless = false;
	numberFocus = false;
	solvedGrid = new Array();
	// emptyCells = $('td').length - $('td.black').length - $('td.filled').length;

	if ($('#diagramless').val()) {
		diagramless = true;
	}

	columns = $('.grid').find('tr').eq(0).children('td').length;
	rows = $('.grid').find('tr').length;
	
	for (i = 0; i < rows; i++) {
		solvedGrid[i] = new Array();
	}
	

	$('body').on('click', 'td', function() {

		column = $(this).index();
		row = $(this).parent().index();

		if ($(this).hasClass('black')) {
			if (diagramless) {
				$('td').removeClass('selected');
				$(this).addClass('selected');				
			}
		} else {

			$('td').removeClass('highlighted');

			if ($(this).hasClass('selected')) {
				$(this).addClass('highlighted');
				across = !across;	
			} else {
				$('td').removeClass('selected');
				$(this).addClass('highlighted selected');
			}
			
			if (across) {
				highlightCellsAcross();
			} else {
				highlightCellsDown();
			}
		}
		
	});
	
	
	$('body').on('click', '.across li', function() {
		across = true;

		$('li').removeClass('selected');
		$(this).addClass('selected');

		var number = $(this).children('span').html();
		$('td').removeClass('highlighted selected');
		if ($('td .' + number).length) {
			$('td .' + number).parent().addClass('highlighted selected');
			highlightCellsAcross();
		}
	});

	$('body').on('click', '.down li', function() {
		across = false;

		$('li').removeClass('selected');
		$(this).addClass('selected');

		var number = $(this).children('span').html();
		$('td').removeClass('highlighted selected');
		if ($('td .' + number).length) {
			$('td .' + number).parent().addClass('highlighted selected');
			highlightCellsDown();
		}
	});
	
	$('body').on('keydown', function(event) {
		if (numberFocus) {
			if (event.keyCode == 13) {
				numberFocus = false;
				$('.addNumber').trigger('click');
			}
		} else {
			if ((event.keyCode == 9) && (event.shiftKey)) { 
				event.preventDefault();
				console.log('Shift tab');
			} else if ((event.keycode == 9)) { //tab
				event.preventDefault();
				console.log('reg tab');
				nextClue();
				
			} else if (event.keyCode == 8) { //backspace
				event.preventDefault();
				if ($(this).children('answer').html() == "") {
					previousLetter();
					$('td.selected').removeClass('filled activeError').children('.answer').html("");					
				} else {
					$('td.selected').removeClass('filled activeError').children('.answer').html("");
					previousLetter();
				}
			
			} else if (event.keyCode == 32) { //spacebar
				$('td.selected').removeClass('filled activeError').children('.answer').html("");
				// emptyCells = $('td').length - $('td.black').length - $('td.filled').length;
				nextLetter();
		
			} else if ((event.keyCode >= 37) && (event.keyCode <= 40)) { //arrow keys
				event.preventDefault();
				if ((event.keyCode == 37) && ((across) || ($('td.selected').hasClass('black')))) {
					column--;
				} else if ((event.keyCode == 38) && ((!across) || ($('td.selected').hasClass('black')))) {
					row--;
				} else if ((event.keyCode == 39) && ((across) || ($('td.selected').hasClass('black')))) {
					column++;
				} else if ((event.keyCode == 40) && ((!across) || ($('td.selected').hasClass('black')))) {
					row++;
				}

				if (column >= columns) {
					row++;
					column = 0;
				}
			
				if (row >= rows) {
					row = 0;
				}

				$('tr').eq(row).children('td').eq(column).trigger('click');			
		
			} else if (((event.keyCode >= 48) && (event.keyCode <= 57)) || ((event.keyCode >= 65) && (event.keyCode <= 90)) || ((event.keyCode >= 96) && (event.keyCode <= 105))) { //letters & numbers
				move = true;
				if ((event.keyCode >= 96) && (event.keyCode <= 105)) {
					$('td.selected').addClass('filled').removeClass('activeError').children('.answer').html(String.fromCharCode(event.keyCode - 48));
					solvedGrid[row][column] = $('td.selected .answer').html();
					// emptyCells = $('td').length - $('td.black').length - $('td.filled').length;

/*				} else if ((event.keyCode == 51) && (event.shiftKey) && $(diagramless)) {
					$('.addNumber').trigger('click');
					move = false; */
				} else if ((event.keyCode == 66) && ((event.ctrlKey) || (event.metaKey)) && (diagramless)) { // Ctrl+B = Black Cell
					$('.addBlack').trigger('click');
					move = false;
				} else {
					$('td.selected').addClass('filled').removeClass('activeError').children('.answer').html(String.fromCharCode(event.keyCode).toUpperCase());
					solvedGrid[row][column] = $('td.selected .answer').html();

				}
				

				// if word is complete, move to next clue

				if ($('.highlighted').length > 1) {
					wordComplete = true;
			
					$('.highlighted').each(function() {
						if (($(this).children('.answer').html() == "") || ($(this).hasClass('activeError'))) {
							wordComplete = false;
						}
					});
				} else {
					wordComplete = false;
				}
			
				if (move) {
					if (wordComplete) {
						nextClue();
					} else {
						nextLetter();
					}
				} else {
					nextEmptyCell();
				}
			}
		}	
	});
	
	$('body').on('click', '.showNote', function(event) {
		event.preventDefault();
		$(this).hide();
		$('.hiddenNote').show();
	});
	
	$('body').on('click', '.addBlack', function(event) {
		event.preventDefault();

		column = $('td.selected').index();
		row = $('td.selected').parent().index();
		
		selectedCell = $('td.selected');
		if ($('td.selected div').html().length) {
			$('#clueNumbers option').each(function() {
				if ($(this).val() > parseInt($('td.selected div').html())) {
					$(this).before('<option value="' + $('td.selected div').html() + '">' + $('td.selected div').html() + '</option>');
					return false;
				}
			});
			$('#clueNumbers').val("");
			$('td.selected div').removeClass().html("");
		}
		
		$('td.selected').toggleClass('black').removeClass('activeError').children('.answer').html("");

		if ($('#symmetry').val() == "crossword") {
			symCell = $('tr').eq(rows - row - 1).children('td').eq(columns - column - 1);
		} else if ($('#symmetry').val() == "horizontal") {
			symCell = $('tr').eq(row).children('td').eq(columns - column - 1);
		} else if ($('#symmetry').val() == "vertical") {
			symCell = $('tr').eq(rows - row - 1).children('td').eq(column);
		}
		if (($('#symmetry').val().length) && (symCell[0] !== selectedCell[0])) {
			if (symCell.children('div').html().length) {
				$('#clueNumbers option').each(function() {
					if ($(this).val() > parseInt(symCell.children('div').html())) {
						$(this).before('<option value="' + symCell.children('div').html() + '">' + symCell.children('div').html() + '</option>');
						return false;
					}
				});
				$('#clueNumbers').val("");
				symCell.children('div').removeClass().html("");		
			}

			symCell.toggleClass('black').children().html("");
		}
		
		adjustNumbers();

	});

	$('body').on('change', '#symmetry', function() {
		$('#symmetry').blur();
	});
	
	$('#uploadForm').submit(function(event) {
		if ($('#puzzleFile').val().substr(-3) == "puz") {
			return true;
		} else {
			$('#errorMessage').html('Please upload a valid file.');
			return false;
		}
	});

	if (diagramless) {
		adjustNumbers();
		$('tr').eq(row).children('td').eq(column).trigger('click');
	} else {
		$('td .1').parent().trigger('click');
	}
	
	$('body').on('click', '.checkAnswers', function() {
		checkAnswers();
	});

});

function highlightCellsAcross() {

	column = $('td.selected').index();
	row = $('td.selected').parent().index();

	while (column >= 0) {
		if ($('tr').eq(row).children('td').eq(column).hasClass('black')) {
			break;
		} else {
			firstCell = $('tr').eq(row).children('td').eq(column);
			$('tr').eq(row).children('td').eq(column).addClass('highlighted');
			column--;
		}
	}

	column = $('td.selected').index() + 1;

	while (column < columns) {
		if ($('tr').eq(row).children('td').eq(column).hasClass('black')) {
			break;
		} else {
			$('tr').eq(row).children('td').eq(column).addClass('highlighted');
			column++;
		}
	}

	column = $('td.selected').index();
	
	if (firstCell.children('div').html() == "") {
		$('td').removeClass('highlighted');
	}

	setActiveClue();
}

function highlightCellsDown() {

	column = $('td.selected').index();
	row = $('td.selected').parent().index();
	
	while (row >= 0) {
		if ($('tr').eq(row).children('td').eq(column).hasClass('black')) {
			break;
		} else {
			firstCell = $('tr').eq(row).children('td').eq(column);
			$('tr').eq(row).children('td').eq(column).addClass('highlighted');
			row--;
		}
	}

	row = $('td.selected').parent().index() + 1;

	while (row < rows) {
		if ($('tr').eq(row).children('td').eq(column).hasClass('black')) {
			break;
		} else {
			$('tr').eq(row).children('td').eq(column).addClass('highlighted');
			row++;
		}
	}

	row = $('td.selected').parent().index();

	if (firstCell.children('div').html() == "") {
		$('td').removeClass('highlighted');
	}

	setActiveClue();
}

function setActiveClue() {
	$('li').removeClass('highlighted selected');
	activeClue = $('.highlighted').eq(0).children('div').html();
	
	if (activeClue) {
		if (across) {
			activeHint = $('.across .' + activeClue);
			while (row > 0) {
				row--;
				if ($('tr').eq(row).children('td').eq(column).hasClass('black')) {
					row++;
					break;
				}
			}

			highlightClue = $('tr').eq(row).children('td').eq(column).children('div').html().trim();

			if (highlightClue) {
				$('.down .' + highlightClue).addClass('highlighted');

			}

			row = $('td.selected').parent().index(); 

		} else {
			activeHint = $('.down .' + activeClue);
			while (column > 0) {
				column--;
				if ($('tr').eq(row).children('td').eq(column).hasClass('black')) {
					column++;
					break;
				}
			}

			highlightClue = $('tr').eq(row).children('td').eq(column).children('div').html().trim();

			if (highlightClue) {
				$('.across .' + highlightClue).addClass('highlighted');
			}

			column = $('td.selected').index();
		}
		activeHint.addClass('selected');

		$('.downClues').scrollTop(0);

		if (across) {
			if (($('li.selected').length) && (($('li.selected').position().top + $('li.selected').height() > $('.acrossClues').height()) || ($('li.selected').position().top < 0))) {
				$('.acrossClues').scrollTop(0).scrollTop($('li.selected').position().top);
			}

			if (($('li.highlighted').length) && (($('li.highlighted').position().top + $('li.highlighted').height() > $('.downClues').height()) || ($('li.highlighted').position().top < 0))) {
				$('.downClues').scrollTop(0).scrollTop($('li.highlighted').position().top);
			}
		} else {
			if (($('li.selected').length) && (($('li.selected').position().top + $('li.selected').height() > $('.downClues').height()) || ($('li.selected').position().top < 0))) {
				$('.downClues').scrollTop($('li.selected').position().top);
			}
			
			if (($('li.highlighted').length) && (($('li.highlighted').position().top + $('li.highlighted').height() > $('.acrossClues').height()) || ($('li.highlighted').position().top < 0))) {
				$('.acrossClues').scrollTop(0).scrollTop($('li.highlighted').position().top);
			}
		}
	}
	
};

function nextClue(next) {
	next = typeof next !== 'undefined' ? next : true;
	var newClue;
	var direction;
	
	if (across) {
		direction = '.across';
	} else {
		direction = '.down';
	}
	
	if (activeHint.length) {
		if (next) {
			newClue = activeHint.index() + 1;
		} else {
			newClue = activeHint.index() - 1;
		}
	}

	activeHint = $(direction).children('li').eq(newClue);
	if (!activeHint.length) {
		activeHint = $(direction).children('li').eq(0);
	}

	activeClue = activeHint.find('.clueNumber').html();
	
	if ($('td .' + activeClue).length) {
		$('td').removeClass('highlighted selected');
		$('td .' + activeClue).parent().addClass('highlighted selected');

		if (across) {
			highlightCellsAcross();
		} else {
			highlightCellsDown();
		}
	} else {
		nextEmptyCell();
	}
}

function nextLetter() {

	if (across) {
		column++;
		emptyCell = false;

		while (emptyCell == false) {
			if ((column >= columns ) || ($('tr').eq(row).children('td').eq(column).hasClass('black'))) {
				column = $('.highlighted').eq(0).index();						
			} else if ($('tr').eq(row).children('td').eq(column).children('.answer').html() != "") {
				column++;
			} else {
				emptyCell = true;
			}
		}

		$('td').removeClass('highlighted selected');
		$('tr').eq(row).children('td').eq(column).addClass('highlighted selected');
		highlightCellsAcross();

	} else {

		row++;
		emptyCell = false;

		while (emptyCell == false) {
			if ((row >= rows ) || ($('tr').eq(row).children('td').eq(column).hasClass('black'))) {
				row = $('.highlighted').eq(0).parent().index();						
			} else if ($('tr').eq(row).children('td').eq(column).children('.answer').html() != "") {
				row++;
			} else {
				emptyCell = true;
			}
		}

		$('td').removeClass('highlighted selected');
		$('tr').eq(row).children('td').eq(column).addClass('highlighted selected');

		highlightCellsDown();
	}
}

function previousLetter() {

	if (across) {
		if ((column > 0) && (!$('tr').eq(row).children('td').eq(column - 1).hasClass('black'))) {
			column--;
		}
		
		$('td').removeClass('highlighted selected');
		$('tr').eq(row).children('td').eq(column).addClass('highlighted selected');
		highlightCellsAcross();

	} else {
		if ((row > 0) && (!$('tr').eq(row - 1).children('td').eq(column).hasClass('black'))) {
			row--;
		}

		$('td').removeClass('highlighted selected');
		$('tr').eq(row).children('td').eq(column).addClass('highlighted selected');

		highlightCellsDown();
	}
}
function nextEmptyCell() {
	column = $('td.selected').index();
	row = $('td.selected').parent().index();
	
	while ((column < columns) && (row < rows)) {
		if (($('tr').eq(row).children('td').eq(column).hasClass('black')) || ($('tr').eq(row).children('td').eq(column).children('.answer').html() != "")) {
			if (column == columns - 1) {
				column = 0;
				
				if (row == rows - 1) {
					row = 0;
				} else {
					row++;
				}
			} else {
				column++;
			}
		} else {
			$('tr').eq(row).children('td').eq(column).trigger('click');
			break;
		}
	}
}

function adjustNumbers() {
	$('td div').removeClass("*").html("");
	i = 1;
	$('td').each(function() {
		if (!$(this).hasClass('black')) {
			if (($(this).index() == 0) || ($(this).parent().index() == 0) || ($('tr').eq($(this).parent().index() - 1).children('td').eq($(this).index()).hasClass('black')) || ($('tr').eq($(this).parent().index()).children('td').eq($(this).index() - 1).hasClass('black'))) {
				$(this).children('div').addClass(i).html(i);
				i++;
			}
		}
	});

	// emptyCells = $('td').length - $('td.black').length - $('td.filled').length;
}

function checkAnswers() {
	var answers = new Array();	
	var i = 0;
	$('.grid tr').each(function() {
		answers[i] = new Array();
		var j = 0;
		$(this).children('td').each(function() {
			if ($(this).hasClass('black')) {
				answers[i][j] = ".";
			} else {
				answers[i][j] = $(this).children('.answer').html();
			}
			j++;
		});
		i++;
	});	
	
	$.post(
		"checkanswer.php", 
		{
			puzzle: $('#puzzleName').val(),
			answers: answers
		},
		function(data, status) {
    	    showCheckedGrid(data);
    	}
    );
}

function showCheckedGrid(answers) {
	var checkGrid = jQuery.parseJSON(answers);
	
	var completed = true;

	var i = 0;
	$('.grid tr').each(function() {
		var j = 0;
		$(this).children('td').each(function() {
			if (!$(this).hasClass('black')) {
				if (checkGrid[i][j] == "x") {
					$(this).addClass('error activeError');
					completed = false;
				}
			}
			
			j++;
		});
		i++;
	});	
		
	if (completed) {
		alert("No mistakes!");
	}
}
