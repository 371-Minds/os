/**
 * @fileoverview Procedural Shader Generation System for 371 OS
 * Provides TypeScript-based shader definition for spatial computing environments
 * Mock implementation until @thi.ng/shader-ast is available
 */

import { Vec3, Vec4 } from '@thi.ng/vectors';
import { Mat } from '@thi.ng/matrices';
import { illegalArgs } from '@thi.ng/errors';
import { isString, isObject } from '@thi.ng/checks';

// Type aliases for WebGL operations
type Mat4 = Mat;
type Vec2 = [number, number];

// Mock shader AST functions until thi.ng packages are available
const mockShaderAST = {
  defn: (returnType: string, name: string, params: any[], body: () => any) => ({ type: 'function', name, body }),
  ret: (value: any) => ({ type: 'return', value }),
  vec3: (...args: any[]) => ({ type: 'vec3', args }),
  vec4: (...args: any[]) => ({ type: 'vec4', args }),
  uniform: (type: string, name: string) => ({ type: 'uniform', dataType: type, name }),
  varying: (type: string, name: string) => ({ type: 'varying', dataType: type, name }),
  attribute: (type: string, name: string) => ({ type: 'attribute', dataType: type, name }),
  mul: (a: any, b: any) => ({ type: 'multiply', a, b }),
  add: (a: any, b: any) => ({ type: 'add', a, b }),
  sub: (a: any, b: any) => ({ type: 'subtract', a, b }),
  normalize: (vec: any) => ({ type: 'normalize', vec }),
  dot: (a: any, b: any) => ({ type: 'dot', a, b }),
  clamp: (value: any, min: any, max: any) => ({ type: 'clamp', value, min, max }),
  pow: (base: any, exp: any) => ({ type: 'pow', base, exp }),
  $: (expr: any, ...args: any[]) => ({ type: 'expression', expr, args })
};

// Mock GLSL compilation
const mockTargetGLSL = () => (ast: any): string => {
  // Simplified GLSL generation for demonstration
  return `
// Generated GLSL shader (mock implementation)
void main() {
  // Business planet shader logic would be here
  gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
}
`;
};

/**
 * Shader program configuration for spatial rendering
 */
export interface ShaderConfig {
  name: string;
  vertexShader: string;
  fragmentShader: string;
  uniforms: Record<string, any>;
  attributes: Record<string, any>;
  defines?: Record<string, string | number>;
}

/**
 * Uniform variable definitions for spatial shaders
 */
export interface ShaderUniforms {
  // Transformation matrices
  u_modelMatrix: Mat4;
  u_viewMatrix: Mat4;
  u_projectionMatrix: Mat4;
  u_normalMatrix: Mat4;
  
  // Lighting
  u_lightPosition: Vec3;
  u_lightColor: Vec3;
  u_ambientColor: Vec3;
  
  // Material properties
  u_albedo: Vec4;
  u_metallic: number;
  u_roughness: number;
  u_emissive: Vec3;
  
  // Time and animation
  u_time: number;
  u_deltaTime: number;
  
  // Spatial computing
  u_businessMetrics: Vec4; // Revenue, Growth, Risk, Efficiency
  u_agentActivity: Vec3;   // Agent count, activity level, coordination
  u_universeDimensions: Vec3; // Width, Height, Depth of business universe
}

/**
 * Vertex attributes for 3D geometry
 */
export interface ShaderAttributes {
  a_position: Vec3;
  a_normal: Vec3;
  a_uv: Vec2;
  a_color?: Vec4;
  a_tangent?: Vec3;
  a_bitangent?: Vec3;
}

/**
 * Shader compilation result
 */
export interface CompiledShader {
  name: string;
  vertexSource: string;
  fragmentSource: string;
  uniforms: string[];
  attributes: string[];
  errors: string[];
  warnings: string[];
}

export class ShaderGenerator {
  private static shaderCache: Map<string, CompiledShader> = new Map();
  private static glslTarget = mockTargetGLSL();

