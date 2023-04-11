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
	supervisor: Participant;
	fields: (Participant & { id: string })[];
	onRemove: (index: number) => void;
}

export interface ParticipantsFormularProps {
	supervisor: ParticipantsTableProps["supervisor"];
}
