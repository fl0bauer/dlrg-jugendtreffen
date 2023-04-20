import { Form } from "@/components/form.component";
import Checkbox from "@/components/checkbox.component";
import useTranslation from "next-translate/useTranslation";
import { useFormContext } from "react-hook-form";
import Trans from "next-translate/Trans";
import Link from "@/components/link.component";

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
				<Checkbox id="legal-accept" label={<Trans i18nKey={getLabel("accept")} components={[<Link key="legal-link" href={process.env.NEXT_PUBLIC_LEGAL_LINK} target="_blank" />]} />} error={getErrors("accept")} required {...register("accept")} />
			</Form.Group>
		</Form>
	);
}

// <span>
// 							<a href={"#"} className="text-blue-400 hover:underline underline-offset-4">
// 								Teilnahmebedingungen
// 							</a>{" "}
// 	gelesen und akzeptiert
// 						</span>
