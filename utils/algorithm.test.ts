// Tests - Ruuf challenge

import { calculate_panels, calculatePanels } from './algorithm';

console.log('EJECUTANDO TESTS\n');

// TEST 1: Paneles 1×2, Techo 2×4 → Esperado: 4
const test1 = calculate_panels(2, 4, 1, 2);
console.log('📊 TEST 1:');
console.log(`   Techo: 2×4, Panel: 1×2`);
console.log(`   Resultado: ${test1} paneles`);
console.log(`   Esperado: 4 paneles`);
console.log(`   ${test1 === 4 ? '✅ PASS' : '❌ FAIL'}\n`);

// Detalles del Test 1
const test1Details = calculatePanels(2, 4, 1, 2);
console.log(`   Detalles: ${test1Details.detalles}\n`);

// TEST 2: Paneles 1×2, Techo 3×5 → Esperado: 7
const test2 = calculate_panels(3, 5, 1, 2);
console.log('📊 TEST 2:');
console.log(`   Techo: 3×5, Panel: 1×2`);
console.log(`   Resultado: ${test2} paneles`);
console.log(`   Esperado: 7 paneles`);
console.log(`   ${test2 === 7 ? '✅ PASS' : '❌ FAIL'}\n`);

// Detalles del Test 2
const test2Details = calculatePanels(3, 5, 1, 2);
console.log(`   Orientación: ${test2Details.orientacion}`);
console.log(`   Detalles: ${test2Details.detalles}\n`);

// TEST 3: Paneles 2×2, Techo 1×10 → Esperado: 0
const test3 = calculate_panels(1, 10, 2, 2);
console.log('📊 TEST 3:');
console.log(`   Techo: 1×10, Panel: 2×2`);
console.log(`   Resultado: ${test3} paneles`);
console.log(`   Esperado: 0 paneles`);
console.log(`   ${test3 === 0 ? '✅ PASS' : '❌ FAIL'}\n`);

// Detalles del Test 3
const test3Details = calculatePanels(1, 10, 2, 2);
console.log(`   Detalles: ${test3Details.detalles}\n`);

// RESUMEN
const passed = (test1 === 4 ? 1 : 0) + (test2 === 7 ? 1 : 0) + (test3 === 0 ? 1 : 0);
console.log('=' .repeat(50));
console.log(`RESUMEN: ${passed}/3 tests pasados`);
console.log('=' .repeat(50));

if (passed === 3) {
  console.log('¡TODOS LOS TESTS PASARON! Algoritmo correcto.');
} else {
  console.log('⚠️  Algunos tests fallaron. Revisar algoritmo.');
}
