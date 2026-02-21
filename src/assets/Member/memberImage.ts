const modules = import.meta.glob("/src/assets/member/profile/*.png", {
    eager: true,
    import: "default"
}) as Record<string, string>;

export const memberImageMap: Record<string, string> = Object.fromEntries(
    Object.entries(modules).map(([path, src]) => {
        const file = path.split("/").pop()!; // "6.png"
        const id = file.replace(".png", "");
        return [id, src];
    })
);

// 디버깅용
console.log("profile image count:", Object.keys(memberImageMap).length);
