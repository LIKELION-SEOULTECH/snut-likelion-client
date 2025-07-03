import { useEffect, useRef, useState } from "react";
import botImg from "@/assets/home/chatBotImg.png";

type ChatMessage = {
    id: number;
    role: "bot" | "user" | "loading";
    message: string | React.ReactNode;
    buttons?: string[];
    timestamp?: string;
};

const ChatBubble = ({ role, message, buttons }: ChatMessage) => {
    const bubbleRef = useRef<HTMLDivElement | null>(null);
    const [showLoading, setShowLoading] = useState(false);

    //채팅 - > 스크롤 내려가게
    useEffect(() => {
        if ((role === "bot" || role === "loading") && showLoading) {
            bubbleRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [showLoading, role]);

    //입력중..
    useEffect(() => {
        if (role === "loading") {
            const timer = setTimeout(() => setShowLoading(true), 300);
            return () => clearTimeout(timer);
        }
    }, [role]);

    if (role === "loading" && !showLoading) return null;

    if (role === "loading" && showLoading) {
        return (
            <div
                ref={bubbleRef}
                className="text-sm text-[#fff] w-[82px] px-4 py-2 rounded-[12px] bg-[#404040] rounded-bl-none ml-4"
            >
                입력 중...
            </div>
        );
    }

    return (
        <div
            ref={role === "bot" ? bubbleRef : undefined}
            className={`flex flex-col ${role === "user" ? "justify-end" : "justify-start"} w-full`}
        >
            {role === "bot" ? <img src={botImg} alt="bot" className="w-[33px] ml-4 mb-2" /> : null}
            <div
                className={`max-w-[75%] flex flex-col ${buttons ? " px-4 py-5" : ""} px-4 py-2 text-sm rounded-[12px] leading-[160%]  ${
                    role === "bot"
                        ? "bg-[#404040] text-white self-start ml-4 rounded-bl-none"
                        : "bg-[#F70] text-white self-end mr-4 rounded-br-none"
                }`}
            >
                {message}
                {buttons && (
                    <div className="flex flex-col gap-2 mt-4">
                        {buttons.map((btnText, index) => (
                            <button
                                key={index}
                                className="bg-white cursor-pointer text-black rounded-[10px] px-4 py-2 text-sm font-semibold"
                            >
                                {btnText}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export const ChatBotContainer = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: 1,
            role: "bot",
            message: (
                <span>
                    <strong>FAQ 자주 묻는 질문</strong> 먼저 확인해주세요!
                    <br />
                    질문의 답변이 이미 적혀있을지도 몰라요
                </span>
            ),
            buttons: ["지원 문의", "멋사 생활 문의", "채용 예정 문의"]
        }
    ]);

    //채팅입력
    const [input, setInput] = useState("");

    const handleSend = async (msg: string) => {
        if (!msg.trim()) return;

        const userMsg: ChatMessage = {
            id: Date.now(),
            role: "user",
            message: msg
        };
        const loadingMsg: ChatMessage = {
            id: Date.now() + 1,
            role: "loading",
            message: ""
        };

        setMessages((prev) => [...prev, userMsg, loadingMsg]);
        setInput("");

        setTimeout(async () => {
            try {
                const res = await fetch(" https://ai.maruhxn.store/chat", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ text: msg })
                });

                const data = await res.json();
                const { response } = data;

                const botMsg: ChatMessage = {
                    id: Date.now() + 2,
                    role: "bot",
                    message: (
                        <div>
                            <p className="mb-1">
                                {response || "죄송해요! 답변을 찾지 못했어요 😥"}
                            </p>
                        </div>
                    )
                };

                setMessages((prev) => [...prev.filter((m) => m.role !== "loading"), botMsg]);
            } catch (error) {
                const botMsg: ChatMessage = {
                    id: Date.now() + 2,
                    role: "bot",
                    message: "오류가 발생했어요. 다시 시도해주세요 🙏"
                };
                setMessages((prev) => [...prev.filter((m) => m.role !== "loading"), botMsg]);
                console.log(error);
            }
        }, 500);
    };

    return (
        <div>
            <div className="block w-[395px]  h-[626px] bg-[#fff] rounded-[19.585px] text-[#000] ">
                <h4 className="flex h-[56px] text-[18px] w-full justify-center items-center font-semibold text-[#2D2D2D]">
                    멋쟁이 사자처럼 서울과학기술대학교
                </h4>
                <div className="px-[20px] pb-[20px] h-[480px] overflow-scroll gap-4">
                    {messages.map((msg, idx) => (
                        <div key={idx} className="pt-4">
                            {/* 시간출력 */}
                            {msg.id === 1 && (
                                <div className="text-center text-[12px] pb-[68px]  font-semibold text-[#A7A7A7] mb-1">
                                    {new Date().toLocaleTimeString("ko-KR", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: true
                                    })}
                                </div>
                            )}
                            <ChatBubble {...msg} />
                        </div>
                    ))}
                </div>
                <div className="flex justify-center text-[#A7A7A7]">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.nativeEvent.isComposing) {
                                e.preventDefault();
                                handleSend(input);
                            }
                        }}
                        type="text"
                        placeholder="질문을 입력해주세요"
                        className="w-[355px] h-[43px] px-4 py-3 text-sm rounded-[8px] focus:outline-none mx-auto bg-[#ECECEC]"
                    />
                </div>
                <div className="flex py-[16px] justify-center items-center gap-[6px]">
                    <div className="bg-[#34AE50] w-2 h-2 rounded"></div>
                    <div className="text-[#666] text-sm">몇 분 내 답변 받으실 수 있어요</div>
                </div>
            </div>
        </div>
    );
};
