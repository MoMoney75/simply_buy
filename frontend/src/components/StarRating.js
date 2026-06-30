function StarRating({ rating = 0, count = 0 }) {
  const stars = Math.round(rating);
  return (
    <div className="star-rating">
      <span className="stars">
        {[1, 2, 3, 4, 5].map((i) => (
          <span key={i} className={i <= stars ? 'star filled' : 'star'}>
            &#9733;
          </span>
        ))}
      </span>
      <span className="rating-text">
        {rating.toFixed(1)} ({count})
      </span>
    </div>
  );
}

export default StarRating;