  /**
   * Generate spatial business planet shader for CEO's Orrery
   */
  static generateBusinessPlanetShader(config: {
    animated: boolean;
    metallicFactor: number;
    emissiveStrength: number;
  }): CompiledShader {
    const shaderName = `business_planet_${config.animated ? 'animated' : 'static'}_${config.metallicFactor}_${config.emissiveStrength}`;
    
    if (this.shaderCache.has(shaderName)) {
      return this.shaderCache.get(shaderName)!;
    }

    // Generate business planet vertex shader
    const vertexShaderSource = `#version 300 es
precision highp float;

uniform mat4 u_modelMatrix;
uniform mat4 u_viewMatrix;
uniform mat4 u_projectionMatrix;
uniform float u_time;
uniform vec4 u_businessMetrics;

in vec3 a_position;
in vec3 a_normal;
in vec2 a_uv;

out vec3 v_worldPosition;
out vec3 v_normal;
out vec2 v_uv;
out vec4 v_businessData;

void main() {
    vec4 worldPos = u_modelMatrix * vec4(a_position, 1.0);
    
    // Business pulsation effect
    ${config.animated ? `
    float pulsation = u_businessMetrics.x * 0.1 * (1.0 + 0.2 * sin(u_time * 2.0));
    worldPos *= vec4(pulsation, pulsation, pulsation, 1.0);` : ''}
    
    v_worldPosition = worldPos.xyz;
    v_normal = normalize(mat3(u_modelMatrix) * a_normal);
    v_uv = a_uv;
    v_businessData = u_businessMetrics;
    
    gl_Position = u_projectionMatrix * u_viewMatrix * worldPos;
}`;

    // Generate business planet fragment shader
    const fragmentShaderSource = `#version 300 es
precision mediump float;

uniform vec3 u_lightPosition;
uniform vec3 u_lightColor;
uniform vec4 u_albedo;

in vec3 v_worldPosition;
in vec3 v_normal;
in vec2 v_uv;
in vec4 v_businessData;

out vec4 fragColor;

void main() {
    vec3 lightDir = normalize(u_lightPosition - v_worldPosition);
    vec3 normal = normalize(v_normal);
    vec3 viewDir = normalize(vec3(0.0, 0.0, 10.0) - v_worldPosition);
    
    // Business performance diffuse
    float businessStrength = clamp(v_businessData.x, 0.0, 1.0);
    float diffuse = businessStrength * clamp(dot(normal, lightDir), 0.0, 1.0);
    
    // Metallic specular
    vec3 reflectDir = reflect(-lightDir, normal);
    float specular = pow(clamp(dot(viewDir, reflectDir), 0.0, 1.0), 32.0);
    
    // Business activity glow
    float activityGlow = v_businessData.y * ${config.emissiveStrength};
    vec3 emissive = vec3(activityGlow, activityGlow * 0.8, activityGlow * 0.6) * 0.5;
    
    // Combine lighting
    vec3 finalColor = u_albedo.rgb * (diffuse + 0.1) + 
                     u_lightColor * specular * ${config.metallicFactor} + 
                     emissive;
    
    fragColor = vec4(finalColor, u_albedo.a);
}`;

    const result: CompiledShader = {
      name: shaderName,
      vertexSource: vertexShaderSource,
      fragmentSource: fragmentShaderSource,
      uniforms: [
        'u_modelMatrix', 'u_viewMatrix', 'u_projectionMatrix',
        'u_time', 'u_businessMetrics', 'u_lightPosition', 'u_lightColor', 'u_albedo'
      ],
      attributes: ['a_position', 'a_normal', 'a_uv'],
      errors: [],
      warnings: []
    };
    
    this.shaderCache.set(shaderName, result);
    return result;
  }

  /**
   * Generate particle system shader for spatial environments
   */
  static generateParticleShader(config: {
    useTexture: boolean;
    fadeWithDistance: boolean;
    colorVariation: number;
  }): CompiledShader {
    const shaderName = `particle_${config.useTexture ? 'textured' : 'plain'}_${config.fadeWithDistance}_${config.colorVariation}`;
    
    if (this.shaderCache.has(shaderName)) {
      return this.shaderCache.get(shaderName)!;
    }

    // Generate particle vertex shader
    const vertexShaderSource = `#version 300 es
precision highp float;

uniform mat4 u_modelMatrix;
uniform mat4 u_viewMatrix;
uniform mat4 u_projectionMatrix;
uniform float u_time;
uniform vec3 u_agentActivity;

in vec3 a_position;
in vec3 a_velocity;
in vec2 a_lifecycle;
in float a_particleId;

out float v_age;
out float v_alpha;
out vec3 v_color;

void main() {
    float age = u_time - a_lifecycle.x;
    float normalizedAge = clamp(age / a_lifecycle.y, 0.0, 1.0);
    
    // Animate position with agent activity
    float activityMultiplier = 1.0 + u_agentActivity.x * 0.5;
    vec3 animatedPos = a_position + a_velocity * age * activityMultiplier;
    
    // Color variation
    float colorShift = ${config.colorVariation} * sin(a_particleId * 6.28);
    v_color = vec3(1.0 + colorShift, 0.8 + colorShift * 0.8, 0.6 + colorShift * 0.6);
    
    // Alpha lifecycle
    ${config.fadeWithDistance ? `
    float fadeIn = clamp(normalizedAge * 4.0, 0.0, 1.0);
    float fadeOut = clamp((1.0 - normalizedAge) * 4.0, 0.0, 1.0);
    v_alpha = fadeIn * fadeOut;` : `
    v_alpha = 1.0 - normalizedAge;`}
    
    v_age = normalizedAge;
    
    vec4 worldPos = u_modelMatrix * vec4(animatedPos, 1.0);
    gl_Position = u_projectionMatrix * u_viewMatrix * worldPos;
}`;

    const fragmentShaderSource = `#version 300 es
precision mediump float;

in float v_age;
in float v_alpha;
in vec3 v_color;

out vec4 fragColor;

void main() {
    float intensity = 1.2 - v_age;
    vec3 finalColor = v_color * intensity;
    
    // Glow effect
    float glow = (1.0 - v_age) * 0.3;
    vec3 glowColor = finalColor + vec3(glow, glow * 0.5, glow * 0.2);
    
    fragColor = vec4(glowColor, v_alpha);
}`;

    const result: CompiledShader = {
      name: shaderName,
      vertexSource: vertexShaderSource,
      fragmentSource: fragmentShaderSource,
      uniforms: [
        'u_modelMatrix', 'u_viewMatrix', 'u_projectionMatrix',
        'u_time', 'u_agentActivity'
      ],
      attributes: ['a_position', 'a_velocity', 'a_lifecycle', 'a_particleId'],
      errors: [],
      warnings: []
    };
    
    this.shaderCache.set(shaderName, result);
    return result;
  }

