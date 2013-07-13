<?php

class Puzzle {

	public function __construct() {
		$this->diagramless = false;
		$this->displayNumber = array();
		$this->across = array();
		$this->down = array();
		$this->grid = array();
		$this->number = 1;
		$this->clueNumber = 0;

	}

	public function getPuzzle() {
		$this->errorMessage = "";

		if ($_POST['submit'] == "Upload") {
			$filename = 'puzzles/' . $_FILES['puzzle']['name'];

			if (!file_exists($filename)) {
				move_uploaded_file($_FILES["puzzle"]["tmp_name"], "puzzles/" . $_FILES["puzzle"]["name"]);
			}

			$this->checkPuzzle($filename);

		} else if (isset($_REQUEST['puzzle'])) {
			$filename = 'puzzles/' . $_REQUEST['puzzle'] . '.puz';

			$this->checkPuzzle($filename);

		} else {
			$this->showUpload();
		}
	}
	
	public function checkPuzzle($filename) {

		$file = file_get_contents($filename);

		$hex = bin2hex($file);

		if (substr($hex,4,24) == "4143524f535326444f574e00") {
			$this->loadPuzzle($hex);
		} else {
			unlink($filename);
			$this->errorMessage = "Please upload a valid file.";
			$this->showUpload();
		}
	}
	
	public function loadPuzzle($hex) {

		$this->width = hexdec(substr($hex,88,2));
		$this->height = hexdec(substr($hex,90,2));

		$this->numClues = hexdec(substr($hex,92,2)) + hexdec(substr($hex,94,2));
		$hexlength = $this->width * $this->height * 2;
		$solved = pack("H*",substr($hex,104,$hexlength));
		$grid = pack("H*",substr($hex,104 + $hexlength,$hexlength));

		$this->solvedArray = array();
		$this->gridArray = array();
		for ($i = 0; $i < $this->height; $i++) {
			for ($j = 0; $j < $this->width; $j++) {
				$this->solvedArray[$i][$j] = substr($solved,($i * $this->width) + $j,1);
				$this->gridArray[$i][$j] = substr($grid,($i * $this->width) + $j,1);
			}
		}
		
		foreach ($this->gridArray as $line) {
			if (in_array(":",$line)) {
				$this->diagramless = true;
				break;
			}
		}

		$remainder = substr($hex,104 + ($hexlength * 2));

		$remainderlength = strlen($remainder);

		$remainderArray = array();
		$j = 0;

		for ($i = 0; $i < $remainderlength; $i++) {
			if (substr($remainder,$i * 2,2) == "00") {
				$remainderArray[$j] = pack("H*",$remainderArray[$j]);
				$j++;
			} else {
				$remainderArray[$j] .= substr($remainder,$i * 2,2);
			}
		}

		$this->title = $remainderArray[0];
		$this->author = $remainderArray[1];
		$this->copyright = $remainderArray[2];

		$this->clues = array_splice($remainderArray,3,$this->numClues);

		$this->note = $remainderArray[3];

		if ($this->diagramless) {
			$this->showDiagramless();
		} else {
			$this->showRegular();
		}
	}
	
	public function showUpload() {
		include('upload.php');
	}
	
	public function showRegular() {

		for ($i = 0; $i < $this->height; $i++) { 
			for ($j = 0; $j < $this->width; $j++) { 
				if ($this->gridArray[$i][$j] == ".") {
					$this->class[$i][$j] = 'black';
				} else {
					if (($j == 0) || ($this->gridArray[$i][$j-1] == ".") || ($i == 0) || ($this->gridArray[$i-1][$j] == ".")) {

						if (($j == 0) || ($this->gridArray[$i][$j-1] == ".")) {
							$this->across[$this->number] = $this->clues[$this->clueNumber];
							$this->clueNumber++;
						}

						if (($i == 0) || ($this->gridArray[$i - 1][$j] == ".")) {
							$this->down[$this->number] = $this->clues[$this->clueNumber];
							$this->clueNumber++;
						}

						$this->displayNumber[$i][$j] = $this->number;
						$this->number++;
					}
				}
			}
		}	

		include('regular.php');
	}

	public function showDiagramless() {

		for ($i = 0; $i < $this->height; $i++) { 
			for ($j = 0; $j < $this->width; $j++) { 
				if ($this->gridArray[$i][$j] !== ":") {
					if (($j == 0) || ($this->gridArray[$i][$j-1] == ":") || ($i == 0) || ($this->gridArray[$i - 1][$j] == ":")) {

						if (($j == 0) || ($this->gridArray[$i][$j-1] == ":")) {
							$this->across[$this->number] = $this->clues[$this->clueNumber];
							$this->clueNumber++;
						}

						if (($i == 0) || ($this->gridArray[$i - 1][$j] == ":")) {
							$this->down[$this->number] = $this->clues[$this->clueNumber];
							$this->clueNumber++;
						}
						$this->number++;
					}
				}
			}
		}
		
		include('diagramless.php');
	}
	
}

?>