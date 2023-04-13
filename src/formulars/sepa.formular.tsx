import useTranslation from "next-translate/useTranslation";
import { useFormContext } from "react-hook-form";
import Input from "@/components/input.component";

const styles = {
	form: "flex flex-col gap-8",
	grid2: "grid grid-cols-2 gap-4",
	grid3: "grid grid-cols-3 gap-4",
};

export default function SepaFormular() {
	const { t } = useTranslation("forms");
	const { register, formState } = useFormContext();

	const getLabel = (name: string) => t(`sepa.${name}.label`);
	const getErrors = (name: string) => {
		const error = formState?.errors?.[name]?.message;
		return error && t(error as string);
	};

	return (
		<form className={styles.form}>
			<div>
				<Input label={getLabel("account-owner")} error={getErrors("accountOwner")} required {...register("accountOwner")} />
			</div>

			<div className={styles.grid3}>
				<Input label={getLabel("street")} error={getErrors("street")} required {...register("street")} />
				<Input label={getLabel("zip")} error={getErrors("zip")} required {...register("zip")} />
				<Input label={getLabel("residence")} error={getErrors("residence")} required {...register("residence")} />
			</div>

			<div className={styles.grid2}>
				<Input label={getLabel("credit-institution")} error={getErrors("creditInstitution")} required {...register("creditInstitution")} />
				<Input label={getLabel("iban")} error={getErrors("iban")} required {...register("iban")} />
			</div>
		</form>
	);
}
