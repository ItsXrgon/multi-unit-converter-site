import React from 'react';

export default function page() {
	return (
		<div>
			<div className="about-main">
				<h1>About Multi Converter</h1>

				<h2>Description:</h2>
				<p>
					Multi Converter is a site made to showcase the JS library
					"multi-unit-converter" made to converter all occurences of units in a
					text to specified units as all other libraries are just a one to one
					conversion of a number and unit but this is meant to handle cases such
					recipes, equations and etc that could contain multiple units that you
					are unfimiliar with so would like to convert them all at once instead
					of doing it one by one.
				</p>

				<h2>How to use it:</h2>
				<p>
					Just select your prefered units from the lists on the left or select a
					template from the ones available, and the precision (significant
					figures) you want to round to, then paste the text you wish to convert
					in the input box and it will automatically convert the units and
					output them in the output box.
				</p>

				<h2>How it works 🤓.</h2>
				<p>
					The library uses RegEx to detect all possible spellings of units that
					occur after a number, resolves the aliases of the units into their
					actual symbol, then converts the numbers using switch statements,
					rounds to them to the selected precision, the finally replaces them in
					the actual text. <br /> If you want the code for yourself, report a
					bug or suggest an improvment, check out the links in the navbar of the
					website.{' '}
				</p>
				<div className="about-links">
					<h2>Links:</h2>
					<ul>
						<li>
							<a href="https://github.com/ItsXrgon">Xrgon</a>: JS library &
							website backend
						</li>
						<li>
							<a href="https://github.com/ammarmbe">Ammar</a>: Website frontend.
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
