import { Metadata } from 'next';
// import { Cairo } from 'next/font/google';
import React from 'react';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

import '@/styles/global.css';
import '@/styles/mainpage.css';

//👇 Configure our font object
// const cairo = Cairo({
// 	subsets: ['latin', 'arabic', 'latin-ext'],
// });

export const metadata: Metadata = {
	title: 'Multi Unit Converter',
	description:
		'A tool to convert a text full of multiple different units to either SI Units or specified units.',
	keywords: ['unit', 'converter', 'multi', 'SI', 'units'],
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang="en"
			// className={cairo.className}
		>
			<body>
				{/* <ScrollToTop /> */}
				<Navbar />
				{children}
				<Footer />
			</body>
		</html>
	);
}
