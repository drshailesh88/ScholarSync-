/**
 * PresentationRecorder — browser-native recording engine.
 *
 * Uses getDisplayMedia for screen capture (simplest, most reliable) combined
 * with getUserMedia for microphone audio and optional webcam overlay.
 *
 * The webcam is composited onto a hidden <canvas> along with the display
 * capture stream, then the canvas stream + audio are fed into MediaRecorder.
 */

export interface RecordingOptions {
  includeWebcam: boolean;
  includeAudio: boolean;
  webcamPosition: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  webcamSize: "small" | "medium" | "large";
  audioDeviceId?: string;
  videoDeviceId?: string;
}

export interface SlideMarker {
  slideIndex: number;
  timestampMs: number;
}

type RecorderState = "idle" | "recording" | "paused" | "stopped";

const WEBCAM_SIZE_MAP = { small: 120, medium: 180, large: 240 } as const;
const WEBCAM_PADDING = 24;

export class PresentationRecorder {
  private mediaRecorder: MediaRecorder | null = null;
  private chunks: Blob[] = [];
  private displayStream: MediaStream | null = null;
  private webcamStream: MediaStream | null = null;
  private audioStream: MediaStream | null = null;
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private webcamVideo: HTMLVideoElement | null = null;
  private displayVideo: HTMLVideoElement | null = null;
  private animFrameId: number = 0;
  private startTime: number = 0;
  private slideMarkers: SlideMarker[] = [];
  private _state: RecorderState = "idle";
  private _elapsedMs: number = 0;
  private _pausedAtMs: number = 0;
  private _totalPausedMs: number = 0;

  get state(): RecorderState {
    return this._state;
  }

  get elapsedMs(): number {
    if (this._state === "recording") {
      return Date.now() - this.startTime - this._totalPausedMs;
    }
    return this._elapsedMs;
  }

  get markers(): SlideMarker[] {
    return [...this.slideMarkers];
  }

  // -------------------------------------------------------------------------
  // Public API
  // -------------------------------------------------------------------------

