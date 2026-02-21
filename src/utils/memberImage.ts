const modules = import.meta.glob("/src/assets/member/profile/*.png", {
    eager: true,
    import: "default"
}) as Record<string, string>;

export const memberImageMap: Record<string, string> = Object.fromEntries(
    Object.entries(modules).map(([path, src]) => {
        const file = path.split("/").pop()!;
        const id = file.replace(".png", "");
        return [id, src];
    })
);
