import { useState, useEffect } from "react";
import AddExerciseModal from "./AddExerciseModalForm";
import Modal from "./Modal"; // Import the Modal component
import ExerciseCard from "./ExerciseCard";
import { v4 as uuidv4 } from "uuid";

export default function TabContent({ activeTab }) {
  const [exercises, setExercises] = useState([]);

  //maintain a state for the exercise being edited:
  const [editingExercise, setEditingExercise] = useState(null);

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
    const newExercise = { ...exercise, id: uuidv4() };
    const newExercises = [...exercises, newExercise];
    setExercises(newExercises);
    localStorage.setItem("exercises", JSON.stringify(newExercises));
  };

  const editExercise = (id, updatedExercise) => {
    const updatedExercises = exercises.map((exercise) =>
      exercise.id === id ? { ...updatedExercise, id } : exercise
    );
    setExercises(updatedExercises);
    localStorage.setItem("exercises", JSON.stringify(updatedExercises));
  };

  const deleteExercise = (id) => {
    const updatedExercises = exercises.filter((exercise) => exercise.id !== id);
    setExercises(updatedExercises);
    localStorage.setItem("exercises", JSON.stringify(updatedExercises));
  };

  const onEditExercise = (exercise) => {
    setEditingExercise(exercise); // set the exercise we're editing
    setShowModal(true); // show the modal
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
        .map(({ id, name, weight, category, reps, intensity, time }) => (
          <ExerciseCard
            key={id}
            id={id} // pass the ID to ExerciseCard
            name={name}
            weight={weight}
            category={category}
            reps={reps}
            intensity={intensity}
            time={time}
            onDelete={() => deleteExercise(id)}
            onEditExercise={() =>
              onEditExercise({
                id,
                name,
                weight,
                category,
                reps,
                intensity,
                time,
              })
            }
          />
        ))}

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddExerciseModal
            onAdd={addExercise}
            onEdit={editExercise}
            onClose={() => {
              setShowModal(false);
              setEditingExercise(null); // clear the editing exercise when closing the modal
            }}
            initialCategory={activeTab}
            exercise={editingExercise}
          />
        </Modal>
      )}
    </div>
  );
}
