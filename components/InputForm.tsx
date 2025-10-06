'use client';

import { useState } from 'react';

interface InputFormProps {
  onCalculate: (roofX: number, roofY: number, panelA: number, panelB: number) => void;
}

export default function InputForm({ onCalculate }: InputFormProps) {
  const [roofX, setRoofX] = useState<string>('5');
  const [roofY, setRoofY] = useState<string>('3');
  const [panelA, setPanelA] = useState<string>('2');
  const [panelB, setPanelB] = useState<string>('1');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const rx = parseFloat(roofX);
    const ry = parseFloat(roofY);
    const pa = parseFloat(panelA);
    const pb = parseFloat(panelB);

    if (isNaN(rx) || isNaN(ry) || isNaN(pa) || isNaN(pb)) {
      alert('Por favor ingresa valores numéricos válidos');
      return;
    }

    if (rx <= 0 || ry <= 0 || pa <= 0 || pb <= 0) {
      alert('Todas las dimensiones deben ser mayores a 0');
      return;
    }

    onCalculate(rx, ry, pa, pb);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Dimensiones del Techo y Paneles
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Techo */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-700">🏠 Techo (metros)</h3>
          
          <div>
            <label htmlFor="roofX" className="block text-sm font-medium text-gray-600 mb-1">
              Ancho (X)
            </label>
            <input
              id="roofX"
              type="number"
              step="0.1"
              min="0.1"
              value={roofX}
              onChange={(e) => setRoofX(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="roofY" className="block text-sm font-medium text-gray-600 mb-1">
              Alto (Y)
            </label>
            <input
              id="roofY"
              type="number"
              step="0.1"
              min="0.1"
              value={roofY}
              onChange={(e) => setRoofY(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        {/* Panel */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-700">☀️ Panel Solar (metros)</h3>
          
          <div>
            <label htmlFor="panelA" className="block text-sm font-medium text-gray-600 mb-1">
              Ancho (A)
            </label>
            <input
              id="panelA"
              type="number"
              step="0.1"
              min="0.1"
              value={panelA}
              onChange={(e) => setPanelA(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="panelB" className="block text-sm font-medium text-gray-600 mb-1">
              Alto (B)
            </label>
            <input
              id="panelB"
              type="number"
              step="0.1"
              min="0.1"
              value={panelB}
              onChange={(e) => setPanelB(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md transition duration-200 ease-in-out transform hover:scale-[1.02]"
      >
        🧮 Calcular Paneles
      </button>
    </form>
  );
}
