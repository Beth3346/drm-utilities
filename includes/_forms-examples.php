<h2>Forms Examples</h2>

<div class="example-holder">
    <div class="form-examples">
		<h2>Form State</h2>
    	<form role="form" action="" class="form-state">
    		<label for="name">Name:</label>
    		<input type="text" name="name" id="name" placeholder="First Last">
    	</form>
    </div>

    <div class="form-examples">
    	<h2>Tabular Form</h2>
    	<form role="form" action="" class="tabular-form">
			<label for="full-name">Name:</label>
			<input type="text" id="full-name" name="full-name" placeholder="First Last">

			<label for="email">Email:</label>
			<input type="email" id="email" name="email" placeholder="youremail@email.com" required>

			<label for="phone">Phone:</label>
			<input type="tel" id="phone" name="phone" placeholder="212-867-5309" disabled>

			<div class="drm-tabular-control-group">
				<div class="drm-control-group">
					<label>
						<input type="checkbox" value="sign up">Sign me up!
					</label>
				</div>

				<div class="drm-control-group">
					<label>
						<input type="checkbox" value="true" checked>Checked Option
					</label>			
				</div>
			</div>

			<div class="drm-inline-control-group">
				<div class="drm-control-group">
					<label>
						<input type="checkbox" value="one">One
					</label>
				</div>
				<div class="drm-control-group">
					<label>
						<input type="checkbox" value="two">Two
					</label>
				</div>
				<div class="drm-control-group">
					<label>
						<input type="checkbox" value="three">Three
					</label>
				</div>
				<div class="drm-control-group">
					<label>
						<input type="checkbox" value="four" disabled>Four
					</label>
				</div>
			</div>

			<div class="drm-tabular-control-group">
				<h3 class="drm-control-label">Select an Option</h3>
				<div class="drm-control-group">
					<label>
						<input type="radio" name="radio-options" id="option1" value="option1" checked>Option 1
					</label>
				</div>

				<div class="drm-control-group">
					<label>
						<input type="radio" name="radio-options" id="option2" value="option2">Option 2
					</label>
				</div>

				<div class="drm-control-group">
					<label>
						<input type="radio" name="radio-options" id="option3" value="option3">Option 3
					</label>
				</div>

				<div class="drm-control-group">
					<label>
						<input type="radio" name="radio-options" id="option4" value="option4">Option 4
					</label>
				</div>			
			</div>

			<div class="drm-inline-control-group">
				<h3 class="drm-control-label">Select a Color</h3>
				<div class="drm-control-group">
					<label>
						<input type="radio" name="radio-colors" value="red">Red
					</label>
				</div>
				<div class="drm-control-group">
					<label>
						<input type="radio" name="radio-colors" value="greeb">Green
					</label>
				</div>
				<div class="drm-control-group">
					<label>
						<input type="radio" name="radio-colors" value="blue">Blue
					</label>
				</div>
			</div>

			<select>
				<option>1</option>
				<option>2</option>
				<option>3</option>
				<option>4</option>
				<option>5</option>
			</select>

			<select disabled>
				<option>Red</option>
				<option>Yellow</option>
				<option>Green</option>
				<option>Blue</option>
				<option>Orange</option>
			</select>

			<select multiple>
				<option>1</option>
				<option>2</option>
				<option>3</option>
				<option>4</option>
				<option>5</option>
			</select>

			<label for="notes">Notes:</label>
			<textarea name="notes" id="notes" cols="30" rows="10" placeholder="These are some notes"></textarea>
			<small>This is some instructional text</small>

			<input type="submit" id="submit" name="submit" value="Submit">
			<input type="submit" id="disabled" name="disabled" disabled value="Disabled Input">
			<button type="submit" class="drm-btn-disabled" disabled>Disabled Button</button>
    	</form>
    </div>

    <div class="form-examples">
    	<h2>Inline Form</h2>
    	<form role="form" action="" class="inline-form">
			<label for="username">Email:</label>
			<input type="text" id="username" name="username" placeholder="youremail@email.com" required>

			<label for="password">Password:</label>
			<input type="password" id="password" name="password">

			<div class="drm-control-group">
				<label>
					<input type="checkbox" value="remember">Remember Me
				</label>
			</div>

			<input type="submit" id="submit" name="submit" value="Submit">
    	</form>
    </div>

    <div class="form-examples">
    	<h2>Form Validation Styles</h2>
    	<form role="form" action="" class="tabular-form">
			<label for="fname">Name:</label>
			<input type="text" class="drm-form-success" id="fname" name="fname" placeholder="First Last">

			<label for="email-address">Email:</label>
			<input type="email" class="drm-form-warning" id="email-address" name="email-address" placeholder="youremail@email.com" required>

			<label for="phone-num">Phone:</label>
			<input type="tel" class="drm-form-danger" id="phone-num" name="phone-num" placeholder="212-867-5309">

			<input type="submit" id="submit" name="submit" value="Submit">
    	</form>
    </div>
</div>