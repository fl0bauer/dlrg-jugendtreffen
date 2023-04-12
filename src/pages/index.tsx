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
import { zodResolver } from "@hookform/resolvers/zod";
import { locationSchema } from "@/schemas/location.schema";
import LocationFormular from "@/formulars/location.formular";
import SupervisorFormular from "@/formulars/supervisor-formular";
import ParticipantsFormular from "@/formulars/participants.formular";
import { supervisorSchema } from "@/schemas/supervisor.schema";
import { participantsSchema } from "@/schemas/participants.schema";

export const getServerSideProps = async () => {
	const associations = await fetchAssociations();

	return {
		props: { associations },
	};
};

const styles = {
	step: "flex flex-col gap-8",
};

export default function Home({ associations }: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const { t } = useTranslation("forms");

	const locationFormular = useForm({ resolver: zodResolver(locationSchema(associations)), mode: "all" });
	const supervisorFormular = useForm({ resolver: zodResolver(supervisorSchema), mode: "all" });
	const participantsFormular = useForm({ resolver: zodResolver(participantsSchema), mode: "all" });

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
					<Step className={styles.step} disableNextStep={!locationFormular.formState.isValid}>
						<Heading heading={t("location.heading")} description={t("location.description")} />

						<FormProvider {...locationFormular}>
							<LocationFormular associationsWithDependencies={associations} />
						</FormProvider>
					</Step>

					<Step className={styles.step} disableNextStep={!supervisorFormular.formState.isValid}>
						<Heading heading={t("supervisor.heading")} description={t("supervisor.description")} />

						<FormProvider {...supervisorFormular}>
							<SupervisorFormular />
						</FormProvider>
					</Step>

					<Step className={styles.step}>
						<Heading heading={t("participants.heading")} description={t("participants.description")} />

						<FormProvider {...participantsFormular}>
							<ParticipantsFormular
								supervisor={{
									firstName: supervisorFormular.watch("firstName"),
									lastName: supervisorFormular.watch("lastName"),
									street: supervisorFormular.watch("street"),
									zip: supervisorFormular.watch("zip"),
									residence: supervisorFormular.watch("residence"),
									phone: supervisorFormular.watch("phone"),
									email: supervisorFormular.watch("email"),
								}}
							/>
						</FormProvider>
					</Step>
				</Stepper>
			</Frame>
		</>
	);
}
