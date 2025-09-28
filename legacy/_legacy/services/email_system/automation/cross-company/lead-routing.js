/**
 * Cross-Company Lead Routing
 * Handles intelligent routing of leads between portfolio companies
 */

class CrossCompanyLeadRouter {
  constructor(config) {
    this.companies = config.companies || [];
    this.routingRules = config.routingRules || [];
    this.defaultCompany = config.defaultCompany;
  }

  async routeLead(leadData) {
    // Route lead to appropriate company based on criteria
    const targetCompany = this.determineTargetCompany(leadData);
    console.log('Routing lead to:', targetCompany, 'Lead:', leadData.email);

    return await this.forwardLead(leadData, targetCompany);
  }

  determineTargetCompany(leadData) {
    // Logic to determine which company should receive the lead
    for (const rule of this.routingRules) {
      if (this.matchesRule(leadData, rule)) {
        return rule.targetCompany;
      }
    }
    return this.defaultCompany;
  }

  matchesRule(leadData, rule) {
    // Check if lead matches routing rule criteria
    return rule.criteria.every((criterion) => {
      return this.evaluateCriterion(leadData, criterion);
    });
  }

  evaluateCriterion(leadData, criterion) {
    // Evaluate individual criterion
    const value = leadData[criterion.field];
    switch (criterion.operator) {
      case 'equals':
        return value === criterion.value;
      case 'contains':
        return value && value.includes(criterion.value);
      case 'in':
        return criterion.value.includes(value);
      default:
        return false;
    }
  }

  async forwardLead(leadData, targetCompany) {
    // Forward lead to target company's system
    console.log('Forwarding lead to company system:', targetCompany);
    return { success: true, company: targetCompany };
  }
}

module.exports = CrossCompanyLeadRouter;
