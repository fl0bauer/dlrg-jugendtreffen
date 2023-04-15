import useTranslation from "next-translate/useTranslation";
import { useFormContext } from "react-hook-form";
import Input from "@/components/input.component";
import Dropdown from "@/components/dropdown.component";
import Checkbox from "@/components/checkbox.component";
import { SIZES } from "@/config/clothing-sizes.config";
import { Form } from "@/components/form.component";
import NextImage from "next/image";
import Tooltip from "@/components/tooltip.component";

export default function SupervisorFormular() {
	const { t } = useTranslation("supervisor.formular");
	const { register, formState } = useFormContext();

	const getLabel = (name: string) => t(`inputs.${name}.label`);
	const getErrors = (name: string) => {
		const error = formState?.errors?.[name]?.message;
		return error && t(error as string);
	};

	return (
		<Form>
			<Form.Group columns={3}>
				<Input id="supervisor-first-name" label={getLabel("first-name")} error={getErrors("firstName")} required {...register("firstName")} />
				<Input id="supervisor-last-name" label={getLabel("last-name")} error={getErrors("lastName")} required {...register("lastName")} />
				<Input id="supervisor-birthday" type="date" label={getLabel("birthday")} error={getErrors("birthday")} required {...register("birthday")} />
			</Form.Group>

			<Form.Group columns={3}>
				<Input id="supervisor-street" label={getLabel("street")} error={getErrors("street")} required {...register("street")} />
				<Input id="supervisor-zip" label={getLabel("zip")} error={getErrors("zip")} required {...register("zip")} />
				<Input id="supervisor-residence" label={getLabel("residence")} error={getErrors("residence")} required {...register("residence")} />
			</Form.Group>

			<Form.Group columns={2}>
				<Input id="supervisor-phone" label={getLabel("phone")} error={getErrors("phone")} required {...register("phone")} />
				<Input id="supervisor-email" label={getLabel("email")} error={getErrors("email")} required {...register("email")} />
			</Form.Group>

			<Form.Group columns={2}>
				<Dropdown
					id="supervisor-shirt-size"
					tooltip={
						<Tooltip className="w-32">
							<NextImage src="/shirt.jpg" alt="DLRG Shirt" width={708} height={798} />
						</Tooltip>
					}
					label={getLabel("shirt-size")}
					error={getErrors("shirtSize")}
					{...register("shirtSize")}
				>
					<option></option>
					{SIZES.map((size) => (
						<option key={size}>{size}</option>
					))}
				</Dropdown>
				<Dropdown
					id="supervisor-hoodie-size"
					tooltip={
						<Tooltip className="w-32">
							<NextImage src="/hoodie.jpg" alt="DLRG Hoodie" width={740} height={1011} />
						</Tooltip>
					}
					label={getLabel("hoodie-size")}
					error={getErrors("hoodieSize")}
					{...register("hoodieSize")}
				>
					<option></option>
					{SIZES.map((size) => (
						<option key={size}>{size}</option>
					))}
				</Dropdown>
			</Form.Group>

			<Form.Group columns={1}>
				<Checkbox id="supervisor-vegetarian-food" label={getLabel("vegetarian-food")} error={getErrors("vegetarianFood")} {...register("vegetarianFood")} />
			</Form.Group>
		</Form>
	);
}
