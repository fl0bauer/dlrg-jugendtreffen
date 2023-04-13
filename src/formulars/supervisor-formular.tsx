import useTranslation from "next-translate/useTranslation";
import { useFormContext } from "react-hook-form";
import Input from "@/components/input.component";
import Dropdown from "@/components/dropdown.component";
import Checkbox from "@/components/checkbox.component";
import { SIZES } from "@/config/clothing-sizes.config";

const styles = {
	form: "flex flex-col gap-8",
	grid2: "grid grid-cols-2 gap-4",
	grid3: "grid grid-cols-3 gap-4",
};

export default function SupervisorFormular() {
	const { t } = useTranslation("forms");
	const { register, formState } = useFormContext();

	const getLabel = (name: string) => t(`supervisor.${name}.label`);
	const getErrors = (name: string) => {
		const error = formState?.errors?.[name]?.message;
		return error && t(error as string);
	};

	return (
		<form className={styles.form}>
			<div className={styles.grid3}>
				<Input label={getLabel("first-name")} error={getErrors("firstName")} {...register("firstName")} />
				<Input label={getLabel("last-name")} error={getErrors("lastName")} {...register("lastName")} />
				<Input type="date" label={getLabel("birthday")} error={getErrors("birthday")} {...register("birthday")} />
			</div>

			<div className={styles.grid3}>
				<Input label={getLabel("street")} error={getErrors("street")} {...register("street")} />
				<Input label={getLabel("zip")} error={getErrors("zip")} {...register("zip")} />
				<Input label={getLabel("residence")} error={getErrors("residence")} {...register("residence")} />
			</div>

			<div className={styles.grid2}>
				<Input label={getLabel("phone")} error={getErrors("phone")} {...register("phone")} />
				<Input label={getLabel("email")} error={getErrors("email")} {...register("email")} />
			</div>

			<div className={styles.grid2}>
				<Dropdown label={getLabel("shirt-size")} error={getErrors("shirtSize")} {...register("shirtSize")}>
					<option></option>
					{SIZES.map((size) => (
						<option key={size}>{size}</option>
					))}
				</Dropdown>
				<Dropdown label={getLabel("hoodie-size")} error={getErrors("hoodieSize")} {...register("hoodieSize")}>
					<option></option>
					{SIZES.map((size) => (
						<option key={size}>{size}</option>
					))}
				</Dropdown>
			</div>

			<div>
				<Checkbox label={getLabel("vegetarian-food")} error={getErrors("vegetarianFood")} {...register("vegetarianFood")} />
			</div>
		</form>
	);
}
