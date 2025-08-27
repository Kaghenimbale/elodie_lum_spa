"use client";

import { useState, useEffect, FormEvent } from "react";
import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase/config";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Dialog } from "@headlessui/react";

export default function UploadPage() {
  const t = useTranslations("upload");

  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [form, setForm] = useState({
    name_en: "",
    name_fr: "",
    price: "",
    description_en: "",
    description_fr: "",
  });

  const [services, setServices] = useState<any[]>([]);
  const [editingService, setEditingService] = useState<any | null>(null);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [deleteServiceId, setDeleteServiceId] = useState<string | null>(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const fetchServices = async () => {
    const querySnapshot = await getDocs(collection(db, "services"));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setServices(data);
  };

  useEffect(() => {
    fetchServices();
  }, []);

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
          fetchServices();
        } else {
          setMessage(
            t("uploadFailed") + (data.error?.message || "Unknown error")
          );
        }
      } catch (err) {
        setMessage(t("uploadError"));
      }

      setLoading(false);
    };

    reader.readAsDataURL(file);
  };

  const openUpdateModal = (service: any) => {
    setEditingService(service);
    setForm({
      name_en: service.name_en,
      name_fr: service.name_fr,
      price: service.price,
      description_en: service.description_en,
      description_fr: service.description_fr,
    });
    setImageUrl(service.imageUrl);
    setUpdateModalOpen(true);
  };

  const handleUpdate = async () => {
    if (!editingService) return;

    setLoading(true);
    let finalImageUrl = imageUrl;

    const saveUpdate = async () => {
      await updateDoc(doc(db, "services", editingService.id), {
        ...form,
        imageUrl: finalImageUrl,
      });
      setUpdateModalOpen(false);
      setEditingService(null);
      setForm({
        name_en: "",
        name_fr: "",
        price: "",
        description_en: "",
        description_fr: "",
      });
      setFile(null);
      setLoading(false);
      fetchServices();
    };

    if (file) {
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
            body: JSON.stringify({ file: base64String, fileName: file.name }),
          });
          const data = await response.json();
          if (response.ok && data.url) {
            finalImageUrl = data.url;
            saveUpdate();
          }
        } catch (err) {
          setLoading(false);
        }
      };
      reader.readAsDataURL(file);
    } else {
      await saveUpdate();
    }
  };

  const openDeleteModal = (id: string) => {
    setDeleteServiceId(id);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteServiceId) return;
    await deleteDoc(doc(db, "services", deleteServiceId));
    setDeleteModalOpen(false);
    setDeleteServiceId(null);
    fetchServices();
  };

  return (
    <div className="w-full min-h-screen p-4 flex flex-col items-center space-y-8 mt-36">
      {/* Add Service Form */}
      <form
        onSubmit={handleSubmit}
        className="p-6 border rounded-lg shadow-lg w-full max-w-md space-y-4 bg-white"
      >
        <h2 className="text-xl font-semibold">{t("title")}</h2>
        {/* Form Inputs */}
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

      {/* Services Table */}
      <div className="w-full max-w-4xl bg-white shadow rounded overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                {t("name")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                {t("price")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                {t("image")}
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                {t("actions")}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {services.map((service) => (
              <tr key={service.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{service.name_en}</td>
                <td className="px-6 py-4">${service.price}</td>
                <td className="px-6 py-4">
                  <img
                    src={service.imageUrl}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button
                    onClick={() => openUpdateModal(service)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    {t("edit")}
                  </button>
                  <button
                    onClick={() => openDeleteModal(service.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    {t("delete")}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Update Modal */}
      <Dialog
        open={isUpdateModalOpen}
        onClose={() => {
          setUpdateModalOpen(false);
          setEditingService(null);
          setForm({
            name_en: "",
            name_fr: "",
            price: "",
            description_en: "",
            description_fr: "",
          });
          setFile(null);
          setImageUrl("");
        }}
        className="fixed z-50 inset-0 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen px-4 relative">
          {/* Blur overlay */}
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-0" />

          <Dialog.Panel className="relative bg-white rounded-lg p-6 w-full max-w-md shadow-lg z-10">
            <Dialog.Title className="text-xl font-semibold mb-4">
              {t("updateService")}
            </Dialog.Title>
            {/* Form fields */}
            <input
              type="text"
              name="name_en"
              placeholder={t("namePlaceholderEn")}
              value={form.name_en}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="text"
              name="name_fr"
              placeholder={t("namePlaceholderFr")}
              value={form.name_fr}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="number"
              name="price"
              placeholder={t("pricePlaceholder")}
              value={form.price}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-2"
            />
            <textarea
              name="description_en"
              placeholder={t("descriptionPlaceholderEn")}
              value={form.description_en}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-2"
            />
            <textarea
              name="description_fr"
              placeholder={t("descriptionPlaceholderFr")}
              value={form.description_fr}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full p-2 border rounded mb-4"
            />

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => {
                  setUpdateModalOpen(false);
                  setEditingService(null);
                  setForm({
                    name_en: "",
                    name_fr: "",
                    price: "",
                    description_en: "",
                    description_fr: "",
                  });
                  setFile(null);
                  setImageUrl("");
                }}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                {t("cancel")}
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-cyan-700 text-white rounded hover:bg-cyan-800"
              >
                {loading ? t("saving") : t("save")}
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Delete Modal */}
      <Dialog
        open={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        className="fixed z-50 inset-0 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen px-4 relative">
          {/* Blur overlay */}
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-0" />

          <Dialog.Panel className="relative bg-white rounded-lg p-6 w-full max-w-sm shadow-lg z-10">
            <Dialog.Title className="text-lg font-semibold mb-4">
              {t("confirmDelete")}
            </Dialog.Title>
            <p className="mb-4">{t("deleteWarning")}</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                {t("cancel")}
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                {t("delete")}
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
