// import { useLocation, useNavigate } from "react-router-dom";
// import PageLayout from "@/layouts/PageLayout";
// import { RecruitFormStep2 } from "@/components/recruitment/RecruitFormStep2";
// import type { FormDataType } from "@/pages/main/RecruitForm";

// export const ApplicationPreviewPage = () => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const application = location.state?.application as FormDataType | undefined;

//     if (!application) {
//         return (
//             <PageLayout>
//                 <div className="text-white p-20 text-center">
//                     미리보기 데이터를 불러올 수 없습니다.
//                 </div>
//             </PageLayout>
//         );
//     }

//     return (
//         <PageLayout>
//             <div className="w-full bg-[#1B1B1B] min-h-screen">
//                 {/* 헤더 */}
//                 <div className="w-full h-24 bg-black flex justify-between items-center px-[110px]">
//                     <button
//                         onClick={() => navigate(-1)}
//                         className="bg-[#2D2D2D] text-[#A7A7A7] px-4 py-2 rounded-full"
//                     >
//                         ← 돌아가기
//                     </button>
//                 </div>

//                 {/* 본문 */}
//                 <RecruitFormStep2
//                     formData={application}
//                     setFormData={() => {}}
//                     questions={application.questions ?? []}
//                     loading={false}
//                     isManeger={!!application.departmentType}
//                 />
//             </div>
//         </PageLayout>
//     );
// };
