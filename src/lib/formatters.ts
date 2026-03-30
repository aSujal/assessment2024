export function formatCurrency(value: number): string {
    if (isNaN(value)) return "";
    return value.toLocaleString("de-DE", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}

export function parseCurrency(value: string): number {
    const cleaned = value.split('.').join('').replace(',', '.');
    return Number(cleaned);
}

export function formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
}

export function parseDate(value: string): Date | null {
    const split = value.split(".");
    if (split.length !== 3) return null;
    if (split[2].length !== 4) return null; //check year length

    const day = parseInt(split[0]);
    const month = parseInt(split[1]);
    const year = parseInt(split[2]);

    const date = new Date(year, month - 1, day);

    const isValid =
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day;

    return isValid ? date : null;
}

export function getTodayString(): string {
    return formatDate(new Date());
}
