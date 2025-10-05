/**
 * @fileoverview Mathematical Bridge for ElizaOS Integration
 * Provides seamless integration between ElizaOS core types and thi.ng mathematical operations
 */

import type { 
  IMemoryProvider, 
  ActionHandler, 
  State, 
  Memory, 
  AgentRuntime 
} from '@elizaos/core';
import { Vec2, Vec3 } from '@thi.ng/vectors';
import { Mat } from '@thi.ng/matrices';
import { map, filter, comp } from '@thi.ng/transducers';
import { MathOps, GeometryEngine, Vector3D } from './thinng-foundation';

/**
 * Enhanced State interface with mathematical precision
 */
export interface MathematicalState extends State {
  position?: Vec3;
  rotation?: Vec3;
  scale?: Vec3;
  velocity?: Vec3;
  acceleration?: Vec3;
  spatialProperties?: {
    boundingBox: {
      min: Vec3;
      max: Vec3;
    };
    center: Vec3;
    radius: number;
  };
}

/**
 * Mathematical memory provider with optimized operations
 */
export class MathematicalMemoryProvider implements IMemoryProvider {
  private memories: Map<string, Memory> = new Map();
  private spatialIndex: Map<string, Vec3> = new Map();

  async createMemory(memory: Memory, tableName?: string): Promise<void> {
    const key = `${tableName || 'default'}_${memory.id}`;
    this.memories.set(key, memory);
    
    // Extract spatial information if available
    if (memory.content && typeof memory.content === 'object') {
      const content = memory.content as any;
      if (content.position && Array.isArray(content.position)) {
        this.spatialIndex.set(key, content.position as Vec3);
      }
    }
  }

  async getMemories(params: {
    roomId: string;
    count?: number;
    unique?: boolean;
    tableName?: string;
  }): Promise<Memory[]> {
    const prefix = `${params.tableName || 'default'}_`;
    const roomMemories = Array.from(this.memories.entries())
      .filter(([key, memory]) => 
        key.startsWith(prefix) && 
        memory.roomId === params.roomId
      )
      .map(([, memory]) => memory);

    // Apply mathematical sorting by recency and spatial relevance
    const sorted = roomMemories.sort((a, b) => {
      const timeA = new Date(a.createdAt || 0).getTime();
      const timeB = new Date(b.createdAt || 0).getTime();
      
      // Combine temporal and spatial factors
      let score = timeB - timeA; // Newer is better
      
      // Add spatial relevance if positions are available
      const posA = this.spatialIndex.get(`${params.tableName || 'default'}_${a.id}`);
      const posB = this.spatialIndex.get(`${params.tableName || 'default'}_${b.id}`);
      
      if (posA && posB) {
        const distance = MathOps.distance3D(posA, posB);
        score += distance > 10 ? -1000 : 1000; // Prefer spatially close memories
      }
      
      return score;
    });

    const count = params.count || 10;
    return params.unique 
      ? this.removeDuplicates(sorted).slice(0, count)
      : sorted.slice(0, count);
  }

  async getCachedEmbeddings(opts: {
    query_table_name: string;
    query_threshold: number;
    query_input: string;
    query_field_name: string;
    query_field_sub_name: string;
    query_match_count: number;
  }): Promise<Array<{ embedding: number[]; levenshtein_score: number }>> {
    // Implement mathematical similarity search using thi.ng operations
    const pipeline = comp(
      map((memory: Memory) => {
        // Calculate embedding similarity using mathematical operations
        const similarity = this.calculateSimilarity(opts.query_input, memory.content?.text || '');
        return {
          embedding: this.generateMathematicalEmbedding(memory.content?.text || ''),
          levenshtein_score: similarity
        };
      }),
      filter((result: any) => result.levenshtein_score >= opts.query_threshold)
    );

    const allMemories = Array.from(this.memories.values());
    return Array.from(pipeline(allMemories)).slice(0, opts.query_match_count);
  }

  async updateGoalStatus(params: { goalId: string; status: string }): Promise<void> {
    const memory = this.memories.get(params.goalId);
    if (memory) {
      memory.content = {
        ...memory.content,
        status: params.status,
        updatedAt: new Date().toISOString()
      };
    }
  }

  async log(params: { body: { [key: string]: unknown }; userId: string; roomId: string; type: string }): Promise<void> {
    const logMemory: Memory = {
      id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId: params.userId,
      agentId: 'system',
      roomId: params.roomId,
      content: {
        text: JSON.stringify(params.body),
        type: params.type,
        timestamp: new Date().toISOString()
      },
      createdAt: new Date().toISOString()
    };
    
    await this.createMemory(logMemory, 'logs');
  }

  async getMemoriesByRoomIds(params: { roomIds: string[] }): Promise<Memory[]> {
    const allMemories: Memory[] = [];
    
    for (const roomId of params.roomIds) {
      const roomMemories = await this.getMemories({ roomId });
      allMemories.push(...roomMemories);
    }
    
    return allMemories;
  }

  async getGoals(params: {
    roomId: string;
    userId?: string;
    onlyInProgress?: boolean;
    count?: number;
  }): Promise<Memory[]> {
    return this.getMemories({
      roomId: params.roomId,
      count: params.count,
      tableName: 'goals'
    });
  }

