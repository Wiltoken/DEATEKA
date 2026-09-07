"use client";

import { useState, useRef, useCallback, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Upload, X, Star, Trash2, Loader2 } from "lucide-react";
import { uploadProductImage, deleteProductImage, setPrimaryImage } from "@/lib/image-actions";

type ProductImage = {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
  order: number;
};

export function ImageUploader({
  productId,
  images,
}: {
  productId: string;
  images: ProductImage[];
}) {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const handleUpload = useCallback(
    async (file: File) => {
      setError("");
      setUploading(true);

      const fd = new FormData();
      fd.set("file", file);
      fd.set("productId", productId);

      const result = await uploadProductImage({ error: "" }, fd);
      setUploading(false);

      if (result.error) {
        setError(result.error);
      } else {
        router.refresh();
      }
    },
    [productId, router]
  );

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      handleUpload(file);
    }
  }

  function handleDelete(imageId: string) {
    if (!confirm("¿Eliminar esta imagen?")) return;
    startTransition(async () => {
      await deleteProductImage(imageId, productId);
      router.refresh();
    });
  }

  function handleSetPrimary(imageId: string) {
    startTransition(async () => {
      await setPrimaryImage(imageId, productId);
      router.refresh();
    });
  }

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium">Imágenes del producto</label>

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed p-8 text-center cursor-pointer transition-colors ${
          dragActive
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/50"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          onChange={handleFileChange}
          className="hidden"
        />
        {uploading ? (
          <div className="flex items-center justify-center gap-2 text-muted">
            <Loader2 size={20} className="animate-spin" />
            <span>Subiendo imagen...</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted">
            <Upload size={24} />
            <p className="text-sm">
              Arrastrá una imagen aquí o <span className="text-primary font-medium">click para seleccionar</span>
            </p>
            <p className="text-xs">JPG, PNG, WebP o AVIF — máximo 5MB</p>
          </div>
        )}
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      {/* Image grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {images
            .sort((a, b) => a.order - b.order)
            .map((img) => (
              <div
                key={img.id}
                className={`relative group border overflow-hidden aspect-square ${
                  img.isPrimary ? "border-primary ring-2 ring-primary/20" : "border-border"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.url}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                />
                {img.isPrimary && (
                  <span className="absolute top-1 left-1 bg-primary text-white text-[10px] px-1.5 py-0.5 font-medium">
                    Principal
                  </span>
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  {!img.isPrimary && (
                    <button
                      onClick={() => handleSetPrimary(img.id)}
                      disabled={pending}
                      className="bg-white/90 p-1.5 hover:bg-white transition-colors disabled:opacity-50"
                      title="Marcar como principal"
                    >
                      <Star size={14} />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(img.id)}
                    disabled={pending}
                    className="bg-red-500/90 p-1.5 hover:bg-red-500 text-white transition-colors disabled:opacity-50"
                    title="Eliminar"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}

      {images.length === 0 && (
        <p className="text-xs text-muted">No hay imágenes. Subí la primera arriba.</p>
      )}
    </div>
  );
}
