import Head from "@/components/head.component";
import { InferGetServerSidePropsType } from "next";
import LocationFormular from "@/formulars/location";
import { fetchAssociations } from "@/prisma/location";

export const getServerSideProps = async () => {
	const associations = await fetchAssociations();

	return {
		props: { associations },
	};
};

export default function Home({ associations }: InferGetServerSidePropsType<typeof getServerSideProps>) {
	return (
		<>
			<Head />

			<div className="p-20">
				<LocationFormular associationsWithDependencies={associations} onValidFormSubmit={(values) => console.log(values)} />
			</div>
		</>
	);
}
