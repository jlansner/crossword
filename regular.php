<h2><?php echo $this->title; ?></h2>

<h3>
	<?php echo $this->author; ?><br />
	<?php echo $this->copyright; ?>
</h3>

<p>
	<?php echo $this->note; ?>
</p>

<div class="gridColumn">
	<table class="grid">
		<tbody>
<?php for ($i = 0; $i < $this->height; $i++) {  ?>
			<tr>
	<?php for ($j = 0; $j < $this->width; $j++) { ?>		
				<td class="<?php echo $this->class[$i][$j]; ?>">
					<div class="<?php echo $this->displayNumber[$i][$j]; ?>"><?php echo $this->displayNumber[$i][$j]; ?></div>
					<span class="answer"></span>
				</td>
	<?php } ?>
			</tr>
<?php } ?>
		</tbody>
	</table>
</div>

<div class="clueColumn">
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
