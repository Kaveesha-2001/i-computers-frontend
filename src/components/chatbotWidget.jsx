import { useState, useRef, useEffect } from "react";
import { BsChatDotsFill } from "react-icons/bs";
import { IoClose, IoSend } from "react-icons/io5";
import api from "../utils/api";

export default function ChatbotWidget() {
	const [isOpen, setIsOpen] = useState(false);
	const [input, setInput] = useState("");
	const [messages, setMessages] = useState([
		{ role: "model", text: "Hi! I'm the I Computers assistant. Ask me about our products, orders, or shipping." },
	]);
	const [isSending, setIsSending] = useState(false);
	const bottomRef = useRef(null);

	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages, isOpen]);

	async function handleSend() {
		if (input.trim() === "" || isSending) return;

		const userText = input;
		const newMessages = [...messages, { role: "user", text: userText }];
		setMessages(newMessages);
		setInput("");
		setIsSending(true);

		try {
			const history = newMessages.slice(1).map((m) => ({ role: m.role, text: m.text })); // skip the greeting
			const response = await api.post("/chatbot", {
				message: userText,
				history: history.slice(0, -1), // everything except the message we're sending now
			});

			setMessages((prev) => [...prev, { role: "model", text: response.data.reply }]);
		} catch (error) {
			console.log(error);
			setMessages((prev) => [
				...prev,
				{ role: "model", text: "Sorry, I'm having trouble responding right now. Please try again shortly." },
			]);
		} finally {
			setIsSending(false);
		}
	}

	function handleKeyDown(e) {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSend();
		}
	}

	return (
		<div className="fixed bottom-[90px] lg:bottom-6 right-6 z-50 flex flex-col items-end">
			{isOpen && (
				<div className="w-[320px] h-[420px] bg-white rounded-lg shadow-2xl flex flex-col mb-3 overflow-hidden">
					<div className="bg-accent text-white px-4 py-3 font-semibold flex justify-between items-center">
						<span>I Computers Assistant</span>
						<button onClick={() => setIsOpen(false)}>
							<IoClose className="text-xl" />
						</button>
					</div>

					<div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2">
						{messages.map((msg, index) => (
							<div
								key={index}
								className={`max-w-[85%] px-3 py-2 rounded-lg text-sm ${
									msg.role === "user"
										? "bg-accent text-white self-end rounded-br-none"
										: "bg-gray-100 text-secondary self-start rounded-bl-none"
								}`}
							>
								{msg.text}
							</div>
						))}
						{isSending && <div className="text-xs text-gray-400 self-start px-3">Typing...</div>}
						<div ref={bottomRef} />
					</div>

					<div className="flex items-center gap-2 p-2 border-t border-gray-200">
						<input
							value={input}
							onChange={(e) => setInput(e.target.value)}
							onKeyDown={handleKeyDown}
							type="text"
							placeholder="Type a message..."
							className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent text-sm"
						/>
						<button
							onClick={handleSend}
							className="w-[38px] h-[38px] shrink-0 flex justify-center items-center rounded-lg bg-accent text-white"
						>
							<IoSend />
						</button>
					</div>
				</div>
			)}

			<button
				onClick={() => setIsOpen(!isOpen)}
				className="w-[55px] h-[55px] flex justify-center items-center rounded-full bg-accent text-white text-2xl shadow-xl"
			>
				{isOpen ? <IoClose /> : <BsChatDotsFill />}
			</button>
		</div>
	);
}