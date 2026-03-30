import { useState } from "react";
import { Button } from "@/components/ui/button";
import GeldinlageModal from "./GeldinlageModal";
import GeldeinlagenTable from "./GeldeinlagenTable";
import { parseCurrency } from "@/lib/formatters";
import { Plus } from "lucide-react";

interface FinanzierungTabProps {
    projektId: string;
    kategorien: Kategorie[];
    geldeinlagen: Geldinlage[];
    onSave: (deposit: Geldinlage) => Promise<void>;
    onUpdate: (id: string, data: Partial<Geldinlage>) => Promise<void>;
}

function FinanzierungTab({
    projektId,
    kategorien,
    geldeinlagen,
    onSave,
    onUpdate,
}: FinanzierungTabProps) {
    const [modalOpen, setModalOpen] = useState(false);
    const [editingDeposit, setEditingDeposit] = useState<Geldinlage | null>(null);
    const [saving, setSaving] = useState(false);

    const handleNewDeposit = () => {
        setEditingDeposit(null);
        setModalOpen(true);
    };

    const handleEdit = (deposit: Geldinlage) => {
        setEditingDeposit(deposit);
        setModalOpen(true);
    };

    const handleSave = async (formData: GeldinlageFormData) => {
        setSaving(true);
        try {
            const betrag = parseCurrency(formData.betrag);

            if (editingDeposit) {
                await onUpdate(editingDeposit.id, {
                    bezeichnung: formData.bezeichnung,
                    kategorieId: formData.kategorieId,
                    datum: formData.datum,
                    geldgeber: formData.geldgeber,
                    betrag,
                    notizen: formData.notizen,
                });
            } else {
                const newDeposit: Geldinlage = {
                    id: crypto.randomUUID(),
                    projektId,
                    bezeichnung: formData.bezeichnung,
                    kategorieId: formData.kategorieId,
                    datum: formData.datum,
                    geldgeber: formData.geldgeber,
                    betrag,
                    notizen: formData.notizen,
                };
                await onSave(newDeposit);
            }

            setModalOpen(false);
            setEditingDeposit(null);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="py-4 flex flex-col gap-4">
            <div>
                <Button className="cursor-pointer" onClick={handleNewDeposit} disabled={saving} id="new-deposit-button">
                    <Plus className="size-4" />
                    <span>Neue Geldeinlage erfassen</span>
                </Button>
            </div>

            <div>
                <h2 className="text-base font-semibold mb-3">Erfasste Geldeinlagen</h2>
                <GeldeinlagenTable
                    geldeinlagen={geldeinlagen}
                    kategorien={kategorien}
                    onEdit={handleEdit}
                />
            </div>

            <GeldinlageModal
                key={editingDeposit?.id ?? "new"}
                open={modalOpen}
                onOpenChange={(open) => {
                    if (!open) {
                        setEditingDeposit(null);
                    }
                    setModalOpen(open);
                }}
                onSave={handleSave}
                kategorien={kategorien}
                editData={editingDeposit}
            />
        </div>
    );
}

export default FinanzierungTab;
