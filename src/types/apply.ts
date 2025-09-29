export type Question = {
    id?: number;
    text: string;
    questionTarget: string;
    questionType: string;
    part?: string;
    departmentType?: string;
    order: number;
    options?: string[];
};
