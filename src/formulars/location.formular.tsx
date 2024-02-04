import { LocationFormularProps } from "@/types/location-formular.types";
import useTranslation from "next-translate/useTranslation";
import { useFormContext } from "react-hook-form";
import { useEffect } from "react";
import Dropdown from "@/components/dropdown.component";
import { getDistricts } from "@/lib/location.lib";
import { Form } from "@/components/form.component";

export default function LocationFormular({ associationsWithDependencies }: LocationFormularProps) {
	const { t } = useTranslation("location.formular");
	const { watch, setValue, register, formState } = useFormContext();

	const getLabel = (name: string) => t(`inputs.${name}.label`);
	const getErrors = (name: string) => {
		const error = formState?.errors?.[name]?.message;
		return error && t(error as string);
	};

	const association = watch("association");

	// settings association to a default value because the input is disabled
	useEffect(() => {
		setValue("association", process.env.NEXT_PUBLIC_DEFAULT_ASSOCIATION);
	}, []);

	return (
		<Form>
			<Dropdown disabled id="location-association" label={getLabel("association")} error={getErrors("association")} required {...register("association")}>
				<option></option>
				{associationsWithDependencies.map((association) => (
					<option key={association.id}>{association.name}</option>
				))}
			</Dropdown>

			<Dropdown id="location-district" label={getLabel("district")} error={getErrors("district")} disabled={!association} required {...register("district")}>
				<option></option>
				{getDistricts(associationsWithDependencies, association).map((district) => (
					<option key={district.id}>{district.name}</option>
				))}
			</Dropdown>
		</Form>
	);
}
