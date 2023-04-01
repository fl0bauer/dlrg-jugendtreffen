import NextHead from "next/head";
import useTranslation from "next-translate/useTranslation";

export default function Head() {
	const { t } = useTranslation("meta");

	return (
		<NextHead>
			<title>{t("title")}</title>
			<meta name="description" content={t("description")} />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<link rel="icon" href="/favicon.png" />
		</NextHead>
	);
}
