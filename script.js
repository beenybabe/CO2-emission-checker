const activityOptions = {
  "Driving (10km)": 2.3,
  "Bus Ride (10km)": 0.7,
  "Flight (1hr)": 90,
  "Meat-based Meal": 5.5,
  "Vegetarian Meal": 2.0,
  "Laundry (1 Load)": 1.2,
};

function addRow() {
  const tableBody = document.getElementById("tableBody");
  const newRow = document.createElement("tr");

  const activityCell = document.createElement("td");
  const select = document.createElement("select");

  Object.keys(activityOptions).forEach((activity) => {
    const option = document.createElement("option");
    option.value = activity;
    option.textContent = activity;
    select.appendChild(option);
  });

  activityCell.appendChild(select);
  newRow.appendChild(activityCell);

  const emissionCell = document.createElement("td");
  emissionCell.textContent = activityOptions[select.value];
  newRow.appendChild(emissionCell);

  select.addEventListener("change", function () {
    emissionCell.textContent = activityOptions[select.value];
    saveData();
  });

  tableBody.appendChild(newRow);
  saveData();
}

function calculateTotal() {
  const tableBody = document.getElementById("tableBody");
  let total = 0;

  for (let row of tableBody.rows) {
    const emission = parseFloat(row.cells[1].textContent);
    total += emission;
  }

  document.getElementById(
    "totalCO2"
  ).textContent = `Total CO2 Emission: ${total.toFixed(2)} kg`;
}

function saveData() {
  const rows = [];
  const tableBody = document.getElementById("tableBody");

  for (let row of tableBody.rows) {
    rows.push(row.cells[0].firstChild.value);
  }

  localStorage.setItem("co2Activities", JSON.stringify(rows));
}

function loadData() {
  const saved = JSON.parse(localStorage.getItem("co2Activities")) || [];
  saved.forEach((activity) => {
    const tableBody = document.getElementById("tableBody");
    const newRow = document.createElement("tr");

    const activityCell = document.createElement("td");
    const select = document.createElement("select");

    Object.keys(activityOptions).forEach((opt) => {
      const option = document.createElement("option");
      option.value = opt;
      option.textContent = opt;
      if (opt === activity) option.selected = true;
      select.appendChild(option);
    });

    activityCell.appendChild(select);
    newRow.appendChild(activityCell);

    const emissionCell = document.createElement("td");
    emissionCell.textContent = activityOptions[select.value];
    newRow.appendChild(emissionCell);

    select.addEventListener("change", function () {
      emissionCell.textContent = activityOptions[select.value];
      saveData();
    });

    tableBody.appendChild(newRow);
  });
}

window.onload = loadData;
