import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { MessageSquare } from "lucide-react";
import { formatCurrency } from "@/lib/formatters";

interface GeldeinlagenTableProps {
    geldeinlagen: Geldinlage[];
    kategorien: Kategorie[];
    onEdit: (geldinlage: Geldinlage) => void;
}

function GeldeinlagenTable({
    geldeinlagen,
    kategorien,
    onEdit,
}: GeldeinlagenTableProps) {
    const getKategorieName = (kategorieId: string): string => {
        // if (kategorieId === "leer") return "Leer-Eintrag";
        return kategorien.find((k) => k.id === kategorieId)?.name ?? "-";
    };

    const hasNotes = (notizen: string): boolean => {
        return notizen.trim().length > 0;
    };

    if (geldeinlagen.length === 0) {
        return (
            <div className="text-sm text-muted-foreground py-8 text-center">
                Keine Geldeinlagen vorhanden. Klicken Sie auf &quot;Neue Geldeinlage
                erfassen&quot;, um eine neue Einlage hinzuzufügen.
            </div>
        );
    }

    return (
        <TooltipProvider>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[50px]">Zeilennummer</TableHead>
                        <TableHead className="w-[110px]">Datum</TableHead>
                        <TableHead>Bezeichnung</TableHead>
                        <TableHead>Kategorie</TableHead>
                        <TableHead>Betrag</TableHead>
                        <TableHead>Geldgeber</TableHead>
                        <TableHead className="w-[60px] text-center">
                            Notizen
                        </TableHead>
                        <TableHead className="w-[80px]">Öffnen</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {geldeinlagen.map((einlage, index) => (
                        <TableRow key={einlage.id}>
                            <TableCell className="font-medium">
                                {index + 1}
                            </TableCell>
                            <TableCell>{einlage.datum}</TableCell>
                            <TableCell>{einlage.bezeichnung}</TableCell>
                            <TableCell>
                                {getKategorieName(einlage.kategorieId)}
                            </TableCell>
                            <TableCell>
                                {formatCurrency(einlage.betrag)}
                            </TableCell>
                            <TableCell>{einlage.geldgeber}</TableCell>
                            <TableCell className="text-center">
                                {hasNotes(einlage.notizen) && (
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <span className="inline-flex cursor-default">
                                                <MessageSquare className="size-4 text-muted-foreground" />
                                            </span>
                                        </TooltipTrigger>
                                        <TooltipContent
                                            side="top"
                                            className="max-w-[300px]"
                                        >
                                            <p className="text-sm whitespace-pre-wrap">
                                                {einlage.notizen}
                                            </p>
                                        </TooltipContent>
                                    </Tooltip>
                                )}
                            </TableCell>
                            <TableCell>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => onEdit(einlage)}
                                >
                                    Öffnen
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TooltipProvider>
    );
}

export default GeldeinlagenTable;
