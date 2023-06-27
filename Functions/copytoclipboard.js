// Get the copy button element and the copy button text element
const copyBtn = document.querySelector('[k-el="copyBtn"]');
const copyBtnText = document.querySelector('[k-el="copyBtnText"]');

// Function to copy the current URL to clipboard
function copyURLToClipboard() {
  const currentURL = window.location.href;

  navigator.clipboard.writeText(currentURL)
    .then(() => {
      // URL copied successfully
      copyBtnText.textContent = 'Kopioitu!';
      setTimeout(() => {
        // Reset the copy button text after 5 seconds
        copyBtnText.textContent = 'Default Text';
      }, 5000);
    })
    .catch((error) => {
      // Error occurred while copying the URL
      console.error('Failed to copy URL to clipboard:', error);
    });
}

// Attach click event listener to the copy button
copyBtn.addEventListener('click', copyURLToClipboard);