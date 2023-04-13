import useTranslation from "next-translate/useTranslation";
import { useFormContext } from "react-hook-form";
import Input from "@/components/input.component";

const styles = {
	form: "flex flex-col gap-8",
};

export default function PasswordFormular() {
	const { t } = useTranslation("forms");
	const { register, formState } = useFormContext();

	const getLabel = (name: string) => t(`password.${name}.label`);
	const getErrors = (name: string) => {
		const error = formState?.errors?.[name]?.message;
		return error && t(error as string);
	};

	return (
		<form className={styles.form}>
			<Input type="password" label={getLabel("password")} error={getErrors("password")} required {...register("password")} />
		</form>
	);
}
