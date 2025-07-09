let shareCount = 0;
const shareBtn = document.getElementById('whatsappBtn');
const shareText = document.getElementById('shareCount');
const form = document.getElementById('registrationForm');
const submitBtn = document.getElementById('submitBtn');
const thankYou = document.getElementById('thankYouMessage');

// Check if already submitted
const isSubmitted = localStorage.getItem("submitted");
if (isSubmitted) {
  form.style.display = "none";
  thankYou.style.display = "block";
}

// WhatsApp sharing logic
shareBtn.addEventListener('click', () => {
  if (shareCount < 5) {
    shareCount++;

    const message = encodeURIComponent("Hey Buddy, Join Tech For Girls Community!");
    const whatsappURL = `https://wa.me/?text=${message}`;
    window.open(whatsappURL, "_blank");

    shareText.innerText = `Click count: ${shareCount}/5`;

    if (shareCount === 5) {
      alert("Sharing complete. Please continue.");
    }
  }
});

// Form submission logic
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (shareCount < 5) {
    alert("Please complete sharing 5 times before submitting.");
    return;
  }

  submitBtn.disabled = true;

  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;
  const college = document.getElementById('college').value;
  const screenshotFile = document.getElementById('screenshot').files[0];
  const screenshotName = screenshotFile ? screenshotFile.name : "Not uploaded";

  const formData = new URLSearchParams();
  formData.append("name", name);
  formData.append("phone", phone);
  formData.append("email", email);
  formData.append("college", college);
  formData.append("screenshot", screenshotName);

  const uploadURL = "https://script.google.com/macros/s/AKfycbyC8Vq12C2K08DDNz1UfcqBnCd_Cp_0bXWPNZMvWHEeVOcUTPOws-pty-d_x30tP4ny/exec";

  try {
    await fetch(uploadURL, {
      method: "POST",
      body: formData,
    });

    // Save submission flag
    localStorage.setItem("submitted", true);

    // Show thank-you message
    form.reset();
    form.style.display = "none";
    thankYou.style.display = "block";

  } catch (error) {
    alert("❌ Submission failed. Please try again.");
    console.error("Error:", error);
    submitBtn.disabled = false;
  }
<<<<<<< HEAD
});
=======
});
>>>>>>> a3b3cb7c2d58ea9cd05fb772592101de2ad0d21c
