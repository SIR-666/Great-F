import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  rectSortingStrategy
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import mooNewsStyles from "@/styles/mooNews.module.css";
import { API_URL3 as API_BASE } from "@/config/index";

export default function AddMooNewsPage() {
  const [values, setValues] = useState({
    Volume: "",
    Images: [], // array of { file, previewUrl }
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Handle input text
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image file
  // Handle multiple image files
  const handleImagesAdd = (e) => {
    const files = Array.from(e.target.files);
    setValues((prev) => ({
      ...prev,
      Images: [
        ...prev.Images,
        ...files.map((file) => ({
          file,
          previewUrl: URL.createObjectURL(file),
        })),
      ],
    }));
    e.target.value = null; // reset input
  };

  // Remove image by index
  const removeImage = (idx) => {
    setValues((prev) => {
      const images = [...prev.Images];
      // cleanup preview url
      if (images[idx]?.previewUrl) URL.revokeObjectURL(images[idx].previewUrl);
      images.splice(idx, 1);
      return { ...prev, Images: images };
    });
  };

  // dnd-kit sensors
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  // dnd-kit drag end handler
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setValues((prev) => {
        const oldIndex = prev.Images.findIndex((_, i) => `img-${i}` === active.id);
        const newIndex = prev.Images.findIndex((_, i) => `img-${i}` === over.id);
        return {
          ...prev,
          Images: arrayMove(prev.Images, oldIndex, newIndex),
        };
      });
    }
  };

  // Sortable image item for dnd-kit
  function SortableImage({ img, idx }) {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id: `img-${idx}` });
    return (
      <div
        ref={setNodeRef}
        style={{
          transform: CSS.Transform.toString(transform),
          transition,
          opacity: isDragging ? 0.5 : 1,
          zIndex: isDragging ? 99 : 1,
        }}
        className={mooNewsStyles["image-thumb"]}
        {...attributes}
        {...listeners}
      >
        <span className={mooNewsStyles["order-badge"]}>{idx + 1}</span>
        <img
          src={img.previewUrl}
          alt={`preview-${idx}`}
          className={mooNewsStyles["thumb-img"]}
        />
        <button
          type="button"
          className={mooNewsStyles["remove-btn"]}
          onClick={() => removeImage(idx)}
        >
          ×
        </button>
      </div>
    );
  }

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!values.Volume) {
      toast.error("Volume wajib diisi");
      return;
    }
    setLoading(true);
    try {
      // 1. Submit berita utama (Volume)
      const res = await fetch(`${API_BASE}/api/news`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Volume: values.Volume,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Gagal menambah berita");
      }

      // ambil NewsID dari response
      const newsId =
        data.NewsID ||
        data.newsId ||
        data.id ||
        (data.news && data.news.NewsID) ||
        (data.data && data.data.NewsID);

      if (!newsId) {
        throw new Error("Server tidak mengembalikan NewsID");
      }

      // 2. Upload gambar jika ada
      for (const img of values.Images) {
        if (!img.file) continue;
        const formData = new FormData();
        formData.append("image", img.file); // field name must be 'image'
        const uploadRes = await fetch(`${API_BASE}/api/news/${newsId}/images`, {
          method: "POST",
          body: formData,
        });
        let uploadData;
        try {
          uploadData = await uploadRes.json();
        } catch (jsonErr) {
          console.error(
            "[Frontend] Failed to parse upload response JSON",
            jsonErr
          );
          throw new Error("Gagal upload gambar: response bukan JSON");
        }
        if (!uploadRes.ok || !uploadData.success) {
          console.error("[Frontend] Upload image error:", {
            status: uploadRes.status,
            statusText: uploadRes.statusText,
            response: uploadData,
          });
          throw new Error(uploadData.message || "Gagal upload gambar");
        }
      }
      toast.success("Berita berhasil ditambahkan!");
      setTimeout(() => router.push("/mooNews"), 1200);
    } catch (err) {
      console.error("[Frontend] Error saat submit berita:", err);
      toast.error(err.message || "Gagal menambah berita");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Add Moo News">
      <div className={mooNewsStyles["mooNews-form"]}>
        <h1 className={mooNewsStyles["h1"]}>Tambah Moo News</h1>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="Volume">Volume</label>
            <input
              type="text"
              name="Volume"
              id="Volume"
              value={values.Volume}
              onChange={handleInputChange}
              required
              placeholder="Contoh: MooNews Vol 20"
            />
          </div>
          <div className={mooNewsStyles["images-section"]}>
            <label>Images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImagesAdd}
              className={mooNewsStyles["multi-image-input"]}
            />
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={values.Images.map((_, i) => `img-${i}`)}
                strategy={rectSortingStrategy}
              >
                <div className={mooNewsStyles["image-thumbnails-grid"]}>
                  {values.Images.map((img, idx) => (
                    <SortableImage key={"img-" + idx} img={img} idx={idx} />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
            <div className={mooNewsStyles["image-hint"]}>Drag untuk mengurutkan, klik × untuk hapus.</div>
          </div>
          <div>
            {loading ? (
              <button
                type="button"
                className={mooNewsStyles["submit-btn"]}
                disabled
              >
                Saving...
              </button>
            ) : (
              <button type="submit" className={mooNewsStyles["submit-btn"]}>
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </Layout>
  );
}
