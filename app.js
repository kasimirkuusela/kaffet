// Import
// import { accept } from './functions/accept.js'; // TO DO


//Data
const urlParams = new URLSearchParams(window.location.search);
const recordId = urlParams.get('id'); // Retrieve the value of 'id' parameter from the URL

const base = "app6plHG3XaIeXYUe";
const quotesTable = "tblbF4yTrmWH7Mqgv"; // Get Quotes
const productsTable = "tblaEruyBrG3GZpOs"; // Get Products
const linesTable = "tblFxXEAKeBm6RvOx"; // Get Products
// const recordId = "recQ5czZ0oDDoyrbU"; // Use CMS field here

// Elements
const quoteTitle = document.querySelector('[k-el="quoteTitle"]'); // Quote Title
const quoteDescription = document.querySelector('[k-el="quoteDescription"]'); // Quote Description
const company = document.querySelector('[k-el="clientCompany"]'); // Company Name
const companyId = document.querySelector('[k-el="clientCompanyId"]'); // Company Id
const companyAddress = document.querySelector('[k-el="clientAddress"]'); // Company Address
const companyPerson = document.querySelector('[k-el="clientName"]'); // Company Contact Person Name
const template = document.querySelector('[k-el="lineItem"]'); // Get the template element
const lineItems = document.querySelector('[k-el="lineItemsWrapper"]'); // Line Items Wrapper
const lineItemsContainer = lineItems.parentNode; // Use parentNode directly
const quoteTotal = document.querySelector('[k-el="quoteTotal"]');
const quoteLeasingTotal = document.querySelector('[k-el="leasingTotal"]');
const leasingPeriod = document.querySelector('[k-el="leasingPeriod"]');
const contactPerson = document.querySelector('[k-el="contactPerson"]');

const loader = document.querySelector('[k-el="pageLoader"]'); // Page Loader

const acceptBtn = document.querySelector('[k-el="acceptBtn"]');

  // Hide the template card initially
  template.classList.add('hidden');

// Replace Base ID, TABLE & API key
window.onload = function() {
  fetch('https://api.airtable.com/v0/' + base + '/' + quotesTable + '/' + recordId, {
    headers: {
      'Authorization': 'Bearer pat1RtV5lnkmrmHe6.205f0ee286b0170781ae33331af81c076ca48461c448723e692f9d8a1991b030'
    }
  })
    .then(response => response.json())
    .then(json => {
      console.log(json);
      if (json.fields['Otsikko']) {
        quoteTitle.textContent = json.fields['Otsikko'];
      } else {
        quoteTitle.parentElement.classList.add('hidden');
      }
      if (json.fields['Saateviesti']) {
        quoteDescription.textContent = json.fields['Saateviesti'];
      } else {
        quoteDescription.parentElement.classList.add('hidden');
      }
      if (json.fields['Yritys']) {
        company.textContent = json.fields['Yritys'];
      } else {
        company.parentElement.classList.add('hidden');
      }
      if (json.fields['Y-tunnus']) {
        companyId.textContent = json.fields['Y-tunnus'];
      } else {
        companyId.parentElement.classList.add('hidden');
      }
      if (json.fields['Osoite']) {
        companyAddress.textContent = json.fields['Osoite'];
      } else {
        companyAddress.parentElement.classList.add('hidden');
      }
      if (json.fields['Yhteyshenkilö']) {
        companyPerson.textContent = json.fields['Yhteyshenkilö'];
      } else {
        companyPerson.parentElement.classList.add('hidden');
      }
      if (json.fields['Yhteensä']) {
        quoteTotal.textContent = json.fields['Yhteensä'];
      } else {
        quoteTotal.parentElement.classList.add('hidden');
      }
      if (json.fields['Leasinghinta yhteensä']) {
        quoteLeasingTotal.textContent = json.fields['Leasinghinta yhteensä'];
      } else {
        quoteLeasingTotal.parentElement.classList.add('hidden');
      }
      if (json.fields['Sopimuskausi']) {
        leasingPeriod.textContent = json.fields['Sopimuskausi'];
      } else {
        leasingPeriod.parentElement.classList.add('hidden');
      }
      if (json.fields['Myyjä']) {
        contactPerson.textContent = json.fields['Myyjä'].name;
      } else {
        contactPerson.parentElement.classList.add('hidden');
      }
      loader.classList.add('hidden');
      console.log("Content loaded");
    })
    .catch(error => {
      console.error(error);
    });
   
  // GET QUOTE LINE ITEMS
fetch('https://api.airtable.com/v0/app6plHG3XaIeXYUe/Tarjousrivit?filterByFormula=%7Bquote%7D%3D%22' + recordId + '%22', {
    headers: {
      'Authorization': 'Bearer pat1RtV5lnkmrmHe6.205f0ee286b0170781ae33331af81c076ca48461c448723e692f9d8a1991b030'
    }
  })
  .then(response => response.json())
  .then(json => {
    console.log(json);

    json.records.forEach((item, index) => {
        if (index < lineItemsContainer.children.length) {
          const newItem = template.cloneNode(true); // Clone the template element
          newItem.removeAttribute('k-el'); // Remove the 'k-el' attribute from the cloned element to prevent conflicts
          newItem.classList.remove('hidden'); // Remove the 'hidden' class from the cloned element
          newItem.querySelector('[k-el="itemTitle"]').textContent = item.fields['Tuotteen nimi']; // Product Title
          newItem.querySelector('[k-el="itemDescription"]').textContent = item.fields['Kuvaus']; // Product Description
          newItem.querySelector('[k-el="itemPrice"]').textContent = item.fields['Hinta']; // Product Price
          newItem.querySelector('[k-el="itemTotal"]').textContent = item.fields['Yhteensä']; // Product Price Total With Add-Ons
          newItem.querySelector('[k-el="itemLeasingPrice"]').textContent = item.fields['Leasing yhteensä']; // Total Line Item Leasing Cost
          newItem.querySelector('[k-el="itemGuarantee"]').textContent = item.fields['Takuu']; // Product Guarantee
          newItem.querySelector('[k-el="addOnsTotal"]').textContent = item.fields['Lisävarusteet yhteensä']; // Add-Ons Total Price
          newItem.querySelector('[k-el="maintenance"]').textContent = item.fields['Huoltosopimus']; // Add-Ons Total Price
          newItem.querySelector('[k-el="amount"]').textContent = item.fields['Määrä']; // Quantity
          // Set the image source
        const itemImg = newItem.querySelector('[k-el="itemImg"]');
        itemImg.src = item.fields['Pääkuva'][0].url;

        // Display add-ons
      const addOnsContainer = newItem.querySelector('[k-el="addOns"]');
      const addOns = item.fields['Optiot'];
      const addOnPrices = item.fields['Myyntihinta (from Optiot)'];
      const addOnNames = item.fields['Nimi (from Optiot)'];

      for (let i = 0; i < addOns.length; i++) {
        const addOnItem = document.createElement('div');
        addOnItem.textContent = addOnNames[i] + ' (' + addOnPrices[i] + '€ )';
        addOnsContainer.appendChild(addOnItem);
      }

          lineItems.appendChild(newItem); // Append the cloned element to the parent container of lineItems
        }
      });
    });
};



