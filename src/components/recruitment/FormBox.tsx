interface FormBoxProps {
    children: React.ReactNode;
}

export const FormBox = ({ children }: FormBoxProps) => {
    return (
        <div
            style={{
                border: "1px solid #3A3A3A",
                background: `  #232323`,
                borderRadius: "12px",
                padding: "40px",
                color: "#FFF",
                fontSize: "16px"
            }}
        >
            {children}
        </div>
    );
};
