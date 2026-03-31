import { useState, useRef, useEffect } from "react";
import { X, Maximize, Repeat2 } from "lucide-react";

function CameraGalleryChooser({
  onClose,
  onGallerySelect,
  onCameraCapture,
  galleryInputRef,
}) {
  const [isFullscreenCamera, setIsFullscreenCamera] = useState(false);
  const [facingMode, setFacingMode] = useState("user");
  const videoRef = useRef(null);
  const currentStreamRef = useRef(null);

  useEffect(() => {
    return () => {
      if (currentStreamRef.current) {
        currentStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      alert("Camera is not supported in this browser.");
      return;
    }

    try {
      if (currentStreamRef.current) {
        currentStreamRef.current.getTracks().forEach((track) => track.stop());
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode },
      });
      currentStreamRef.current = stream;
      setIsFullscreenCamera(true);
    } catch (error) {
      console.error("Failed to access camera:", error);
      alert("Could not access camera. Please check permissions.");
    }
  };

  const flipCamera = async () => {
    const newFacingMode = facingMode === "user" ? "environment" : "user";
    setFacingMode(newFacingMode);

    if (currentStreamRef.current) {
      currentStreamRef.current.getTracks().forEach((track) => track.stop());
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: newFacingMode },
      });
      currentStreamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Failed to switch camera:", error);
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;

    const canvas = document.createElement("canvas");
    const video = videoRef.current;

    if (video.videoWidth && video.videoHeight) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0);
      const photoDataUrl = canvas.toDataURL("image/jpeg", 0.92);

      onCameraCapture(photoDataUrl);

      if (currentStreamRef.current) {
        currentStreamRef.current.getTracks().forEach((track) => track.stop());
      }

      setIsFullscreenCamera(false);
      onClose();
    }
  };

  useEffect(() => {
    if (isFullscreenCamera && videoRef.current && currentStreamRef.current) {
      videoRef.current.srcObject = currentStreamRef.current;
      videoRef.current.play().catch((error) => {
        console.warn("Video autoplay failed:", error);
      });
    }
  }, [isFullscreenCamera]);

  if (isFullscreenCamera) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          playsInline
        />

        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={flipCamera}
            className="rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
            aria-label="Flip camera"
          >
            <Repeat2 size={20} />
          </button>
          <button
            onClick={() => {
              setIsFullscreenCamera(false);
              if (currentStreamRef.current) {
                currentStreamRef.current.getTracks().forEach((track) => track.stop());
              }
              onClose();
            }}
            className="rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
            aria-label="Close camera"
          >
            <X size={20} />
          </button>
        </div>

        <button
          onClick={capturePhoto}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-white px-8 py-3 text-lg font-medium text-black hover:bg-zinc-200"
        >
          Take Photo
        </button>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm rounded-2xl border border-white/10 bg-zinc-950 p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
        >
          <X size={18} />
        </button>

        <h2 className="mb-6 text-xl font-semibold text-white">
          Choose Cover Source
        </h2>

        <div className="flex flex-col gap-3">
          <button
            onClick={startCamera}
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white hover:bg-white/10"
          >
            📷 Camera
          </button>
          <button
            onClick={() => {
              galleryInputRef.current?.click();
              onClose();
            }}
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white hover:bg-white/10"
          >
            📁 Gallery
          </button>
        </div>
      </div>
    </div>
  );
}

export default CameraGalleryChooser;
