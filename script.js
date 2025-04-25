function toggleAddress()
 {
  const mode = document.getElementById("mode").value;
  const addressField = document.getElementById("addressField");
  addressField.style.display = mode === "Offline" ? "block" : "none";
}

function goToPage2()
 {
  const name = document.getElementById("name").value.trim();
  const mobile = document.getElementById("mobile").value.trim();
  const mode = document.getElementById("mode").value;
  const people = document.getElementById("people").value.trim();
  const address = document.getElementById("address").value.trim();

  const nameValid = name.length >= 2 && /^[a-zA-Z\s]+$/.test(name);
  const mobileValid = /^(\+?\d{1,4})?\d{10}$/.test(mobile);

  if (!nameValid || !mobileValid || !mode || !people || (mode === "Offline" && address.length < 2))
 {
    alert("Please fill in all required fields correctly.");
    return;
  }

  // Auto-select Online mode if outside India
  if (mobile.startsWith("+") && !mobile.startsWith("+91"))
 {
    const modeSelect = document.getElementById("mode");
    modeSelect.value = "Online";
    modeSelect.disabled = true;
    toggleAddress();
  } else {
    document.getElementById("mode").disabled = false;
  }

  document.getElementById("page1").style.display = "none";
  document.getElementById("page2").style.display = "block";
}

// Reset days when class count changes
function resetDaySelection() {
  const checkboxes = document.querySelectorAll("input[name='days']");
  checkboxes.forEach(cb => {
    cb.checked = false;
    cb.disabled = false;
  });
  limitDaysSelection();
}

// Limit number of days based on selected value
function limitDaysSelection() {
  const maxDays = parseInt(document.getElementById("DaysPerWeek").value) || 0;
  const checkboxes = document.querySelectorAll("input[name='days']");
  const selected = document.querySelectorAll("input[name='days']:checked").length;

  checkboxes.forEach(cb => {
    cb.disabled = !cb.checked && selected >= maxDays;
  });
}

// Mobile-compatible checkbox control
const checkboxes = document.querySelectorAll("input[name='days']");
checkboxes.forEach(cb => {
  cb.addEventListener("change", limitDaysSelection);
  cb.addEventListener("click", () => setTimeout(limitDaysSelection, 50));
});

// Only numbers allowed in "Days per Week" field and restrict to 1–6
document.getElementById("classesPerWeek").addEventListener("input", function () {
  let value = this.value.replace(/[^0-9]/g, "");
  value = Math.max(1, Math.min(6, parseInt(value) || 1));
  this.value = value;
  resetDaySelection();
});

// Allow DOB input only after valid email and ensure age >= 18
document.getElementById("email").addEventListener("input", function () {
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value.trim());
  document.getElementById("dob").disabled = !emailValid;
});

document.getElementById("dob").addEventListener("change", function () {
  const dob = new Date(this.value);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    age--;
  }

  if (age < 18) {
    alert("You must be at least 18 years old to register.");
    this.value = "";
  }
});

// Submit form with thank-you message
document.getElementById("enquiryForm").addEventListener("submit", function (e) {
  e.preventDefault();
  document.getElementById("page2").style.display = "none";
  document.getElementById("message").style.display = "block";
});