interface FormBoxProps {
    children: React.ReactNode;
}

export const FormBox = ({ children }: FormBoxProps) => {
    return (
        <div
            style={{
                border: "1px solid #3A3A3A",
                background: `#232323`,
                borderRadius: "12px",
                color: "#FFF",
                fontSize: "16px"
            }}
            className="sm:min-w-150 p-5 sm:p-10 min-h-20"
        >
            {children}
        </div>
    );
};
