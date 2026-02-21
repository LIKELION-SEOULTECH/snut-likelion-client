const modules = import.meta.glob("/src/assets/member/profile/*.{png,jpg,jpeg,webp}", {
    eager: true,
    import: "default"
}) as Record<string, string>;

console.log("📦 glob raw modules:", modules);
console.log("📦 glob module count:", Object.keys(modules).length);

export const memberImageMap: Record<string, string> = Object.fromEntries(
    Object.entries(modules).map(([path, src]) => {
        const file = path.split("/").pop()!;
        const id = file.split(".")[0];
        return [id, src];
    })
);

console.log("🗺️ memberImageMap keys:", Object.keys(memberImageMap));
