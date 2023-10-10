import React, { useState, useEffect } from "react";

type RepInputProps = {
  initialValue?: number;
  onChange: (value: number) => void;
};

const RepInput: React.FC<RepInputProps> = ({ initialValue = 0, onChange }) => {
  const [count, setCount] = useState(initialValue);
  const [spin, setSpin] = useState(false);

  useEffect(() => {
    setCount(initialValue); // Sync the local state with prop when prop changes
  }, [initialValue]);

  const increment = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const newCount = count + 1;
    setCount(newCount);
    onChange(newCount);
  };

  const reset = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation(); // Prevent event from propagating up
    setSpin(true); // Trigger the spin animation on reset
    setTimeout(() => setSpin(false), 1000);
    setCount(0);
    onChange(0);
  };

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <button
        className={`btn btn-circle ${
          count > 0 ? "btn-secondary" : "bg-neutral"
        }`}
        onClick={increment}
      >
        {count}
      </button>
      <div
        className="cursor-pointer mt-2 flex justify-center items-center"
        onClick={reset}
      >
        <span
          className={`text-gray-600 material-symbols-outlined transition-opacity duration-1000 ${
            count > 0 ? "opacity-100" : "opacity-0"
          } ${spin ? "animate-reset_spin" : ""}`}
        >
          restart_alt
        </span>
      </div>
    </div>
  );
};

export default RepInput;
