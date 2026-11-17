"use client";
import { useState, useRef } from "react";
import Icon from "./icon";
const configuredId = process.env.NEXT_PUBLIC_FORMSPREE_ID || "";
const formId = /^[a-z0-9]{6,32}$/i.test(configuredId) ? configuredId : "";
export default function ContactForm() {
  const [status, setStatus] = useState("idle");
  const busy = useRef(false);
  async function submit(event) {
    event.preventDefault();
    if (busy.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    if (!formId) {
      window.location.href = `mailto:wazahahmad4@gmail.com?subject=${encodeURIComponent("Website enquiry from " + data.get("name"))}&body=${encodeURIComponent(data.get("message") + "\n\nFrom: " + data.get("name") + "\nEmail: " + data.get("email"))}`;
      return;
    }
    busy.current = true;
    setStatus("sending");
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch("https://formspree.io/f/" + formId, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
        signal: controller.signal,
      });
      if (!response.ok) throw new Error("Submission failed");
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    } finally {
      clearTimeout(timeout);
      busy.current = false;
    }
  }
  return (
    <form onSubmit={submit} aria-busy={status === "sending"}>
      <label>
        Your name
        <span className="input-wrap">
          <Icon name="user" size={16} />
          <input
            name="name"
            placeholder="What should I call you?"
            autoComplete="name"
            required
            maxLength={100}
          />
        </span>
      </label>
      <label>
        Email address
        <span className="input-wrap">
          <Icon name="mail" size={16} />
          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            required
            maxLength={200}
          />
        </span>
      </label>
      <label>
        Message
        <span className="input-wrap">
          <Icon name="message" size={16} />
          <textarea
            name="message"
            placeholder="Tell me a little about your idea…"
            rows={5}
            required
            maxLength={5000}
          />
        </span>
      </label>
      <div className="form-honeypot" aria-hidden="true">
        <label>
          Leave this field empty
          <input name="_gotcha" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <button
        className="button primary"
        type="submit"
        disabled={status === "sending"}
      >
        <Icon name="send" size={17} />
        {status === "sending"
          ? "Sending…"
          : formId
            ? "Send message"
            : "Compose email"}
      </button>
      <small className="form-note">
        {formId
          ? "Your message is sent directly to my inbox."
          : "Opens your email app with your message ready to send."}
      </small>

      <div
        className="form-status"
        role={status === "error" ? "alert" : "status"}
        aria-live="polite"
      >
        {status === "sent" ? (
          "Thank you! Your message has been sent."
        ) : status === "error" ? (
          <>
            Your message could not be sent. Please try again or{" "}
            <a href="mailto:wazahahmad4@gmail.com">email me directly</a>.
          </>
        ) : (
          ""
        )}
      </div>
    </form>
  );
}
