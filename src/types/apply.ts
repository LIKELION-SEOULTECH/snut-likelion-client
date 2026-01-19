export type Question = {
    clientId?: string;
    id?: number;
    text: string;
    questionTarget: string;
    questionType: string;
    part?: string;
    departmentType?: string;
    order: number;
    buttonList?: string[];
};
