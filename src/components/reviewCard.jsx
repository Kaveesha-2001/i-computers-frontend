import { FaStar } from "react-icons/fa";

export default function ReviewCard({ review }) {
	return (
		<div className="w-[320px] m-4 p-5 bg-white rounded-lg shadow-lg flex flex-col gap-3">
			<div className="flex items-center justify-between">
				<h2 className="text-lg font-semibold text-secondary">{review.name}</h2>
				<div className="flex text-yellow-400">
					{[1, 2, 3, 4, 5].map((star) => (
						<FaStar key={star} className={star <= review.rating ? "text-yellow-400" : "text-gray-300"} />
					))}
				</div>
			</div>
			<p className="text-gray-600 text-sm leading-relaxed">{review.comment}</p>
			<p className="text-xs text-gray-400">
				{new Date(review.createdTime).toLocaleDateString()}
			</p>
		</div>
	);
}