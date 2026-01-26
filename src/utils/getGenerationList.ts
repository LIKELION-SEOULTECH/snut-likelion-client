export const getGenerationListByYear = (startYear: number, startGeneration: number) => {
    const nowYear = new Date().getFullYear();
    const currentGen = startGeneration + (nowYear - startYear);

    const gens = Array.from({ length: currentGen - startGeneration + 1 }, (_, i) => currentGen - i);

    return gens.map((g) => `${g}`);
};
