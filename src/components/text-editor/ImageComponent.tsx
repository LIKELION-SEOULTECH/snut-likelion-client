import type { NodeViewRendererProps } from "@tiptap/react";
import { NodeViewWrapper } from "@tiptap/react";
import { useEffect, useRef } from "react";

const MIN_WIDTH = 50; // px
const MAX_HEIGHT = 600; // px (원하는 값으로 조정)
// 뷰포트 기준으로 하고 싶으면: const MAX_HEIGHT = Math.round(window.innerHeight * 0.7);

export default function ImageComponent({ node, updateAttributes, editor }: NodeViewRendererProps) {
    const imgRef = useRef<HTMLImageElement>(null);
    const wrapRef = useRef<HTMLDivElement>(null);
    const start = useRef({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        ratio: 1,
        resizing: false
    });

    useEffect(() => {
        const img = imgRef.current;
        if (!img) return;
        const apply = () => {
            const naturalW = img.naturalWidth || 0;
            const naturalH = img.naturalHeight || 0;
            if (naturalW && naturalH) {
                start.current.ratio = naturalW / naturalH;

                if (!node.attrs.width) {
                    const lineWidth =
                        wrapRef.current?.parentElement?.clientWidth ??
                        editor.view.dom.clientWidth ??
                        naturalW;

                    let w = Math.min(naturalW, lineWidth);
                    let h = Math.round(w / start.current.ratio);

                    // 🔒 높이 상한
                    if (h > MAX_HEIGHT) {
                        h = MAX_HEIGHT;
                        w = Math.round(h * start.current.ratio);
                    }

                    // 줄 너비 상한 재확인
                    if (w > lineWidth) {
                        w = lineWidth;
                        h = Math.round(w / start.current.ratio);
                    }

                    updateAttributes({ width: w, height: h });
                }
            }
        };
        if (img.complete) apply();
        else img.addEventListener("load", apply);
        return () => img.removeEventListener("load", apply);
    }, [node.attrs.width, node.attrs.height, updateAttributes, editor.view.dom.clientWidth]);

    const onPointerDown = (e: React.PointerEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const img = imgRef.current;
        if (!img) return;

        start.current.resizing = true;
        start.current.x = e.clientX;
        start.current.y = e.clientY;
        start.current.width = img.clientWidth;
        start.current.height = img.clientHeight;

        e.currentTarget.setPointerCapture?.(e.pointerId);

        const onMove = (ev: PointerEvent) => {
            if (!start.current.resizing) return;

            const dx = ev.clientX - start.current.x;
            const lineWidth =
                wrapRef.current?.parentElement?.clientWidth ?? editor.view.dom.clientWidth ?? 9999;

            // 1) 너비 계산(줄 너비/최소 폭 제한)
            let newW = Math.max(MIN_WIDTH, Math.min(start.current.width + dx, lineWidth));
            // 2) 비율로 높이 계산
            let newH = Math.round(newW / (start.current.ratio || 1));
            // 3) 높이 상한 적용 → 너비 재계산
            if (newH > MAX_HEIGHT) {
                newH = MAX_HEIGHT;
                newW = Math.round(newH * (start.current.ratio || 1));
            }
            // 4) 줄 너비 상한 재적용(다시 넘어갔을 수 있음)
            if (newW > lineWidth) {
                newW = lineWidth;
                newH = Math.round(newW / (start.current.ratio || 1));
            }

            updateAttributes({ width: newW, height: newH });
        };

        const onUp = () => {
            start.current.resizing = false;
            document.removeEventListener("pointermove", onMove);
            document.removeEventListener("pointerup", onUp);
        };

        document.addEventListener("pointermove", onMove);
        document.addEventListener("pointerup", onUp);
    };

    const { src, alt, width, height, isThumbnail } = node.attrs;

    const toggleThumbnail = () => {
        updateAttributes({ isThumbnail: !isThumbnail });
    };

    return (
        <NodeViewWrapper
            ref={wrapRef}
            className="relative block w-full select-none"
            style={{ maxWidth: "70%" }} // 필요시 조정
        >
            <div className="inline-block relative" style={{ maxWidth: "100%" }}>
                <img
                    ref={imgRef}
                    src={src}
                    alt={alt ?? ""}
                    draggable={false}
                    style={{
                        width: width ? `${width}px` : "100%",
                        height: height ? `${height}px` : "auto",
                        display: "block",
                        maxWidth: "100%",
                        maxHeight: `${MAX_HEIGHT}px`, // 🔒 UI 레벨 가드
                        userSelect: "none",
                        pointerEvents: "auto"
                    }}
                    data-custom-image="true"
                    data-width={width ?? undefined}
                    data-height={height ?? undefined}
                    data-thumbnail={isThumbnail ? "true" : "false"}
                    className={isThumbnail ? "outline-2 outline-orange-400" : ""}
                />

                {/* 리사이즈 핸들(우하단) */}
                <div
                    onPointerDown={onPointerDown}
                    title="드래그로 크기 조절"
                    className="absolute bottom-1 right-1 w-3 h-3 bg-white border border-gray-400 rounded-sm cursor-se-resize"
                    style={{ boxShadow: "0 0 0 1px rgba(0,0,0,.1)" }}
                />

                {/* 썸네일 토글 버튼(좌상단) */}
                <button
                    type="button"
                    onClick={toggleThumbnail}
                    className={`absolute -top-2 -left-2 text-[11px] leading-none px-2 py-1 rounded-sm ${
                        isThumbnail
                            ? "bg-orange-500 text-white"
                            : "bg-white text-gray-700 border border-gray-300"
                    }`}
                    style={{ boxShadow: "0 0 0 1px rgba(0,0,0,.08)" }}
                >
                    썸네일
                </button>
            </div>
        </NodeViewWrapper>
    );
}
