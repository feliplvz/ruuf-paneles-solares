'use client';

import { useState } from 'react';
import InputForm from '@/components/InputForm';
import RoofCanvas from '@/components/RoofCanvas';
import { calculatePanels, PanelResult } from '@/utils/algorithm';

export default function Home() {
  const [result, setResult] = useState<PanelResult | null>(null);
  const [dimensions, setDimensions] = useState({
    roofX: 0,
    roofY: 0,
    panelA: 0,
    panelB: 0
  });

  const handleCalculate = (roofX: number, roofY: number, panelA: number, panelB: number) => {
    const calculatedResult = calculatePanels(roofX, roofY, panelA, panelB);
    setResult(calculatedResult);
    setDimensions({ roofX, roofY, panelA, panelB });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
             Calculadora de Paneles Solares
          </h1>
          <p className="text-gray-600 text-lg">
            Desafío Técnico - Ruuf
          </p>
          <p className="text-gray-500 text-sm mt-1">
            Por Felipe López - Postulación Dev
          </p>
        </header>

        {/* Contenido Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Formulario */}
          <div>
            <InputForm onCalculate={handleCalculate} />
          </div>

          {/* Visualización */}
          <div>
            {result ? (
              <RoofCanvas
                roofX={dimensions.roofX}
                roofY={dimensions.roofY}
                panelA={dimensions.panelA}
                panelB={dimensions.panelB}
                result={result}
              />
            ) : (
              <div className="bg-white p-6 rounded-lg shadow-md h-full flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <p className="text-6xl mb-4">🏠</p>
                  <p className="text-lg">Ingresa las dimensiones para calcular</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center text-gray-600 text-sm">
          <p>
            Desarrollado con Next.js 15 + TypeScript + Tailwind CSS
          </p>
          <p className="mt-2">
            Algoritmo optimizado que prueba múltiples orientaciones para maximizar paneles
          </p>
        </footer>
      </div>
    </div>
  );
}
