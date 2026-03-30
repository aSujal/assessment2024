import { useEffect, useState } from "react";

const useKategorien = () => {
    const [data, setData] = useState<Kategorie[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const controller = new AbortController();
        async function fetchData() {
            try {
                setLoading(true);
                const kategorienRes = await fetch("/kategorien.json", { signal: controller.signal });

                if (!kategorienRes.ok) throw new Error("Fehler beim Server Abruf");

                const kategorienData: Kategorie[] = await kategorienRes.json();
                setData(kategorienData ?? []);
            } catch (error) {
                setError(error instanceof Error ? error.message : "Unbekannter Fehler");
            } finally {
                setLoading(false)
            }
        }
        fetchData();
        return () => controller.abort();
    }, [])

    return { data, loading, error }
};

export default useKategorien;