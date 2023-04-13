import Head from "@/components/head.component";
import { InferGetServerSidePropsType } from "next";
import { fetchAssociations } from "@/prisma/location";
import Frame from "@/components/frame.component";
import useTranslation from "next-translate/useTranslation";
import Stepper from "@/components/stepper.component";
import { ArrowLeftCircleIcon, ArrowPathIcon, ArrowRightCircleIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
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
import { Participant } from "@/types/participants-formular.types";
import { Prisma } from ".prisma/client";
import { useState } from "react";
import Spinner from "@/components/spinner.component";
import RegistrationCreateInput = Prisma.RegistrationCreateInput;

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

	const [submitStatus, setSubmitStatus] = useState<"none" | "loading" | "success" | "error">("none");

	const passwordFormular = useForm({ resolver: zodResolver(passwordSchema), mode: "all" });
	const locationFormular = useForm({ resolver: zodResolver(locationSchema(associations)), mode: "all" });
	const supervisorFormular = useForm({ resolver: zodResolver(supervisorSchema), mode: "all" });
	const participantsFormular = useForm({ resolver: zodResolver(participantsSchema), mode: "all" });
	const sepaFormular = useForm({ resolver: zodResolver(sepaSchema), mode: "all" });

	const deadline = new Date(process.env.NEXT_PUBLIC_REGISTRATION_DEADLINE || "").getTime();
	const now = new Date().getTime();

	const onRegister = async () => {
		setSubmitStatus("loading");

		try {
			const locationValues = locationFormular.getValues();
			const supervisorValues = supervisorFormular.getValues();
			const participantsValues = participantsFormular.getValues();
			const sepaValues = sepaFormular.getValues();

			const registration: RegistrationCreateInput = {
				location: {
					association: locationValues.association,
					district: locationValues.district,
					local: locationValues.local,
				},
				supervisor: {
					firstName: supervisorValues.firstName,
					lastName: supervisorValues.lastName,
					birthday: supervisorValues.birthday,
					shirtSize: supervisorValues.shirtSize,
					hoodieSize: supervisorValues.hoodieSize,
					vegetarianFood: supervisorValues.vegetarianFood,
					address: `${supervisorValues.street}, ${supervisorValues.zip} ${supervisorValues.residence}`,
					phone: supervisorValues.phone,
					email: supervisorValues.email,
				},
				participants: (participantsValues.participants as (Participant & { isSecondarySupervisor: boolean })[]).map((participant) => ({
					isSecondarySupervisor: participant.isSecondarySupervisor,
					firstName: participant.firstName,
					lastName: participant.lastName,
					birthday: participant.birthday,
					shirtSize: participant.shirtSize,
					hoodieSize: participant.hoodieSize,
					vegetarianFood: participant.vegetarianFood,
				})),
				bank: {
					accountOwner: sepaValues.accountOwner,
					address: `${sepaValues.street}, ${sepaValues.zip} ${sepaValues.residence}`,
					creditInstitution: sepaValues.creditInstitution,
					iban: sepaValues.iban,
				},
			};

			const response = await fetch("/api/register", {
				method: "POST",
				body: JSON.stringify(registration),
			});

			setSubmitStatus(response.ok ? "success" : "error");
		} catch (error) {
			setSubmitStatus("error");
		}
	};

	if (deadline < now) {
		return (
			<>
				<Head />

				<Frame className="flex justify-center items-center">
					<Heading heading={t("deadline:heading")} description={t("deadline:description")} />
				</Frame>
			</>
		);
	}

	if (submitStatus === "success") {
		return (
			<>
				<Head />

				<Frame className="flex justify-center items-center">
					<Heading heading={t("registration:success.heading")} description={t("registration:success.description")} />
				</Frame>
			</>
		);
	}

	if (submitStatus === "error") {
		return (
			<>
				<Head />

				<Frame className="flex flex-col gap-4 justify-center items-center">
					<Heading heading={t("registration:error.heading")} description={t("registration:error.description")} />
					<Button onClick={() => (window.location.href = "/")}>
						<ArrowPathIcon className="h-4 w-4" />
						{t("registration:error.retry")}
					</Button>
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
							{submitStatus === "loading" ? <Spinner color="blue" screenReaderText="Loading" /> : <CheckCircleIcon className="h-4 w-4" />}
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
									birthday: supervisorFormular.watch("birthday"),
									shirtSize: supervisorFormular.watch("shirtSize"),
									hoodieSize: supervisorFormular.watch("hoodieSize"),
									vegetarianFood: supervisorFormular.watch("vegetarianFood"),
									street: supervisorFormular.watch("street"),
									zip: supervisorFormular.watch("zip"),
									residence: supervisorFormular.watch("residence"),
									phone: supervisorFormular.watch("phone"),
									email: supervisorFormular.watch("email"),
								}}
							/>
						</FormProvider>
					</Step>

					<Step className={styles.step} disableNextStep={!sepaFormular.formState.isValid || submitStatus === "loading"} onNextStep={onRegister}>
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
