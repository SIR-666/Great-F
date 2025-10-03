import React, { useState, useEffect } from "react";
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

export default function EditMooNewsPage() {
  const [values, setValues] = useState({
    Volume: "",
    Images: [], // array of { ImageID, ImageUrl, file, previewUrl }
  });
  const [loading, setLoading] = useState(false);
  const [newsId, setNewsId] = useState(null);
  const router = useRouter();

  // Fetch news by id
  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    if (!id) return;
    setNewsId(id);
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_URL3}/api/news/${id}`);
        const data = await res.json();
        if (data && data.success && data.data && data.data.NewsID) {
          setValues({
            Volume: data.data.Volume || "",
            Images: Array.isArray(data.data.Images) ? data.data.Images : [],
          });
        }
      } catch (err) {
        toast.error("Gagal mengambil data Moo News");
      }
    };
    fetchData();
  }, [router.isReady, router.query.id]);

  // Handle input text
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  // Handle add new images (local only, not yet uploaded)
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
    e.target.value = null;
  };

  // Remove image by index (local only, for new images)
  const removeImage = (idx) => {
    setValues((prev) => {
      const images = [...prev.Images];
      // cleanup preview url
      if (images[idx]?.previewUrl) URL.revokeObjectURL(images[idx].previewUrl);
      images.splice(idx, 1);
      return { ...prev, Images: images };
    });
  };

  // Delete image from server (for existing images)
  const deleteImageFromServer = async (imageId) => {
    if (!newsId || !imageId) return;
    if (!window.confirm("Hapus gambar ini secara permanen?")) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_URL3}/api/news/images/${imageId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setValues((prev) => ({
          ...prev,
          Images: prev.Images.filter((img) => img.ImageID !== imageId),
        }));
        toast.success("Gambar dihapus");
      } else {
        toast.error(data.message || "Gagal menghapus gambar");
      }
    } catch (err) {
      toast.error("Gagal menghapus gambar");
    } finally {
      setLoading(false);
    }
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

  // Handle submit (edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!values.Volume) {
      toast.error("Volume wajib diisi");
      return;
    }
    setLoading(true);
    try {
      // 1. Update berita utama (Volume)
      const res = await fetch(`${API_BASE}/news/${newsId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Volume: values.Volume }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Gagal mengedit berita");
      }

      // 2. Upload gambar baru jika ada (file property)
      for (const img of values.Images) {
        if (!img.file) continue;
        const formData = new FormData();
        formData.append("image", img.file); // field name must be 'image'
        const uploadRes = await fetch(`${API_BASE}/news/${newsId}/images`, {
          method: "POST",
          body: formData,
        });
        let uploadData;
        try {
          uploadData = await uploadRes.json();
        } catch (jsonErr) {
          throw new Error("Gagal upload gambar: response bukan JSON");
        }
        if (!uploadRes.ok || !uploadData.success) {
          throw new Error(uploadData.message || "Gagal upload gambar");
        }
      }
      toast.success("Berita berhasil diedit!");
      setTimeout(() => router.push("/mooNews"), 1200);
    } catch (err) {
      toast.error(err.message || "Gagal mengedit berita");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Edit Moo News">
      <div className={mooNewsStyles["mooNews-form"]}>
        <h1 className={mooNewsStyles["h1"]}>Edit Moo News</h1>
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
              placeholder="Contoh: MoonNews Vol 20"
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
                  {values.Images.map((img, idx) =>
                    img.previewUrl ? (
                      <SortableImage key={"img-" + idx} img={img} idx={idx} />
                    ) : (
                      <div key={"img-" + idx} className={mooNewsStyles["image-thumb"]}>
                        <span className={mooNewsStyles["order-badge"]}>{idx + 1}</span>
                        <img
                          src={`${API_URL3}/${img.ImageUrl}`}
                          alt={`img-${idx}`}
                          className={mooNewsStyles["thumb-img"]}
                        />
                        <button
                          type="button"
                          className={mooNewsStyles["remove-btn"]}
                          onClick={() => deleteImageFromServer(img.ImageID)}
                        >
                          ×
                        </button>
                      </div>
                    )
                  )}
                </div>
              </SortableContext>
            </DndContext>
            <div className={mooNewsStyles["image-hint"]}>Drag untuk mengurutkan, klik × untuk hapus. (Gambar lama: hapus permanen)</div>
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
                Save Changes
              </button>
            )}
          </div>
        </form>
      </div>
    </Layout>
  );
}