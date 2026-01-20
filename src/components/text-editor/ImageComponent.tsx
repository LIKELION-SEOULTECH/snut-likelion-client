import type { NodeViewRendererProps } from "@tiptap/react";
import { NodeViewWrapper } from "@tiptap/react";
import { useEffect, useRef } from "react";

const MIN_WIDTH = 50;
const MAX_HEIGHT = 500;

export default function ImageComponent({
    node,
    updateAttributes,
    editor,
    getPos
}: NodeViewRendererProps & { getPos: () => number }) {
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
                if (!node.attrs.width) {
                    const lineWidth =
                        wrapRef.current?.parentElement?.clientWidth ??
                        editor.view.dom.clientWidth ??
                        naturalW;

                    let w = Math.min(naturalW, lineWidth);
                    let h = Math.round(w / start.current.ratio);

                    // 높이 상한
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

    const clampSize = (w: number, h: number, lineWidth: number) => {
        return {
            w: Math.max(MIN_WIDTH, Math.min(w, lineWidth)),
            h: Math.min(h, MAX_HEIGHT)
        };
    };

    const clampWithRatio = (w: number, ratio: number, lineWidth: number) => {
        let h = Math.round(w / ratio);

        if (h > MAX_HEIGHT) {
            h = MAX_HEIGHT;
            w = Math.round(h * ratio);
        }

        if (w > lineWidth) {
            w = lineWidth;
            h = Math.round(w / ratio);
        }

        return { w, h };
    };

    const onPointerBoth = (e: React.PointerEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const img = imgRef.current;
        if (!img) return;

        start.current = {
            ...start.current,
            resizing: true,
            x: e.clientX,
            width: img.clientWidth,
            ratio: img.clientWidth / img.clientHeight
        };

        const onMove = (ev: PointerEvent) => {
            if (!start.current.resizing) return;

            const dx = ev.clientX - start.current.x;
            const lineWidth =
                wrapRef.current?.parentElement?.clientWidth ?? editor.view.dom.clientWidth ?? 9999;

            const { w, h } = clampWithRatio(
                start.current.width + dx,
                start.current.ratio,
                lineWidth
            );

            updateAttributes({ width: w, height: h });
        };

        const onUp = () => {
            start.current.resizing = false;
            document.removeEventListener("pointermove", onMove);
            document.removeEventListener("pointerup", onUp);
        };

        document.addEventListener("pointermove", onMove);
        document.addEventListener("pointerup", onUp);
    };

    const onPointerDown = (e: React.PointerEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const img = imgRef.current;
        if (!img) return;

        start.current = {
            ...start.current,
            resizing: true,
            y: e.clientY,
            width: img.clientWidth,
            height: img.clientHeight
        };

        const onMove = (ev: PointerEvent) => {
            if (!start.current.resizing) return;

            const dy = ev.clientY - start.current.y;

            const { h } = clampSize(start.current.width, start.current.height + dy, Infinity);

            updateAttributes({
                width: start.current.width,
                height: h
            });
        };

        const onUp = () => {
            start.current.resizing = false;
            document.removeEventListener("pointermove", onMove);
            document.removeEventListener("pointerup", onUp);
        };

        document.addEventListener("pointermove", onMove);
        document.addEventListener("pointerup", onUp);
    };

    const onPointerRight = (e: React.PointerEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const img = imgRef.current;
        if (!img) return;

        start.current = {
            ...start.current,
            resizing: true,
            x: e.clientX,
            width: img.clientWidth,
            height: img.clientHeight
        };

        const onMove = (ev: PointerEvent) => {
            if (!start.current.resizing) return;

            const dx = ev.clientX - start.current.x;
            const lineWidth =
                wrapRef.current?.parentElement?.clientWidth ?? editor.view.dom.clientWidth ?? 9999;

            const { w } = clampSize(start.current.width + dx, start.current.height, lineWidth);

            updateAttributes({
                width: w,
                height: start.current.height // height 고정
            });
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
        const { state, view } = editor;
        const tr = state.tr;
        const currentPos = getPos();

        const clickedIsThumbnail = node.attrs.isThumbnail === true;

        state.doc.descendants((n, pos) => {
            if (n.type.name !== "customImage") return;

            let nextIsThumbnail = false;

            if (pos === currentPos) {
                nextIsThumbnail = !clickedIsThumbnail;
            }

            if (n.attrs.isThumbnail !== nextIsThumbnail) {
                tr.setNodeMarkup(pos, undefined, {
                    ...n.attrs,
                    isThumbnail: nextIsThumbnail
                });
            }
        });

        if (tr.docChanged) {
            view.dispatch(tr);
        }
    };

    return (
        <NodeViewWrapper
            ref={wrapRef}
            className="relative block w-full select-none"
            style={{ maxWidth: "70%" }}
        >
            <div
                className="inline-block relative cursor-pointer hover:outline-orange-400 hover:outline-3"
                style={{ maxWidth: "100%" }}
                onClick={toggleThumbnail}
            >
                {isThumbnail && (
                    <div className="absolute top-1 left-1 z-10 rounded-sm bg-orange-500 px-2 py-0.5 text-xs font-semibold text-white">
                        썸네일
                    </div>
                )}
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
                        maxHeight: `${MAX_HEIGHT}px`,
                        userSelect: "none",
                        pointerEvents: "auto"
                    }}
                    data-custom-image="true"
                    data-width={width ?? undefined}
                    data-height={height ?? undefined}
                    data-thumbnail={isThumbnail ? "true" : "false"}
                    className={isThumbnail ? "outline-3 outline-orange-400" : ""}
                />

                {/* 리사이즈 핸들(우) */}
                <div
                    onPointerDown={onPointerRight}
                    className="absolute top-0 right-0 w-1 h-full rounded-sm cursor-ew-resize"
                />

                {/* 리사이즈 핸들(하) */}
                <div
                    onPointerDown={onPointerDown}
                    className="absolute bottom-0 left-0 w-full h-1 rounded-sm cursor-ns-resize"
                />

                {/* 리사이즈 핸들(우하단) */}
                <div
                    onPointerDown={onPointerBoth}
                    className="absolute bottom-0 right-0 w-2 h-2 rounded-sm cursor-nwse-resize"
                />
            </div>
        </NodeViewWrapper>
    );
}
