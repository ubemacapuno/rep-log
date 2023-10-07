import { useState, useEffect, useRef } from "react";
import AddExerciseModal from "./AddExerciseModalForm";
import Modal from "./Modal"; // Import the Modal component

export default function TabContent({ activeTab }) {
  const [exercises, setExercises] = useState([]);

  // Use useState for modal visibility
  const [showModal, setShowModal] = useState(false);

  // Load exercises from localStorage when component mounts
  useEffect(() => {
    const storedExercises = JSON.parse(
      localStorage.getItem("exercises") || "[]"
    );
    setExercises(storedExercises);
  }, []);

  const addExercise = (exercise) => {
    const newExercises = [...exercises, exercise];
    setExercises(newExercises);
    localStorage.setItem("exercises", JSON.stringify(newExercises));
  };

  const deleteExercise = (exerciseToDelete) => {
    const updatedExercises = exercises.filter(
      (exercise) => exercise.name !== exerciseToDelete.name
    );
    setExercises(updatedExercises);
    localStorage.setItem("exercises", JSON.stringify(updatedExercises));
  };
  return (
    <div className="flex flex-col justify-center items-center">
      {exercises.filter((ex) => ex.category === activeTab).length === 0 && (
        <p className="text-center mt-4 text-neutral">No Exercises Yet</p>
      )}
      <button className="btn btn-circle m-4" onClick={() => setShowModal(true)}>
        +
      </button>
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
        <Modal onClose={() => setShowModal(false)}>
          <AddExerciseModal
            onAdd={addExercise}
            onClose={() => setShowModal(false)}
          />
        </Modal>
      )}
    </div>
  );
}
