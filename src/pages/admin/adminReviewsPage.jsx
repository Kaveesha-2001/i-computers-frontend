import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaStar, FaTrash } from "react-icons/fa";
import api from "../../utils/api";
import ReviewDeleteModal from "../../components/reviewDeleteModal";

export default function AdminReviewsPage() {
	const [reviews, setReviews] = useState([]);
	const [isReviewsLoaded, setIsReviewsLoaded] = useState(false);
	const [reviewToDelete, setReviewToDelete] = useState(null);

	useEffect(() => {
		if (!isReviewsLoaded) {
			api
				.get("/reviews")
				.then((response) => {
					console.log(response.data);
					setReviews(response.data);
					setIsReviewsLoaded(true);
				})
				.catch((error) => {
					console.log(error);
					toast.error("Failed to load reviews!");
				});
		}
	}, [isReviewsLoaded]);

	async function handleDeleteReview(review) {
		const token = localStorage.getItem("token");

		try {
			await api.delete("/reviews/" + review.reviewId, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			toast.success("Review deleted successfully");
			setReviewToDelete(null);
			setIsReviewsLoaded(false);
		} catch (error) {
			console.log(error);
			toast.error("Failed to delete review!");
		}
	}

	return (
		<div className="w-full h-full p-6 overflow-y-scroll">
			<h1 className="text-2xl font-bold text-secondary mb-6">Reviews Dashboard</h1>

			{reviews.length === 0 ? (
				<p className="text-gray-400">No reviews submitted yet.</p>
			) : (
				<div className="flex flex-col gap-4">
					{reviews.map((review) => (
						<div
							key={review.reviewId}
							className="w-full bg-white rounded-lg shadow p-4 flex justify-between items-center"
						>
							<div className="flex flex-col gap-1">
								<div className="flex items-center gap-3">
									<span className="font-semibold text-secondary">{review.name}</span>
									<span className="text-gray-400 text-sm">{review.email}</span>
								</div>
								<div className="flex text-yellow-400">
									{[1, 2, 3, 4, 5].map((star) => (
										<FaStar key={star} className={star <= review.rating ? "text-yellow-400" : "text-gray-300"} />
									))}
								</div>
								<p className="text-gray-600 text-sm">{review.comment}</p>
								<p className="text-xs text-gray-400">{new Date(review.createdTime).toLocaleDateString()}</p>
							</div>
							<button
								onClick={() => setReviewToDelete(review)}
								className="w-[45px] h-[45px] flex justify-center items-center rounded-lg text-red-500 hover:bg-red-50 text-xl shrink-0"
							>
								<FaTrash />
							</button>
						</div>
					))}
				</div>
			)}

			<ReviewDeleteModal
				review={reviewToDelete}
				onClose={() => setReviewToDelete(null)}
				onConfirm={handleDeleteReview}
			/>
		</div>
	);
}