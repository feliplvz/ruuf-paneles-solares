# Calculadora de Paneles Solares

Solución al desafío técnico de Ruuf para la posición de Dev.

**Por:** Felipe López  
**Stack:** TypeScript, Next.js 15, Tailwind CSS  
**Contacto:** [felipelopez.valenzuela@gmail.com](mailto:felipelopez.valenzuela@gmail.com) | [LinkedIn](https://www.linkedin.com/in/feliplvz/) | [GitHub](https://github.com/feliplvz)

---

## Resumen

Algoritmo que calcula la cantidad máxima de paneles solares rectangulares que caben en un techo, probando 4 estrategias de optimización. Pasa los 3 test cases oficiales. Incluye interfaz web con visualización en Canvas.

Para ejecutar:
```bash
npm install
npx tsx utils/algorithm.test.ts  # Tests
npm run dev                        # http://localhost:3000
```

Resultado: 3/3 tests pasados (4, 7, 0 paneles)

---

## El Desafío

Calcular la cantidad máxima de paneles solares rectangulares (dimensiones `a × b`) que caben en un techo rectangular (dimensiones `x × y`), sin restricciones de orientación.

### Casos de Prueba

| Techo (X×Y) | Panel (A×B) | Resultado Esperado |
|-------------|-------------|-------------------|
| 2×4         | 1×2         | 4 paneles     |
| 3×5         | 1×2         | 7 paneles     |
| 1×10        | 2×2         | 0 paneles     |

---

## Solución Implementada

### Enfoque: Optimización por Estrategias Múltiples

El algoritmo prueba 4 estrategias diferentes y selecciona la que maximiza paneles:

**1. Orientación Normal (a×b)**

Paneles colocados en su orientación original.  
Ejemplo: Techo 2×4 / Panel 1×2 → 2 filas × 2 columnas = 4

**2. Orientación Rotada (b×a)**

Paneles girados 90°, útil cuando b > a.

**3. Combinación Mixta Horizontal**

Divide el techo horizontalmente. Zona superior con una orientación, zona inferior con otra (usando el espacio restante).

Ejemplo Test 2 (Techo 3×5 / Panel 1×2):
- Superior: 2 filas × 3 cols (1×2) = 6
- Inferior: 1 fila × 1 col (2×1) = 1
- **Total: 7 paneles**

**4. Combinación Mixta Vertical**

Divide el techo verticalmente. Zona izquierda con una orientación, zona derecha con otra.

### Proceso de Desarrollo

**Iteración 1:** Empecé con orientación normal y rotada. Pasé Tests 1 y 3, pero fallé Test 2.

**Iteración 2:** Analicé Test 2 manualmente y descubrí que dividir el techo permite aprovechar mejor el espacio restante. Implementé combinación mixta horizontal y pasé el test con 7 paneles.

**Iteración 3:** Agregué combinación mixta vertical para completitud y validaciones de edge cases.

**Extra:** Agregué una interfaz web con visualización en Canvas para validar visualmente.

---

## Stack Técnico

**Requisitos:**
- TypeScript - Tipado fuerte
- Node.js - Runtime para tests

**Bonus (Interfaz):**
- Next.js 15 - Framework React
- Tailwind CSS - Diseño responsive
- Canvas API - Visualización gráfica


---

## Cómo Ejecutar

### Prerrequisitos

```bash
Node.js >= 18
npm >= 9
```

### Instalación

```bash
# Clonar/descargar el proyecto
cd ruuf-paneles-solares

# Instalar dependencias
npm install
```

### Ejecutar Tests

```bash
npx tsx utils/algorithm.test.ts
```

Salida esperada:

```text
📊 TEST 1: PASS (4 paneles)
📊 TEST 2: PASS (7 paneles)
📊 TEST 3: PASS (0 paneles)
RESUMEN: 3/3 tests pasados
```

### Ejecutar Aplicación Web

```bash
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000)

---

## Estructura del Proyecto

```text
ruuf-paneles-solares/
├── utils/
│   ├── algorithm.ts       # Algoritmo principal
│   └── algorithm.test.ts  # Tests oficiales
├── components/
│   ├── InputForm.tsx      # Formulario de entrada
│   └── RoofCanvas.tsx     # Visualización Canvas
├── app/
│   ├── page.tsx           # Página principal
│   └── layout.tsx         # Layout Next.js
└── README.md
```

---

## Función Requerida

```typescript
/**
 * Calcula máximo de paneles rectangulares en un techo
 * @param roofX - Ancho del techo (metros)
 * @param roofY - Alto del techo (metros)
 * @param panelA - Ancho del panel (metros)
 * @param panelB - Alto del panel (metros)
 * @returns Cantidad máxima de paneles (integer)
 */
export function calculate_panels(
  roofX: number,
  roofY: number,
  panelA: number,
  panelB: number
): number
```

Ubicación: `utils/algorithm.ts` (línea 206)


---

### 4 estrategias

Una solución simple solo probando orientación normal y rotada falla en casos complejos.

Ejemplo real (Test 2):

```text
Techo: 3×5, Panel: 1×2

Solución simple (solo normal):   6 paneles
Solución simple (solo rotada):   5 paneles  
Solución mixta (mi enfoque):     7 paneles
```

Dividir el espacio y combinar orientaciones diferentes en cada zona maximiza el aprovechamiento.

### Por qué TypeScript + Next.js

Aunque el desafío solo pedía el algoritmo, agregué una interfaz completa para validar visualmente que el algoritmo funciona.

---

## Visualización Web (Agregado Extra)

Características:

- Formulario para ingresar dimensiones
- Validación en tiempo real
- Canvas con escala automática
- Color coding: Azul (paneles normales), Verde (paneles rotados 90°)
- Detalles del resultado
- Diseño responsive

---

## 📹 Video Explicativo

**Explicación completa del algoritmo y demostración** (3:47 min):

**🎥 [Ver Video en YouTube](https://youtu.be/6NtAqhSbD1w)**

En el video explico:
- Las 4 estrategias de optimización implementadas
- Demostración de los 3 test cases funcionando
- Tour por la interfaz web (extra opcional)

---

### Tests Automatizados

```bash
npx tsx utils/algorithm.test.ts
```

### Test Manuales (UI)

Probar en <http://localhost:3000> con:

- Test 1: Techo 2×4, Panel 1×2 → Resultado: 4
- Test 2: Techo 3×5, Panel 1×2 → Resultado: 7
- Test 3: Techo 1×10, Panel 2×2 → Resultado: 0
- Test 4: Techo 10×10, Panel 0.5×0.5 → Resultado: 400

---

## Deployment

Link de la app en Vercel: [ruuf-paneles-solares.vercel.app](https://ruuf-paneles-solares.vercel.app/)

---

## Sobre Mí

Felipe López  
Full-Stack Dev  
Santiago, Chile

**Contacto:**  
📧 [felipelopez.valenzuela@gmail.com](mailto:felipelopez.valenzuela@gmail.com)  
💼 [linkedin.com/in/feliplvz](https://www.linkedin.com/in/feliplvz/)  
🐙 [github.com/feliplvz](https://github.com/feliplvz)
