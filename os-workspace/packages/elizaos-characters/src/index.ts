/**
 * @elizaos/characters - ElizaOS Character Definitions for 371 OS
 *
 * This package provides first-class TypeScript character definitions for the
 * 371 OS C-Suite agent ecosystem, replacing legacy YAML configurations with
 * type-safe, integrated agent definitions that support self-awareness and
 * autonomous workspace manipulation.
 */

// Export all character definitions
export { ceoMimiCharacter, CEOCapabilities } from './ceo-mimi.character';
export { ctoZaraCharacter, CTOCapabilities } from './cto-zara.character';
export { cfoMayaCharacter, CFOCapabilities } from './cfo-maya.character';
export { cloAlexCharacter, CLOCapabilities } from './clo-alex.character';

// Export types for external usage
export type { Character } from '@elizaos/core';

// Convenience exports for all characters
export const C_Suite_Characters = {
  CEO: ceoMimiCharacter,
  CTO: ctoZaraCharacter, 
  CFO: cfoMayaCharacter,
  CLO: cloAlexCharacter
} as const;

export const All_Capabilities = {
  CEO: CEOCapabilities,
  CTO: CTOCapabilities,
  CFO: CFOCapabilities,
  CLO: CLOCapabilities
} as const;

// Character roles for type safety
export const CHARACTER_ROLES = {
  CEO: 'CEO',
  CTO: 'CTO',
  CFO: 'CFO',
  CLO: 'CLO'
} as const;

export type CharacterRole = typeof CHARACTER_ROLES[keyof typeof CHARACTER_ROLES];

/**
 * Get character by role
 */
export function getCharacterByRole(role: CharacterRole) {
  return C_Suite_Characters[role];
}

/**
 * Get capabilities by role
 */
export function getCapabilitiesByRole(role: CharacterRole) {
  return All_Capabilities[role];
}

/**
 * Get all available character roles
 */
export function getAllRoles(): CharacterRole[] {
  return Object.values(CHARACTER_ROLES);
}

// Re-export individual characters for convenience
import { ceoMimiCharacter, CEOCapabilities } from './ceo-mimi.character';
import { ctoZaraCharacter, CTOCapabilities } from './cto-zara.character';
import { cfoMayaCharacter, CFOCapabilities } from './cfo-maya.character';
import { cloAlexCharacter, CLOCapabilities } from './clo-alex.character';