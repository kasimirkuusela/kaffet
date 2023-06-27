const base = "app6plHG3XaIeXYUe";
const quotesTable = "tblbF4yTrmWH7Mqgv"; // Get Quotes
const productsTable = "tblaEruyBrG3GZpOs"; // Get Products
const linesTable = "tblFxXEAKeBm6RvOx"; // Get Products
const recordId = "recQ5czZ0oDDoyrbU"; // Use CMS field here

// Elements
const quoteTitle = document.querySelector('[k-el="quoteTitle"]'); // Quote Title
const quoteDescription = document.querySelector('[k-el="quoteDescription"]'); // Quote Description
const loader = document.querySelector('[k-el="pageLoader"]'); // Page Loader

// Replace Base ID, TABLE & API key
window.onload = function() {
  fetch('https://api.airtable.com/v0/' + base + '/' + quotesTable + '/' + recordId, {
    headers: {
      'Authorization': 'Bearer pat1RtV5lnkmrmHe6.205f0ee286b0170781ae33331af81c076ca48461c448723e692f9d8a1991b030'
    }
  })
    // Show Quote Title
    .then(response => response.json())
    .then(json => {
      console.log(json);
      if (json.fields['Otsikko']) {
        quoteTitle.textContent = json.fields['Otsikko'];
      } else {
        quoteTitle.parentElement.classList.add('hidden');
      }
    })
    // Show Quote Short Description
    .then(() =>
      fetch('https://api.airtable.com/v0/' + base + '/' + quotesTable + '/' + recordId, {
        headers: {
          'Authorization': 'Bearer pat1RtV5lnkmrmHe6.205f0ee286b0170781ae33331af81c076ca48461c448723e692f9d8a1991b030'
        }
      })
    )
    .then(response => response.json())
    .then(json => {
      console.log(json);
      if (json.fields['Saateviesti']) {
        quoteDescription.textContent = json.fields['Saateviesti'];
      } else {
        quoteDescription.parentElement.classList.add('hidden');
      }
    })
    // Hide Loader When Everything Is Loaded
    .then(() => {
      loader.classList.remove("hidden");
      loader.classList.add("hidden");
      console.log("Content loaded");
    })
    .catch(error => {
      console.error(error);
    });
};
