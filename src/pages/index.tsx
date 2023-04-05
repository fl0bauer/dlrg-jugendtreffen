import Head from "@/components/head.component";
import { InferGetServerSidePropsType } from "next";
import LocationFormular from "@/formulars/location";
import { fetchAssociations } from "@/prisma/location";
import Frame from "@/components/frame.component";
import useTranslation from "next-translate/useTranslation";

export const getServerSideProps = async () => {
	const associations = await fetchAssociations();

	return {
		props: { associations },
	};
};

export default function Home({ associations }: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const { t } = useTranslation("forms");

	return (
		<>
			<Head />

			<Frame heading={t("location.heading")} description={t("location.description")}>
				<div className="flex flex-col mx-auto mt-16 max-w-xl sm:mt-20">
					<LocationFormular associationsWithDependencies={associations} onValidFormSubmit={(values) => console.log(values)} />
				</div>
			</Frame>
		</>
	);
}
