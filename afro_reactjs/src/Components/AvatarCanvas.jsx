import React, { useEffect, useRef } from "react";

// Composant pour dessiner l'avatar sur un canvas
const AvatarCanvas = ({ mannequinData }) => {
  const canvasRef = useRef(null); // Référence au canvas

  useEffect(() => {
    if (canvasRef.current && mannequinData) {
      const ctx = canvasRef.current.getContext("2d");
      drawAvatar(ctx, mannequinData); // Dessiner l'avatar avec les données du mannequin
    }
  }, [mannequinData]);

  // Fonction pour dessiner l'avatar sur le canvas
  const drawAvatar = (ctx, data) => {
    // Effacer le canvas avant de dessiner
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Dessiner le visage de l'avatar
    ctx.beginPath();
    if (data.visage === "ovale") {
      ctx.ellipse(100, 60, 50, 70, 0, 0, Math.PI * 2); // Forme ovale
    } else {
      ctx.arc(100, 60, 50, 0, Math.PI * 2); // Forme ronde
    }
    ctx.fillStyle = "#FAD02E"; // Couleur de peau
    ctx.fill();
    ctx.stroke();

    // Dessiner les yeux
    ctx.beginPath();
    ctx.arc(80, 50, 8, 0, Math.PI * 2); // Oeil gauche
    ctx.arc(120, 50, 8, 0, Math.PI * 2); // Oeil droit
    ctx.fillStyle = data.yeux === "bleus" ? "#007FFF" : "#000"; // Couleur des yeux
    ctx.fill();

    // Dessiner les cheveux
    ctx.beginPath();
    ctx.arc(100, 30, 40, 0, Math.PI, true); // Dessiner une frange pour les cheveux
    ctx.fillStyle = data.cheveux === "blond" ? "#FFDF00" : "#000"; // Couleur des cheveux
    ctx.fill();

    // Dessiner un simple corps
    ctx.beginPath();
    ctx.moveTo(100, 130); // Corps
    ctx.lineTo(100, 180); // Ligne pour le corps
    ctx.stroke();
  };

  return (
    <div className="avatar_box">
      <canvas ref={canvasRef} width={200} height={200}></canvas>
    </div>
  );
};

export default AvatarCanvas;
