import { useState } from "react";
import { CATEGORIES } from "../constants/constants";

export default function AddExerciseModal({ onAdd, onClose }) {
  const [name, setName] = useState("");
  const [weight, setWeight] = useState(0);
  const [intensity, setIntensity] = useState(0); // New state for Speed/Intensity
  const [time, setTime] = useState(0); // New state for Time
  const [category, setCategory] = useState(CATEGORIES[0].name);
  const [reps, setReps] = useState(Array(5).fill(0));

  const handleAdd = () => {
    onAdd({
      name,
      weight: Number(weight),
      category,
      reps,
      intensity: Number(intensity),
      time: Number(time),
    });
    onClose();
  };

  return (
    <div>
      <h2>Add an Exercise</h2>
      <input
        placeholder="Exercise Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        {CATEGORIES.map((category) => (
          <option key={category.value} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>

      {category === "Cardio" ? (
        <>
          <input
            type="number"
            placeholder="Speed/Intensity"
            value={intensity}
            onChange={(e) => setIntensity(e.target.value)}
          />
          <input
            type="number"
            placeholder="Time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </>
      ) : (
        <>
          <input
            type="number"
            placeholder="Weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
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
            />
          ))}
        </>
      )}

      <button onClick={handleAdd}>Add</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}
