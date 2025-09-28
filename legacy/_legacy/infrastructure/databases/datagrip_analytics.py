# src/minds371/infrastructure/databases/datagrip_analytics.py
from datagrip import DataGripClient
from src.minds371.infrastructure.databases.mongodb_client import MongoDBClient
from src.minds371.infrastructure.databases.postgresql_client import PostgreSQLClient

class DataGripAnalyticsHub:
    """Centralized analytics using DataGrip with multi-database support"""
    
    def __init__(self):
        self.datagrip = DataGripClient()
        self.mongodb = MongoDBClient()  # Community data
        self.postgresql = PostgreSQLClient()  # Medusa.js data
        
    async def setup_cross_database_analytics(self) -> dict:
        """Setup cross-database analytics views in DataGrip"""
        # Create federated queries combining MongoDB and PostgreSQL
        analytics_views = [
            {
                "name": "community_revenue_analysis",
                "mongodb_collection": "community_contributions", 
                "postgresql_tables": ["medusa_products", "medusa_orders"],
                "join_logic": "community_id"
            },
            {
                "name": "agent_performance_metrics",
                "mongodb_collection": "agent_interactions",
                "postgresql_tables": ["system_logs", "performance_metrics"], 
                "join_logic": "agent_id"
            }
        ]
        
        created_views = []
        for view in analytics_views:
            view_result = await self.datagrip.create_federated_view(view)
            created_views.append(view_result)
            
        return {"analytics_views": created_views, "status": "configured"}
    
    async def generate_cmo_dashboard_data(self) -> dict:
        """Generate real-time data for CMO agent dashboard"""
        dashboard_queries = {
            "revenue_trends": """
                SELECT DATE(created_at) as date, 
                       SUM(contribution_amount) as daily_revenue,
                       COUNT(*) as transactions
                FROM community_contributions 
                WHERE created_at >= NOW() - INTERVAL '30 days'
                GROUP BY DATE(created_at)
                ORDER BY date
            """,
            "community_performance": """
                SELECT c.community_id, c.niche,
                       AVG(c.contribution_amount) as avg_contribution,
                       COUNT(DISTINCT c.user_id) as active_contributors,
                       SUM(p.quantity * p.unit_amount) as product_revenue
                FROM community_contributions c
                LEFT JOIN medusa_line_items p ON c.community_id = p.metadata->>'community_id'
                GROUP BY c.community_id, c.niche
            """
        }
        
        dashboard_data = {}
        for query_name, query in dashboard_queries.items():
            result = await self.datagrip.execute_query(query)
            dashboard_data[query_name] = result
            
        return dashboard_data
