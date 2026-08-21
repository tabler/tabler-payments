# @tabler/payments-astro

Payment provider logos as Astro components — one tree-shakable component per provider, plus a dynamic lookup by slug for data-driven lists.

Renders server-side only, with no client-side hydration — the same as any other `.astro` component.

> **Pre-1.0.** API may still change.

## Install

```bash
pnpm add @tabler/payments-astro astro
```

(`npm install` / `yarn add` work the same way.) Requires Astro `>=7.2.4 <8.0.0`.

## Usage

Import the provider you need by name:

```astro
---
import { PaymentVisa } from '@tabler/payments-astro';
---

<PaymentVisa variant="dark" size={32} />
```

### Rendering by slug

When the provider isn't known ahead of time — for example, rendering a row of accepted payment methods from an array of slugs — use the dynamic `Payment` component instead of importing every provider by name:

```astro
---
import { Payment } from '@tabler/payments-astro';
import payments from '@tabler/payments-astro/payments.json'; // or your own list of slugs
---

{payments.map((p) => <Payment provider={p.logo} variant="dark" size={32} />)}
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `'light' \| 'dark'` | `'light'` | Which pre-baked color variant to render. |
| `size` | `string \| number` | `24` | Sets the SVG height. Width is derived from the provider's fixed 5:3 aspect ratio, unless you also pass an explicit `width`. |
| `title` | `string` | — | Adds an accessible `<title>` element inside the SVG. |
| ...rest | any SVG attribute | — | Any other standard SVG attribute (`class`, `stroke-width`, ...) is forwarded to the root `<svg>`. |

The dynamic `Payment` component additionally requires:

| Prop | Type | Description |
| --- | --- | --- |
| `provider` | one of the slugs in the table below | Which provider to render. |

## Providers

Component names below are also the named exports of this package.

<details>
<summary>Show all 100 providers</summary>

| Name | Slug | Component |
| --- | --- | --- |
| 2c2p | `2c2p` | `Payment2c2p` |
| 2checkout | `2checkout` | `Payment2checkout` |
| Adyen | `adyen` | `PaymentAdyen` |
| Affirm | `affirm` | `PaymentAffirm` |
| Alipay Plus | `alipay-plus` | `PaymentAlipayPlus` |
| Alipay | `alipay` | `PaymentAlipay` |
| Allegro Pay | `allegro-pay` | `PaymentAllegroPay` |
| Amazon Pay | `amazon-pay` | `PaymentAmazonPay` |
| Amazon | `amazon` | `PaymentAmazon` |
| American Express | `americanexpress` | `PaymentAmericanexpress` |
| Apple Pay | `applepay` | `PaymentApplepay` |
| Authorize | `authorize` | `PaymentAuthorize` |
| Autopay | `autopay` | `PaymentAutopay` |
| Bancontact | `bancontact` | `PaymentBancontact` |
| Binance USD | `binance-usd` | `PaymentBinanceUsd` |
| Bitcoin | `bitcoin` | `PaymentBitcoin` |
| BitPay | `bitpay` | `PaymentBitpay` |
| Bkash | `bkash` | `PaymentBkash` |
| Blik | `blik` | `PaymentBlik` |
| Braintree | `braintree` | `PaymentBraintree` |
| Cash App | `cash-app` | `PaymentCashApp` |
| Chime | `chime` | `PaymentChime` |
| Cirrus | `cirrus` | `PaymentCirrus` |
| ClickandBuy | `clickandbuy` | `PaymentClickandbuy` |
| Coinkite | `coinkite` | `PaymentCoinkite` |
| Diners Club | `dinersclub` | `PaymentDinersclub` |
| Direct Debit | `directdebit` | `PaymentDirectdebit` |
| Discover | `discover` | `PaymentDiscover` |
| Dotpay | `dotpay` | `PaymentDotpay` |
| Dwolla | `dwolla` | `PaymentDwolla` |
| EasyPaisa | `easypaisa` | `PaymentEasypaisa` |
| eBay | `ebay` | `PaymentEbay` |
| Elo | `elo` | `PaymentElo` |
| ePayco | `epayco` | `PaymentEpayco` |
| Ethereum | `ethereum` | `PaymentEthereum` |
| eWay | `eway` | `PaymentEway` |
| Giropay | `giropay` | `PaymentGiropay` |
| Google Pay | `google-pay` | `PaymentGooglePay` |
| HubSpot | `hubspot` | `PaymentHubspot` |
| Ingenico | `ingenico` | `PaymentIngenico` |
| JCB | `jcb` | `PaymentJcb` |
| Klarna | `klarna` | `PaymentKlarna` |
| Laser | `laser` | `PaymentLaser` |
| Litecoin | `litecoin` | `PaymentLitecoin` |
| Maestro | `maestro` | `PaymentMaestro` |
| Mastercard | `mastercard` | `PaymentMastercard` |
| Mercado Pago | `mercado-pago` | `PaymentMercadoPago` |
| MetaMask | `metamask` | `PaymentMetamask` |
| MIR | `mir` | `PaymentMir` |
| Monero | `monero` | `PaymentMonero` |
| MoneyGram | `moneygram` | `PaymentMoneygram` |
| Neteller | `neteller` | `PaymentNeteller` |
| Ogone | `ogone` | `PaymentOgone` |
| OKPay | `okpay` | `PaymentOkpay` |
| OpenSea | `opensea` | `PaymentOpensea` |
| Paybox | `paybox` | `PaymentPaybox` |
| Payconiq | `payconiq` | `PaymentPayconiq` |
| Payka | `payka` | `PaymentPayka` |
| Payline | `payline` | `PaymentPayline` |
| Paymill | `paymill` | `PaymentPaymill` |
| Payone | `payone` | `PaymentPayone` |
| Payoneer | `payoneer` | `PaymentPayoneer` |
| PayPal | `paypal` | `PaymentPaypal` |
| PayPo | `paypo` | `PaymentPaypo` |
| Paysafe | `paysafe` | `PaymentPaysafe` |
| Paysafecard | `paysafecard` | `PaymentPaysafecard` |
| PayU | `payu` | `PaymentPayu` |
| Payza | `payza` | `PaymentPayza` |
| Poli | `poli` | `PaymentPoli` |
| Przelewy24 | `przelewy24` | `PaymentPrzelewy24` |
| Revolut Pay | `revolut-pay` | `PaymentRevolutPay` |
| Ripple | `ripple` | `PaymentRipple` |
| Sage | `sage` | `PaymentSage` |
| Samsung Pay | `samsung-pay` | `PaymentSamsungPay` |
| SEPA | `sepa` | `PaymentSepa` |
| Shop Pay | `shop-pay` | `PaymentShopPay` |
| Shopify | `shopify` | `PaymentShopify` |
| Skrill | `skrill` | `PaymentSkrill` |
| Solana | `solana` | `PaymentSolana` |
| Solo | `solo` | `PaymentSolo` |
| Spingo | `spingo` | `PaymentSpingo` |
| Square | `square` | `PaymentSquare` |
| Stax | `stax` | `PaymentStax` |
| Stripe | `stripe` | `PaymentStripe` |
| Switch | `switch` | `PaymentSwitch` |
| Tether | `tether` | `PaymentTether` |
| Tpay | `tpay` | `PaymentTpay` |
| True USD | `true-usd` | `PaymentTrueUsd` |
| Ukash | `ukash` | `PaymentUkash` |
| UnionPay | `unionpay` | `PaymentUnionpay` |
| Venmo | `venmo` | `PaymentVenmo` |
| Verifone | `verifone` | `PaymentVerifone` |
| Verisign | `verisign` | `PaymentVerisign` |
| Visa | `visa` | `PaymentVisa` |
| WeChat Pay | `we-chat-pay` | `PaymentWeChatPay` |
| WebMoney | `webmoney` | `PaymentWebmoney` |
| Western Union | `westernunion` | `PaymentWesternunion` |
| Wise | `wise` | `PaymentWise` |
| Worldpay | `worldpay` | `PaymentWorldpay` |
| Zelle | `zelle` | `PaymentZelle` |

</details>

## A note on stability

This package hand-builds the shape Astro normally compiles from a `.astro` file, using `astro/compiler-runtime` — an internal, unpublished API. It's pinned to work against `astro@7.2.4` specifically; if you're on a different 7.x version and hit a build error here, that's the most likely cause.

## License

tabler-payments is licensed under the [MIT License](https://github.com/tabler/tabler-payments/blob/main/LICENSE).
