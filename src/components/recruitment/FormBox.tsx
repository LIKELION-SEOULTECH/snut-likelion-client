interface FormBoxProps {
    children: React.ReactNode;
}

export const FormBox = ({ children }: FormBoxProps) => {
    return (
        <div
            style={{
                border: "1px solid #3A3A3A",
                background: `linear-gradient(0deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.2) 100%), 
        linear-gradient(0deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.2) 100%),  #232323`,
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
