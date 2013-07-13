<!DOCTYPE html>
<html>
<head>
	<title>Online Crossword Puzzle Solver</title>
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js" type="text/javascript"></script>
	<script src="puzzle.js" type="text/javascript"></script>
	<link rel="stylesheet" type="text/css" href="puzzle.css" />
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-2301275-8', 'lansner.com');
  ga('send', 'pageview');

</script>
</head>
<body>
<div class="wrapper">
	<div class="header">
		<h1>Online Crossword Puzzle Solver</h1>
	</div>

<?php

include('puzzle.php');

$puzzle = new Puzzle();

$puzzle->getPuzzle();

?>

	<br class="clear" />
	<div class="footer">
		&copy; <?php echo date("Y"); ?> Jesse Lansner
	</div>
</div>
</body>
</html>