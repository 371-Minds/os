# src/minds371/platforms/mps_connector.py
from jetbrains_mps import MPSProject, LanguageDefinition

class MPSConnector:
    """MPS integration for custom agent language development"""
    
    def __init__(self):
        self.mps_project = MPSProject("371OS_Agent_Language")
        
    async def develop_agent_dsl(self, language_spec: dict) -> dict:
        """Develop custom DSL for agent definition using MPS"""
        # Define language structure
        language_def = LanguageDefinition(
            name="371OS_AgentScript",
            concepts=[
                "Agent", "Capability", "Tool", "Integration", 
                "CommunityRule", "ScalingLogic", "MonetizationRule"
            ]
        )
        
        # Generate editor aspects
        editor_aspects = await self._generate_editor_aspects(language_spec)
        
        # Create generator for Python agent code
        generator_aspects = await self._create_agent_generators(language_spec)
        
        return {
            "language_definition": language_def,
            "editor": editor_aspects,
            "generator": generator_aspects,
            "transpiler_ready": True
        }
    
    async def transpile_agent_definitions(self, mps_models: list) -> dict:
        """Transpile MPS agent models to Python implementation"""
        transpiled_agents = []
        
        for model in mps_models:
            python_code = await self.mps_project.generate_code(
                model=model,
                target_language="python",
                base_template="371os_improved_base_agent"
            )
            transpiled_agents.append(python_code)
            
        return {
            "transpiled_count": len(transpiled_agents),
            "agents": transpiled_agents,
            "integration_scripts": self._generate_integration_scripts(transpiled_agents)
        }
