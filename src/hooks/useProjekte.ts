import { useEffect, useState } from "react";

const useProjekte = () => {
    const [data, setData] = useState<Projekt[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const projekteRes = await fetch("/projekte.json");
                console.log(projekteRes)
                if (!projekteRes) throw new Error("Fehler beim Laden der Daten.");

                const projekteData: Projekt[] = await projekteRes.json();
                if (projekteData.length > 0) {
                    projekteData.sort((a, b) => a.name.localeCompare(b.name));
                }

                setData(projekteData ?? []);
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

export default useProjekte;