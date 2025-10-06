
export interface PanelResult {
  total: number;              // Total de paneles que caben
  orientacion: string;        // Descripción de orientación usada
  detalles: string;           // Explicación de cómo se calculó
}

/**
 * Calcula el máximo de paneles que caben en un techo
 * 
 * @param roofX - Ancho del techo (metros)
 * @param roofY - Alto del techo (metros)
 * @param panelA - Ancho del panel (metros)
 * @param panelB - Alto del panel (metros)
 * @returns Objeto con resultado y detalles
 */

export function calculatePanels(
  roofX: number,
  roofY: number,
  panelA: number,
  panelB: number
): PanelResult {
  // Validaciones básicas
  if (roofX <= 0 || roofY <= 0 || panelA <= 0 || panelB <= 0) {
    return {
      total: 0,
      orientacion: 'Error: Dimensiones inválidas',
      detalles: 'Todas las dimensiones deben ser mayores a 0'
    };
  }

  // Si el panel es más grande que el techo en ambas dimensiones
  if ((panelA > roofX && panelB > roofY) || (panelB > roofX && panelA > roofY)) {
    return {
      total: 0,
      orientacion: 'Panel muy grande',
      detalles: 'El panel no cabe en el techo en ninguna orientación'
    };
  }

  // Probar múltiples combinaciones
  let maxPanels = 0;
  let bestOrientation = '';
  let bestDetails = '';

  // OPCIÓN 1: Todos los paneles en orientación a×b (normal)
  const horizontalNormal = Math.floor(roofX / panelA);
  const verticalNormal = Math.floor(roofY / panelB);
  const totalNormal = horizontalNormal * verticalNormal;

  if (totalNormal > maxPanels) {
    maxPanels = totalNormal;
    bestOrientation = `Orientación normal (${panelA}×${panelB})`;
    bestDetails = `${horizontalNormal} paneles horizontales × ${verticalNormal} verticales = ${totalNormal}`;
  }

  // OPCIÓN 2: Todos los paneles en orientación b×a (rotado)
  const horizontalRotado = Math.floor(roofX / panelB);
  const verticalRotado = Math.floor(roofY / panelA);
  const totalRotado = horizontalRotado * verticalRotado;

  if (totalRotado > maxPanels) {
    maxPanels = totalRotado;
    bestOrientation = `Orientación rotada (${panelB}×${panelA})`;
    bestDetails = `${horizontalRotado} paneles horizontales × ${verticalRotado} verticales = ${totalRotado}`;
  }

  // OPCIÓN 3: Combinación - División horizontal
  // Parte superior con una orientación, parte inferior con otra
  const mixedHorizontal = tryMixedHorizontal(roofX, roofY, panelA, panelB);
  if (mixedHorizontal.total > maxPanels) {
    maxPanels = mixedHorizontal.total;
    bestOrientation = 'Combinación mixta (división horizontal)';
    bestDetails = mixedHorizontal.details;
  }

  // OPCIÓN 4: Combinación - División vertical
  // Parte izquierda con una orientación, parte derecha con otra
  const mixedVertical = tryMixedVertical(roofX, roofY, panelA, panelB);
  if (mixedVertical.total > maxPanels) {
    maxPanels = mixedVertical.total;
    bestOrientation = 'Combinación mixta (división vertical)';
    bestDetails = mixedVertical.details;
  }

  return {
    total: maxPanels,
    orientacion: bestOrientation,
    detalles: bestDetails
  };
}

