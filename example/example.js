/* eslint-disable @typescript-eslint/no-var-requires */
const moneybird = require("@print-one/moneybird-js");

moneybird.instance.setOptions({
  api_token: process.env.MONEYBIRD_API_KEY,
});

(async () => {
  const administrations = await moneybird.instance.administrations();
  // console.log(administrations);
  for (const administration of administrations) {
    const taxes = await administration.filterTaxes({
      tax_rate_type: "sales_invoice",
      percentage: 21,
    });

    console.log(taxes);
  }
})().catch(console.log);
