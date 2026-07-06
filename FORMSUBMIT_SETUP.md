Formsubmit.co setup

1) No server-side setup required for basic use.

2) The project posts AJAX to:

   https://formsubmit.co/ajax/contact@collinesdumatin-cottance.fr

   Replace the email in the URL if you prefer another recipient.

3) Formsubmit will send a confirmation to the recipient and may require a one-time confirmation click (check the recipient inbox).

4) reCAPTCHA (optional):
   - If you want client-side reCAPTCHA v3 protection, set `VITE_RECAPTCHA_SITE_KEY` in your build environment (this is optional and only for anti-spam token retrieval). The client will request a token and include it in the payload.
   - Full server-side verification requires a server to validate tokens with the secret key.

5) Notes:
   - No email service env vars are required for sending via Formsubmit.
   - Formsubmit exposes the recipient address in the request URL; if you want to hide it, consider moving to a serverless endpoint.

6) Testing:
   - Submit the form from the built site and check the recipient inbox and Formsubmit dashboard for incoming messages.
