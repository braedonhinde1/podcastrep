"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    THREE: any;
  }
}

interface CelestialSphereProps {
  hue?: number;
  speed?: number;
  zoom?: number;
  particleSize?: number;
  className?: string;
}

export const CelestialSphere: React.FC<CelestialSphereProps> = ({
  hue = 280.0,
  speed = 0.25,
  zoom = 1.4,
  particleSize = 3.0,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    renderer: any;
    animationId: number | null;
  }>({
    renderer: null,
    animationId: null,
  });

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/three.js/89/three.min.js";
    script.onload = () => {
      if (containerRef.current && window.THREE) {
        initThreeJS();
      }
    };
    document.head.appendChild(script);

    return () => {
      if (sceneRef.current.animationId) {
        cancelAnimationFrame(sceneRef.current.animationId);
      }
      if (sceneRef.current.renderer) {
        sceneRef.current.renderer.dispose();
      }
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const initThreeJS = () => {
    if (!containerRef.current || !window.THREE) return;

    const THREE = window.THREE;
    const container = containerRef.current;
    container.innerHTML = "";

    const mouse = new THREE.Vector2(0.5, 0.5);

    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      precision highp float;
      varying vec2 vUv;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec2 u_mouse;
      uniform float u_hue;
      uniform float u_zoom;
      uniform float u_particle_size;

      vec3 hsl2rgb(vec3 c) {
        vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0), 6.0)-3.0)-1.0, 0.0, 1.0);
        return c.z * mix(vec3(1.0), rgb, c.y);
      }

      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
      }

      float noise(vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);
        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.y * u.x;
      }

      float fbm(vec2 st) {
        float value = 0.0;
        float amplitude = 0.5;
        for (int i = 0; i < 6; i++) {
          value += amplitude * noise(st);
          st *= 2.0;
          amplitude *= 0.5;
        }
        return value;
      }

      void main() {
        vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x);
        uv *= u_zoom;

        vec2 mouse_normalized = u_mouse / u_resolution;
        uv += (mouse_normalized - 0.5) * 0.8;

        float f = fbm(uv + vec2(u_time * 0.1, u_time * 0.05));
        float t = fbm(uv + f + vec2(u_time * 0.05, u_time * 0.02));

        float nebula = pow(t, 2.0);
        vec3 color = hsl2rgb(vec3(u_hue / 360.0 + nebula * 0.2, 0.7, 0.5));
        color *= nebula * 2.5;

        float star_val = random(vUv * 500.0);
        if (star_val > 0.998) {
          float star_brightness = (star_val - 0.998) / 0.002;
          color += vec3(star_brightness * u_particle_size);
        }

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const scene = new THREE.Scene();

    const uniforms = {
      u_time: { type: "f", value: 0.0 },
      u_resolution: { type: "v2", value: new THREE.Vector2() },
      u_mouse: { type: "v2", value: new THREE.Vector2() },
      u_hue: { type: "f", value: hue },
      u_zoom: { type: "f", value: zoom },
      u_particle_size: { type: "f", value: particleSize },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    sceneRef.current = { renderer, animationId: null };

    const onWindowResize = () => {
      const rect = container.getBoundingClientRect();
      renderer.setSize(rect.width, rect.height);
      uniforms.u_resolution.value.set(rect.width, rect.height);
    };

    const onMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      uniforms.u_mouse.value.set(
        event.clientX - rect.left,
        rect.height - (event.clientY - rect.top)
      );
    };

    onWindowResize();
    window.addEventListener("resize", onWindowResize, false);
    window.addEventListener("mousemove", onMouseMove, false);

    const animate = () => {
      sceneRef.current.animationId = requestAnimationFrame(animate);
      uniforms.u_time.value += 0.005 * speed;
      renderer.render(scene, camera);
    };

    animate();
  };

  return (
    <div
      ref={containerRef}
      className={className || "w-full h-full"}
      style={{ zIndex: 0 }}
    />
  );
};

export default CelestialSphere;
