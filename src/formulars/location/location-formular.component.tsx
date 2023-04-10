import { LocationFormularProps } from "@/types/location-formular.types";
import useTranslation from "next-translate/useTranslation";
import { useFormContext } from "react-hook-form";
import { useEffect } from "react";
import Dropdown from "@/components/dropdown.component";
import { getDistricts, getLocals } from "@/lib/location.lib";

export default function LocationFormular({ associationsWithDependencies }: LocationFormularProps) {
	const { t } = useTranslation("forms");
	const { watch, setValue, clearErrors, register, formState, handleSubmit } = useFormContext();

	const getLabel = (name: string) => t(`location.${name}.label`);
	const getErrors = (name: string) => {
		const error = formState?.errors?.[name]?.message;
		return error && t(error as string);
	};

	const association = watch("association");
	const district = watch("district");

	/**
	 * clear `district` and `local` values when the `association` changes so the form values don't
	 * reflect a still selected value in the background even though the `association` changed
	 */
	useEffect(() => {
		setValue("district", "");
		setValue("local", "");
		clearErrors();
	}, [association, setValue, clearErrors]);

	/**
	 * clear `local` value when the `district` changes so the form values don't
	 * reflect a still selected `local` in the background even though the `district` changed.
	 */
	useEffect(() => {
		setValue("local", "");
		clearErrors();
	}, [district, setValue, clearErrors]);

	return (
		<form className="flex flex-col gap-8">
			<Dropdown label={getLabel("association")} error={getErrors("association")} {...register("association")}>
				<option></option>
				{associationsWithDependencies.map((association) => (
					<option key={association.id}>{association.name}</option>
				))}
			</Dropdown>

			<Dropdown label={getLabel("district")} error={getErrors("district")} disabled={!association} {...register("district")}>
				<option></option>
				{getDistricts(associationsWithDependencies, association).map((district) => (
					<option key={district.id}>{district.name}</option>
				))}
			</Dropdown>

			<Dropdown label={getLabel("local")} error={getErrors("local")} disabled={!association || !district} {...register("local")}>
				<option></option>
				{getLocals(associationsWithDependencies, association, district).map((local) => (
					<option key={local.id}>{local.name}</option>
				))}
			</Dropdown>
		</form>
	);
}
