<h2><?php echo $puzzle->title; ?></h2>

<h3>
	<?php echo $puzzle->author; ?><br />
	<?php echo $puzzle->copyright; ?>
</h3>

<p>
	<?php echo $puzzle->note; ?>
</p>

<p>
	<button class="checkAnswers">Check Answers</button>
</p>

<div class="gridColumn">
	<table class="grid">
		<tbody>
<?php for ($i = 0; $i < $puzzle->height; $i++) {  ?>
			<tr>
	<?php for ($j = 0; $j < $puzzle->width; $j++) { ?>		
				<td class="<?php echo $puzzle->class[$i][$j]; ?>">
					<div class="<?php echo $puzzle->displayNumber[$i][$j]; ?>"><?php echo $puzzle->displayNumber[$i][$j]; ?></div>
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
		<?php foreach ($puzzle->across as $key => $value) { ?>
			<li class="<?php echo $key; ?>"><span class="clueNumber"><?php echo $key; ?></span>. <?php echo $value; ?></li>
		<?php } ?>
		</ul>
	</div>

	<h2>Down</h2>

	<div class="clues downClues">
		<ul class="down">
		<?php foreach ($puzzle->down as $key => $value) { ?>
			<li class="<?php echo $key; ?>"><span class="clueNumber"><?php echo $key; ?></span>. <?php echo $value; ?></li>
		<?php } ?>
		</ul>
	</div>
</div>
