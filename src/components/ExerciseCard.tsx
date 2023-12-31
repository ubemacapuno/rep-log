import RepInput from "./RepInput";

type ExerciseCardProps = {
  id: string;
  name: string;
  weight: number;
  category: string;
  reps: number[];
  onDelete: () => void;
  intensity: number;
  time: number;
  initiateEditForExercise: () => void;
  onRepChange: (index: number, newRep: number) => void;
};

const ExerciseCard: React.FC<ExerciseCardProps> = ({
  name,
  weight,
  category,
  reps,
  onDelete,
  intensity,
  time,
  onRepChange,
  initiateEditForExercise,
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
            {reps.map((rep, idx) => (
              <RepInput
                key={idx}
                initialValue={rep}
                onChange={(newVal) => onRepChange(idx, newVal)}
              />
            ))}
          </div>
        )}
        <div className="btn-group justify-end mt-4">
          <button className="btn btn-accent" onClick={initiateEditForExercise}>
            <span className="material-symbols-outlined">edit</span>
          </button>
          <button className="btn btn-error" onClick={handleDelete}>
            <span className="material-symbols-outlined text-white">delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExerciseCard;
