/**
 * CFO Agent Demo Script
 * 
 * Demonstrates the key capabilities of Maya (CFO Agent) with practical examples
 * of budget analysis, cost optimization, ROI assessment, and financial reporting.
 */

import { CFOAgent } from './index.js';
import type { FinancialTask } from './types.js';

async function demoCFOAgent() {
  console.log('🚀 Starting CFO Agent (Maya) Demonstration\n');
  
  try {
    // Initialize the CFO Agent
    const maya = new CFOAgent();
    
    // Display agent status and capabilities
    console.log('📊 Agent Status:');
    const status = maya.getStatus();
    console.log(`   Name: ${status.name}`);
    console.log(`   Type: ${status.type}`);
    console.log(`   Status: ${status.status}`);
    console.log(`   Capabilities: ${status.capabilities.length} domains\n`);
    
    // Perform health check
    console.log('🔍 Health Check:');
    const healthCheck = await maya.healthCheck();
    console.log(`   Overall Status: ${healthCheck.status}`);
    console.log(`   Components Checked: ${healthCheck.checks.length}`);
    console.log(`   All Healthy: ${healthCheck.overall}\n`);
    
    // Demo 1: Budget Analysis
    console.log('💰 Demo 1: Budget Analysis');
    const budgetTask: FinancialTask = {
      id: 'demo-budget-001',
      title: 'Q4 2024 Budget Performance Analysis',
      description: 'Budget: $250,000, Actual: $275,000, Period: Q4-2024. Analyze variance and provide optimization recommendations.',
      category: 'budget_analysis',
      priority: 'high',
      requestedBy: 'finance-team',
      createdAt: new Date()
    };
    
    const budgetResult = await maya.processTask(budgetTask);
    console.log(`   ✅ Analysis completed in ${budgetResult.metadata.processingTime}ms`);
    console.log(`   📈 Confidence: ${budgetResult.metadata.confidence}%`);
    console.log(`   🎯 Status: ${budgetResult.status}`);
    if (budgetResult.metadata.escalated) {
      console.log('   ⚠️  Escalated for executive review');
    }
    console.log();
    
    // Demo 2: Cost Optimization
    console.log('💡 Demo 2: Cost Optimization Analysis');
    const costResult = await maya.optimizeCosts(
      'Analyze $500,000 operational budget for cost reduction opportunities across technology, personnel, and facilities'
    );
    console.log(`   💰 Total Costs Analyzed: $${costResult.totalCosts.toLocaleString()}`);
    console.log(`   🎯 Optimization Opportunities: ${costResult.optimizationOpportunities.length}`);
    console.log(`   💵 Expected Savings (Year 1): $${costResult.expectedSavings.year1.toLocaleString()}`);
    console.log(`   📅 Implementation Timeline: ${costResult.implementationPlan.totalDuration} months`);
    console.log();
    
    // Demo 3: ROI Assessment
    console.log('📊 Demo 3: ROI Assessment');
    const roiResult = await maya.assessROI(
      'Evaluate $150,000 technology infrastructure investment with expected productivity improvements over 3 years'
    );
    console.log(`   💰 Investment Amount: $${roiResult.investmentAmount.toLocaleString()}`);
    console.log(`   📈 ROI: ${roiResult.financialMetrics.roi.toFixed(1)}%`);
    console.log(`   💵 NPV: $${roiResult.financialMetrics.npv.toLocaleString()}`);
    console.log(`   ⏱️ Payback Period: ${roiResult.financialMetrics.paybackPeriod} years`);
    console.log(`   🎯 Recommendation: ${roiResult.recommendation.decision.toUpperCase()}`);
    console.log(`   🎖️ Confidence: ${roiResult.recommendation.confidence}%`);
    console.log();
    
    // Demo 4: Financial Report Generation
    console.log('📋 Demo 4: Financial Report Generation');
    const reportResult = await maya.generateFinancialReport(
      'Generate comprehensive P&L analysis for Q4 2024 with trend analysis and benchmarking'
    );
    console.log(`   📊 Report Type: ${reportResult.reportType.replace('_', ' ').toUpperCase()}`);
    console.log(`   📅 Report Period: ${reportResult.reportPeriod}`);
    console.log(`   📈 Key Metrics: ${reportResult.keyMetrics.length}`);
    console.log(`   📊 Performance Rating: ${reportResult.executiveSummary.overallPerformance.toUpperCase()}`);
    console.log(`   💡 Recommendations: ${reportResult.recommendations.length}`);
    console.log();
    
    // Demo 5: Revenue Forecasting
    console.log('🔮 Demo 5: Revenue Forecasting');
    const forecastResult = await maya.forecastRevenue(
      'Create 3-year revenue forecast based on historical growth patterns and market expansion plans'
    );
    console.log(`   📅 Forecast Period: ${forecastResult.forecastPeriod}`);
    console.log(`   📊 Methodology: ${forecastResult.methodology.primaryMethod}`);
    console.log(`   💰 Current Revenue: $${forecastResult.baseline.currentRevenue.toLocaleString()}`);
    console.log(`   📈 Year 3 Projection: $${forecastResult.baseline.projectedRevenue[2].toLocaleString()}`);
    console.log(`   🎯 Forecast Accuracy: ${forecastResult.accuracy.historicalAccuracy}%`);
    console.log(`   🎖️ Confidence: ${forecastResult.methodology.confidence}%`);
    console.log();
    
    // Display final performance metrics
    console.log('📊 Final Performance Metrics:');
    const finalStatus = maya.getStatus();
    console.log(`   Tasks Processed: ${finalStatus.performance.tasksProcessed}`);
    console.log(`   Average Response Time: ${finalStatus.performance.averageResponseTime.toFixed(0)}ms`);
    console.log(`   Success Rate: ${(finalStatus.performance.successRate * 100).toFixed(1)}%`);
    console.log(`   Accuracy Rate: ${(finalStatus.performance.accuracyRate! * 100).toFixed(1)}%`);
    
    console.log('\n🎉 CFO Agent (Maya) Demonstration Completed Successfully!');
    console.log('Maya is ready for production financial leadership and decision-making.');
    
  } catch (error) {
    console.error('❌ Demo failed:', error);
    throw error;
  }
}

// Run the demo if this file is executed directly
if (require.main === module) {
  demoCFOAgent().catch(console.error);
}

export { demoCFOAgent };