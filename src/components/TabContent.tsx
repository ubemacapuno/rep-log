import { useState, useEffect } from "react";
import AddExerciseModal from "./AddExerciseModal";

export default function TabContent({ activeTab }) {
  const [exercises, setExercises] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Load exercises from localStorage when component mounts
  useEffect(() => {
    const storedExercises = JSON.parse(
      localStorage.getItem("exercises") || "[]"
    );
    setExercises(storedExercises);
  }, []);

  const addExercise = (exercise) => {
    const newExercises = [...exercises, exercise]; // Spread in current exercises into the array, and add on the new exercise
    setExercises(newExercises); // "set" exercises to newExercises
    localStorage.setItem("exercises", JSON.stringify(newExercises)); // set exercises into local storage
  };

  const deleteExercise = (exerciseToDelete) => {
    const updatedExercises = exercises.filter(
      (exercise) => exercise.name !== exerciseToDelete.name
    );
    setExercises(updatedExercises);
    localStorage.setItem("exercises", JSON.stringify(updatedExercises));
  };

  return (
    <div>
      <button onClick={() => setShowModal(true)}>+</button>
      {exercises.filter((ex) => ex.category === activeTab).length === 0 && (
        <p>No Exercises Yet</p>
      )}
      {exercises
        .filter((ex) => ex.category === activeTab)
        .map((exercise) => (
          <div key={exercise.name}>
            {exercise.name} - {exercise.weight}kg - {exercise.category} -{" "}
            {exercise.reps.join(", ")}
            <button onClick={() => deleteExercise(exercise)}>Delete</button>
          </div>
        ))}
      {showModal && (
        <AddExerciseModal
          onAdd={addExercise}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
