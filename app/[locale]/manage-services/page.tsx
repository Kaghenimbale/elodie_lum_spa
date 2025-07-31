"use client";

import { useState, FormEvent } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase/config";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function UploadPage() {
  const t = useTranslations("upload");

  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Add separate fields for English and French
  const [form, setForm] = useState({
    name_en: "",
    name_fr: "",
    price: "",
    description_en: "",
    description_fr: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) {
      setMessage(t("fileRequired"));
      return;
    }

    setLoading(true);
    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64String = reader.result?.toString();
      if (!base64String) {
        setMessage(t("uploadError"));
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/upload-image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            file: base64String,
            fileName: file.name,
          }),
        });

        const data = await response.json();

        if (response.ok && data.url) {
          setImageUrl(data.url);

          // Save all data including imageUrl to Firestore
          await addDoc(collection(db, "services"), {
            ...form,
            imageUrl: data.url,
            createdAt: new Date(),
          });

          router.push("/services");
          setMessage(t("successMessage"));
          setForm({
            name_en: "",
            name_fr: "",
            price: "",
            description_en: "",
            description_fr: "",
          });
          setFile(null);
        } else {
          console.error("Upload Error:", data);
          setMessage(
            t("uploadFailed") + (data.error?.message || "Unknown error")
          );
        }
      } catch (err) {
        console.error("Submit Error:", err);
        setMessage(t("uploadError"));
      }

      setLoading(false);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="p-6 border rounded-lg shadow-lg w-full max-w-md space-y-4 bg-white"
      >
        <h2 className="text-xl font-semibold">{t("title")}</h2>

        <input
          type="text"
          name="name_en"
          placeholder={t("namePlaceholderEn")}
          value={form.name_en}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          name="name_fr"
          placeholder={t("namePlaceholderFr")}
          value={form.name_fr}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <input
          type="number"
          name="price"
          placeholder={t("pricePlaceholder")}
          value={form.price}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <textarea
          name="description_en"
          placeholder={t("descriptionPlaceholderEn")}
          value={form.description_en}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <textarea
          name="description_fr"
          placeholder={t("descriptionPlaceholderFr")}
          value={form.description_fr}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          required
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-cyan-700 text-white py-2 rounded hover:bg-cyan-800"
        >
          {loading ? t("uploading") : t("submit")}
        </button>

        {message && <p className="text-sm text-center">{message}</p>}
      </form>
    </div>
  );
}
