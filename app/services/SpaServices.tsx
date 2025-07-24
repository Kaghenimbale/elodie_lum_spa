"use client";

import { useEffect, useState } from "react";
import { getServices } from "@/lib/getServices";
import { deleteService, updateService } from "@/lib/services";
import Image from "next/image";
import { ClipLoader } from "react-spinners";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "@/firebase/config";
import Link from "next/link";

const SpaServices = () => {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
  });

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServices();
        setServices(data);
      } catch (err) {
        console.error("Error fetching services:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user?.email) {
        setUserEmail(user.email);
        if (process.env.NEXT_PUBLIC_ADMIN_EMAIL === user.email) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } else {
        setUserEmail(null);
        setIsAdmin(false);
      }
      setAuthChecked(true);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteService(id);
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  const handleEdit = (service: any) => {
    setEditingId(service.id);
    setFormData({
      name: service.name,
      description: service.description,
      price: service.price,
    });
  };

  const handleUpdate = async () => {
    if (!editingId) return;

    await updateService(editingId, formData);
    setServices((prev) =>
      prev.map((s) => (s.id === editingId ? { ...s, ...formData } : s))
    );

    setEditingId(null);
    setFormData({ name: "", description: "", price: "" });
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <ClipLoader color="#164E63" size={50} />
      </div>
    );
  }

  if (!services.length) {
    return (
      <div className="text-center mt-10 text-red-500">
        No services available. Please try again later.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-center p-4">
      {services.map((service) => (
        <div
          key={service.id}
          className="relative flex justify-center overflow-hidden w-full max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg h-[500px]"
        >
          <Image
            src={service.imageUrl}
            alt={service.name}
            width={400}
            height={500}
            className="object-cover w-full h-full transition-transform duration-300 transform hover:scale-105"
            loading="lazy"
          />

          <div className="absolute bottom-6 bg-white p-4 shadow-lg rounded-lg w-[90%] max-w-md mx-auto flex flex-col gap-2 justify-center items-center">
            {editingId === service.id ? (
              <>
                <input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Name"
                  className="border p-1 w-full"
                />
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                  placeholder="Description"
                  className="border p-1 w-full resize-none"
                  rows={4}
                />
                <input
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  placeholder="Price"
                  className="border p-1 w-full"
                />
                <button
                  onClick={handleUpdate}
                  className="bg-green-600 text-white px-2 py-1 rounded"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <h3 className="text-xl font-semibold text-center">
                  {service.name}
                </h3>
                <p className="text-sm text-center">{service.description}</p>
                <span className="text-center block">
                  ${service.price}.00 CAD
                </span>
              </>
            )}

            {authChecked && isAdmin ? (
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleEdit(service)}
                  className="bg-blue-700 text-white text-sm hover:bg-cyan-700 transition duration-300 px-4 py-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(service.id)}
                  className="bg-red-700 text-white text-sm hover:bg-red-600 transition duration-300 px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            ) : (
              <Link
                href="#contact-us"
                className="text-white bg-cyan-900 hover:bg-cyan-700 transition duration-300 px-4 py-2 rounded"
              >
                BOOK NOW
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SpaServices;
