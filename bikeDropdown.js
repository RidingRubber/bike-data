// ✅ Allowed manufacturers
const allowedMakes = [
  "Aprilia", "BMW", "Ducati", "Honda",
  "Kawasaki", "KTM", "Suzuki", "Triumph", "Yamaha"
];

// ✅ Get dropdown elements
const makeDropdown = document.getElementById("make");
const yearDropdown = document.getElementById("year");
const modelDropdown = document.getElementById("model");

const oilContainer = document.getElementById("oilFilters");
const airContainer = document.getElementById("airFilters");

// ---- Step 1: Populate Make dropdown ----
Object.keys(bikeData)
  .filter(make => allowedMakes.includes(make))
  .forEach(make => {
    const option = document.createElement("option");
    option.value = make;
    option.textContent = make;
    makeDropdown.appendChild(option);
  });

// ---- Step 2: Populate Year dropdown when Make changes ----
makeDropdown.addEventListener("change", () => {
  const make = makeDropdown.value;
  yearDropdown.innerHTML = '<option value="">Select Year</option>';
  modelDropdown.innerHTML = '<option value="">Select Model</option>';

  oilContainer.innerHTML = "";
  airContainer.innerHTML = "";

  if (!make) return;

  Object.keys(bikeData[make]).forEach(year => {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    yearDropdown.appendChild(option);
  });
});

// ---- Step 3: Populate Model dropdown when Year changes ----
yearDropdown.addEventListener("change", () => {
  const make = makeDropdown.value;
  const year = yearDropdown.value;
  modelDropdown.innerHTML = '<option value="">Select Model</option>';

  oilContainer.innerHTML = "";
  airContainer.innerHTML = "";

  if (!make || !year) return;

  Object.keys(bikeData[make][year]).forEach(model => {
    const option = document.createElement("option");
    option.value = model;
    option.textContent = model;
    modelDropdown.appendChild(option);
  });
});

// ---- Step 4: Display Oil & Air filters when Model changes ----
modelDropdown.addEventListener("change", () => {
  const make = makeDropdown.value;
  const year = yearDropdown.value;
  const model = modelDropdown.value;

  oilContainer.innerHTML = "";
  airContainer.innerHTML = "";

  if (!make || !year || !model) return;

  const bike = bikeData[make][year][model];

  // Oil filters
  bike.oilFilters.forEach(f => {
    const div = document.createElement("div");
    div.textContent = `${f.brand} ${f.part} — $${f.price.toFixed(2)}`;
    oilContainer.appendChild(div);
  });

  // Air filters
  bike.airFilters.forEach(f => {
    const div = document.createElement("div");
    div.textContent = `${f.brand} ${f.part} — $${f.price.toFixed(2)}`;
    airContainer.appendChild(div);
  });
});
