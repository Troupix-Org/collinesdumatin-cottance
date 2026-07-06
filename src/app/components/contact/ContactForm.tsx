"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Button } from "@/app/components/ui/button";

type FormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
  dates?: string;
  phone?: string;
};

const FORM_ENDPOINT = "https://formsubmit.co/ajax/contact@collinesdumatin-cottance.fr";
const CONTACT_EMAIL = "contact@collinesdumatin-cottance.fr";
const RECAPTCHA_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || "";

function openMailtoDialog(data: FormValues) {
  const subject = data.subject || "Message depuis le site";
  const body = [
    `Nom: ${data.name}`,
    `Email: ${data.email}`,
    data.phone ? `Téléphone: ${data.phone}` : null,
    data.dates ? `Dates souhaitées: ${data.dates}` : null,
    "",
    data.message,
  ]
    .filter(Boolean)
    .join("\r\n");

  const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailto;
}

async function loadRecaptcha(siteKey: string) {
  if (!siteKey) return null;
  // @ts-ignore
  if ((window as any).grecaptcha) return (window as any).grecaptcha;

  return new Promise<any>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      // @ts-ignore
      if ((window as any).grecaptcha) resolve((window as any).grecaptcha);
      else reject(new Error("grecaptcha not available"));
    };
    script.onerror = () => reject(new Error("Failed to load reCAPTCHA"));
    document.head.appendChild(script);
  });
}

export default function ContactForm() {
  const methods = useForm<FormValues>({
    defaultValues: { name: "", email: "", subject: "", message: "", dates: "", phone: "" },
  });
  const [sending, setSending] = useState(false);

  const onSubmit = async (data: FormValues) => {
    setSending(true);

    try {
      let token: string | undefined;
      if (RECAPTCHA_KEY) {
        const grecaptcha = await loadRecaptcha(RECAPTCHA_KEY);
        if (grecaptcha) {
          token = await grecaptcha.execute(RECAPTCHA_KEY, { action: "submit" });
        }
      }

      const fd = new FormData();
      fd.append("name", data.name);
      fd.append("email", data.email);
      fd.append("subject", data.subject || "Message depuis le site");
      fd.append("message", data.message);
      fd.append("dates", data.dates || "");
      fd.append("phone", data.phone || "");
      if (token) fd.append("recaptcha_token", token);

      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: fd,
      });

      const json = await res.json().catch(() => null);
      const apiMessage = json?.message || "Erreur réseau";
      const apiSuccess = json?.success;

      if (!res.ok || apiSuccess === false || apiSuccess === "false") {
        throw new Error(apiMessage);
      }

      toast.success("Message envoyé — merci !");
      methods.reset();
    } catch (err) {
      console.error(err);
      toast.error("Impossible d'envoyer le message. Ouverture du client mail...");
      openMailtoDialog(data);
    } finally {
      setSending(false);
    }
  };

  return (
    <Form {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={methods.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input placeholder="Votre nom" {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={methods.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adresse e-mail</FormLabel>
              <FormControl>
                <Input type="email" placeholder="exemple@domaine.fr" {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={methods.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sujet</FormLabel>
              <FormControl>
                <Input placeholder="Sujet" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={methods.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea placeholder="Votre message" {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={methods.control}
            name="dates"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dates (optionnel)</FormLabel>
                <FormControl>
                  <Input placeholder="Dates souhaitées" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={methods.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Téléphone (optionnel)</FormLabel>
                <FormControl>
                  <Input placeholder="Téléphone" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="pt-2 space-y-3">
          <Button type="submit" className="w-full" disabled={sending}>
            {sending ? "Envoi…" : "Envoyer le message"}
          </Button>
          <button
            type="button"
            onClick={() => openMailtoDialog(methods.getValues())}
            className="w-full rounded-sm border border-border bg-background px-4 py-3 text-sm text-foreground transition-colors hover:bg-muted"
          >
            Envoyer un e-mail directement
          </button>
        </div>
      </form>
    </Form>
  );
}
