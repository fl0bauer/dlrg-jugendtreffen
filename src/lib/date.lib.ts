export function getAge(birthDate: string, untilDate?: string): number {
	const untilAsDate = untilDate ? new Date(untilDate) : new Date();
	const birthAsDate = new Date(birthDate);

	let age = untilAsDate.getFullYear() - birthAsDate.getFullYear();
	const month = untilAsDate.getMonth() - birthAsDate.getMonth();

	if (month < 0 || (month === 0 && untilAsDate.getDate() < birthAsDate.getDate())) {
		age--;
	}

	return age;
}

/**
 * Format a Date from yyyy-mm-dd to dd-mm-yyyy
 * @param date
 */
export function formatDate(date: string) {
	const [year, month, day] = date.split("-");
	return `${day}.${month}.${year}`;
}
