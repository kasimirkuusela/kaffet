const base = "app6plHG3XaIeXYUe";
const quotesTable = "tblbF4yTrmWH7Mqgv"; // Get Quotes
const productsTable = "tblaEruyBrG3GZpOs"; // Get Products
const linesTable = "tblFxXEAKeBm6RvOx"; // Get Products
const recordId = "recQ5czZ0oDDoyrbU"; // Use CMS field here

// Elements
const quoteTitle = document.querySelector('[k-el="quoteTitle"]'); // Quote Title
const quoteDescription = document.querySelector('[k-el="quoteDescription"]'); // Quote Description
const company = document.querySelector('[k-el="clientCompany"]'); // Company Name
const companyId = document.querySelector('[k-el="clientCompanyId"]'); // Company Id
const companyAddress = document.querySelector('[k-el="clientAddress"]'); // Company Id
const companyPerson = document.querySelector('[k-el="clientName"]'); // Company Contact Person Name

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

    // CLIENT
    //Show Client Company
    .then(response => response.json())
    .then(json => {
      console.log(json);
      if (json.fields['Yritys']) {
        company.textContent = json.fields['Yritys'];
      } else {
        company.parentElement.classList.add('hidden');
      }
    })
     //Show Client Company Id
     .then(response => response.json())
     .then(json => {
       console.log(json);
       if (json.fields['Y-tunnus']) {
         companyId.textContent = json.fields['Y-tunnus'];
       } else {
         companyId.parentElement.classList.add('hidden');
       }
     })
     //Show Client Address
     .then(response => response.json())
     .then(json => {
       console.log(json);
       if (json.fields['Osoite']) {
         companyAddress.textContent = json.fields['Osoite'];
       } else {
         companyAddress.parentElement.classList.add('hidden');
       }
     })
     //Show Client Address
     .then(response => response.json())
     .then(json => {
       console.log(json);
       if (json.fields['Osoite']) {
         companyAddress.textContent = json.fields['Osoite'];
       } else {
         companyAddress.parentElement.classList.add('hidden');
       }
     })
      // Show Client Contact Name
      .then(response => response.json())
      .then(json => {
        console.log(json);
        if (json.fields['Yhteyshenkilö']) {
          companyPerson.textContent = json.fields['Yhteyshenkilö'];
        } else {
          companyPerson.parentElement.classList.add('hidden');
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
