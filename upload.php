<form action="/" method="post" enctype="multipart/form-data" id="uploadForm" class="uploadForm">

	<p id="errorMessage"><?php echo $this->errorMessage; ?></p>

	<h2>Upload Puzzle</h2>

	<p>
		<input type="file" name="puzzle" id="puzzleFile" />
	</p>

	<p>
		<input type="submit" name="submit" value="Upload" />
	</p>

</form>