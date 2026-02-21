const modules = import.meta.glob("../assets/member/profile/*.{png,jpg,jpeg,webp}", {
    eager: true,
    import: "default"
}) as Record<string, string>;

export const memberImageMap: Record<string, string> = Object.fromEntries(
    Object.entries(modules).map(([path, src]) => {
        const file = path.split("/").pop()!;
        const id = file.split(".")[0];
        return [id, src];
    })
);
