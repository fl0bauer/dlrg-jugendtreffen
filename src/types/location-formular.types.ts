import { AssociationWithDependencies } from "@/types/location.types";

export interface LocationFormularValues {
	association: string;
	district: string;
	local: string;
}

export interface LocationFormularProps {
	associationsWithDependencies: AssociationWithDependencies[];
	onValidFormSubmit: (values: LocationFormularValues) => unknown;
}
