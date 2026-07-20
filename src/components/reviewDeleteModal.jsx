export default function ReviewDeleteModal({ review, onClose, onConfirm }) {
	if (!review) return null;

	return (
		<div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
			<div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-[400px] flex flex-col gap-4">
				<h2 className="text-xl font-semibold text-secondary">Delete Review</h2>
				<p className="text-gray-600">
					Are you sure you want to delete the review from <span className="font-semibold">{review.name}</span>? This
					action cannot be undone.
				</p>
				<div className="flex justify-end gap-3">
					<button
						onClick={onClose}
						className="px-4 py-2 rounded-lg border border-gray-400 text-gray-600 hover:bg-gray-100"
					>
						Cancel
					</button>
					<button
						onClick={() => onConfirm(review)}
						className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
					>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
}