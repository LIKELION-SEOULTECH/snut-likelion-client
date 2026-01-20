import NextPage from "@/assets/common/next-page.svg?react";
import LastPage from "@/assets/common/last-page.svg?react";
interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="flex items-center gap-14 justify-center mt-10">
            <div className="flex flex-row gap-10">
                {/* Go to first page */}
                <button
                    disabled={currentPage === 1}
                    onClick={() => onPageChange(1)}
                    className="text-gray-400 hover:text-black disabled:opacity-30"
                >
                    <LastPage className="scale-x-[-1]" />
                </button>

                {/* Previous page */}
                <button
                    disabled={currentPage === 1}
                    onClick={() => onPageChange(currentPage - 1)}
                    className="text-gray-400 hover:text-black disabled:opacity-30"
                >
                    <NextPage className="scale-x-[-1]" />
                </button>
            </div>
            {/* Page Numbers */}
            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`w-6 h-6 rounded-full flex items-center justify-center cursor-pointer 
              ${page === currentPage ? "bg-orange-500 text-white semibold-12" : "text-[#A7A7A7] regular-12"}`}
                >
                    {page}
                </button>
            ))}
            <div className="flex flex-row gap-10">
                {/* Next page */}
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => onPageChange(currentPage + 1)}
                    className="text-gray-400 hover:text-black disabled:opacity-30 cursor-pointer"
                >
                    <NextPage />
                </button>

                {/* Go to last page */}
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => onPageChange(totalPages)}
                    className="text-gray-400 hover:text-black disabled:opacity-30 cursor-pointer"
                >
                    <LastPage />
                </button>
            </div>
        </div>
    );
};
