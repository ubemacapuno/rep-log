const ExerciseCard = ({
  name,
  weight,
  category,
  reps,
  onDelete,
  intensity,
  time,
}) => {
  return category === "Cardio" ? (
    <>
      <div className="card w-96 bg-primary text-primary-content">
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <p>
            Intensity: {intensity} - Category: {category} - time: {time}
          </p>
          <div className="card-actions justify-end">
            <button className="btn" onClick={onDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="card w-96 bg-primary text-primary-content">
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <p>
            Weight: {weight}kg - Category: {category} - Reps: {reps.join(", ")}
          </p>
          <div className="card-actions justify-end">
            <button className="btn" onClick={onDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExerciseCard;