  async removeMemory(memoryId: string, tableName?: string): Promise<void> {
    const key = `${tableName || 'default'}_${memoryId}`;
    this.memories.delete(key);
    this.spatialIndex.delete(key);
  }

  async removeAllMemories(roomId: string, tableName?: string): Promise<void> {
    const prefix = `${tableName || 'default'}_`;
    const keysToRemove = Array.from(this.memories.keys())
      .filter(key => {
        const memory = this.memories.get(key);
        return key.startsWith(prefix) && memory?.roomId === roomId;
      });
    
    keysToRemove.forEach(key => {
      this.memories.delete(key);
      this.spatialIndex.delete(key);
    });
  }

  async countMemories(roomId: string, unique?: boolean, tableName?: string): Promise<number> {
    const memories = await this.getMemories({ roomId, tableName });
    return unique ? this.removeDuplicates(memories).length : memories.length;
  }

  async searchMemories(params: {
    tableName: string;
    roomId: string;
    embedding: number[];
    match_threshold: number;
    match_count: number;
    unique: boolean;
  }): Promise<Memory[]> {
    const memories = await this.getMemories({
      roomId: params.roomId,
      tableName: params.tableName,
      unique: params.unique,
      count: params.match_count
    });

    // Use mathematical similarity for enhanced search
    return memories
      .map(memory => ({
        memory,
        similarity: this.calculateEmbeddingSimilarity(
          params.embedding,
          this.generateMathematicalEmbedding(memory.content?.text || '')
        )
      }))
      .filter(({ similarity }) => similarity >= params.match_threshold)
      .sort((a, b) => b.similarity - a.similarity)
      .map(({ memory }) => memory);
  }

  async searchMemoriesByEmbedding(
    embedding: number[],
    params: {
      match_threshold?: number;
      count?: number;
      roomId?: string;
      unique?: boolean;
      tableName?: string;
    }
  ): Promise<Memory[]> {
    return this.searchMemories({
      tableName: params.tableName || 'default',
      roomId: params.roomId || '',
      embedding,
      match_threshold: params.match_threshold || 0.8,
      match_count: params.count || 10,
      unique: params.unique || false
    });
  }