  /**
   * Generate UI overlay shader for spatial interface elements
   */
  static generateUIOverlayShader(): CompiledShader {
    const shaderName = 'ui_overlay_spatial';
    
    if (this.shaderCache.has(shaderName)) {
      return this.shaderCache.get(shaderName)!;
    }

    const vertexShaderSource = `#version 300 es
precision highp float;

uniform mat4 u_projectionMatrix;

in vec2 a_position;
in vec2 a_uv;

out vec2 v_uv;

void main() {
    v_uv = a_uv;
    gl_Position = u_projectionMatrix * vec4(a_position, 0.0, 1.0);
}`;

    const fragmentShaderSource = `#version 300 es
precision mediump float;

uniform vec4 u_color;
uniform float u_opacity;

in vec2 v_uv;

out vec4 fragColor;

void main() {
    vec2 center = vec2(0.5, 0.5);
    float distance = length(v_uv - center);
    float smoothEdge = 1.0 - smoothstep(0.4, 0.5, distance);
    
    float finalAlpha = u_opacity * smoothEdge;
    fragColor = vec4(u_color.rgb, finalAlpha);
}`;

    const result: CompiledShader = {
      name: shaderName,
      vertexSource: vertexShaderSource,
      fragmentSource: fragmentShaderSource,
      uniforms: ['u_projectionMatrix', 'u_color', 'u_opacity'],
      attributes: ['a_position', 'a_uv'],
      errors: [],
      warnings: []
    };
    
    this.shaderCache.set(shaderName, result);
    return result;
  }

  /**
   * Compile shader AST to GLSL (simplified mock implementation)
   */
  private static compileShaderAST(shaderAST: any, type: 'vertex' | 'fragment'): {
    source: string;
    errors: string[];
    warnings: string[];
  } {
    // Mock implementation - in production would use thi.ng shader-ast
    return {
      source: `// Mock shader compilation for ${type}\nvoid main() { gl_Position = vec4(0.0); }`,
      errors: [],
      warnings: ['Mock shader compilation - thi.ng/shader-ast integration pending']
    };
  }

  /**
   * Get shader from cache or generate new one
   */
  static getShader(name: string): CompiledShader | null {
    return this.shaderCache.get(name) || null;
  }

  /**
   * Clear shader cache
   */
  static clearCache(): void {
    this.shaderCache.clear();
    console.log('🧹 Shader cache cleared');
  }

  /**
   * Get cache statistics
   */
  static getCacheStats(): {
    shaderCount: number;
    totalSize: number;
    shaderNames: string[];
  } {
    let totalSize = 0;
    const shaderNames: string[] = [];
    
    for (const [name, shader] of this.shaderCache) {
      shaderNames.push(name);
      totalSize += shader.vertexSource.length + shader.fragmentSource.length;
    }
    
    return {
      shaderCount: this.shaderCache.size,
      totalSize,
      shaderNames
    };
  }
}

/**
 * Shader program manager for WebGL rendering
 */
export class ShaderProgramManager {
  private programs: Map<string, WebGLProgram> = new Map();
  private uniforms: Map<string, Map<string, WebGLUniformLocation>> = new Map();
  private attributes: Map<string, Map<string, number>> = new Map();
  
