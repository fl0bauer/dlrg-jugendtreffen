import Head from "@/components/head.component";
import { InferGetServerSidePropsType } from "next";
import { fetchAssociations } from "@/prisma/location";
import Frame from "@/components/frame.component";
import useTranslation from "next-translate/useTranslation";
import Stepper from "@/components/stepper.component";
import { ArrowLeftCircleIcon, ArrowRightCircleIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import Button from "@/components/button.component";
import Step from "@/components/step.component";
import Heading from "@/components/heading.component";
import { FormProvider, useForm } from "react-hook-form";
import LocationFormular from "@/formulars/location/location-formular.component";
import getLocationSchema from "@/formulars/location/location-formular.schema";
import { zodResolver } from "@hookform/resolvers/zod";

export const getServerSideProps = async () => {
	const associations = await fetchAssociations();

	return {
		props: { associations },
	};
};

const styles = {
	container: "flex flex-col gap-8 w-full mx-auto max-w-2xl",
};

export default function Home({ associations }: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const { t } = useTranslation("forms");

	const locationFormularSchema = getLocationSchema(associations);
	const locationFormular = useForm({ resolver: zodResolver(locationFormularSchema), mode: "all" });

	return (
		<>
			<Head />

			<Frame>
				<Stepper
					previousStepButton={
						<Button variant="secondary">
							<ArrowLeftCircleIcon className="h-4 w-4" />
							{t("general.previous-step")}
						</Button>
					}
					nextStepButton={
						<Button>
							{t("general.next-step")}
							<ArrowRightCircleIcon className="h-4 w-4" />
						</Button>
					}
					submitButton={
						<Button>
							{t("general.submit")}
							<CheckCircleIcon className="h-4 w-4" />
						</Button>
					}
				>
					<Step>
						<Heading heading="Step 1" description="Step Description" />
						<div>Step 1</div>
					</Step>

					<Step className={styles.container} disableNextStep={!locationFormular.formState.isValid}>
						<Heading heading={t("location.heading")} description={t("location.description")} />

						<FormProvider {...locationFormular}>
							<LocationFormular associationsWithDependencies={associations} />
						</FormProvider>
					</Step>

					<Step>
						<Heading heading="Step 3" description="Step Description" />
						<div>Step 3</div>
					</Step>
				</Stepper>
			</Frame>
		</>
	);
}
