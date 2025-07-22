"use client";

import { useEffect, useState } from "react";
import { getServices } from "@/lib/getServices";
import { deleteService, updateService } from "@/lib/services";
import Image from "next/image";
import { ClipLoader } from "react-spinners";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "@/firebase/config"; // Adjust if you export auth from another file
import Link from "next/link";

const SpaServices = () => {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
  });

  useEffect(() => {
    const fetchServices = async () => {
      const data = await getServices();
      setServices(data);
      setLoading(false);
    };

    fetchServices();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteService(id);
    setServices(services.filter((s) => s.id !== id));
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

    setServices(
      services.map((s) => (s.id === editingId ? { ...s, ...formData } : s))
    );
    setEditingId(null);
    setFormData({ name: "", description: "", price: "" });
  };

  useEffect(() => {
    const auth = getAuth(app);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
        if (
          process.env.NEXT_PUBLIC_ADMIN_EMAIL &&
          user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL
        ) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } else {
        setUserEmail(null);
        setIsAdmin(false);
      }
    });

    return () => unsubscribe(); // Clean up listener
  }, []);

  if (loading)
    return (
      <p className="w-[100vw] h-[100vh] flex items-center justify-center">
        <ClipLoader color="#164E63" size={50} />
      </p>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-center p-4">
      {services.map((service) => (
        <div
          className="relative flex justify-center overflow-hidden md:w-[14rem] lg:w-[18rem] xl:w-[23rem] h-[500px]"
          key={service.id}
        >
          <Image
            src={service.imageUrl}
            alt={service.name}
            width={400}
            height={500}
            className="object-cover w-full h-full transition-transform duration-300 transform hover:scale-105"
          />
          <div className="w-[15rem] md:w-[350px] h-[270px] absolute bottom-6 bg-white flex flex-col gap-2 justify-center items-center p-4">
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
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Description"
                  className="border p-1 w-full"
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
                <h3 className="text-xl font-semibold">{service.name}</h3>
                <p className="font-thin text-center">{service.description}</p>
                <span>${service.price}.00 CAD</span>
              </>
            )}
            {isAdmin ? (
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleEdit(service)}
                  className="bg-blue-700 text-white text-sm hidden md:block hover:bg-cyan-700 transition duration-300 px-4 py-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(service.id)}
                  className="bg-red-700 text-white text-sm hidden md:block hover:bg-cyan-700 transition duration-300 px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            ) : (
              <Link
                className="text-white hidden md:block bg-cyan-900 hover:bg-cyan-700 transition duration-300 px-4 py-2 rounded"
                href="services"
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
