// src/ui/components/HeroCard.jsx
import React from "react";

export function AppHeroCard({ title, subtitle, backgroundImage, children, className = "" }) {
  return (
    <div
      className={`relative w-full h-screen overflow-hidden ${className}`} // h-screen = 100vh
    >
      {/* Imagen de fondo */}
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}

      {/* Overlay semi-transparente */}
      {backgroundImage && <div className="absolute inset-0 bg-black/40" />}

      {/* Contenido */}
        <div className="relative flex flex-col justify-start items-start h-full max-w-[1200px] mx-auto p-8 pt-20 text-white">
            {title && <h1 className="text-4xl md:text-6xl font-bold mb-4">{title}</h1>}
            {subtitle && <p className="text-lg md:text-2xl">{subtitle}</p>}
            {children && <div className="mt-6">{children}</div>}
        </div>
    </div>
  );
}
