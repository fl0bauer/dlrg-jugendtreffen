export interface Participant {
	firstName: string;
	lastName: string;
	street: string;
	zip: string;
	residence: string;
	phone: string;
	email: string;
}

export interface ParticipantsTableProps {
	preSelectedSupervisors: Participant;
	participants: (Participant & { id: string; isSecondarySupervisor: boolean })[];
	onRemoveParticipant: (index: number) => void;
}

export interface ParticipantsFormularProps {
	supervisor: Participant;
}
