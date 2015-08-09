<?php

include('puzzle.php');

$puzzle = new Puzzle();

$puzzle->getPuzzle();

echo json_encode($puzzle->checkAnswers());
?>
