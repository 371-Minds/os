/**
 * QuestFlow - AI Workflow Automation Platform for 371OS
 * 
 * This is the main entry point for the QuestFlow application,
 * integrated with the 371OS Autonomous Agent Operating System.
 */

console.log('QuestFlow AI Workflow Automation Platform for 371OS');
console.log('Initializing...');

// Load 371OS integration
const { setup371OSIntegration } = require('./scripts/setup-371os');

// Initialize 371OS integration
setup371OSIntegration()
  .then(() => {
    console.log('QuestFlow-371OS integration ready!');
  })
  .catch(error => {
    console.error('Failed to initialize 371OS integration:', error);
  });

module.exports = {
  // Export core functionality
  setup371OSIntegration
};