import { FrameProps } from "@/types/frame.types";

const styles = {
	container: "isolate bg-white px-6 py-24 sm:py-32 lg:px-8",
	header: {
		container: "flex flex-col gap-2 mx-auto max-w-2xl text-center select-none",
		heading: "text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl",
		description: "text-lg leading-8 text-gray-600",
	},
	background: {
		container: "absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]",
		blur1: "relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]",
		blur2: "relative -z-10 aspect-[1155/678] w-[36.125rem] max-w-none translate-x-1/2 translate-y-1/4 rotate-[-30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-55rem)] sm:w-[72.1875rem]",
	},
};

export default function Frame({ children, heading, description, className, ...props }: FrameProps) {
	const clipPath = "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)";
	const hasHeadingOrDescription = !!(heading || description);

	return (
		<div className={styles.container}>
			{hasHeadingOrDescription && (
				<div className={styles.header.container}>
					{heading && <h2 className={styles.header.heading}>{heading}</h2>}
					{description && <p className={styles.header.description}>{description}</p>}
				</div>
			)}

			<div className={className} {...props}>
				{children}
			</div>

			<div className={styles.background.container} aria-hidden="true">
				<div className={styles.background.blur1} style={{ clipPath }} />
				<div className={styles.background.blur2} style={{ clipPath }} />
			</div>
		</div>
	);
}
