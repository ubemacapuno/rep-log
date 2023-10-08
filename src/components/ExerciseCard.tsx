const ExerciseCard = ({
  name,
  weight,
  category,
  reps,
  onDelete,
  intensity,
  time,
  onEditExercise,
}) => {
  const handleDelete = () => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this exercise?"
    );
    if (confirmation) {
      onDelete();
    }
  };

  return category === "Cardio" ? (
    <>
      <div className="card w-96 text-primary-content">
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
      <div className="card w-96 bg-neutral text-primary-content">
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <p>
            Weight: {weight}kg - Category: {category} - Reps: {reps.join(", ")}
          </p>
          <div className="card-actions justify-end">
            <button className="btn btn-secondary" onClick={onEditExercise}>
              Edit
            </button>

            <button className="btn btn-error" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExerciseCard;
