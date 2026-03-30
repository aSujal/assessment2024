import { parseCurrency, parseDate } from "./formatters";

export function validateGeldinlage(data: GeldinlageFormData): ValidationResult {
    const invalidFields: string[] = [];
    if (!data.bezeichnung.trim()) {
        invalidFields.push("Bezeichnung");
    }
    if (!data.kategorieId || data.kategorieId === "null") {
        invalidFields.push("Kategorie");
    }
    if (!data.datum.trim() || !parseDate(data.datum)) {
        invalidFields.push("Datum");
    }
    if (!data.geldgeber.trim()) {
        invalidFields.push("Geldgeber");
    }
    const betrag = parseCurrency(data.betrag);
    if (!data.betrag.trim() || isNaN(betrag) || betrag <= 0) {
        invalidFields.push("Betrag");
    }

    return {
        valid: invalidFields.length === 0,
        invalidFields,
    };
}
