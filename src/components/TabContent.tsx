import { useState, useEffect } from "react";
import AddExerciseModal from "./AddExerciseModalForm";
import Modal from "./Modal"; // Import the Modal component
import ExerciseCard from "./ExerciseCard";

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
        <p className="text-center mt-4 text-neutral text-lg">
          No Exercises Yet
        </p>
      )}
      <button
        className="text-xl btn btn-circle bg-primary m-4 flex items-center justify-center"
        onClick={() => setShowModal(true)}
      >
        +
      </button>
      {exercises
        .filter((ex) => ex.category === activeTab)
        .map(({ name, weight, category, reps, intensity, time }) => (
          <ExerciseCard
            key={name}
            name={name}
            weight={weight}
            category={category}
            reps={reps}
            intensity={intensity}
            time={time}
            onDelete={() =>
              deleteExercise({ name, weight, category, reps, intensity, time })
            }
          />
        ))}

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddExerciseModal
            onAdd={addExercise}
            onClose={() => setShowModal(false)}
            initialCategory={activeTab} // pass the activeTab as initialCategory
          />
        </Modal>
      )}
    </div>
  );
}
