import { useState } from "react";
import { CATEGORIES } from "../constants/constants";

export default function AddExerciseModal({ onAdd, onClose, initialCategory }) {
  const [name, setName] = useState("");
  const [weight, setWeight] = useState(0);
  const [intensity, setIntensity] = useState(0); // New state for Speed/Intensity
  const [time, setTime] = useState(0); // New state for Time
  const [category, setCategory] = useState(
    initialCategory || CATEGORIES[0].name
  );
  const [reps, setReps] = useState(Array(5).fill(0));

  const handleAdd = () => {
    // Don't include reps that are entered as 0
    const filteredReps = reps.filter((rep) => rep !== 0);

    onAdd({
      name,
      weight: Number(weight),
      category,
      reps: filteredReps,
      intensity: Number(intensity),
      time: Number(time),
    });
    onClose();
  };

  return (
    <div>
      <h2>Add an Exercise</h2>
      <label htmlFor="name" className="label">
        <span className="label-text">Exercise Name</span>
      </label>
      <input
        placeholder="Exercise Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="input input-bordered w-full max-w-xs"
      />

      <label htmlFor="category" className="label">
        <span className="label-text">Category</span>
      </label>
      <select
        className="select select-bordered"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        {CATEGORIES.map((category) => (
          <option key={category.value} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>

      {category === "Cardio" ? (
        <>
          <label htmlFor="intensity" className="label">
            <span className="label-text">Speed/Intensity</span>
          </label>
          <input
            type="number"
            placeholder="Speed/Intensity"
            value={intensity}
            onChange={(e) => setIntensity(e.target.value)}
            className="input input-bordered w-full max-w-xs"
          />

          <label htmlFor="time" className="label">
            <span className="label-text">Time</span>
          </label>
          <input
            type="number"
            placeholder="Time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="input input-bordered w-full max-w-xs"
          />
        </>
      ) : (
        <>
          <label htmlFor="weight" className="label">
            <span className="label-text">Time</span>
          </label>
          <input
            type="number"
            placeholder="Weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="input input-bordered w-full max-w-xs"
          />

          <label htmlFor="reps" className="label">
            <span className="label-text">Reps</span>
          </label>
          <div className="flex gap-3">
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
                className="w-14 input input-bordered max-w-xs"
              />
            ))}
          </div>
        </>
      )}

      <div className="mt-8 flex justify-end gap-4">
        <button onClick={handleAdd} className="btn btn-outline btn-success">
          Add
        </button>
        <button onClick={onClose} className="btn btn-outline btn-error">
          Cancel
        </button>
      </div>
    </div>
  );
}
