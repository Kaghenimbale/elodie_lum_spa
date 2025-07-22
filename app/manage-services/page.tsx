// "use client";

// import { FormEvent, useState } from "react";
// import { db } from "@/firebase/config";
// import { addDoc, collection } from "firebase/firestore";

// const page = () => {
//   const [data, setData] = useState({
//     name: "",
//     price: "",
//     description: "",
//   });
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setData({ ...data, [e.target.name]: e.target.value });
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) setImageFile(file);
//   };

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     if (!imageFile) return alert("Please choose an image");

//     const reader = new FileReader();

//     reader.onloadend = async () => {
//       const base64DataUrl = reader.result as string;
//       const base64 = base64DataUrl.split(",")[1]; // remove "data:image/jpeg;base64,"

//       const res = await fetch("/api/upload-image", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           image: base64,
//           fileName: "example.jpg",
//         }),
//       });

//       const result = await res.json();

//       if (!res.ok) {
//         console.error("Upload Error:", result);
//         return;
//       }

//       console.log("Image URL:", result.url);
//     };

//     reader.readAsDataURL(imageFile);
//   };

//   return (
//     <div className="w-[100vw] h-[100vh] flex items-center justify-center">
//       <form
//         onSubmit={handleSubmit}
//         className="flex flex-col gap-4 w-full max-w-md mx-auto mt-10 p-4 border rounded"
//       >
//         <h2 className="text-2xl font-semibold">Add New Service</h2>

//         <input
//           type="text"
//           name="name"
//           placeholder="Service Name"
//           value={data.name}
//           onChange={handleChange}
//           required
//           className="p-2 border"
//         />

//         <input
//           type="number"
//           name="price"
//           placeholder="Price"
//           value={data.price}
//           onChange={handleChange}
//           required
//           className="p-2 border"
//         />

//         <input
//           type="text"
//           name="description"
//           placeholder="Description"
//           value={data.description}
//           onChange={handleChange}
//           required
//           className="p-2 border"
//         />

//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleImageChange}
//           required
//           className="p-2 border"
//         />

//         <button
//           type="submit"
//           disabled={loading}
//           className="bg-cyan-800 text-white py-2 rounded hover:bg-cyan-700"
//         >
//           {loading ? "Uploading..." : "Submit"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default page;

"use client";

import { useState, FormEvent } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase/config";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) return alert("Please select a file");

    setLoading(true);
    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64String = reader.result?.toString();
      if (!base64String) return;

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

          setMessage("✅ Service and image uploaded successfully!");
          setForm({ name: "", price: "", description: "" });
          setFile(null);
        } else {
          console.error("Upload Error:", data);
          setMessage(
            "❌ Upload failed: " + data.error?.message || "Unknown error"
          );
        }
      } catch (err) {
        console.error("Submit Error:", err);
        setMessage("❌ Error while uploading");
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
        <h2 className="text-xl font-semibold">Add New Service</h2>

        <input
          type="text"
          name="name"
          placeholder="Service Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
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
          {loading ? "Uploading..." : "Submit"}
        </button>

        {message && <p className="text-sm text-center">{message}</p>}
      </form>
    </div>
  );
}
