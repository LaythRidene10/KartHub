// datamodel/part_1.js
import { mockParts } from './mockdata'

const PART_IMAGE_URLS = {
  'rotax-125-max-engine.jpg': new URL('../assets/parts/rotax-125-max-engine.jpg', import.meta.url).href,
  'iame-x30-engine.jpg': new URL('../assets/parts/iame-x30-engine.jpg', import.meta.url).href,
  'mg-yellow-slick-tires.jpg': new URL('../assets/parts/mg-yellow-slick-tires.jpg', import.meta.url).href,
  'vega-xh-tires.jpg': new URL('../assets/parts/vega-xh-tires.jpg', import.meta.url).href,
  'otk-front-brake-system.jpg': new URL('../assets/parts/otk-front-brake-system.jpg', import.meta.url).href,
  'brembo-rear-caliper.jpg': new URL('../assets/parts/brembo-rear-caliper.jpg', import.meta.url).href,
  'tony-kart-frame-401r.jpg': new URL('../assets/parts/tony-kart-frame-401r.jpg', import.meta.url).href,
  'crg-black-steel-frame.jpg': new URL('../assets/parts/crg-black-steel-frame.jpg', import.meta.url).href,
  'tillett-t11-seat.jpg': new URL('../assets/parts/tillett-t11-seat.jpg', import.meta.url).href,
  'omp-ks2-seat.jpg': new URL('../assets/parts/omp-ks2-seat.jpg', import.meta.url).href,
  'otk-steering-wheel.png': new URL('../assets/parts/otk-steering-wheel.png', import.meta.url).href,
  'otk-steering-wheel.jpg': new URL('../assets/parts/otk-steering-wheel.jpg', import.meta.url).href,
  'mychron-column-kit.jpg': new URL('../assets/parts/mychron-column-kit.jpg', import.meta.url).href,
}

// Part types used across the builder, parts list, and admin panel
export const PART_TYPES = ['engine', 'wheel', 'brake', 'frame', 'seat', 'steering']

// Compatibility rules: which parts work together
// Format: { partType: { compatibleWith: { otherPartType: [allowedIDs] } } }
export const COMPATIBILITY_RULES = {
  engine: {
    // Rotax 125 MAX works with these frames
    'p-001': { frame: ['p-007', 'p-008'], brake: ['p-005', 'p-006'] },
    // IAME X30 works with these frames
    'p-002': { frame: ['p-007', 'p-008'], brake: ['p-005'] },
  },
  frame: {
    // Tony Kart 401R compatible with these engines
    'p-007': { engine: ['p-001', 'p-002'], brake: ['p-005', 'p-006'] },
    // CRG Black Steel compatible with these engines
    'p-008': { engine: ['p-001'], brake: ['p-005'] },
  },
  brake: {
    // OTK Front Brake compatible with these frames
    'p-005': { frame: ['p-007', 'p-008'], engine: ['p-001', 'p-002'] },
    // Brembo Rear Caliper only works with Tony Kart frame
    'p-006': { frame: ['p-007'], engine: ['p-001'] },
  },
  wheel: {
    // All wheels are universally compatible for now
    'p-003': { frame: ['p-007', 'p-008'] },
    'p-004': { frame: ['p-007', 'p-008'] },
  },
  seat: {
    // All seats fit all frames
    'p-009': { frame: ['p-007', 'p-008'] },
    'p-010': { frame: ['p-007', 'p-008'] },
  },
  steering: {
    // OTK wheel works with all
    'p-011': { frame: ['p-007', 'p-008'] },
    // Mychron column only works with Tony Kart frame
    'p-012': { frame: ['p-007'] },
  },
}

export class Part {
  constructor ({
    ID,
    name,
    type,
    image = '',
    price = 0,
    description = '',
    serialNumber,
    compatibility = true,
    availability = true,
    supplier = null,
    compatRules = {}, // specific compatibility rules for this part
  }) {
    this.ID = ID ?? crypto.randomUUID()
    this.name = name
    this.type = type // one of PART_TYPES
    this.image = image
    this.price = price
    this.description = description
    this.serialNumber = serialNumber ?? `SN-${Math.random().toString(36).slice(2, 8).toUpperCase()}`
    this.compatibility = compatibility
    this.availability = availability
    this.supplier = supplier // supplierID reference
    this.compatRules = compatRules // specific compatibility object
  }
}

const STORAGE_KEY = 'kartbuilder_parts'

