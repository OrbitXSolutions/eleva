"use client";
interface Props {
	children: React.ReactNode;
}

export function ClientWrapper({ children }: Props) {
	return (
		<>
			{children}
		</>
	);
}
