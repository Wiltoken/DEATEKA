"use client";

import { useState } from "react";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactoPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Contacto</h1>
      <p className="text-muted mb-10">
        ¿Tenés una pregunta o necesitás ayuda con tu pedido? Escribinos.
      </p>

      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="border border-border bg-card p-6">
              <Mail size={20} className="text-primary mb-3" />
              <h3 className="font-semibold text-sm mb-1">Email</h3>
              <p className="text-sm text-muted">hola@deateka.com</p>
            </div>
            <div className="border border-border bg-card p-6">
              <Phone size={20} className="text-primary mb-3" />
              <h3 className="font-semibold text-sm mb-1">Teléfono</h3>
              <p className="text-sm text-muted">+57 300 123 4567</p>
            </div>
            <div className="border border-border bg-card p-6">
              <MapPin size={20} className="text-primary mb-3" />
              <h3 className="font-semibold text-sm mb-1">Ubicación</h3>
              <p className="text-sm text-muted">Colombia</p>
            </div>
            <div className="border border-border bg-card p-6">
              <Clock size={20} className="text-primary mb-3" />
              <h3 className="font-semibold text-sm mb-1">Horario</h3>
              <p className="text-sm text-muted">Lun a Vie · 9:00 – 18:00</p>
            </div>
          </div>
        </div>

        <div className="border border-border bg-card p-6">
          {sent ? (
            <div className="text-center py-16">
              <h3 className="font-semibold text-lg mb-2">¡Mensaje enviado!</h3>
              <p className="text-sm text-muted">
                Gracias por escribirnos. Te respondemos en breve.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="space-y-4"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">Nombre</label>
                  <input
                    type="text"
                    required
                    className="w-full border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Email</label>
                  <input
                    type="email"
                    required
                    className="w-full border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm mb-1">Mensaje</label>
                <textarea
                  required
                  rows={5}
                  className="w-full border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors"
                  placeholder="¿En qué podemos ayudarte?"
                />
              </div>
              <Button type="submit" className="w-full">
                Enviar mensaje
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