  async startRecording(options: RecordingOptions): Promise<void> {
    this.cleanup();
    this.chunks = [];
    this.slideMarkers = [];
    this._totalPausedMs = 0;

    // 1. Screen capture via getDisplayMedia
    this.displayStream = await navigator.mediaDevices.getDisplayMedia({
      video: { displaySurface: "browser" } as MediaTrackConstraints,
      audio: false,
    });

    // 2. Audio from microphone
    if (options.includeAudio) {
      this.audioStream = await navigator.mediaDevices.getUserMedia({
        audio: options.audioDeviceId
          ? { deviceId: { exact: options.audioDeviceId } }
          : true,
      });
    }

    // 3. Webcam
    if (options.includeWebcam) {
      const dim = WEBCAM_SIZE_MAP[options.webcamSize];
      this.webcamStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: dim * 2 },
          height: { ideal: dim * 2 },
          ...(options.videoDeviceId
            ? { deviceId: { exact: options.videoDeviceId } }
            : {}),
        },
      });
    }

    // 4. If webcam requested, composite on canvas
    if (options.includeWebcam && this.webcamStream) {
      const displayTrack = this.displayStream.getVideoTracks()[0];
      const displaySettings = displayTrack.getSettings();
      const width = displaySettings.width || 1920;
      const height = displaySettings.height || 1080;

      this.canvas = document.createElement("canvas");
      this.canvas.width = width;
      this.canvas.height = height;
      this.ctx = this.canvas.getContext("2d")!;

      // Hidden video elements to pull frames from
      this.displayVideo = document.createElement("video");
      this.displayVideo.srcObject = this.displayStream;
      this.displayVideo.muted = true;
      this.displayVideo.playsInline = true;
      await this.displayVideo.play();

      this.webcamVideo = document.createElement("video");
      this.webcamVideo.srcObject = this.webcamStream;
      this.webcamVideo.muted = true;
      this.webcamVideo.playsInline = true;
      await this.webcamVideo.play();

      // Start compositing loop
      const wcSize = WEBCAM_SIZE_MAP[options.webcamSize];
      const pos = options.webcamPosition;
      this.startCompositing(width, height, wcSize, pos);

      // Build combined stream from canvas + audio
      const canvasStream = this.canvas.captureStream(30);
      const combinedTracks = [
        ...canvasStream.getVideoTracks(),
        ...(this.audioStream?.getAudioTracks() || []),
      ];
      const combinedStream = new MediaStream(combinedTracks);
      this.initMediaRecorder(combinedStream);
    } else {
      // No webcam — use display stream directly + audio
      const combinedTracks = [
        ...this.displayStream.getVideoTracks(),
        ...(this.audioStream?.getAudioTracks() || []),
      ];
      const combinedStream = new MediaStream(combinedTracks);
      this.initMediaRecorder(combinedStream);
    }

    this.startTime = Date.now();
    this._state = "recording";
    this.mediaRecorder!.start(1000);

    // If user stops sharing via browser UI, stop recording
    this.displayStream.getVideoTracks()[0].addEventListener("ended", () => {
      if (this._state === "recording" || this._state === "paused") {
        this.stopRecording();
      }
    });
  }

  pause(): void {
    if (this._state !== "recording" || !this.mediaRecorder) return;
    this.mediaRecorder.pause();
    this._pausedAtMs = Date.now();
    this._elapsedMs = Date.now() - this.startTime - this._totalPausedMs;
    this._state = "paused";
  }

  resume(): void {
    if (this._state !== "paused" || !this.mediaRecorder) return;
    this._totalPausedMs += Date.now() - this._pausedAtMs;
    this.mediaRecorder.resume();
    this._state = "recording";
  }

  async stopRecording(): Promise<Blob> {
    return new Promise((resolve, reject) => {
      if (!this.mediaRecorder || this._state === "idle") {
        reject(new Error("No active recording"));
        return;
      }

      this._elapsedMs = this.elapsedMs;
      this._state = "stopped";

      this.mediaRecorder.onstop = () => {
        const blob = new Blob(this.chunks, { type: "video/webm" });
        this.cleanup();
        resolve(blob);
      };

      this.mediaRecorder.stop();
    });
  }

  markSlideTransition(slideIndex: number): void {
    this.slideMarkers.push({
      slideIndex,
      timestampMs: this.elapsedMs,
    });
  }

  getWebcamStream(): MediaStream | null {
    return this.webcamStream;
  }

  getAudioStream(): MediaStream | null {
    return this.audioStream;
  }

  // -------------------------------------------------------------------------
  // Private helpers
  // -------------------------------------------------------------------------

  private initMediaRecorder(stream: MediaStream): void {
    // Pick best available codec
    const mimeType = MediaRecorder.isTypeSupported("video/webm;codecs=vp9,opus")
      ? "video/webm;codecs=vp9,opus"
      : MediaRecorder.isTypeSupported("video/webm;codecs=vp8,opus")
        ? "video/webm;codecs=vp8,opus"
        : "video/webm";

    this.mediaRecorder = new MediaRecorder(stream, {
      mimeType,
      videoBitsPerSecond: 2_500_000,
    });

    this.mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) this.chunks.push(e.data);
    };
  }

  private startCompositing(
    width: number,
    height: number,
    wcSize: number,
    position: RecordingOptions["webcamPosition"]
  ): void {
    const draw = () => {
      if (!this.ctx || !this.displayVideo || !this.webcamVideo) return;

      // Draw display capture
      this.ctx.drawImage(this.displayVideo, 0, 0, width, height);

      // Draw webcam in a circle
      const diameter = wcSize;
      const radius = diameter / 2;

      let x: number, y: number;
      switch (position) {
        case "bottom-right":
          x = width - diameter - WEBCAM_PADDING;
          y = height - diameter - WEBCAM_PADDING;
          break;
        case "bottom-left":
          x = WEBCAM_PADDING;
          y = height - diameter - WEBCAM_PADDING;
          break;
        case "top-right":
          x = width - diameter - WEBCAM_PADDING;
          y = WEBCAM_PADDING;
          break;
        case "top-left":
          x = WEBCAM_PADDING;
          y = WEBCAM_PADDING;
          break;
      }

      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.arc(x + radius, y + radius, radius, 0, Math.PI * 2);
      this.ctx.closePath();
      this.ctx.clip();
      this.ctx.drawImage(this.webcamVideo, x, y, diameter, diameter);
      this.ctx.restore();

      // Circle border
      this.ctx.beginPath();
      this.ctx.arc(x + radius, y + radius, radius, 0, Math.PI * 2);
      this.ctx.strokeStyle = "rgba(255, 255, 255, 0.6)";
      this.ctx.lineWidth = 3;
      this.ctx.stroke();

      this.animFrameId = requestAnimationFrame(draw);
    };

    this.animFrameId = requestAnimationFrame(draw);
  }

  cleanup(): void {
    cancelAnimationFrame(this.animFrameId);

    this.displayStream?.getTracks().forEach((t) => t.stop());
    this.webcamStream?.getTracks().forEach((t) => t.stop());
    this.audioStream?.getTracks().forEach((t) => t.stop());

    this.displayVideo?.pause();
    this.webcamVideo?.pause();

    if (this.displayVideo) this.displayVideo.srcObject = null;
    if (this.webcamVideo) this.webcamVideo.srcObject = null;

    this.displayStream = null;
    this.webcamStream = null;
    this.audioStream = null;
    this.canvas = null;
    this.ctx = null;
    this.displayVideo = null;
    this.webcamVideo = null;
    this.mediaRecorder = null;
  }
}
