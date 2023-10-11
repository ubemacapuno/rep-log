import { useState, useEffect } from "react";
import AddExerciseModal from "./AddExerciseModalForm";
import Modal from "./Modal"; // Import the Modal component
import ExerciseCard from "./ExerciseCard";
import { v4 as uuidv4 } from "uuid";
import { Exercise } from "../types/ExerciseTypes";

type TabContentProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export default function TabContent({
  activeTab,
  setActiveTab,
}: TabContentProps) {
  const [exercises, setExercises] = useState<Exercise[]>([]);

  //maintain a state for the exercise being edited:
  const [editingExercise, setEditingExercise] = useState<Exercise | null>(null);

  // Use useState for modal visibility
  const [showModal, setShowModal] = useState(false);

  // Load exercises from localStorage when component mounts
  useEffect(() => {
    const storedExercises = JSON.parse(
      localStorage.getItem("exercises") || "[]"
    );
    setExercises(storedExercises);
  }, []);

  // addExercise: add an exercise to the array
  const addExercise = (exercise: Omit<Exercise, "id">) => {
    const newExercise = { ...exercise, id: uuidv4() }; // assign a unique id to the new exercise
    const newExercises = [...exercises, newExercise]; // append newExercise to the list of exercises
    setExercises(newExercises); // pass newExercises in the useState setExercises function
    localStorage.setItem("exercises", JSON.stringify(newExercises)); // Set in localStorage as a string
    setActiveTab(exercise.category); // Set the active tab to the new exercise's category
  };

  /**
   * initiateEditForExercise
   * Set up the UI for editing an exercise:
   * 1. Set which exercise is currently being edited (so that it can be passed as a prop to the modal form)
   * 2. Trigger modal to open
   */
  const initiateEditForExercise = (exercise: Exercise) => {
    setEditingExercise(exercise); // set the exercise we're editing
    setShowModal(true); // show the modal
  };

  //  editExercise: update the exercises array with an edited exercise
  const editExercise = (id: string, updatedExercise: Omit<Exercise, "id">) => {
    const updatedExercises = exercises.map((exercise) =>
      exercise.id === id ? { ...updatedExercise, id } : exercise
    );
    setExercises(updatedExercises);
    localStorage.setItem("exercises", JSON.stringify(updatedExercises));
    // Set the active tab to the updated exercise's category:
    setActiveTab(updatedExercise.category);
  };

  // R
  const deleteExercise = (id: string) => {
    const updatedExercises = exercises.filter((exercise) => exercise.id !== id);
    setExercises(updatedExercises);
    localStorage.setItem("exercises", JSON.stringify(updatedExercises));
  };

  const handleRepChange = (
    exerciseId: string,
    repIndex: number,
    newRep: number
  ) => {
    // Find the exercise and update its rep
    const updatedExercises = exercises.map((exercise) => {
      if (exercise.id === exerciseId) {
        const updatedReps = [...exercise.reps];
        updatedReps[repIndex] = newRep;
        return { ...exercise, reps: updatedReps };
      }
      return exercise;
    });

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
        onClick={() => {
          setEditingExercise(null); // Ensure editingExercise is null
          setShowModal(true);
        }}
      >
        <span className="material-symbols-outlined">add</span>
      </button>
      {exercises
        .filter((ex) => ex.category === activeTab)
        .map(({ id, name, weight, category, reps, intensity, time }) => (
          <ExerciseCard
            key={id}
            id={id}
            name={name}
            weight={weight}
            category={category}
            reps={reps}
            intensity={intensity}
            time={time}
            onDelete={() => deleteExercise(id)}
            initiateEditForExercise={() =>
              initiateEditForExercise({
                id,
                name,
                weight,
                category,
                reps,
                intensity,
                time,
              })
            }
            onRepChange={(idx, newVal) => handleRepChange(id, idx, newVal)}
          />
        ))}

      {showModal && (
        <Modal
          onClose={() => {
            setShowModal(false);
            setEditingExercise(null);
          }}
        >
          {" "}
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
