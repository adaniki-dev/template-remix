"use client";

import { Suspense } from "react";
import { Loader2 } from "lucide-react";

interface SuspenseWrapperProps {
  modal: React.ComponentType<any>;
  props?: Record<string, any>;
}

const LoadingFallback = () => (
  <div className="flex items-center justify-center p-4">
    <Loader2 className="w-6 h-6 animate-spin" />
  </div>
);

export function SuspenseWrapper({
  modal: Modal,
  props = {},
}: SuspenseWrapperProps) {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Modal {...props} />
    </Suspense>
  );
}
