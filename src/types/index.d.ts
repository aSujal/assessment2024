interface Projekt {
    id: string;
    name: string;
    projektleiter: string;
    beschreibung: string;
    modifiedAt: string;
    modifiedBy: string;
}

interface Kategorie {
    id: string;
    name: string;
}

interface Geldinlage {
    id: string;
    projektId: Projekt["id"];
    bezeichnung: string;
    kategorieId: Kategorie["id"];
    datum: string;
    geldgeber: string;
    betrag: number;
    notizen: string;
}

interface GeldinlageFormData {
    bezeichnung: string;
    kategorieId: string;
    datum: string;
    geldgeber: string;
    betrag: string;
    notizen: string;
}

interface ValidationResult {
    valid: boolean;
    invalidFields: string[];
}