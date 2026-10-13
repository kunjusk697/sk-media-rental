"use client";

import { Button } from "@/components/ui/Button";
import {
  FACE_MODELS,
  PRODUCTS,
  formatInr,
} from "@/data/products";
import { cn } from "@/lib/cn";
import { productInquiryMessage, whatsappUrl } from "@/lib/whatsapp";
import { motion } from "framer-motion";
import { Camera, RotateCcw, Upload } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type ViewAngle = "front" | "angled";

export function TryOnStudio({ initialProductId }: { initialProductId?: string }) {
  const [faceId, setFaceId] = useState(FACE_MODELS[0].id);
  const [customFace, setCustomFace] = useState<string | null>(null);
  const [productId, setProductId] = useState(
    initialProductId ?? PRODUCTS[0].id,
  );
  const [angle, setAngle] = useState<ViewAngle>("front");
  const fileRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraOn, setCameraOn] = useState(false);

  useEffect(() => {
    if (initialProductId) setProductId(initialProductId);
  }, [initialProductId]);

  const faceImage =
    customFace ?? FACE_MODELS.find((f) => f.id === faceId)?.image ?? "";
  const product = useMemo(
    () => PRODUCTS.find((p) => p.id === productId) ?? PRODUCTS[0],
    [productId],
  );

  const overlay = product.tryOnOverlay[angle];

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setCameraOn(true);
      }
    } catch {
      setCameraOn(false);
    }
  }, []);

  const capturePhoto = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0);
    setCustomFace(canvas.toDataURL("image/jpeg", 0.92));
    setCameraOn(false);
    const stream = video.srcObject as MediaStream | null;
    stream?.getTracks().forEach((t) => t.stop());
  }, []);

  const onUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => setCustomFace(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-5 px-5 py-4">
      <div>
        <h2 className="font-display text-xl font-semibold">AI Virtual Try-On</h2>
        <p className="text-sm text-stone-500">
          Switch face models or use your photo — then swap frames instantly.
        </p>
      </div>

      <div className="relative overflow-hidden rounded-[2rem] bg-stone-900 shadow-xl">
        <div className="relative aspect-[3/4] w-full">
          {cameraOn ? (
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              playsInline
              muted
            />
          ) : (
            <Image
              src={faceImage}
              alt="Face preview"
              fill
              className="object-cover"
              sizes="400px"
              unoptimized={customFace?.startsWith("data:") ?? false}
            />
          )}
          {!cameraOn ? (
            <motion.div
              key={`${product.id}-${angle}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{
                opacity: 0.92,
                scale: overlay.scale,
                rotate:
                  angle === "angled" && "rotate" in overlay
                    ? overlay.rotate
                    : 0,
                y: `${overlay.offsetY}%`,
                x: `${overlay.offsetX}%`,
              }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="pointer-events-none absolute left-1/2 top-1/2 w-[78%] -translate-x-1/2 -translate-y-1/2"
            >
              <Image
                src={product.frameImage}
                alt={product.name}
                width={800}
                height={400}
                className="h-auto w-full object-contain drop-shadow-2xl"
                unoptimized
              />
            </motion.div>
          ) : null}
        </div>

        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-black/70 to-transparent p-4">
          <div className="text-white">
            <p className="text-xs uppercase tracking-wider text-white/70">
              Previewing
            </p>
            <p className="font-semibold">{product.name}</p>
            <p className="text-sm text-white/80">{formatInr(product.price)}</p>
          </div>
          <div className="flex gap-2">
            {(["front", "angled"] as ViewAngle[]).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setAngle(v)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs font-semibold capitalize",
                  angle === v
                    ? "bg-white text-charcoal"
                    : "bg-white/20 text-white",
                )}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {FACE_MODELS.map((face) => (
          <button
            key={face.id}
            type="button"
            onClick={() => {
              setCustomFace(null);
              setFaceId(face.id);
            }}
            className={cn(
              "shrink-0 overflow-hidden rounded-2xl border-2 text-left transition-colors",
              !customFace && faceId === face.id
                ? "border-charcoal"
                : "border-transparent",
            )}
          >
            <div className="relative h-16 w-16">
              <Image
                src={face.image}
                alt={face.name}
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>
            <p className="px-2 py-1 text-[10px] font-medium">{face.name}</p>
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          variant="secondary"
          className="flex-1"
          onClick={() => fileRef.current?.click()}
        >
          <Upload className="h-4 w-4" />
          Upload photo
        </Button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onUpload(file);
          }}
        />
        {cameraOn ? (
          <Button type="button" onClick={capturePhoto} className="flex-1">
            <Camera className="h-4 w-4" />
            Capture
          </Button>
        ) : (
          <Button
            type="button"
            variant="secondary"
            className="flex-1"
            onClick={startCamera}
          >
            <Camera className="h-4 w-4" />
            Use camera
          </Button>
        )}
        <Button
          type="button"
          variant="ghost"
          onClick={() => {
            setCustomFace(null);
            setCameraOn(false);
          }}
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-stone-500">
          Quick switch frames
        </p>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {PRODUCTS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setProductId(p.id)}
              className={cn(
                "relative h-20 w-28 shrink-0 overflow-hidden rounded-2xl ring-2 transition-all",
                productId === p.id
                  ? "ring-charcoal"
                  : "ring-transparent opacity-80",
              )}
            >
              <Image
                src={p.frameImage}
                alt={p.name}
                fill
                className="object-cover bg-stone-100"
                sizes="112px"
              />
            </button>
          ))}
        </div>
      </div>

      <a
        href={whatsappUrl(
          productInquiryMessage(
            product.name,
            product.price,
            product.colors[0]?.name,
          ),
        )}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <Button variant="whatsapp" className="w-full">
          Chat to order this look
        </Button>
      </a>
    </div>
  );
}
