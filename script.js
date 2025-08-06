document.getElementById("fileInput").addEventListener("change", handleFile);

document.getElementById("dropzone").addEventListener("dragover", (e) => {
  e.preventDefault();
  e.target.style.borderColor = "#000";
});
document.getElementById("dropzone").addEventListener("dragleave", (e) => {
  e.target.style.borderColor = "#ccc";
});
document.getElementById("dropzone").addEventListener("drop", (e) => {
  e.preventDefault();
  const file = e.dataTransfer.files[0];
  if (file && file.name.endsWith(".csv")) {
    parseCSV(file);
  }
});

function handleFile(e) {
  const file = e.target.files[0];
  if (file && file.name.endsWith(".csv")) {
    parseCSV(file);
  }
}

function parseCSV(file) {
  const reader = new FileReader();
  reader.onload = function (event) {
    const text = event.target.result;
    displayCSV(text);
    // Optional: sendCSVToBackend(file.name, text);
  };
  reader.readAsText(file);
}

function displayCSV(csvText) {
  const rows = csvText.trim().split("\n").map((r) => r.split(","));
  const table = document.createElement("table");

  rows.forEach((row, i) => {
    const tr = document.createElement("tr");
    row.forEach((cell) => {
      const td = document.createElement(i === 0 ? "th" : "td");
      td.textContent = cell;
      tr.appendChild(td);
    });
    table.appendChild(tr);
  });

  const container = document.getElementById("table-container");
  container.innerHTML = "";
  container.appendChild(table);
}

// Optional: upload to backend
/*
function sendCSVToBackend(filename, content) {
  fetch("https://your-backend/upload", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ filename, content }),
  }).then((res) => {
    if (res.ok) alert("File sent successfully!");
    else alert("Upload failed.");
  });
}
*/
