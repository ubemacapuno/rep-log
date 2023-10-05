import { useState } from "react";

export default function AddExerciseModal({ onAdd, onClose }) {
  const [name, setName] = useState("");
  const [weight, setWeight] = useState(0);
  const [category, setCategory] = useState("Push");
  const [reps, setReps] = useState(Array(5).fill(0));

  const handleAdd = () => {
    onAdd({
      name,
      weight: Number(weight),
      category,
      reps,
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
      <input
        type="number"
        placeholder="Weight"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Push">Push</option>
        <option value="Pull">Pull</option>
        <option value="Legs">Legs</option>
        <option value="Abs">Abs</option>
        <option value="Cardio">Cardio</option>
      </select>
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
      <button onClick={handleAdd}>Add</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}
