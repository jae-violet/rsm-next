import { format as formatDateFn } from "date-fns";

export function formatDate(date: Date | string, options?: { fullMonth: boolean }): string {
	const monthFmt = options?.fullMonth ? "MMMM" : "MMM";
	return formatDateFn(new Date(date), `${monthFmt} dd, yyyy`);
}
