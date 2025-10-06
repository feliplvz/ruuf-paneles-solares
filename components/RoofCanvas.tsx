'use client';

import { useEffect, useRef } from 'react';
import { PanelResult } from '@/utils/algorithm';

interface RoofCanvasProps {
  roofX: number;
  roofY: number;
  panelA: number;
  panelB: number;
  result: PanelResult;
}

export default function RoofCanvas({ roofX, roofY, panelA, panelB, result }: RoofCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Limpiar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Configuración de escala para que quepa en el canvas
    const padding = 40;
    const maxWidth = canvas.width - (padding * 2);
    const maxHeight = canvas.height - (padding * 2);
    
    // Escala para que el techo quepa en el canvas
    const scaleX = maxWidth / roofX;
    const scaleY = maxHeight / roofY;
    const scale = Math.min(scaleX, scaleY);

    // Dimensiones escaladas
    const scaledRoofX = roofX * scale;
    const scaledRoofY = roofY * scale;
    const scaledPanelA = panelA * scale;
    const scaledPanelB = panelB * scale;

    // Centrar el dibujo
    const offsetX = (canvas.width - scaledRoofX) / 2;
    const offsetY = (canvas.height - scaledRoofY) / 2;

    // Dibujar techo (rectángulo gris)
    ctx.fillStyle = '#e5e7eb';
    ctx.fillRect(offsetX, offsetY, scaledRoofX, scaledRoofY);
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 2;
    ctx.strokeRect(offsetX, offsetY, scaledRoofX, scaledRoofY);

    // Etiqueta del techo
    ctx.fillStyle = '#374151';
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText(
      `Techo: ${roofX}m × ${roofY}m`,
      offsetX,
      offsetY - 10
    );

    // Dibujar paneles
    if (result.total > 0) {
      drawPanels(ctx, offsetX, offsetY, scaledRoofX, scaledRoofY, scaledPanelA, scaledPanelB, result);
    } else {
      // Mensaje si no caben paneles
      ctx.fillStyle = '#ef4444';
      ctx.font = 'bold 18px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(
        '⚠️ No caben paneles',
        canvas.width / 2,
        canvas.height / 2
      );
      ctx.textAlign = 'left';
    }

  }, [roofX, roofY, panelA, panelB, result]);

  // Función para dibujar los paneles según el resultado
  const drawPanels = (
    ctx: CanvasRenderingContext2D,
    offsetX: number,
    offsetY: number,
    roofWidth: number,
    roofHeight: number,
    panelWidth: number,
    panelHeight: number,
    result: PanelResult
  ) => {
    // Determinar orientación usada
    const isRotated = result.orientacion.includes('rotada');
    const isMixed = result.orientacion.includes('mixta');

    let panelW = panelWidth;
    let panelH = panelHeight;

    if (isRotated && !isMixed) {
      // Intercambiar dimensiones si está rotado
      [panelW, panelH] = [panelH, panelW];
    }

    // Calcular cuántos paneles caben
    const cols = Math.floor(roofWidth / panelW);
    const rows = Math.floor(roofHeight / panelH);

    // Dibujar paneles
    let panelCount = 0;
    for (let row = 0; row < rows && panelCount < result.total; row++) {
      for (let col = 0; col < cols && panelCount < result.total; col++) {
        const x = offsetX + (col * panelW);
        const y = offsetY + (row * panelH);

        // Panel solar (azul)
        ctx.fillStyle = '#3b82f6';
        ctx.fillRect(x, y, panelW, panelH);
        
        // Borde del panel
        ctx.strokeStyle = '#1e40af';
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, panelW, panelH);

        // Número del panel
        ctx.fillStyle = 'white';
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(
          `${panelCount + 1}`,
          x + panelW / 2,
          y + panelH / 2
        );
        
        panelCount++;
      }
    }

    // Si es combinación mixta, intentar llenar espacios restantes
    if (isMixed && panelCount < result.total) {
      // Espacio restante horizontal
      const remainingX = roofWidth - (cols * panelW);
      if (remainingX >= panelHeight) { // Paneles rotados en el espacio restante
        const extraCols = Math.floor(remainingX / panelHeight);
        const extraRows = Math.floor(roofHeight / panelWidth);
        
        for (let row = 0; row < extraRows && panelCount < result.total; row++) {
          for (let col = 0; col < extraCols && panelCount < result.total; col++) {
            const x = offsetX + (cols * panelW) + (col * panelHeight);
            const y = offsetY + (row * panelWidth);

            ctx.fillStyle = '#10b981'; // Verde para paneles rotados
            ctx.fillRect(x, y, panelHeight, panelWidth);
            
            ctx.strokeStyle = '#059669';
            ctx.lineWidth = 1;
            ctx.strokeRect(x, y, panelHeight, panelWidth);

            ctx.fillStyle = 'white';
            ctx.font = 'bold 12px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(
              `${panelCount + 1}`,
              x + panelHeight / 2,
              y + panelWidth / 2
            );
            
            panelCount++;
          }
        }
      }

      // Espacio restante vertical
      const remainingY = roofHeight - (rows * panelH);
      if (remainingY >= panelWidth && panelCount < result.total) {
        const extraRows = Math.floor(remainingY / panelWidth);
        const extraCols = Math.floor(roofWidth / panelHeight);
        
        for (let row = 0; row < extraRows && panelCount < result.total; row++) {
          for (let col = 0; col < extraCols && panelCount < result.total; col++) {
            const x = offsetX + (col * panelHeight);
            const y = offsetY + (rows * panelH) + (row * panelWidth);

            ctx.fillStyle = '#10b981';
            ctx.fillRect(x, y, panelHeight, panelWidth);
            
            ctx.strokeStyle = '#059669';
            ctx.lineWidth = 1;
            ctx.strokeRect(x, y, panelHeight, panelWidth);

            ctx.fillStyle = 'white';
            ctx.font = 'bold 12px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(
              `${panelCount + 1}`,
              x + panelHeight / 2,
              y + panelWidth / 2
            );
            
            panelCount++;
          }
        }
      }
    }

    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Visualización del Techo
      </h2>
      
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        className="border-2 border-gray-300 rounded-md w-full"
      />

      <div className="mt-4 p-4 bg-gray-50 rounded-md">
        <p className="text-lg font-semibold text-gray-800">
          📊 Total de paneles: <span className="text-blue-600">{result.total}</span>
        </p>
        <p className="text-sm text-gray-600 mt-2">
          🔄 {result.orientacion}
        </p>
        <p className="text-sm text-gray-500 mt-1">
          {result.detalles}
        </p>
      </div>

      <div className="mt-4 flex gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 border border-blue-700"></div>
          <span>Paneles normales</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 border border-green-700"></div>
          <span>Paneles rotados (si aplica)</span>
        </div>
      </div>
    </div>
  );
}
