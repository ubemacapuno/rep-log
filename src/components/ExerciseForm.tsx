import { useState } from "react";
import { CATEGORIES } from "../constants/constants";
import { Exercise } from "../types/ExerciseTypes";

type ExerciseFormProps = {
  onAdd: (exercise: {
    name: string;
    weight: number;
    category: string;
    reps: number[];
    intensity: number;
    time: number;
  }) => void;
  onEdit: (
    id: string,
    updatedExercise: {
      name: string;
      weight: number;
      category: string;
      reps: number[];
      intensity: number;
      time: number;
    }
  ) => void;
  onClose: () => void;
  initialCategory?: string;
  exercise?: Exercise | null;
};

export default function ExerciseForm({
  onAdd,
  onEdit,
  onClose,
  initialCategory,
  exercise,
}: ExerciseFormProps) {
  const [name, setName] = useState(exercise?.name || "");
  const [weight, setWeight] = useState(exercise?.weight || 0);
  const [intensity, setIntensity] = useState(exercise?.intensity || 0);
  const [time, setTime] = useState(exercise?.time || 0);
  const [category, setCategory] = useState(
    exercise?.category || initialCategory || CATEGORIES[0].name
  );
  const [reps, setReps] = useState(exercise?.reps || Array(5).fill(0));

  // Function to reset the inputs in the modal:
  const resetForm = () => {
    setName("");
    setWeight(0);
    setIntensity(0);
    setTime(0);
    setCategory(initialCategory || CATEGORIES[0].name);
    setReps(Array(5).fill(0));
  };

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevent form from actually submitting (default action)

    // If exercise exists, call onEdit(), otherwise call onAdd()
    if (exercise) {
      onEdit(exercise.id, { name, weight, category, reps, intensity, time });
    } else {
      onAdd({
        name,
        weight: Number(weight),
        category,
        reps,
        intensity: Number(intensity),
        time: Number(time),
      });
    }
    resetForm(); // Reset form after adding an exercise
    onClose();
  };

  return (
    <div className="w-full">
      <h2 className="text-center text-xl text-primary font-bold">
        {exercise ? "Edit Exercise" : "Add an Exercise"}
      </h2>
      <form onSubmit={handleAdd}>
        <label htmlFor="category" className="label">
          <span className="label-text">Category</span>
        </label>
        <select
          className="select select-bordered w-full"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {CATEGORIES.map((category) => (
            <option key={category.value} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        <label htmlFor="name" className="label">
          <span className="label-text">Exercise Name</span>
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input input-bordered w-full"
          minLength={1}
          required
        />
        {category === "Cardio" ? (
          <>
            <label htmlFor="intensity" className="label">
              <span className="label-text">Speed (mph) or Intensity</span>
            </label>
            <input
              type="number"
              value={intensity}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setIntensity(Number(e.target.value))
              }
              className="input input-bordered w-full"
            />

            <label htmlFor="time" className="label">
              <span className="label-text">Time (sec)</span>
            </label>
            <input
              type="number"
              value={time}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTime(Number(e.target.value))
              }
              className="input input-bordered w-full"
            />
          </>
        ) : (
          <>
            <label htmlFor="weight" className="label">
              <span className="label-text">Weight (lbs)</span>
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setWeight(Number(e.target.value))
              }
              className="input input-bordered w-full"
            />
            <label htmlFor="reps" className="label">
              <span className="label-text">Reps</span>
            </label>
            <div className="flex gap-1 justify-between">
              {reps.map((rep, idx) => (
                <input
                  key={idx}
                  type="number"
                  value={rep}
                  onChange={(e) => {
                    const newReps = [...reps];
                    newReps[idx] = Number(e.target.value);
                    setReps(newReps);
                  }}
                  className="input input-bordered w-14"
                />
              ))}
            </div>
          </>
        )}
        <div className="mt-8 flex justify-end gap-4">
          <button type="submit" className="btn btn-success">
            Submit
          </button>
          <button type="button" onClick={onClose} className="btn btn-error">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
