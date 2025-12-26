const form = document.getElementById('signup-form');
const step1 = document.getElementById('step-1');
const step2 = document.getElementById('step-2');
const step3 = document.getElementById('step-3');
const successMessage = document.getElementById('success-message');

const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const nameInput = document.getElementById('name');

const emailError = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');

// Validate email format (simple regex)
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.toLowerCase());
}

document.getElementById('to-step-2').addEventListener('click', () => {
  emailError.textContent = '';
  if (!validateEmail(emailInput.value)) {
    emailError.textContent = 'Please enter a valid email address.';
    return;
  }
  step1.classList.add('hidden');
  step2.classList.remove('hidden');
  passwordInput.focus();
});

document.getElementById('to-step-3').addEventListener('click', () => {
  passwordError.textContent = '';
  if (passwordInput.value.length < 8) {
    passwordError.textContent = 'Password must be at least 8 characters.';
    return;
  }
  step2.classList.add('hidden');
  step3.classList.remove('hidden');
  nameInput.focus();
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const userName = nameInput.value.trim();
  form.classList.add('hidden');
  successMessage.textContent = `🎉 Welcome${userName ? ', ' + userName : ''}! Your account has been created.`;
  successMessage.classList.remove('hidden');
});
