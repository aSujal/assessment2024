import { useEffect, useState } from "react";

const useKategorien = () => {
    const [data, setData] = useState<Kategorie[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const kategorienRes = await fetch("/kategorien.json");

                if (!kategorienRes) throw new Error("Fehler beim Laden der Daten.");

                const kategorienData: Kategorie[] = await kategorienRes.json();
                setData(kategorienData ?? []);
            } catch (error) {
                setError(error instanceof Error ? error.message : "Unbekannter Fehler");
            } finally {
                setLoading(false)
            }
        }
        fetchData();
    }, [])

    return { data, loading, error }
};

export default useKategorien;