  /**
   * Private helper methods
   */
  private removeDuplicates(memories: Memory[]): Memory[] {
    const seen = new Set<string>();
    return memories.filter(memory => {
      const key = `${memory.content?.text || ''}_${memory.userId}`;
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  }

  private calculateSimilarity(text1: string, text2: string): number {
    // Simple mathematical similarity calculation
    // In production, would use more sophisticated algorithms
    const words1 = text1.toLowerCase().split(/\s+/);
    const words2 = text2.toLowerCase().split(/\s+/);
    
    const intersection = words1.filter(word => words2.includes(word));
    const union = new Set([...words1, ...words2]);
    
    return intersection.length / union.size;
  }

  private generateMathematicalEmbedding(text: string): number[] {
    // Generate a simple mathematical embedding
    // In production, would use actual embedding models
    const words = text.toLowerCase().split(/\s+/);
    const embedding = new Array(512).fill(0);
    
    words.forEach((word, index) => {
      for (let i = 0; i < word.length && i < embedding.length; i++) {
        embedding[i] += word.charCodeAt(i % word.length) * (index + 1);
      }
    });
    
    // Normalize using mathematical precision
    const magnitude = Math.sqrt(embedding.reduce((sum, val) => sum + val * val, 0));
    return magnitude > 0 ? embedding.map(val => val / magnitude) : embedding;
  }

  private calculateEmbeddingSimilarity(embedding1: number[], embedding2: number[]): number {
    if (embedding1.length !== embedding2.length) return 0;
    
    let dotProduct = 0;
    let norm1 = 0;
    let norm2 = 0;
    
    for (let i = 0; i < embedding1.length; i++) {
      dotProduct += embedding1[i] * embedding2[i];
      norm1 += embedding1[i] * embedding1[i];
      norm2 += embedding2[i] * embedding2[i];
    }
    
    const magnitude1 = Math.sqrt(norm1);
    const magnitude2 = Math.sqrt(norm2);
    
    return magnitude1 * magnitude2 > 0 ? dotProduct / (magnitude1 * magnitude2) : 0;
  }
}

/**
 * Mathematical action handler with optimized operations
 */
export class MathematicalActionHandler {
  /**
   * Process spatial actions with mathematical precision
   */
  static async processSpatialAction(
    state: MathematicalState,
    action: {
      type: 'move' | 'rotate' | 'scale';
      target: Vec3;
      duration?: number;
    }
  ): Promise<MathematicalState> {
    const newState = { ...state };
    
    switch (action.type) {
      case 'move':
        if (state.position) {
          // Use mathematical interpolation for smooth movement
          const t = action.duration ? Math.min(1, 1 / action.duration) : 1;
          newState.position = [
            MathOps.lerp(state.position[0], action.target[0], t),
            MathOps.lerp(state.position[1], action.target[1], t),
            MathOps.lerp(state.position[2], action.target[2], t)
          ];
        } else {
          newState.position = [...action.target];
        }
        break;
        
      case 'rotate':
        if (state.rotation) {
          const t = action.duration ? Math.min(1, 1 / action.duration) : 1;
          newState.rotation = [
            MathOps.normalizeAngle(MathOps.lerp(state.rotation[0], action.target[0], t)),
            MathOps.normalizeAngle(MathOps.lerp(state.rotation[1], action.target[1], t)),
            MathOps.normalizeAngle(MathOps.lerp(state.rotation[2], action.target[2], t))
          ];
        } else {
          newState.rotation = action.target.map(MathOps.normalizeAngle) as Vec3;
        }
        break;
        
      case 'scale':
        if (state.scale) {
          const t = action.duration ? Math.min(1, 1 / action.duration) : 1;
          newState.scale = [
            MathOps.lerp(state.scale[0], action.target[0], t),
            MathOps.lerp(state.scale[1], action.target[1], t),
            MathOps.lerp(state.scale[2], action.target[2], t)
          ];
        } else {
          newState.scale = [...action.target];
        }
        break;
    }
    
    // Update spatial properties
    if (newState.position) {
      newState.spatialProperties = {
        ...newState.spatialProperties,
        center: newState.position,
        boundingBox: {
          min: [
            newState.position[0] - (newState.scale?.[0] || 1),
            newState.position[1] - (newState.scale?.[1] || 1),
            newState.position[2] - (newState.scale?.[2] || 1)
          ],
          max: [
            newState.position[0] + (newState.scale?.[0] || 1),
            newState.position[1] + (newState.scale?.[1] || 1),
            newState.position[2] + (newState.scale?.[2] || 1)
          ]
        },
        radius: Math.max(...(newState.scale || [1, 1, 1]))
      };
    }
    
    return newState;
  }

  /**
   * Calculate spatial relationships between agents
   */
  static calculateSpatialRelationships(
    agents: Array<{ id: string; state: MathematicalState }>
  ): Map<string, Map<string, { distance: number; direction: Vec3 }>> {
    const relationships = new Map<string, Map<string, { distance: number; direction: Vec3 }>>();
    
    for (let i = 0; i < agents.length; i++) {
      const agentA = agents[i];
      const relationshipsA = new Map<string, { distance: number; direction: Vec3 }>();
      
      for (let j = 0; j < agents.length; j++) {
        if (i === j) continue;
        
        const agentB = agents[j];
        
        if (agentA.state.position && agentB.state.position) {
          const distance = MathOps.distance3D(agentA.state.position, agentB.state.position);
          const direction: Vec3 = [
            agentB.state.position[0] - agentA.state.position[0],
            agentB.state.position[1] - agentA.state.position[1],
            agentB.state.position[2] - agentA.state.position[2]
          ];
          
          // Normalize direction vector
          if (distance > 0) {
            direction[0] /= distance;
            direction[1] /= distance;
            direction[2] /= distance;
          }
          
          relationshipsA.set(agentB.id, { distance, direction });
        }
      }
      
      relationships.set(agentA.id, relationshipsA);
    }
    
    return relationships;
  }
}

/**
 * Utility functions for mathematical operations in ElizaOS
 */
export class ElizaMathUtils {
  /**
   * Convert ElizaOS state to mathematical state
   */
  static toMathematicalState(state: State): MathematicalState {
    const mathState: MathematicalState = { ...state };
    
    // Extract spatial information from state content
    if (state.bio && typeof state.bio === 'object') {
      const bio = state.bio as any;
      if (bio.position) {
        mathState.position = Array.isArray(bio.position) 
          ? bio.position as Vec3 
          : [bio.position.x || 0, bio.position.y || 0, bio.position.z || 0];
      }
      if (bio.rotation) {
        mathState.rotation = Array.isArray(bio.rotation)
          ? bio.rotation as Vec3
          : [bio.rotation.x || 0, bio.rotation.y || 0, bio.rotation.z || 0];
      }
      if (bio.scale) {
        mathState.scale = Array.isArray(bio.scale)
          ? bio.scale as Vec3
          : [bio.scale.x || 1, bio.scale.y || 1, bio.scale.z || 1];
      }
    }
    
    return mathState;
  }

  /**
   * Convert mathematical state back to ElizaOS state
   */
  static fromMathematicalState(mathState: MathematicalState): State {
    const state: State = { ...mathState };
    
    // Embed spatial information back into bio
    if (mathState.position || mathState.rotation || mathState.scale) {
      state.bio = {
        ...state.bio,
        ...(mathState.position && { position: { x: mathState.position[0], y: mathState.position[1], z: mathState.position[2] } }),
        ...(mathState.rotation && { rotation: { x: mathState.rotation[0], y: mathState.rotation[1], z: mathState.rotation[2] } }),
        ...(mathState.scale && { scale: { x: mathState.scale[0], y: mathState.scale[1], z: mathState.scale[2] } })
      };
    }
    
    return state;
  }
}

export {
  Vec2,
  Vec3,
  Mat4,
  MathOps,
  GeometryEngine,
  Vector3D
};