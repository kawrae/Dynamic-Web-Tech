import { useEffect, useRef, useState } from "react";
import { Maximize, Minimize, Repeat2 } from "lucide-react";

function MediaCapturePanel({ onRecordingReady, onCoverReady, onNotify }) {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioUrl, setAudioUrl] = useState("");
  const [audioDataUrl, setAudioDataUrl] = useState("");
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [photoDataUrl, setPhotoDataUrl] = useState("");
  const [facingMode, setFacingMode] = useState("user");
  const [isFullscreenCamera, setIsFullscreenCamera] = useState(false);

  const audioChunksRef = useRef([]);
  const currentStreamRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    return () => {
      if (currentStreamRef.current) {
        currentStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (isCameraOn && videoRef.current && currentStreamRef.current) {
      videoRef.current.srcObject = currentStreamRef.current;
      videoRef.current.play().catch((error) => {
        console.warn("Video autoplay failed:", error);
      });
    }
  }, [isCameraOn]);

  const requestNotificationPermission = async () => {
    if (!("Notification" in window)) return;

    if (Notification.permission === "default") {
      try {
        await Notification.requestPermission();
      } catch (error) {
        console.warn("Notification permission request failed", error);
      }
    }
  };

  const sendNotification = (title, body) => {
    if (!("Notification" in window)) {
      onNotify?.(title, body);
      return;
    }

    if (Notification.permission === "granted") {
      new Notification(title, { body });
    } else {
      onNotify?.(title, body);
    }
  };

  const startRecording = async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      onNotify?.("Microphone unsupported", "Microphone is not supported in this browser.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      currentStreamRef.current = stream;

      const recorder = new MediaRecorder(stream);
      audioChunksRef.current = [];

      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const objectUrl = URL.createObjectURL(blob);
        setAudioUrl(objectUrl);

        const reader = new FileReader();
        reader.onloadend = () => {
          const dataUrl = reader.result;
          if (typeof dataUrl === "string") {
            setAudioDataUrl(dataUrl);
            onRecordingReady?.(dataUrl);
            onNotify?.("Voice recording ready", "Voice recording is attached to the form.");
            sendNotification("Recording saved", "Your voice memo is ready to attach to the track.");
          }
        };
        reader.readAsDataURL(blob);
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
      onNotify?.("Recording started", "The microphone is active.");
      await requestNotificationPermission();
    } catch (error) {
      onNotify?.("Microphone error", "Microphone access denied or error occurred.");
      console.error("Microphone startRecording error:", error);
    }
  };

  const stopRecording = () => {
    if (!mediaRecorder) return;

    mediaRecorder.stop();
    setIsRecording(false);

    if (currentStreamRef.current) {
      currentStreamRef.current.getTracks().forEach((track) => track.stop());
      currentStreamRef.current = null;
    }
  };

  const startFullscreenCamera = async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      onNotify?.("Camera unsupported", "Camera is not supported in this browser.");
      return;
    }

    try {
      if (currentStreamRef.current) {
        currentStreamRef.current.getTracks().forEach((track) => track.stop());
      }

      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode } 
      });
      currentStreamRef.current = stream;
      setIsCameraOn(true);
      setIsFullscreenCamera(true);
      onNotify?.("Camera opened", "Take a photo for your cover.");
      await requestNotificationPermission();
    } catch (error) {
      onNotify?.("Camera error", "Camera access denied or error occurred.");
      console.error("Camera error:", error);
    }
  };

  const capturePhotoFromFullscreen = () => {
    if (!videoRef.current) return;

    const video = videoRef.current;

    if (!video.videoWidth || !video.videoHeight) {
      onNotify?.("Camera error", "Unable to capture image - camera stream not ready.");
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const photoUrl = canvas.toDataURL("image/jpeg", 0.92);
    setPhotoDataUrl(photoUrl);
    onCoverReady?.(photoUrl);
    onNotify?.("Cover photo ready", "Camera cover photo is attached to the form.");
    sendNotification("Cover photo set", "Your image is attached to the current track.");
    
    if (currentStreamRef.current) {
      currentStreamRef.current.getTracks().forEach((track) => track.stop());
    }
    
    setIsFullscreenCamera(false);
    setIsCameraOn(false);
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

  const closeFullscreenCamera = () => {
    if (currentStreamRef.current) {
      currentStreamRef.current.getTracks().forEach((track) => track.stop());
    }
    setIsFullscreenCamera(false);
    setIsCameraOn(false);
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <h3 className="mb-3 text-lg font-semibold">Media Capture</h3>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 p-4">
          <p className="text-sm text-zinc-300">Mic recording</p>
          <div className="mt-3 flex items-center gap-2">
            <button
              type="button"
              onClick={isRecording ? stopRecording : startRecording}
              className="rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm transition hover:bg-white/20"
            >
              {isRecording ? "Stop" : "Start"}
            </button>
            <button
              type="button"
              onClick={() => {
                const playbackUrl = audioDataUrl || audioUrl;
                if (!playbackUrl) return;
                new Audio(playbackUrl).play();
              }}
              disabled={!audioDataUrl && !audioUrl}
              className="rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm disabled:opacity-40"
            >
              Play recording
            </button>
          </div>
          {audioUrl && (
            <p className="mt-2 text-xs text-zinc-400">Recording ready (in browser object URL)</p>
          )}
        </div>

        <div className="rounded-2xl border border-white/10 p-4">
          <p className="text-sm text-zinc-300">Camera cover photo</p>
          <div className="mt-3 flex items-center gap-2">
            <button
              type="button"
              onClick={startFullscreenCamera}
              className="rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm transition hover:bg-white/20"
            >
              Take Photo
            </button>
          </div>

          {photoDataUrl && (
            <img
              src={photoDataUrl}
              alt="Cover capture preview"
              className="mt-3 h-40 w-full rounded-xl border border-white/10 object-cover"
            />
          )}
        </div>
      </div>

      {isFullscreenCamera && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
          <div className="relative w-full h-full flex flex-col">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                type="button"
                onClick={flipCamera}
                className="rounded-full border border-white/20 bg-white/20 p-3 text-white transition hover:bg-white/30"
                title="Flip camera"
              >
                <Repeat2 className="w-6 h-6" />
              </button>
              <button
                type="button"
                onClick={closeFullscreenCamera}
                className="rounded-full border border-white/20 bg-white/20 p-3 text-white transition hover:bg-white/30"
                title="Close"
              >
                <Minimize className="w-6 h-6" />
              </button>
            </div>

            <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-4">
              <button
                type="button"
                onClick={capturePhotoFromFullscreen}
                className="rounded-full bg-white px-8 py-3 font-semibold text-black transition hover:bg-gray-200"
              >
                Take Photo
              </button>
            </div>
          </div>
        </div>
      )}

      <p className="mt-3 text-xs text-zinc-400">
        Note: record/camera data is preserved in the form and saved with the next Add Track action.
      </p>
    </div>
  );
}

export default MediaCapturePanel;
