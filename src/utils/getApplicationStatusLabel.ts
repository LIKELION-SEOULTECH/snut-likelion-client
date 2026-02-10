export const getApplicationStatusLabel = (
    status?:
        | "SUBMITTED"
        | "PAPER_PASS"
        | "FINAL_PASS"
        | "FAILED"
        | "제출"
        | "서류 합격"
        | "최종 합격"
        | "불합격"
): string => {
    switch (status) {
        case "SUBMITTED":
        case "제출":
            return "제출";
        case "PAPER_PASS":
        case "서류 합격":
            return "서류 합격";
        case "FINAL_PASS":
        case "최종 합격":
            return "합격";
        case "FAILED":
        case "불합격":
            return "불합격";
        default:
            return "-";
    }
};
