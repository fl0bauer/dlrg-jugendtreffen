import { AssociationWithDependencies } from "@/types/location.types";

export function findAssociation(associations: AssociationWithDependencies[], associationName: string) {
	return associations.find((association) => association.name === associationName);
}

export function findDistrict(associations: AssociationWithDependencies[], associationName: string, districtName: string) {
	return getDistricts(associations, associationName).find((district) => district.name === districtName);
}

export function getDistricts(associations: AssociationWithDependencies[], associationName: string) {
	return findAssociation(associations, associationName)?.districts || [];
}

export function getLocals(associations: AssociationWithDependencies[], associationName: string, districtName: string) {
	return findDistrict(associations, associationName, districtName)?.locals || [];
}
