const { loadPlugin, listAvailablePlugins, executePluginAction } = require('../lib/plugin-manager');

describe('ElizaOS Plugin Manager', () => {
  describe('listAvailablePlugins', () => {
    it('should return a list of available plugins', () => {
      const plugins = listAvailablePlugins();
      expect(Array.isArray(plugins)).toBe(true);
    });
  });

  describe('loadPlugin', () => {
    it('should handle non-existent plugins gracefully', () => {
      const plugin = loadPlugin('non-existent-plugin');
      expect(plugin).toBeNull();
    });
  });

  describe('executePluginAction', () => {
    it('should handle execution attempts on unloaded plugins', () => {
      const result = executePluginAction(null, 'test-action');
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should simulate successful action execution', () => {
      const mockPlugin = {
        name: 'test-plugin',
        plugin: {}
      };
      
      const result = executePluginAction(mockPlugin, 'test-action', { param: 'value' });
      expect(result.success).toBe(true);
      expect(result.action).toBe('test-action');
      expect(result.plugin).toBe('test-plugin');
      expect(result.parameters).toEqual({ param: 'value' });
    });
  });
});