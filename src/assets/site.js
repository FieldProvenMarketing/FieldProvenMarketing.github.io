const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.primary-nav');
if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    nav.classList.toggle('open', open);
  });
  nav.addEventListener('click', event => {
    if (event.target.closest('a')) {
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open menu');
      nav.classList.remove('open');
    }
  });
}

document.querySelectorAll('[data-lead-form]').forEach(form => {
  const status = form.querySelector('.form-status');
  const submit = form.querySelector('button[type="submit"]');
  const originalLabel = submit.innerHTML;
  form.addEventListener('submit', async event => {
    event.preventDefault();
    status.hidden = true;
    status.classList.remove('error');
    form.querySelectorAll('[aria-invalid="true"]').forEach(el => el.removeAttribute('aria-invalid'));
    if (!form.checkValidity()) {
      const invalid = form.querySelector(':invalid');
      if (invalid) { invalid.setAttribute('aria-invalid', 'true'); invalid.focus(); }
      status.textContent = 'Please complete the required fields and check the email or website format.';
      status.classList.add('error');
      status.hidden = false;
      return;
    }
    const data = Object.fromEntries(new FormData(form).entries());
    if (data._honey) return;
    submit.disabled = true;
    submit.textContent = 'Sending…';
    try {
      const response = await fetch(form.dataset.ajaxEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      if (!response.ok || (result.success !== true && result.success !== 'true')) throw new Error('Delivery was not confirmed');
      form.reset();
      status.textContent = 'Thank you. Your request has been sent to Field Proven Marketing. We’ll follow up by email about a 15-minute market review.';
      status.hidden = false;
      status.focus();
    } catch {
      status.textContent = 'We could not confirm delivery. Please try again or email fieldprovenmarketing@gmail.com directly.';
      status.classList.add('error');
      status.hidden = false;
      status.focus();
    } finally {
      submit.disabled = false;
      submit.innerHTML = originalLabel;
    }
  });
});
