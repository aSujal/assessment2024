import { useCallback, useEffect, useState } from "react";

const useGeldeinlagen = () => {
    const [geldeinlagen, setGeldeinlagen] = useState<Geldinlage[]>(() => {
        try {
            const saved = localStorage.getItem("geldeinlagen");
            if (!saved) return [];

            const parsed = JSON.parse(saved);
            return Array.isArray(parsed) ? parsed : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem("geldeinlagen", JSON.stringify(geldeinlagen));
    }, [geldeinlagen]);

    const getByProjektId = useCallback((projektId: string): Geldinlage[] => {
        return geldeinlagen.filter((g) => g.projektId === projektId)
    }, [geldeinlagen]);

    const save = useCallback(async (deposit: Geldinlage): Promise<void> => {
        await new Promise((resolve) => setTimeout(resolve, 300));
        setGeldeinlagen((prev) => [...prev, deposit]);
    }, []);

    const update = useCallback(async (id: string, updatedData: Partial<Geldinlage>): Promise<void> => {
        await new Promise((resolve) => setTimeout(resolve, 300));
        setGeldeinlagen((prev) =>
            prev.map((g) => (g.id === id ? { ...g, ...updatedData } : g))
        );
    }, []);

    return { geldeinlagen, getByProjektId, save, update };
};

export default useGeldeinlagen;
