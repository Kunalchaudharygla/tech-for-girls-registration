// === Variables ===
let shareCount = Number(localStorage.getItem("shareCount")) || 0;
const shareBtn = document.getElementById('whatsappBtn');
const shareText = document.getElementById('shareCount');
const form = document.getElementById('registrationForm');
const submitBtn = document.getElementById('submitBtn');
const thankYou = document.getElementById('thankYouMessage');

// === Submission Control ===
const isSubmitted = localStorage.getItem("submitted");
if (isSubmitted) {
  form.style.display = "none";
  thankYou.style.display = "block";
} else {
  shareText.innerText = `Click count: ${shareCount}/5`;
}

// === WhatsApp Sharing Logic ===
shareBtn.addEventListener('click', () => {
  if (shareCount < 5) {
    shareCount++;
    localStorage.setItem("shareCount", shareCount);

    const message = encodeURIComponent("Hey Buddy, Join Tech For Girls Community!");
    const whatsappURL = `https://wa.me/?text=${message}`;
    window.open(whatsappURL, "_blank");

    shareText.innerText = `Click count: ${shareCount}/5`;

    if (shareCount === 5) {
      alert("✅ Sharing complete. Please continue.");
    }
  } else {
    alert("✅ Already shared 5 times. You can now submit the form.");
  }
});

// === Form Submission Logic ===
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (shareCount < 5) {
    alert("❌ Please complete sharing 5 times before submitting.");
    return;
  }

  submitBtn.disabled = true;

  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const email = document.getElementById('email').value.trim();
  const college = document.getElementById('college').value.trim();
  const screenshotFile = document.getElementById('screenshot').files[0];
  const screenshotName = screenshotFile ? screenshotFile.name : "Not uploaded";

  const formData = new URLSearchParams();
  formData.append("name", name);
  formData.append("phone", phone);
  formData.append("email", email);
  formData.append("college", college);
  formData.append("screenshot", screenshotName);

  // ✅ FINAL Web App URL
  const uploadURL = "https://script.google.com/macros/s/AKfycbxxY9qTmA3PasVFWJw3lYCwPegKCOeOhC52ll3q5g_cV_dewAwkZETDthTsmB8Z-T9eQQ/exec";

  try {
    await fetch(uploadURL, {
      method: "POST",
      body: formData,
    });

    // Success UI
    localStorage.setItem("submitted", true);
    localStorage.removeItem("shareCount");
    form.reset();
    form.style.display = "none";
    thankYou.style.display = "block";
  } catch (error) {
    alert("❌ Submission failed. Please try again.");
    console.error("Error:", error);
    submitBtn.disabled = false;
  }
});