function resolvePartImage (image) {
  if (!image) {
    return ''
  }

  if (image.startsWith('http://') || image.startsWith('https://') || image.startsWith('data:') || image.startsWith('/')) {
    return image
  }

  return PART_IMAGE_URLS[image] ?? image
}

function normalizePart (part) {
  return {
    ...part,
    image: resolvePartImage(part.image),
  }
}

function loadData () {
  const data = sessionStorage.getItem(STORAGE_KEY)
  if (data) {
    return JSON.parse(data).map(normalizePart)
  }
  const normalizedParts = mockParts.map(normalizePart)
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(normalizedParts))
  return normalizedParts
}

function saveData (data) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

/* ===================== CREATE ===================== */
export function addPart (part) {
  const list = loadData()
  list.push(part)
  saveData(list)
  return part
}

/* ===================== READ ===================== */
export function getAllParts () {
  return loadData()
}

export function getPartById (ID) {
  return loadData().find(p => p.ID === ID) || null
}

export function getPartsByType (type) {
  return loadData().filter(p => p.type === type)
}

/* ===================== UPDATE ===================== */
export function updatePartById (ID, updatedData) {
  const list = loadData()
  const part = list.find(p => p.ID === ID)
  if (!part) {
    return null
  }
  Object.assign(part, updatedData)
  saveData(list)
  return part
}

/* ===================== DELETE ===================== */
export function deletePartById (ID) {
  const list = loadData()
  const index = list.findIndex(p => p.ID === ID)
  if (index === -1) {
    return null
  }
  const deleted = list[index]
  list.splice(index, 1)
  saveData(list)
  return deleted
}

/* ===================== COMPATIBILITY CHECKING ===================== */
/**
 * Check if two parts are compatible with each other
 * @param {Part} part1 - First part
 * @param {Part} part2 - Second part
 * @returns {{compatible: boolean, reason?: string}}
 */
export function checkCompatibility (part1, part2) {
  if (!part1 || !part2) {
    return { compatible: true }
  } // null parts are fine

  // Check rules for part1 -> part2
  const part1Rules = COMPATIBILITY_RULES[part1.type]?.[part1.ID]
  if (part1Rules) {
    const allowedParts = part1Rules[part2.type]
    if (allowedParts && !allowedParts.includes(part2.ID)) {
      return {
        compatible: false,
        reason: `${part1.name} is not compatible with ${part2.name}`,
      }
    }
  }

  // Check rules for part2 -> part1 (bidirectional check)
  const part2Rules = COMPATIBILITY_RULES[part2.type]?.[part2.ID]
  if (part2Rules) {
    const allowedParts = part2Rules[part1.type]
    if (allowedParts && !allowedParts.includes(part1.ID)) {
      return {
        compatible: false,
        reason: `${part2.name} is not compatible with ${part1.name}`,
      }
    }
  }

  return { compatible: true }
}

/**
 * Validate a complete parts selection
 * @param {Object} selectedParts - Object with part types as keys and Part IDs as values
 * @returns {{valid: boolean, incompatiblePairs: Array<{parts: string[], reason: string}>}}
 */
export function validatePartsSelection (selectedParts) {
  const incompatiblePairs = []
  const partIds = Object.values(selectedParts).filter(Boolean)

  // Get actual part objects
  const parts = partIds.map(id => getPartById(id)).filter(Boolean)

  // Check all pairs
  for (let i = 0; i < parts.length; i++) {
    for (let j = i + 1; j < parts.length; j++) {
      const result = checkCompatibility(parts[i], parts[j])
      if (!result.compatible) {
        incompatiblePairs.push({
          parts: [parts[i].name, parts[j].name],
          reason: result.reason,
        })
      }
    }
  }

  return {
    valid: incompatiblePairs.length === 0,
    incompatiblePairs,
  }
}

/**
 * Get compatible options for a part type given current selection
 * @param {string} partType - Type of part to filter (e.g., 'engine')
 * @param {Object} selectedParts - Current selection of other parts
 * @returns {Array<Part>} - Array of compatible parts
 */
export function getCompatibleParts (partType, selectedParts = {}) {
  const allParts = getPartsByType(partType)
  const otherParts = Object.entries(selectedParts)
    .filter(([type]) => type !== partType)
    .map(([, id]) => getPartById(id))
    .filter(Boolean)

  // If no other parts selected, all parts are compatible
  if (otherParts.length === 0) {
    return allParts
  }

  return allParts.filter(part => {
    return otherParts.every(other => {
      const result = checkCompatibility(part, other)
      return result.compatible
    })
  })
}
