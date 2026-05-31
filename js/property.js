// ===== SEUN PROPERTY — property.js =====

// ---- IMAGE GALLERY ----
const images = [
  'images/property1.jpg',
  'images/property1b.jpg',
  'images/property1c.jpg',
  'images/property1d.jpg',
  'images/property1e.jpg',
];

let currentIndex = 0;
const mainImg    = document.getElementById('mainImg');
const imgCounter = document.getElementById('imgCounter');
const thumbs     = document.querySelectorAll('.thumb');

function setImage(index) {
  currentIndex = index;
  if (mainImg) mainImg.src = images[index];
  if (imgCounter) imgCounter.textContent = `${index + 1} / ${images.length}`;
  thumbs.forEach((t, i) => t.classList.toggle('active', i === index));
}

// Thumb clicks
thumbs.forEach(thumb => {
  thumb.addEventListener('click', () => {
    setImage(parseInt(thumb.dataset.index));
  });
});

// Prev / Next
document.getElementById('prevBtn')?.addEventListener('click', () => {
  setImage((currentIndex - 1 + images.length) % images.length);
});

document.getElementById('nextBtn')?.addEventListener('click', () => {
  setImage((currentIndex + 1) % images.length);
});

// Keyboard arrow navigation
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft')  setImage((currentIndex - 1 + images.length) % images.length);
  if (e.key === 'ArrowRight') setImage((currentIndex + 1) % images.length);
});

// ---- INQUIRY FORM ----
const inquiryForm = document.getElementById('inquiryForm');
const formSuccess = document.getElementById('formSuccess');

if (inquiryForm) {
  inquiryForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const name    = document.getElementById('inquiryName').value.trim();
    const phone   = document.getElementById('inquiryPhone').value.trim();
    const email   = document.getElementById('inquiryEmail').value.trim();
    const message = document.getElementById('inquiryMessage').value.trim();

    if (!name || !phone) {
      alert('Please enter your name and phone number.');
      return;
    }

    // Build WhatsApp message and open it
    const propertyTitle = document.querySelector('.prop-header h1')?.textContent || 'this property';
    const text = `Hello Seun Property,%0A%0AMy name is ${encodeURIComponent(name)}.%0APhone: ${encodeURIComponent(phone)}%0A${email ? 'Email: ' + encodeURIComponent(email) + '%0A' : ''}%0AI am interested in: ${encodeURIComponent(propertyTitle)}.%0A%0A${encodeURIComponent(message || 'Please send me more details.')}`;

    window.open(`https://wa.me/2348035623645?text=${text}`, '_blank');

    // Show success message
    inquiryForm.style.display = 'none';
    if (formSuccess) formSuccess.style.display = 'block';
  });
}

// ---- SHARE BUTTONS ----
document.getElementById('shareWa')?.addEventListener('click', () => {
  const text = `Check out this property from Seun Property:%0A${encodeURIComponent(window.location.href)}`;
  window.open(`https://wa.me/?text=${text}`, '_blank');
});

document.getElementById('shareCopy')?.addEventListener('click', () => {
  navigator.clipboard.writeText(window.location.href).then(() => {
    const btn = document.getElementById('shareCopy');
    const icon = btn.querySelector('i');
    icon.className = 'ti ti-check';
    btn.style.borderColor = 'var(--green)';
    btn.style.color = 'var(--green)';
    setTimeout(() => {
      icon.className = 'ti ti-link';
      btn.style.borderColor = '';
      btn.style.color = '';
    }, 2000);
  });
});