"use client";

import React, { useEffect, useRef } from "react";

declare global {
  interface Window {
    THREE: any;
  }
}

const CelestialInkShader = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const THREE = window.THREE;
    if (!THREE) return;

    // 1) Renderer, Scene, Camera, Clock
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const clock = new THREE.Clock();

    // 2) GLSL Shaders
    const vertexShader = `
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      precision highp float;
      uniform vec2 iResolution;
      uniform float iTime;
      uniform vec2 iMouse;

      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(random(i), random(i + vec2(1.0, 0.0)), u.x),
          mix(random(i + vec2(0.0, 1.0)), random(i + vec2(1.0, 1.0)), u.x),
          u.y
        );
      }

      float fbm(vec2 p) {
        float v = 0.0;
        float a = 0.5;
        for (int i = 0; i < 6; i++) {
          v += a * noise(p);
          p *= 2.0;
          a *= 0.5;
        }
        return v;
      }

      void main() {
        vec2 uv = (gl_FragCoord.xy - 0.5 * iResolution.xy) / iResolution.y;
        vec2 mouse = (iMouse - 0.5 * iResolution.xy) / iResolution.y;
        float t = iTime * 0.1;

        // ripple around mouse
        float d = length(uv - mouse);
        float ripple = 1.0 - smoothstep(0.0, 0.3, d);

        // rotation
        float angle = t * 0.5;
        mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
        vec2 p = rot * uv;

        // ink patterns
        float pattern = fbm(p * 3.0 + t);
        pattern -= fbm(p * 6.0 - t * 0.5) * 0.3;
        pattern += ripple * 0.5;

        // ── Brand colors ──
        // c1: deep dark base — near-black with a hint of indigo
        vec3 c1 = vec3(0.04, 0.04, 0.08);
        // c2: brand red-orange (#f04438 shifted slightly cooler)
        vec3 c2 = vec3(0.85, 0.18, 0.18);
        // highlight: accent violet glow (#8b5cf6)
        vec3 highlight = vec3(0.55, 0.36, 0.96);

        vec3 color = mix(c1, c2, smoothstep(0.35, 0.6, pattern));
        float hl = pow(smoothstep(0.6, 0.8, pattern), 2.0);
        color = mix(color, highlight, hl);

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    // 3) Uniforms, Material, Geometry, Mesh
    const uniforms = {
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector2() },
      iMouse: {
        value: new THREE.Vector2(
          window.innerWidth / 2,
          window.innerHeight / 2
        ),
      },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
    });
    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // 4) Resize handler
    const onResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      uniforms.iResolution.value.set(width, height);
    };
    window.addEventListener("resize", onResize);
    onResize();

    // 5) Mouse handler
    const onMouseMove = (e: MouseEvent) => {
      uniforms.iMouse.value.set(
        e.clientX,
        container.clientHeight - e.clientY
      );
    };
    window.addEventListener("mousemove", onMouseMove);

    // 6) Animation loop
    renderer.setAnimationLoop(() => {
      uniforms.iTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
    });

    // 7) Cleanup
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      renderer.setAnimationLoop(null);

      const canvas = renderer.domElement;
      if (canvas && canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }

      material.dispose();
      geometry.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
      aria-label="Animated background"
    />
  );
};

export default CelestialInkShader;
