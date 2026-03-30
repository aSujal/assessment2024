import { useEffect, useState } from "react";

const useProjekte = () => {
    const [data, setData] = useState<Projekt[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const controller = new AbortController();
        async function fetchData() {
            try {
                setLoading(true);
                const projekteRes = await fetch("/projekte.json", { signal: controller.signal });
                console.log(projekteRes)
                if (!projekteRes.ok) throw new Error("Fehler beim Server Abruf");

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
        return () => controller.abort();
    }, [])

    return { data, loading, error }
};

export default useProjekte;