import NextImage from "next/image";
import { useState } from "react";

const styles = {
	container: `z-10 fixed inset-0 bg-white flex items-center justify-center pointer-events-none animate-[ping_2000ms_ease-in-out_1000ms_forwards] dark:bg-slate-950`,
	image: "animate-bounce select-none pointer-events-none dark:invert",
};

export default function Intro() {
	const [animationStopped, setAnimationStopped] = useState(false);

	setTimeout(() => setAnimationStopped(true), 2000 + 1000);

	if (animationStopped) {
		return <></>;
	}

	return (
		<div className={styles.container}>
			<NextImage priority className={styles.image} src="/logo.png" alt="DLRG Logo" width={1815 / 6} height={1149 / 6} />
		</div>
	);
}
