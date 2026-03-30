import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Field,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { formatCurrency, getTodayString, parseCurrency } from "@/lib/formatters";
import { validateGeldinlage } from "@/lib/validation";

interface GeldinlageModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: (data: GeldinlageFormData) => void;
    kategorien: Kategorie[];
    editData?: Geldinlage | null;
}

function getInitialFormData(editData?: Geldinlage | null): GeldinlageFormData {
    if (editData) {
        return {
            bezeichnung: editData.bezeichnung,
            kategorieId: editData.kategorieId,
            datum: editData.datum,
            geldgeber: editData.geldgeber,
            betrag: editData.betrag.toLocaleString("de-DE", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }),
            notizen: editData.notizen,
        };
    }
    return {
        bezeichnung: "",
        kategorieId: "leer",
        datum: getTodayString(),
        geldgeber: "",
        betrag: "",
        notizen: "",
    };
}

function GeldinlageModal({
    open,
    onOpenChange,
    onSave,
    kategorien,
    editData,
}: GeldinlageModalProps) {
    const [formData, setFormData] = useState<GeldinlageFormData>(getInitialFormData(editData));
    const [error, setError] = useState<string | null>(null);
    const [invalidFields, setInvalidFields] = useState<string[]>([]);
    const [showCancelAlert, setShowCancelAlert] = useState(false);

    const resetForm = () => {
        setFormData(getInitialFormData(editData));
        setError(null);
        setInvalidFields([]);
        setShowCancelAlert(false);
    };

    const updateField = (field: keyof GeldinlageFormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleBetragBlur = () => {
        const num = parseCurrency(formData.betrag);
        if (!isNaN(num) && num > 0) {
            updateField("betrag", formatCurrency(num));
        }
    };

    const handleSave = () => {
        const result = validateGeldinlage(formData);
        console.log(result);
        if (!result.valid) {
            setError(
                `Folgende Pflichtfelder sind noch nicht gültig befüllt: ${result.invalidFields.join(", ")}`
            );
            setInvalidFields(result.invalidFields);
            return;
        }
        setError(null);
        setInvalidFields([]);
        onSave(formData);
    };

    const handleCancel = () => {
        const initialData = getInitialFormData(editData);
        console.log("initialData", initialData);
        console.log("formData", formData);
        const hasChanged =
            formData.bezeichnung !== initialData.bezeichnung ||
            formData.kategorieId !== initialData.kategorieId ||
            formData.datum !== initialData.datum ||
            formData.geldgeber !== initialData.geldgeber ||
            formData.betrag !== initialData.betrag ||
            formData.notizen !== initialData.notizen;

        if (hasChanged) {
            setShowCancelAlert(true);
            return;
        }
        onOpenChange(false);
        resetForm();
    };

    const isEditMode = !!editData;

    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {isEditMode ? "Finanzierung bearbeiten" : "Neue Geldeinlage erfassen"}
                        </DialogTitle>
                    </DialogHeader>

                    <FieldGroup>
                        <Field data-invalid={invalidFields.includes("Bezeichnung")}>
                            <FieldLabel htmlFor="bezeichnung">Bezeichnung *</FieldLabel>
                            <Input
                                id="bezeichnung"
                                value={formData.bezeichnung}
                                onChange={(e) =>
                                    updateField("bezeichnung", e.target.value)
                                }
                                required
                                aria-invalid={invalidFields.includes("Bezeichnung")}
                                placeholder="Name der Geldeinlage"
                            />
                        </Field>

                        <Field data-invalid={invalidFields.includes("Kategorie")}>
                            <FieldLabel htmlFor="kategorie">Kategorie *</FieldLabel>
                            <Select
                                value={formData.kategorieId}
                                onValueChange={(val) =>
                                    updateField("kategorieId", val)
                                }
                                required
                                aria-invalid={invalidFields.includes("Kategorie")}
                            >
                                <SelectTrigger id="kategorie">
                                    <SelectValue placeholder="Kategorie auswählen..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="leer">Leer-Eintrag</SelectItem>
                                    {kategorien.map((kat) => (
                                        <SelectItem key={kat.id} value={kat.id}>
                                            {kat.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </Field>

                        <Field data-invalid={invalidFields.includes("Datum")}>
                            <FieldLabel htmlFor="datum">Datum *</FieldLabel>
                            <Input
                                id="datum"
                                value={formData.datum}
                                onChange={(e) => updateField("datum", e.target.value)}
                                placeholder="TT.MM.JJJJ"
                                required
                                aria-invalid={invalidFields.includes("Datum")}
                            />
                        </Field>

                        <Field data-invalid={invalidFields.includes("Geldgeber")}>
                            <FieldLabel htmlFor="geldgeber">Geldgeber *</FieldLabel>
                            <Input
                                id="geldgeber"
                                value={formData.geldgeber}
                                onChange={(e) =>
                                    updateField("geldgeber", e.target.value)
                                }
                                placeholder="Name des Geldgebers"
                                required
                                aria-invalid={invalidFields.includes("Geldgeber")}
                            />
                        </Field>

                        <Field data-invalid={invalidFields.includes("Betrag")}>
                            <FieldLabel htmlFor="betrag">Betrag *</FieldLabel>
                            <Input
                                id="betrag"
                                type="text"
                                value={formData.betrag}
                                onChange={(e) =>
                                    updateField("betrag", e.target.value)
                                }
                                onBlur={handleBetragBlur}
                                placeholder="z.B. 1.234,56"
                                required
                                aria-invalid={invalidFields.includes("Betrag")}
                            />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="notizen">Notizen</FieldLabel>
                            <Textarea
                                id="notizen"
                                value={formData.notizen}
                                onChange={(e) =>
                                    updateField("notizen", e.target.value)
                                }
                                placeholder="Optionale Notizen..."
                                rows={3}
                            />
                        </Field>

                        {error && (
                            <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
                                {error}
                            </div>
                        )}
                    </FieldGroup>

                    <DialogFooter>
                        <Button variant="outline" onClick={handleCancel} type="button">Abbrechen</Button>
                        <Button onClick={handleSave} type="button">Speichern</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <AlertDialog open={showCancelAlert} onOpenChange={setShowCancelAlert}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Möchten Sie wirklich abbrechen?</AlertDialogTitle>
                        <AlertDialogDescription>Alle eingegebenen Daten gehen verloren.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="cursor-pointer">Nein</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => {
                                resetForm();
                                setShowCancelAlert(false);
                                onOpenChange(false);
                            }}
                            className="bg-red-500 hover:bg-red-600 cursor-pointer"
                        >
                            Ja, Abbrechen
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>

    );
}

export default GeldinlageModal;
