"use client";

import { CelestialSphere } from "@/components/ui/celestial-sphere";

export default function ShaderBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <CelestialSphere
        hue={280.0}
        speed={0.25}
        zoom={1.4}
        particleSize={3.0}
        className="absolute top-0 left-0 w-full h-full"
      />
      {/* Overlay to darken the shader so content stays readable */}
      <div className="absolute inset-0 bg-[var(--color-surface)]/75" />
    </div>
  );
}
