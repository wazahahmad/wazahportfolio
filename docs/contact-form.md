# Contact form email delivery

The form currently opens the visitor’s email app. Direct delivery is prepared but requires a Formspree form.

1. Create a form at https://formspree.io/ and use wazahahmad4@gmail.com as the recipient.
2. Verify that email address through Formspree.
3. Copy the public form ID from the endpoint (the part after /f/).
4. Set NEXT_PUBLIC_FORMSPREE_ID in Vercel’s Production environment, then redeploy. For local development, put it in .env.local.
5. Send a test enquiry and confirm receipt in Gmail before considering delivery verified.

The ID is public; do not add Gmail passwords, app passwords, or private API keys. The implementation includes a honeypot, loading state, timeout, honest success/error feedback, and a direct-email fallback. Configure spam protection and domain restrictions in Formspree for wazahahmad.vercel.app.
