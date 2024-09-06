import Link from 'next/link';
import React from 'react';

export default function Footer() {
	return (
		<footer>
			<p id="copyright">
				<Link href="/about">About Multi Unit Converter</Link>
				<br />
				Made by <a href="https://github.com/ItsXrgon">Xrgon</a> &{' '}
				<a href="https://github.com/ammarmbe">Ammar</a>.
			</p>
		</footer>
	);
}
