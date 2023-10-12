import React, { useState } from "react";

function LocalStorageManager() {
  const [importData, setImportData] = useState<string>("");

  const handleExport = () => {
    const exercisesData = localStorage.getItem("exercises");
    if (exercisesData) {
      const dataStr =
        "data:text/json;charset=utf-8," + encodeURIComponent(exercisesData);
      const downloadAnchorNode = document.createElement("a");
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", "exercises_backup.json");
      document.body.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    } else {
      alert("No exercises data found in local storage!");
    }
  };

  const handleClear = () => {
    localStorage.clear();
    alert("Local storage cleared!");
  };

  const handleLoad = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target!.result as string);
        if (data && typeof data === "object" && !Array.isArray(data)) {
          for (let key in data) {
            localStorage.setItem(key, data[key]);
          }
        } else if (Array.isArray(data)) {
          localStorage.setItem("exercises", JSON.stringify(data));
        }
        alert("Data loaded into local storage successfully!");
      } catch (error) {
        alert("Failed to load data. Please ensure it's a valid JSON.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <button onClick={handleExport}>Export Local Storage</button>
      <button onClick={handleClear}>Clear Local Storage</button>

      <input type="file" onChange={handleLoad} />
    </div>
  );
}

export default LocalStorageManager;
