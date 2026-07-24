/**
 * Config for the Partela "notify me" waitlist form.
 *
 * Submissions go to Web3Forms, a form-to-email relay: the browser POSTs the
 * visitor's address to their endpoint and they forward it to `NOTIFY_EMAIL` as
 * a normal email. No backend, no secrets — the access key is public by design
 * (it only says "deliver to that inbox"), which is why it lives in the repo.
 *
 * Emptying the key disables the form and falls the bell back to `mailto:`, so
 * the page never ships broken while a key is being rotated.
 */

/** Where waitlist signups and the mailto fallback are delivered. */
export const NOTIFY_EMAIL = "marianafes15@gmail.com";

/** Web3Forms access key. Empty = form disabled, mailto fallback shown. */
export const WEB3FORMS_ACCESS_KEY: string = "b682f838-8de5-4b97-85a4-bb02dce0ee9f";

export const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
