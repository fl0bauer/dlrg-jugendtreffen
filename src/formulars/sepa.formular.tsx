import useTranslation from "next-translate/useTranslation";
import { useFormContext } from "react-hook-form";
import Input from "@/components/input.component";
import { Form } from "@/components/form.component";

export default function SepaFormular() {
	const { t } = useTranslation("sepa.formular");
	const { register, formState } = useFormContext();

	const getLabel = (name: string) => t(`inputs.${name}.label`);
	const getErrors = (name: string) => {
		const error = formState?.errors?.[name]?.message;
		return error && t(error as string);
	};

	return (
		<Form>
			<Form.Group columns={1}>
				<Input id="sepa-account-owner" label={getLabel("account-owner")} error={getErrors("accountOwner")} required {...register("accountOwner")} />
			</Form.Group>

			<Form.Group columns={3}>
				<Input id="sepa-street" label={getLabel("street")} error={getErrors("street")} required {...register("street")} />
				<Input id="sepa-zip" label={getLabel("zip")} error={getErrors("zip")} required {...register("zip")} />
				<Input id="sepa-residence" label={getLabel("residence")} error={getErrors("residence")} required {...register("residence")} />
			</Form.Group>

			<Form.Group columns={2}>
				<Input id="sepa-credit-institution" label={getLabel("credit-institution")} error={getErrors("creditInstitution")} required {...register("creditInstitution")} />
				<Input id="sepa-iban" label={getLabel("iban")} error={getErrors("iban")} required {...register("iban")} />
			</Form.Group>
		</Form>
	);
}
