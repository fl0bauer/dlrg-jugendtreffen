import Head from "@/components/head.component";
import Intro from "@/components/intro.component";
import Frame from "@/components/frame.component";
import { Stepper } from "@/components/stepper.component";
import { ArrowRightCircleIcon, FolderIcon } from "@heroicons/react/24/outline";
import Button from "@/components/button.component";
import PasswordFormular from "@/formulars/password.formular";
import { FormProvider, useForm } from "react-hook-form";
import useTranslation from "next-translate/useTranslation";
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordSchema } from "@/schemas/password.schema";
import ExportFormular from "@/formulars/export.formular";
import { exportSchema } from "@/schemas/export.schema";
import { getRegistrations } from "@/prisma/registration";
import { InferGetServerSidePropsType } from "next";
import { Model } from "@/components/model.component";

export const getServerSideProps = async () => {
	const registrations = await getRegistrations();

	return {
		props: { registrations },
	};
};

const styles = {
	step: "flex flex-col gap-8",
};

export default function Admin({ registrations }: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const { t } = useTranslation();
	const passwordFormular = useForm({ resolver: zodResolver(passwordSchema(process.env.NEXT_PUBLIC_ADMIN_PASSWORD as string)), mode: "all" });
	const exportFormular = useForm({ resolver: zodResolver(exportSchema), mode: "all" });

	return (
		<>
			<Head />

			<Intro />

			<Frame>
				<Stepper
					previousStepButton={<></>}
					nextStepButton={
						<Button>
							{t("admin:stepper.next")}
							<ArrowRightCircleIcon className="h-4 w-4" />
						</Button>
					}
					submitButton={<></>}
				>
					<Stepper.Step label={t("password.formular:label")} className={styles.step} disableNextStep={!passwordFormular.formState.isValid}>
						<FormProvider {...passwordFormular}>
							<PasswordFormular />
						</FormProvider>
					</Stepper.Step>

					<Stepper.Step label={t("export.formular:label")} className={styles.step}>
						<FormProvider {...exportFormular}>
							{registrations.length === 0 && (
								<Model>
									<Model.Icon className="bg-pink-200 dark:bg-pink-700 dark:bg-opacity-25">
										<FolderIcon className="h-6 w-6 text-pink-700 stroke-2 dark:text-pink-400" />
									</Model.Icon>
									<Model.Title>{t("export.formular:no-registrations.title")}</Model.Title>
									<Model.Text>{t("export.formular:no-registrations.text")}</Model.Text>
								</Model>
							)}
							<ExportFormular registrations={registrations} />
						</FormProvider>
					</Stepper.Step>
				</Stepper>
			</Frame>
		</>
	);
}
