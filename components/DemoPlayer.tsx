"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import clsx from "clsx";
import { Reveal } from "./Reveal";
import { DEMO_VIDEO_URL } from "@/lib/data";

const ICON = {
  play: "M7 5v14l11-7z",
  pause: "M6 5h4v14H6zm8 0h4v14h-4z",
  volume:
    "M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z",
  mute: "M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73 4.27 3zM12 4L9.91 6.09 12 8.18V4z",
  enterFs: "M15 3h6v6 M9 21H3v-6 M21 3l-7 7 M3 21l7-7",
  exitFs:
    "M8 3v3a2 2 0 0 1-2 2H3 M21 8h-3a2 2 0 0 1-2-2V3 M3 16h3a2 2 0 0 1 2 2v3 M16 21v-3a2 2 0 0 1 2-2h3",
} as const;

function formatTime(s: number): string {
  if (isNaN(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export function DemoPlayer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sliderWrapRef = useRef<HTMLDivElement>(null);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Start "paused" so the chrome is visible until playback actually begins
  // (if autoplay is blocked, onPlay never fires and controls remain shown).
  const [paused, setPaused] = useState(true);
  const [muted, setMuted] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [hoverX, setHoverX] = useState(0);
  const [hoverTime, setHoverTime] = useState("0:00");
  const [idle, setIdle] = useState(false);

  const progress = duration ? current / duration : 0;

  const syncTime = useCallback(() => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    setCurrent(v.currentTime);
    setDuration(v.duration);
  }, []);

  const resetIdle = useCallback(() => {
    setIdle(false);
    if (idleTimer.current) clearTimeout(idleTimer.current);
    if (videoRef.current && !videoRef.current.paused) {
      idleTimer.current = setTimeout(() => setIdle(true), 2000);
    }
  }, []);

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) void v.play();
    else v.pause();
  }, []);

  const toggleMute = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  }, []);

  const toggleFullscreen = useCallback(() => {
    setFullscreen((f) => {
      const next = !f;
      document.body.style.overflow = next ? "hidden" : "";
      return next;
    });
  }, []);

  const handleScrub = useCallback(
    (clientX: number, commit: boolean) => {
      const wrap = sliderWrapRef.current;
      const v = videoRef.current;
      if (!wrap || !v || !v.duration) return;
      const rect = wrap.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const p = x / rect.width;
      setHoverX(x);
      setHoverTime(formatTime(p * v.duration));
      if (commit) v.currentTime = p * v.duration;
    },
    [],
  );

  const onPointerDown = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      setDragging(true);
      sliderWrapRef.current?.setPointerCapture(e.pointerId);
      handleScrub(e.clientX, true);
    },
    [handleScrub],
  );
  const onPointerMove = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      handleScrub(e.clientX, dragging);
    },
    [handleScrub, dragging],
  );
  const onPointerUp = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      setDragging(false);
      sliderWrapRef.current?.releasePointerCapture(e.pointerId);
    },
    [],
  );

  // Escape exits fullscreen.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && fullscreen) {
        setFullscreen(false);
        document.body.style.overflow = "";
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [fullscreen]);

  // Controls stay visible whenever the video is paused (incl. autoplay blocked)
  // and while not idle; they only auto-hide during uninterrupted playback.
  const controlsActive = paused || !idle;

  return (
    <section
      id="demo"
      className={clsx(
        "relative z-1 mx-auto max-w-[1180px] px-6",
        "py-[clamp(90px,12vw,150px)]",
      )}
    >
      <Reveal>
        <div
          ref={containerRef}
          onMouseMove={resetIdle}
          onMouseLeave={() => {
            if (videoRef.current && !videoRef.current.paused) setIdle(true);
          }}
          className={clsx(
            "group/vp relative mx-auto aspect-video overflow-hidden bg-bg-elevated",
            fullscreen
              ? "fixed inset-0 z-[2147483647] h-screen w-screen max-w-none rounded-none border-0 shadow-none"
              : "max-w-[1180px] rounded-2xl border border-accent/[0.18] shadow-vp",
          )}
        >
          <video
            ref={videoRef}
            src={DEMO_VIDEO_URL}
            playsInline
            autoPlay
            muted
            loop
            onClick={togglePlay}
            onTimeUpdate={syncTime}
            onLoadedMetadata={syncTime}
            onPlay={() => {
              setPaused(false);
              resetIdle();
            }}
            onPause={() => {
              setPaused(true);
              setIdle(false);
            }}
            className="block h-full w-full object-cover"
          />

          {/* dark overlay */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-5"
            style={{
              background:
                "linear-gradient(rgba(13,26,46,0.72), rgba(13,26,46,0.6))",
            }}
          />

          {/* center play affordance — visible whenever paused so the frame is
              never an empty box (e.g. when autoplay is blocked) */}
          <button
            type="button"
            onClick={togglePlay}
            aria-label="Play"
            className={clsx(
              "absolute left-1/2 top-1/2 z-15 flex h-[70px] w-[70px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-[10px] transition-all duration-300 hover:scale-105 hover:bg-white/20",
              paused
                ? "scale-100 opacity-100"
                : "pointer-events-none scale-90 opacity-0",
            )}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
              <path d={ICON.play} />
            </svg>
          </button>

          {/* bottom gradient */}
          <div
            aria-hidden="true"
            className={clsx(
              "pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[140px] transition-opacity duration-300",
              controlsActive ? "opacity-100" : "opacity-0",
            )}
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,.7), rgba(0,0,0,.45) 50%, transparent)",
            }}
          />

          {/* controls */}
          <div
            className={clsx(
              "absolute inset-x-0 bottom-0 z-20 flex items-center gap-3 px-4 pb-4 pt-10 transition-all duration-300",
              controlsActive
                ? "translate-y-0 opacity-100"
                : "pointer-events-none translate-y-5 opacity-0",
            )}
          >
            <button
              type="button"
              onClick={togglePlay}
              aria-label={paused ? "Play" : "Pause"}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-[10px] transition-all duration-150 hover:scale-105 hover:bg-white/20 active:scale-95"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d={paused ? ICON.play : ICON.pause} />
              </svg>
            </button>

            {/* scrubber */}
            <div
              ref={sliderWrapRef}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              className={clsx(
                "relative flex h-10 flex-1 cursor-pointer touch-none items-center",
                dragging && "is-dragging",
              )}
            >
              <div
                className={clsx(
                  "relative w-full overflow-hidden rounded-lg bg-white/10 backdrop-blur-[10px] transition-[height] duration-300",
                  dragging ? "h-5" : "h-1.5 group-hover/vp:h-5",
                )}
              >
                <div
                  className="absolute inset-y-0 left-0 w-full origin-left bg-white/30 backdrop-blur-[10px]"
                  style={{ transform: `scaleX(${progress})` }}
                />
              </div>
              <div
                className={clsx(
                  "pointer-events-none absolute inset-y-0 w-0.5 bg-accent transition-opacity duration-200",
                  dragging ? "opacity-100" : "opacity-0 group-hover/vp:opacity-100",
                )}
                style={{ left: `${hoverX}px` }}
              />
              <div
                className={clsx(
                  "pointer-events-none absolute -top-[18px] -translate-x-1/2 rounded bg-white/10 px-1.5 py-0.5 font-mono text-[10px] text-white backdrop-blur-[10px] transition-opacity duration-200",
                  dragging ? "opacity-100" : "opacity-0 group-hover/vp:opacity-100",
                )}
                style={{ left: `${hoverX}px` }}
              >
                {hoverTime}
              </div>
            </div>

            <div className="flex min-w-[58px] items-center justify-center gap-1 font-mono text-[10px] font-medium text-white">
              <span className="text-white/70">{formatTime(current)}</span>
              <span>/</span>
              <span>{formatTime(duration)}</span>
            </div>

            <button
              type="button"
              onClick={toggleMute}
              aria-label={muted ? "Unmute" : "Mute"}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-[10px] transition-all duration-150 hover:scale-105 hover:bg-white/20 active:scale-95"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d={muted ? ICON.mute : ICON.volume} />
              </svg>
            </button>

            <button
              type="button"
              onClick={toggleFullscreen}
              aria-label={fullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-[10px] transition-all duration-150 hover:scale-105 hover:bg-white/20 active:scale-95"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d={fullscreen ? ICON.exitFs : ICON.enterFs} />
              </svg>
            </button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
