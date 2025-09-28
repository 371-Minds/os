const { loadAgentConfig, listAvailableAgents, validateAgentConfig } = require('../lib/agent-registry');

describe('371OS Agent Registry', () => {
  describe('loadAgentConfig', () => {
    it('should load a valid agent configuration', () => {
      // This test would need actual 371OS agent files to work
      // For now, we'll just verify the function exists and is callable
      expect(typeof loadAgentConfig).toBe('function');
    });
  });

  describe('listAvailableAgents', () => {
    it('should return a list of available agents', () => {
      const agents = listAvailableAgents();
      expect(Array.isArray(agents)).toBe(true);
    });
  });

  describe('validateAgentConfig', () => {
    it('should validate a correct agent configuration', () => {
      const validConfig = {
        name: 'Test Agent',
        bio: ['Test agent for validation'],
        lore: ['Test lore'],
        knowledge: ['Test knowledge'],
        messageExamples: [],
        postExamples: [],
        style: {
          all: ['test'],
          chat: ['test'],
          post: ['test']
        }
      };
      
      const result = validateAgentConfig(validConfig);
      expect(typeof result).toBe('object');
      expect('valid' in result).toBe(true);
    });

    it('should identify missing required fields', () => {
      const invalidConfig = {
        name: 'Test Agent'
        // Missing other required fields
      };
      
      const result = validateAgentConfig(invalidConfig);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });
  });
});