import React, { useState } from 'react';
import { Star, StarHalf, ThumbsUp, ThumbsDown } from 'lucide-react';

function FeedbackForm({ mealId, onSubmit }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [liked, setLiked] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      mealId,
      rating,
      comment,
      liked
    });
    // Reset form
    setRating(0);
    setComment('');
    setLiked(null);
  };

  return (
    <div className="mt-4 border-t pt-4">
      <h3 className="text-sm font-medium text-gray-700 mb-2">Give Feedback</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Rating:</span>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="focus:outline-none"
              >
                {star <= rating ? (
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                ) : (
                  <Star className="h-5 w-5 text-gray-300" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">Did you like it?</span>
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={() => setLiked(true)}
              className={`p-1 rounded-full ${
                liked === true ? 'bg-green-100' : 'bg-gray-100'
              }`}
            >
              <ThumbsUp className={`h-5 w-5 ${
                liked === true ? 'text-green-600' : 'text-gray-400'
              }`} />
            </button>
            <button
              type="button"
              onClick={() => setLiked(false)}
              className={`p-1 rounded-full ${
                liked === false ? 'bg-red-100' : 'bg-gray-100'
              }`}
            >
              <ThumbsDown className={`h-5 w-5 ${
                liked === false ? 'text-red-600' : 'text-gray-400'
              }`} />
            </button>
          </div>
        </div>

        <div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add your comments..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            rows={2}
          />
        </div>

        <button
          type="submit"
          disabled={!rating || liked === null}
          className="w-full bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
}

export default FeedbackForm; 