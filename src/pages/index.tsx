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
import { sepaSchema } from "@/schemas/sepa.schema";
import SepaFormular from "@/formulars/sepa.formular";
import { passwordSchema } from "@/schemas/password.schema";
import PasswordFormular from "@/formulars/password.formular";

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
	const { t } = useTranslation();

	const passwordFormular = useForm({ resolver: zodResolver(passwordSchema), mode: "all" });
	const locationFormular = useForm({ resolver: zodResolver(locationSchema(associations)), mode: "all" });
	const supervisorFormular = useForm({ resolver: zodResolver(supervisorSchema), mode: "all" });
	const participantsFormular = useForm({ resolver: zodResolver(participantsSchema), mode: "all" });
	const sepaFormular = useForm({ resolver: zodResolver(sepaSchema), mode: "all" });

	const deadline = new Date(process.env.NEXT_PUBLIC_REGISTRATION_DEADLINE || "").getTime();
	const now = new Date().getTime();

	if (deadline > now) {
		return (
			<>
				<Head />

				<Frame className="flex justify-center items-center">
					<Heading heading={t("deadline:heading")} description={t("deadline:description")} />
				</Frame>
			</>
		);
	}

	return (
		<>
			<Head />

			<Frame>
				<Stepper
					previousStepButton={
						<Button variant="secondary">
							<ArrowLeftCircleIcon className="h-4 w-4" />
							{t("forms:general.previous-step")}
						</Button>
					}
					nextStepButton={
						<Button>
							{t("forms:general.next-step")}
							<ArrowRightCircleIcon className="h-4 w-4" />
						</Button>
					}
					submitButton={
						<Button>
							{t("forms:general.submit")}
							<CheckCircleIcon className="h-4 w-4" />
						</Button>
					}
				>
					<Step className={styles.step} disableNextStep={!passwordFormular.formState.isValid}>
						<Heading heading={t("forms:password.heading")} description={t("forms:password.description")} />

						<FormProvider {...passwordFormular}>
							<PasswordFormular />
						</FormProvider>
					</Step>

					<Step className={styles.step} disableNextStep={!locationFormular.formState.isValid}>
						<Heading heading={t("forms:location.heading")} description={t("forms:location.description")} />

						<FormProvider {...locationFormular}>
							<LocationFormular associationsWithDependencies={associations} />
						</FormProvider>
					</Step>

					<Step className={styles.step} disableNextStep={!supervisorFormular.formState.isValid}>
						<Heading heading={t("forms:supervisor.heading")} description={t("forms:supervisor.description")} />

						<FormProvider {...supervisorFormular}>
							<SupervisorFormular />
						</FormProvider>
					</Step>

					<Step className={styles.step}>
						<Heading heading={t("forms:participants.heading")} description={t("forms:participants.description")} />

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

					<Step className={styles.step} disableNextStep={!sepaFormular.formState.isValid}>
						<Heading heading={t("forms:sepa.heading")} description={t("forms:sepa.description")} />

						<FormProvider {...sepaFormular}>
							<SepaFormular />
						</FormProvider>
					</Step>
				</Stepper>
			</Frame>
		</>
	);
}
