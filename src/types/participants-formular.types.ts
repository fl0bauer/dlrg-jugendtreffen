export interface Supervisor extends Participant {
	street: string;
	zip: string;
	residence: string;
	phone: string;
	email: string;
}

export interface Participant {
	firstName: string;
	lastName: string;
	birthday: string;
	shirtSize: string;
	hoodieSize: string;
	vegetarianFood: boolean;
	notes: string;
}

export interface ParticipantsTableProps {
	preSelectedSupervisor: Supervisor;
	participants: (Participant & { id: string; isSecondarySupervisor: boolean })[];
	onRemoveParticipant: (index: number) => void;
}

export interface ParticipantsFormularProps {
	supervisor: Supervisor;
}