  constructor(private gl: WebGLRenderingContext) {}

  /**
   * Create WebGL program from compiled shader
   */
  createProgram(shader: CompiledShader): boolean {
    if (this.programs.has(shader.name)) {
      console.warn(`⚠️ Program ${shader.name} already exists`);
      return false;
    }
    
    if (shader.errors.length > 0) {
      console.error(`❌ Cannot create program ${shader.name}: ${shader.errors.join(', ')}`);
      return false;
    }
    
    const vertexShader = this.compileShader(shader.vertexSource, this.gl.VERTEX_SHADER);
    const fragmentShader = this.compileShader(shader.fragmentSource, this.gl.FRAGMENT_SHADER);
    
    if (!vertexShader || !fragmentShader) {
      return false;
    }
    
    const program = this.gl.createProgram();
    if (!program) {
      console.error(`❌ Failed to create WebGL program ${shader.name}`);
      return false;
    }
    
    this.gl.attachShader(program, vertexShader);
    this.gl.attachShader(program, fragmentShader);
    this.gl.linkProgram(program);
    
    if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
      const error = this.gl.getProgramInfoLog(program);
      console.error(`❌ Program linking failed for ${shader.name}: ${error}`);
      this.gl.deleteProgram(program);
      return false;
    }
    
    // Store program and get uniform/attribute locations
    this.programs.set(shader.name, program);
    this.cacheUniformLocations(shader.name, program, shader.uniforms);
    this.cacheAttributeLocations(shader.name, program, shader.attributes);
    
    // Cleanup shaders
    this.gl.deleteShader(vertexShader);
    this.gl.deleteShader(fragmentShader);
    
    console.log(`✅ Created shader program ${shader.name}`);
    return true;
  }

  /**
   * Compile individual shader
   */
  private compileShader(source: string, type: number): WebGLShader | null {
    const shader = this.gl.createShader(type);
    if (!shader) return null;
    
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);
    
    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      const error = this.gl.getShaderInfoLog(shader);
      console.error(`❌ Shader compilation failed: ${error}`);
      this.gl.deleteShader(shader);
      return null;
    }
    
    return shader;
  }

  /**
   * Cache uniform locations
   */
  private cacheUniformLocations(programName: string, program: WebGLProgram, uniformNames: string[]): void {
    const uniformMap = new Map<string, WebGLUniformLocation>();
    
    for (const uniformName of uniformNames) {
      const location = this.gl.getUniformLocation(program, uniformName);
      if (location) {
        uniformMap.set(uniformName, location);
      }
    }
    
    this.uniforms.set(programName, uniformMap);
  }

  /**
   * Cache attribute locations
   */
  private cacheAttributeLocations(programName: string, program: WebGLProgram, attributeNames: string[]): void {
    const attributeMap = new Map<string, number>();
    
    for (const attributeName of attributeNames) {
      const location = this.gl.getAttribLocation(program, attributeName);
      if (location >= 0) {
        attributeMap.set(attributeName, location);
      }
    }
    
    this.attributes.set(programName, attributeMap);
  }

  /**
   * Use shader program
   */
  useProgram(name: string): boolean {
    const program = this.programs.get(name);
    if (!program) {
      console.error(`❌ Program ${name} not found`);
      return false;
    }
    
    this.gl.useProgram(program);
    return true;
  }

  /**
   * Get uniform location
   */
  getUniformLocation(programName: string, uniformName: string): WebGLUniformLocation | null {
    const uniformMap = this.uniforms.get(programName);
    return uniformMap?.get(uniformName) || null;
  }

  /**
   * Get attribute location
   */
  getAttributeLocation(programName: string, attributeName: string): number {
    const attributeMap = this.attributes.get(programName);
    return attributeMap?.get(attributeName) ?? -1;
  }

  /**
   * Cleanup all programs
   */
  dispose(): void {
    for (const program of this.programs.values()) {
      this.gl.deleteProgram(program);
    }
    
    this.programs.clear();
    this.uniforms.clear();
    this.attributes.clear();
    
    console.log('🧹 Shader program manager disposed');
  }
}

/**
 * Mock export of shader AST functions for development
 */
export const defn = mockShaderAST.defn;
export const ret = mockShaderAST.ret;
export const vec3 = mockShaderAST.vec3;
export const vec4 = mockShaderAST.vec4;
export const uniform = mockShaderAST.uniform;
export const varying = mockShaderAST.varying;
export const attribute = mockShaderAST.attribute;

// Mock targetGLSL export
export const targetGLSL = mockTargetGLSL;