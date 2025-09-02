/**
 * Cognitive Interface Components - Index
 * 
 * Revolutionary cognitive-aware interface system for 371 OS.
 * Exports all components for the Galaxy Engine universe paradigm.
 */

export { ExecutiveMode } from './ExecutiveMode';
export { TechnicalMode } from './TechnicalMode';
export { CreativeMode } from './CreativeMode';
export { default as CognitiveModeSwither } from './CognitiveModeSwither';
export { AdaptiveLayout } from './AdaptiveLayout';
export { default as ReadersConstellation } from './ReaderConstellation';
export { CEOsOrrery } from './CEOsOrrery';
export { default as FinancialPlanets } from './FinancialPlanets';
export { default as DepartmentSolarSystems } from './DepartmentSolarSystems';
export { default as BusinessUniverseControls } from './BusinessUniverseControls';
export { default as BusinessIntelligenceIntegration } from './BusinessIntelligenceIntegration';

// Developer's Galaxy - Spatial Development Environment
export { default as DeveloperUniverse } from './DeveloperUniverse';
export { default as DevelopersGalaxy } from './DevelopersGalaxy';
export { default as DeveloperGalaxyControls } from './DeveloperGalaxyControls';

// Creator's Cosmos - Spatial Creative Environment
export { default as CreatorsCosmos } from './CreatorsCosmos';
export { default as CreativeCosmosControls } from './CreativeCosmosControls';

// Communications Universe - Spatial Email Management System (C3 Universal Template)
export { default as CommunicationsUniverse } from './CommunicationsUniverse';
export { default as CommunicationsUniverseController } from './CommunicationsUniverseController';
export { default as C3UniversalTemplate } from './C3UniversalTemplate';

// Galaxy Engine - Universal Template System (C3 Completion)
export { default as UniverseFactory } from '../engine/UniverseFactory';
export { GalaxyEngineTemplate, DomainTemplates } from '../engine/GalaxyEngineTemplate';
export type { UniverseConfiguration, UniverseEntity } from '../engine/GalaxyEngineTemplate';

// Re-export AdaptiveLayout as default for main app integration
export { AdaptiveLayout as default } from './AdaptiveLayout';