import Airtable from './node_modules/';

export function accept(recordId) {
  var base = new Airtable({ apiKey: 'pat1RtV5lnkmrmHe6.205f0ee286b0170781ae33331af81c076ca48461c448723e692f9d8a1991b030' }).base('app6plHG3XaIeXYUe');

  base('Tarjoukset').update([
    {
      "id": recordId,
      "fields": {
        "Otsikko": "CoreHW Oy",
        "Saateviesti": "Kiitos kiinnostuksestanne!",
        "Asiakas": [
          "recqdldVECMVMmCDG"
        ],
        "Tarjousrivit": [
          "reczv7mujRLKycW73",
          "rec0A7mT4yokEsMsY"
        ],
        "Tila": "Hyväksytty"
      }
    }
  ], function (err, records) {
    if (err) {
      console.error(err);
      return;
    }
    records.forEach(function (record) {
      console.log(record.get('Saateviesti'));
    });
  });
}
