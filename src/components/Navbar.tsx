import Image from 'next/image';
import React from 'react';
import github from '@/public/github.svg';
import npm from '@/public/npm.svg';
import donate from '@/public/donate.svg';
import bug from '@/public/bug.svg';

export default function Navbar() {
	return (
		<nav className="bg-[#2684ff] text-white flex w-full justify-between items-center h-24 p-6 box-border">
			<div className="font-semibold text-5xl">Multi Converter</div>
			<div className="flex gap-3 text-black">
				<a
					className="bg-white p-3 rounded-full"
					href={'https://github.com/itsxrgon/multi-unit-converter/#readme'}
					target="_blank"
					rel="noopener noreferrer"
					title="Github epository"
				>
					<Image src={github} alt="Github" width={38} height={38} />
				</a>
				<a
					className="bg-white p-3 rounded-full"
					href={'https://www.npmjs.com/package/multi-unit-converter'}
					target="_blank"
					rel="noopener noreferrer"
					title="NPM module page"
				>
					<Image src={npm} alt="NPM" width={38} height={38} />
				</a>
				<a
					className="bg-white p-3 rounded-full"
					href={''}
					target="_blank"
					rel="noopener noreferrer"
					title="donate"
				>
					<Image src={donate} alt="Donate" width={38} height={38} />
				</a>
				<a
					className="bg-white p-3 rounded-full"
					href={'https://github.com/ItsXrgon/multi-unit-converter/issues'}
					target="_blank"
					rel="noopener noreferrer"
					title="Report a bug"
				>
					<Image src={bug} alt="Bug" width={38} height={38} />
				</a>
			</div>
		</nav>
	);
}