// Prueba combinaciones dividiendo el techo horizontalmente
function tryMixedHorizontal(
  roofX: number,
  roofY: number,
  panelA: number,
  panelB: number
): { total: number; details: string } {
  let maxTotal = 0;
  let bestDetails = '';

  // Probar diferentes divisiones horizontales
  // Dividir en secciones de altura panelB y panelA
  
  // superior: paneles en orientación normal (a×b)
  const filasNormal = Math.floor(roofY / panelB);
  const colsNormal = Math.floor(roofX / panelA);
  
  // inferior: usar espacio restante con paneles rotados
  const espacioRestanteY = roofY - (filasNormal * panelB);
  const filasRotado = Math.floor(espacioRestanteY / panelA);
  const colsRotado = Math.floor(roofX / panelB);
  
  const total1 = (filasNormal * colsNormal) + (filasRotado * colsRotado);
  
  if (total1 > maxTotal) {
    maxTotal = total1;
    bestDetails = `Superior: ${filasNormal}×${colsNormal} (${panelA}×${panelB}), Inferior: ${filasRotado}×${colsRotado} (${panelB}×${panelA}) = ${total1}`;
  }

  // superior: paneles rotados (b×a)
  const filasRotado2 = Math.floor(roofY / panelA);
  const colsRotado2 = Math.floor(roofX / panelB);
  
  // inferior: usar espacio restante con paneles normales
  const espacioRestanteY2 = roofY - (filasRotado2 * panelA);
  const filasNormal2 = Math.floor(espacioRestanteY2 / panelB);
  const colsNormal2 = Math.floor(roofX / panelA);
  
  const total2 = (filasRotado2 * colsRotado2) + (filasNormal2 * colsNormal2);
  
  if (total2 > maxTotal) {
    maxTotal = total2;
    bestDetails = `Superior: ${filasRotado2}×${colsRotado2} (${panelB}×${panelA}), Inferior: ${filasNormal2}×${colsNormal2} (${panelA}×${panelB}) = ${total2}`;
  }

  return { total: maxTotal, details: bestDetails };
}

// Prueba combinaciones dividiendo el techo verticalmente
function tryMixedVertical(
  roofX: number,
  roofY: number,
  panelA: number,
  panelB: number
): { total: number; details: string } {
  let maxTotal = 0;
  let bestDetails = '';

  // izquierda: paneles normales (a×b)
  const colsNormal = Math.floor(roofX / panelA);
  const filasNormal = Math.floor(roofY / panelB);
  
  // derecha: espacio restante con paneles rotados
  const espacioRestanteX = roofX - (colsNormal * panelA);
  const colsRotado = Math.floor(espacioRestanteX / panelB);
  const filasRotado = Math.floor(roofY / panelA);
  
  const total1 = (colsNormal * filasNormal) + (colsRotado * filasRotado);
  
  if (total1 > maxTotal) {
    maxTotal = total1;
    bestDetails = `Izquierda: ${colsNormal}×${filasNormal} (${panelA}×${panelB}), Derecha: ${colsRotado}×${filasRotado} (${panelB}×${panelA}) = ${total1}`;
  }

  // izquierda: paneles rotados (b×a)
  const colsRotado2 = Math.floor(roofX / panelB);
  const filasRotado2 = Math.floor(roofY / panelA);
  
  // derecha: espacio restante con paneles normales
  const espacioRestanteX2 = roofX - (colsRotado2 * panelB);
  const colsNormal2 = Math.floor(espacioRestanteX2 / panelA);
  const filasNormal2 = Math.floor(roofY / panelB);
  
  const total2 = (colsRotado2 * filasRotado2) + (colsNormal2 * filasNormal2);
  
  if (total2 > maxTotal) {
    maxTotal = total2;
    bestDetails = `Izquierda: ${colsRotado2}×${filasRotado2} (${panelB}×${panelA}), Derecha: ${colsNormal2}×${filasNormal2} (${panelA}×${panelB}) = ${total2}`;
  }

  return { total: maxTotal, details: bestDetails };
}

// Función simple para usar en tests (retorna solo el número)
export function calculate_panels(
  roofX: number,
  roofY: number,
  panelA: number,
  panelB: number
): number {
  const result = calculatePanels(roofX, roofY, panelA, panelB);
  return result.total;
}
