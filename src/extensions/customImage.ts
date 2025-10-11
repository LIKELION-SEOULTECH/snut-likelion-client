// extensions/customImage.ts
import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import ImageComponent from "@/components/text-editor/ImageComponent";

export const CustomImage = Node.create({
    name: "customImage",
    group: "block",
    draggable: true,
    selectable: true,

    addAttributes() {
        return {
            src: { default: null },
            alt: { default: null },
            isThumbnail: { default: false },

            // ⬇️ 리사이즈용 속성
            width: {
                default: null as number | null,
                parseHTML: (element) => {
                    const fromData = element.getAttribute("data-width");
                    if (fromData) return Number(fromData);
                    const style = element.getAttribute("style") || "";
                    const m = style.match(/width:\s*(\d+)px/);
                    return m ? Number(m[1]) : null;
                },
                renderHTML: (attrs) =>
                    attrs.width
                        ? { "data-width": String(attrs.width), style: `width:${attrs.width}px;` }
                        : {}
            },
            height: {
                default: null as number | null,
                parseHTML: (element) => {
                    const fromData = element.getAttribute("data-height");
                    if (fromData) return Number(fromData);
                    const style = element.getAttribute("style") || "";
                    const m = style.match(/height:\s*(\d+)px/);
                    return m ? Number(m[1]) : null;
                },
                renderHTML: (attrs) =>
                    attrs.height
                        ? {
                              "data-height": String(attrs.height),
                              style: `${attrs.style ?? ""};height:${attrs.height}px;`
                          }
                        : {}
            }
        };
    },

    // 기본 Image와 충돌 피하려고 커스텀 데이터 속성으로 파싱
    parseHTML() {
        return [{ tag: 'img[data-custom-image="true"]' }];
    },

    renderHTML({ HTMLAttributes }) {
        const { isThumbnail, ...rest } = HTMLAttributes;
        return [
            "img",
            mergeAttributes(rest, {
                // 파서가 이 노드를 캐치하게 하는 플래그
                "data-custom-image": "true",
                "data-thumbnail": isThumbnail ? "true" : "false",
                // 안전 가드
                style: `${rest.style ?? ""};max-width:100%;height:auto;display:block;`
            })
        ];
    },

    addNodeView() {
        return ReactNodeViewRenderer(ImageComponent);
    }
});
