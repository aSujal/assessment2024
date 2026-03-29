import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface ProjectSelectionBarProps {
    projekte: Projekt[];
    selectedProjektId: string;
    onSelect: (projektId: string) => void;
}

function ProjektSelectionBar({
    projekte,
    selectedProjektId,
    onSelect,
}: ProjectSelectionBarProps) {
    const selectedProjekt = projekte.find((p) => p.id === selectedProjektId);

    return (
        <div className="bg-primary/10 px-6 py-4 rounded-md mx-6">
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                    <label className="text-sm font-medium whitespace-nowrap">Projekt:</label>
                    <Select value={selectedProjektId} onValueChange={onSelect}>
                        <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Projekt auswählen..." />
                        </SelectTrigger>
                        <SelectContent>
                            {projekte.map((projekt) => (
                                <SelectItem key={projekt.id} value={projekt.id}>
                                    {projekt.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                {selectedProjekt && (
                    <div className="flex flex-col gap-2 text-sm">
                        <div className="flex gap-2">
                            <span>Projektleiter:</span>
                            <span className="text-muted-foreground">{selectedProjekt.projektleiter}</span>
                        </div>
                        <div className="flex gap-2">
                            <span>Beschreibung:</span>
                            <span className="text-muted-foreground">{selectedProjekt.beschreibung}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProjektSelectionBar;
