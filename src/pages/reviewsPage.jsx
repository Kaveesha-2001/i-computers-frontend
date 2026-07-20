import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaStar } from "react-icons/fa";
import api from "../utils/api";
import ReviewCard from "../components/reviewCard";

export default function ReviewsPage() {
	const [reviews, setReviews] = useState([]);
	const [isReviewsLoaded, setIsReviewsLoaded] = useState(false);
	const [showForm, setShowForm] = useState(false);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [rating, setRating] = useState(0);
	const [hoverRating, setHoverRating] = useState(0);
	const [comment, setComment] = useState("");

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
				});
		}
	}, [isReviewsLoaded]);

	async function handleSubmitReview() {
		if (name.trim() === "" || email.trim() === "" || comment.trim() === "" || rating === 0) {
			toast.error("Please fill in all fields and select a rating");
			return;
		}

		try {
			await api.post("/reviews", {
				name: name,
				email: email,
				rating: rating,
				comment: comment,
			});

			toast.success("Thank you for your review!");
			setName("");
			setEmail("");
			setRating(0);
			setComment("");
			setShowForm(false);
			setIsReviewsLoaded(false);
		} catch (error) {
			console.log(error);
			toast.error("Failed to submit review!");
		}
	}

	return (
		<div className="w-full h-full flex flex-col items-center pt-16 pb-[150px] relative">
			<div className="w-full flex flex-col items-center gap-2 mb-6">
				<h1 className="text-3xl font-bold text-secondary">Customer Reviews</h1>
				<p className="text-gray-500 text-center px-4">See what our customers have to say about us</p>
				<button
					onClick={() => setShowForm(!showForm)}
					className="mt-2 px-6 py-3 bg-accent text-white rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-accent"
				>
					{showForm ? "Cancel" : "Write a Review"}
				</button>
			</div>

			{showForm && (
				<div className="w-11/12 md:w-1/2 bg-white rounded-lg shadow-lg p-6 mb-8 flex flex-col gap-4">
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
					<div className="flex items-center gap-2">
						<span className="text-gray-600">Your Rating:</span>
						<div className="flex text-2xl">
							{[1, 2, 3, 4, 5].map((star) => (
								<FaStar
									key={star}
									onClick={() => setRating(star)}
									onMouseEnter={() => setHoverRating(star)}
									onMouseLeave={() => setHoverRating(0)}
									className={`cursor-pointer ${
										star <= (hoverRating || rating) ? "text-yellow-400" : "text-gray-300"
									}`}
								/>
							))}
						</div>
					</div>
					<textarea
						value={comment}
						onChange={(e) => setComment(e.target.value)}
						placeholder="Write your review..."
						rows={4}
						className="w-full p-3 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-accent resize-none"
					/>
					<button
						onClick={handleSubmitReview}
						className="px-4 py-3 bg-accent text-white rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-accent"
					>
						Submit Review
					</button>
				</div>
			)}

			<div className="w-full flex justify-center flex-wrap">
				{reviews.length === 0 ? (
					<p className="text-gray-400 mt-10">No reviews yet. Be the first to write one!</p>
				) : (
					reviews.map((review) => <ReviewCard key={review.reviewId} review={review} />)
				)}
			</div>
		</div>
	);
}