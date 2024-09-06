type CopyFn = (text: string) => Promise<boolean>; // Return success

export default function useCopyToClipboard(): CopyFn {
	const copy: CopyFn = async (text) => {
		if (!navigator?.clipboard) {
			return false;
		}

		// Try to save to clipboard then save it in the state if worked
		try {
			await navigator.clipboard.writeText(text);
			return true;
		} catch (error) {
			return false;
		}
	};

	return copy;
}
