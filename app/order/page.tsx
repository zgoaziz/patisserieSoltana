"use client";
import { useState } from "react";
import { useCart } from "@/components/cart-context";

export default function OrderPage() {
  const { items, total, clearCart } = useCart();
  const [form, setForm] = useState({ name: "", phone: "", address: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      // Générer le message WhatsApp
      const message =
        `Nouvelle commande Soltana\n` +
        `Nom: ${form.name}\n` +
        `Téléphone: ${form.phone}\n` +
        `Adresse: ${form.address}\n` +
        `---\n` +
        items.map((item) => `• ${item.name} x${item.quantity} - ${(item.price * item.quantity).toFixed(2)}dt`).join("\n") +
        `\nTotal: ${total.toFixed(2)}dt\nPaiement: Sur place`;
      clearCart();
      // Redirection WhatsApp (format international pour la Tunisie)
      window.location.href = `https://wa.me/21656170165?text=${encodeURIComponent(message)}`;
    } catch (err: any) {
      setError("Erreur lors de la préparation de la commande.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-16 px-4 max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-navy mb-6 text-center">Valider la commande</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Nom" required className="w-full border p-2 rounded" value={form.name} onChange={handleChange} />
        <input name="phone" placeholder="Téléphone" required className="w-full border p-2 rounded" value={form.phone} onChange={handleChange} />
        <input name="address" placeholder="Adresse" required className="w-full border p-2 rounded" value={form.address} onChange={handleChange} />
        <button type="submit" className="w-full bg-gold text-white py-2 rounded font-semibold hover:bg-gold/90 transition" disabled={loading}>
          {loading ? "Préparation..." : "Valider et envoyer sur WhatsApp"}
        </button>
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
      </form>
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-2">Récapitulatif</h2>
        <ul className="mb-2">
          {items.map((item) => (
            <li key={item.id} className="flex justify-between text-sm mb-1">
              <span>{item.name} x{item.quantity}</span>
              <span>{(item.price * item.quantity).toFixed(2)}dt</span>
            </li>
          ))}
        </ul>
        <div className="flex justify-between font-bold text-navy">
          <span>Total</span>
          <span>{total.toFixed(2)}dt</span>
        </div>
      </div>
    </div>
  );
}