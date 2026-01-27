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

export type QNAItem = {
    questionId?: number;
    questionText: string;
    questionTarget: string;
    order: number;
    answer: string;
};
