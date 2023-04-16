import NextImage from "next/image";
import { useState } from "react";

const INTRO_DURATION_IN_SECONDS = 2;
const INTRO_DELAY_IN_SECONDS = 1;

const INTRO_TIME_IN_MILLISECONDS = (INTRO_DURATION_IN_SECONDS + INTRO_DELAY_IN_SECONDS) * 1000;
const INTRO_REMOVE_THRESHOLD = 10;

const styles = {
	container: `z-10 fixed inset-0 bg-white flex items-center justify-center animate-[ping_${INTRO_DURATION_IN_SECONDS}s_ease-in-out_${INTRO_DELAY_IN_SECONDS}s]`,
	image: "animate-bounce select-none pointer-events-none",
};

export default function Intro() {
	const [animationStopped, setAnimationStopped] = useState(false);

	setTimeout(() => setAnimationStopped(true), INTRO_TIME_IN_MILLISECONDS - INTRO_REMOVE_THRESHOLD);

	if (animationStopped) {
		return <></>;
	}

	return (
		<div className={styles.container}>
			<NextImage priority className={styles.image} src="/logo.png" alt="DLRG Logo" width={1815 / 6} height={1149 / 6} />
		</div>
	);
}
