import useTranslation from "next-translate/useTranslation";
import { useFormContext } from "react-hook-form";
import Input from "@/components/input.component";
import { Form } from "@/components/form.component";

export default function PasswordFormular() {
	const { t } = useTranslation("password.formular");
	const { register, formState } = useFormContext();

	const getLabel = (name: string) => t(`inputs.${name}.label`);
	const getErrors = (name: string) => {
		const error = formState?.errors?.[name]?.message;
		return error && t(error as string);
	};

	return (
		<Form>
			<Input id="password" type="password" label={getLabel("password")} error={getErrors("password")} required {...register("password")} />
		</Form>
	);
}
