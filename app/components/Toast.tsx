"use client";

import { useEffect, useState } from "react";
import { IconCheck } from "./icons";

interface ToastProps {
  message: string;
  isOpen: boolean;
  onClose: () => void;
  duration?: number;
}

export default function Toast({
  message,
  isOpen,
  onClose,
  duration = 2400,
}: ToastProps) {
  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [isOpen, duration, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="toast-container"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="toast-pill">
        <IconCheck />
        <span>{message}</span>
      </div>
    </div>
  );
}
