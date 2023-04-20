import { Form } from "@/components/form.component";
import Checkbox from "@/components/checkbox.component";
import useTranslation from "next-translate/useTranslation";
import { useFormContext } from "react-hook-form";

export default function LegalFormular() {
	const { t } = useTranslation("legal.formular");
	const { register, formState } = useFormContext();

	const getLabel = (name: string) => t(`inputs.${name}.label`);
	const getErrors = (name: string) => {
		const error = formState?.errors?.[name]?.message;
		return error && t(error as string);
	};
	return (
		<Form>
			<Form.Group columns={1}>
				<Checkbox id="legal-accept" label={getLabel("accept")} error={getErrors("accept")} required {...register("accept")} />
			</Form.Group>
		</Form>
	);
}
