import Head from "@/components/head.component";
import { InferGetServerSidePropsType } from "next";
import { fetchAssociations } from "@/prisma/location";
import Frame from "@/components/frame.component";
import useTranslation from "next-translate/useTranslation";
import { ArrowLeftCircleIcon, ArrowRightCircleIcon, CheckCircleIcon, CheckIcon, ClockIcon, CurrencyEuroIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Button from "@/components/button.component";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { locationSchema } from "@/schemas/location.schema";
import LocationFormular from "@/formulars/location.formular";
import SupervisorFormular from "@/formulars/supervisor.formular";
import ParticipantsFormular from "@/formulars/participants.formular";
import { supervisorSchema } from "@/schemas/supervisor.schema";
import { participantsSchema } from "@/schemas/participants.schema";
import { sepaSchema } from "@/schemas/sepa.schema";
import SepaFormular from "@/formulars/sepa.formular";
import { passwordSchema } from "@/schemas/password.schema";
import PasswordFormular from "@/formulars/password.formular";
import { useState } from "react";
import Spinner from "@/components/spinner.component";
import { Stepper } from "@/components/stepper.component";
import { Model } from "@/components/model.component";
import Intro from "@/components/intro.component";
import { calculateEstimatedPrice, getRegistrationCreateInputFromFormular, getSupervisor, hasDeadlinePassed } from "@/lib/index.page.lib";

export const getServerSideProps = async () => {
	const associations = await fetchAssociations();

	return {
		props: { associations },
	};
};

const styles = {
	step: "flex flex-col gap-8",
	modelContainer: "flex flex-col flex-grow items-center justify-center select-none",
};

function DeadlineModel() {
	const { t } = useTranslation();

	return (
		<div className={styles.modelContainer}>
			<Model>
				<Model.Icon className="bg-pink-200 dark:bg-pink-700 dark:bg-opacity-25">
					<ClockIcon className="h-6 w-6 text-pink-700 stroke-2 dark:text-pink-400" />
				</Model.Icon>
				<Model.Title>{t("general.formular:deadline.title")}</Model.Title>
				<Model.Text>{t("general.formular:deadline.text")}</Model.Text>
			</Model>
		</div>
	);
}

function SuccessModel() {
	const { t } = useTranslation();

	return (
		<div className={styles.modelContainer}>
			<Model>
				<Model.Icon className="bg-green-200 dark:bg-green-700 dark:bg-opacity-25">
					<CheckIcon className="h-6 w-6 text-green-700 stroke-2 dark:text-green-400" />
				</Model.Icon>
				<Model.Title>{t("general.formular:success.title")}</Model.Title>
				<Model.Text>{t("general.formular:success.text")}</Model.Text>
			</Model>
		</div>
	);
}

function ErrorModel() {
	const { t } = useTranslation();

	return (
		<div className={styles.modelContainer}>
			<Model>
				<Model.Icon className="bg-rose-200 dark:bg-rose-700 dark:bg-opacity-25">
					<XMarkIcon className="h-6 w-6 text-rose-700 stroke-2 dark:text-rose-400" />
				</Model.Icon>
				<Model.Title>{t("general.formular:error.title")}</Model.Title>
				<Model.Text>{t("general.formular:error.text")}</Model.Text>
			</Model>
		</div>
	);
}

export default function Home({ associations }: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const { t } = useTranslation();

	const [submitStatus, setSubmitStatus] = useState<"none" | "loading" | "success" | "error">("none");

	const passwordFormular = useForm({ resolver: zodResolver(passwordSchema(process.env.NEXT_PUBLIC_PASSWORD as string)), mode: "all" });
	const locationFormular = useForm({ resolver: zodResolver(locationSchema(associations)), mode: "all" });
	const supervisorFormular = useForm({ resolver: zodResolver(supervisorSchema), mode: "all" });
	const participantsFormular = useForm({ resolver: zodResolver(participantsSchema), mode: "all" });
	const sepaFormular = useForm({ resolver: zodResolver(sepaSchema), mode: "all" });

	const onRegister = async () => {
		setSubmitStatus("loading");

		try {
			const registration = getRegistrationCreateInputFromFormular(locationFormular, supervisorFormular, participantsFormular, sepaFormular);

			const response = await fetch("/api/register", {
				method: "POST",
				body: JSON.stringify(registration),
			});

			setSubmitStatus(response.ok ? "success" : "error");
		} catch (error) {
			setSubmitStatus("error");
		}
	};

	if (hasDeadlinePassed()) {
		return (
			<>
				<Head />

				<Frame>
					<DeadlineModel />
				</Frame>
			</>
		);
	}

	if (submitStatus === "success") {
		return (
			<>
				<Head />

				<Frame>
					<SuccessModel />
				</Frame>
			</>
		);
	}

	if (submitStatus === "error") {
		return (
			<>
				<Head />

				<Frame>
					<ErrorModel />
				</Frame>
			</>
		);
	}

	return (
		<>
			<Head />

			<Intro />

			<Frame>
				<Stepper
					previousStepButton={
						<Button variant="secondary">
							<ArrowLeftCircleIcon className="hidden h-4 w-4 sm:block" />
							{t("general.formular:stepper.previous-step")}
						</Button>
					}
					nextStepButton={
						<Button>
							{t("general.formular:stepper.next-step")}
							<ArrowRightCircleIcon className="hidden h-4 w-4 sm:block" />
						</Button>
					}
					submitButton={
						<Button>
							{t("general.formular:stepper.submit")}
							{submitStatus === "loading" ? <Spinner color="blue" screenReaderText="Loading" /> : <CheckCircleIcon className="hidden h-4 w-4 sm:block" />}
						</Button>
					}
				>
					<Stepper.Step label={t("password.formular:label")} className={styles.step} disableNextStep={!passwordFormular.formState.isValid}>
						<FormProvider {...passwordFormular}>
							<PasswordFormular />
						</FormProvider>
					</Stepper.Step>

					<Stepper.Step label={t("location.formular:label")} className={styles.step} disableNextStep={!locationFormular.formState.isValid}>
						<FormProvider {...locationFormular}>
							<LocationFormular associationsWithDependencies={associations} />
						</FormProvider>
					</Stepper.Step>

					<Stepper.Step label={t("supervisor.formular:label")} className={styles.step} disableNextStep={!supervisorFormular.formState.isValid}>
						<FormProvider {...supervisorFormular}>
							<SupervisorFormular />
						</FormProvider>
					</Stepper.Step>

					<Stepper.Step label={t("participants.formular:label")} className={styles.step}>
						<FormProvider {...participantsFormular}>
							<ParticipantsFormular supervisor={getSupervisor(supervisorFormular)} />
						</FormProvider>
					</Stepper.Step>

					<Stepper.Step label={t("sepa.formular:label")} className={styles.step} disableNextStep={!sepaFormular.formState.isValid || submitStatus === "loading"} onNextStep={onRegister}>
						<Model>
							<Model.Icon className="bg-teal-200 dark:bg-teal-700 dark:bg-opacity-25">
								<CurrencyEuroIcon className="h-6 w-6 text-teal-700 stroke-2 dark:text-teal-400" />
							</Model.Icon>
							<Model.Title>{t("sepa.formular:estimated-price.title", { estimatedPrice: calculateEstimatedPrice(supervisorFormular, participantsFormular) })}</Model.Title>
							<Model.Text>{t("sepa.formular:estimated-price.text")}</Model.Text>
						</Model>

						<FormProvider {...sepaFormular}>
							<SepaFormular />
						</FormProvider>
					</Stepper.Step>
				</Stepper>
			</Frame>
		</>
	);
}
