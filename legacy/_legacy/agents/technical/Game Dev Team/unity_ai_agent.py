# src/minds371/agents/technical/unity_ai_agent.py
from unity_ai import UnityAIAssistant
from koog import Agent, Tool

class UnityAIAgent(ImprovedBaseAgent):
    """Unity AI Assistant integration for game development"""
    
    def __init__(self):
        super().__init__(
            name="Unity_AI_Agent",
            role="game_development",
            capabilities=["code_generation", "scene_creation", "optimization"]
        )
        self.unity_ai = UnityAIAssistant()
        self.jetbrains_ai = JetBrainsAIConnector()
        
    @Tool
    async def generate_game_mechanics(self, game_concept: dict) -> dict:
        """Generate Unity scripts for game mechanics"""
        # Use Unity AI for initial code generation
        unity_scripts = await self.unity_ai.generate_scripts(
            game_type=game_concept['genre'],
            mechanics=game_concept['core_mechanics'],
            target_platform=game_concept['platform']
        )
        
        # Enhance with JetBrains AI for optimization
        optimized_scripts = await self.jetbrains_ai.optimize_code(
            code=unity_scripts,
            optimization_type="performance_and_maintainability"
        )
        
        return {
            "scripts": optimized_scripts,
            "assets_needed": unity_scripts['required_assets'],
            "testing_plan": unity_scripts['test_scenarios']
        }
