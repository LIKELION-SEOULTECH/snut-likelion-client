import "@tiptap/react";

declare module "@tiptap/react" {
    interface NodeViewRendererProps {
        updateAttributes: (attrs: Record<string, unknown>) => void;
        deleteNode?: () => void;
    }
}
