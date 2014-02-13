<h2>Modal Demo</h2>

<div class="example-holder">

	<div class="drm-modal-demo-buttons">
		<button class="drm-modal-open" data-modal="drm-modal-info">More Info</button>
		<button class="drm-modal-open" data-modal="drm-modal-form">View Form</button>
		<button class="drm-modal-open" data-modal="drm-modal-video">See Video</button>		
	</div>
	
	<div class="drm-modal-lightbox" id="drm-modal-info">
		<div class="drm-modal">
			<div class="header">
				<h1>Modal Window with some info</h1>
			</div>
			<div class="body">
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus officiis repudiandae sed tempora nesciunt mollitia. 
				Doloremque, debitis ad veritatis. Illum, iusto officiis hic voluptate earum.</p>
			</div>
			<div class="footer">
				<button class="drm-modal-close">Close</button>
			</div>		
		</div>
	</div>

	<div class="drm-modal-lightbox" id="drm-modal-form">
		<div class="drm-modal">
			<div class="header">
				<h1>Modal Form</h1>
			</div>
			<div class="body">
				<form action="">
					<label for="name">Name:</label>
					<input type="text" id="name" name="name" placeholder="First Last">

					<label for="email">Email:</label>
					<input type="text" id="email" name="email" placeholder="youremail@email.com" required>

					<label for="notes">Notes:</label>
					<textarea name="notes" id="notes" cols="30" rows="10" placeholder="These are some notes"></textarea>
					<small>This is some instructional text</small>

					<input type="submit" id="submit" name="submit" value="Submit">
					<button class="drm-modal-close">Cancel</button>
				</form>
			</div>
			<div class="footer">
			</div>		
		</div>
	</div>

	<div class="drm-modal-lightbox" id="drm-modal-video">
		<div class="drm-modal">
			<div class="header">
				<h1>Modal Video</h1>
			</div>
			<div class="body">
				<div class="video-holder">
					<iframe width="420" height="315" src="//www.youtube.com/embed/Na9H0Jdy3fY?rel=0" frameborder="0" allowfullscreen></iframe>
				</div>			
			</div>
			<div class="footer">
				<button class="drm-modal-close">Close</button>
			</div>		
		</div>
	</div>	
</div>