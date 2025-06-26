export interface ManagerData {
    id: number;
    name: string;
    email: string;
    department: string;
    part: string;
    applyDate: string;
    result: "합격" | "불합격";
}

export interface UserData {
    id: number;
    name: string;
    email: string;
    part: string;
    applyDate: string;
    result: "합격" | "불합격";
}
