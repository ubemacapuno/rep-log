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

  const exerciseDetails =
    category === "Cardio"
      ? `Intensity: ${intensity} - Time: ${time}`
      : `${weight} lbs`;

  return (
    <div className="card w-11/12 m-4 bg-neutral text-primary-content">
      <div className="flex flex-col gap-4 card-body">
        <h2 className="card-title text-3xl text-primary">{name}</h2>
        <p>{exerciseDetails}</p>
        {category !== "Cardio" && (
          <div className="flex gap-2">
            {reps.map(
              (rep, idx) =>
                rep > 0 && (
                  <div
                    key={idx}
                    className="flex items-center justify-center bg-secondary btn-circle"
                  >
                    {rep}
                  </div>
                )
            )}
          </div>
        )}
        <div className="btn-group justify-end mt-4">
          <button className="btn btn-accent" onClick={onEditExercise}>
            Edit
          </button>
          <button className="btn btn-error" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExerciseCard;
