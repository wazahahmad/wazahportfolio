# Contact form email delivery

The portfolio is connected to https://formspree.io/f/mnpddjpd. The recipient chosen in Formspree is wazahahmad4@gmail.com. The public form ID is included in the application; no Gmail password or private API key is needed.

Optional override: set NEXT_PUBLIC_FORMSPREE_ID in Vercel’s Production environment and redeploy. For local development, use .env.local.

The form includes a honeypot, a duplicate-submission guard, a loading state, a timeout, success/error feedback, and a direct-email fallback on failure. Formspree’s Formshield spam filtering is enabled. Recipient and submission settings are managed at https://formspree.io/forms/mnpddjpd/settings.

A successful API response confirms Formspree accepted the message. Confirm arrival in Gmail separately before claiming inbox delivery is verified.
