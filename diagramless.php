<input id="diagramless" name="diagramless" value="true" type="hidden" />
<h2><?php echo $this->title; ?></h2>

<h3>
	<?php echo $this->author; ?><br />
	<?php echo $this->copyright; ?>
</h3>

<div class="showNote">Show Note</div>

<div class="hiddenNote"><?php echo $this->note; ?></div>

<br class="clear" />
<div class="gridColumn">
	<p>
	<?php /*	<a href="#" class="addNumber">Add/Remove Number</a>
		<select id="clueNumbers" name="clueNumbers">
			<option value="" selected></option>
	<?php for ($i = 1; $i < $this->number; $i++) { ?>
			<option value="<?php echo $i; ?>"><?php echo $i; ?></option>
	<?php } ?>
		</select> */ ?>
		<a href="#" class="addBlack">Add/Remove Black Square</a> (You can also add a black square by pressing Ctrl+B or &#8984;+B.)
	</p>



	<table class="grid">
		<tbody>
<?php for ($i = 0; $i < $this->height; $i++) {  ?>
			<tr>
	<?php for ($j = 0; $j < $this->width; $j++) { ?>		
				<td><div></div><span class="answer"></span></td>
	<?php } ?>
			</tr>
<?php } ?>
		</tbody>
	</table>
</div>

<div class="clueColumn">

	<p class="symmetry">
		<label>Symmetry:</label>
		<select id="symmetry" name="symmetry">
			<option value="">Manual</option>
			<option value="crossword">Crossword</option>
			<option value="vertical">Vertical</option>
			<option value="horizontal">Horizontal</option>
		</select>
	</p>

	<h2>Across</h2>

	<div class="clues acrossClues">	
		<ul class="across">
		<?php foreach ($this->across as $key => $value) { ?>
			<li class="<?php echo $key; ?>"><span class="clueNumber"><?php echo $key; ?></span>. <?php echo $value; ?></li>
		<?php } ?>
		</ul>
	</div>

	<h2>Down</h2>

	<div class="clues downClues">
		<ul class="down">
		<?php foreach ($this->down as $key => $value) { ?>
			<li class="<?php echo $key; ?>"><span class="clueNumber"><?php echo $key; ?></span>. <?php echo $value; ?></li>
		<?php } ?>
		</ul>
	</div>
</div>