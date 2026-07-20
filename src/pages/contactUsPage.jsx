import { useState } from "react";
import toast from "react-hot-toast";
import { CiLocationOn, CiMail, CiPhone, CiClock2 } from "react-icons/ci";

export default function ContactUsPage() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");

	function handleSendMessage() {
		if (name.trim() === "" || email.trim() === "" || message.trim() === "") {
			toast.error("Please fill in all fields");
			return;
		}

		toast.success("Message sent! We'll get back to you soon.");
		setName("");
		setEmail("");
		setMessage("");
	}

	return (
		<div className="w-full h-full flex flex-col items-center pt-16 pb-[150px]">
			<div className="w-full flex flex-col items-center gap-2 mb-10">
				<h1 className="text-3xl font-bold text-secondary">Contact Us</h1>
				<p className="text-gray-500 text-center px-4">We'd love to hear from you. Reach out with any questions.</p>
			</div>

			<div className="w-11/12 lg:w-3/4 flex flex-wrap lg:flex-nowrap gap-8 justify-center">
				<div className="flex flex-col gap-6 w-full lg:w-1/3">
					<div className="flex items-start gap-4 bg-white rounded-lg shadow p-5">
						<CiLocationOn className="text-accent text-3xl shrink-0" />
						<div>
							<h2 className="font-semibold text-secondary">Address</h2>
							<p className="text-gray-500 text-sm">No. 12, Main Street, Negombo, Sri Lanka</p>
						</div>
					</div>
					<div className="flex items-start gap-4 bg-white rounded-lg shadow p-5">
						<CiPhone className="text-accent text-3xl shrink-0" />
						<div>
							<h2 className="font-semibold text-secondary">Phone</h2>
							<p className="text-gray-500 text-sm">+94 72 590 3366</p>
						</div>
					</div>
					<div className="flex items-start gap-4 bg-white rounded-lg shadow p-5">
						<CiMail className="text-accent text-3xl shrink-0" />
						<div>
							<h2 className="font-semibold text-secondary">Email</h2>
							<p className="text-gray-500 text-sm">support@icomputers.lk</p>
						</div>
					</div>
					<div className="flex items-start gap-4 bg-white rounded-lg shadow p-5">
						<CiClock2 className="text-accent text-3xl shrink-0" />
						<div>
							<h2 className="font-semibold text-secondary">Working Hours</h2>
							<p className="text-gray-500 text-sm">Mon - Sat, 9:00 AM - 6:00 PM</p>
						</div>
					</div>
				</div>

				<div className="w-full lg:w-2/3 bg-white rounded-lg shadow p-6 flex flex-col gap-4">
					<h2 className="text-xl font-semibold text-secondary">Send us a Message</h2>
					<input
						value={name}
						onChange={(e) => setName(e.target.value)}
						type="text"
						placeholder="Your Name"
						className="w-full p-3 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-accent"
					/>
					<input
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						type="email"
						placeholder="Your Email"
						className="w-full p-3 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-accent"
					/>
					<textarea
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						placeholder="Your Message"
						rows={6}
						className="w-full p-3 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-accent resize-none"
					/>
					<button
						onClick={handleSendMessage}
						className="self-start px-6 py-3 bg-accent text-white rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-accent"
					>
						Send Message
					</button>
				</div>
			</div>
		</div>
	);
}