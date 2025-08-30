/**
 * Conversion Attribution Analytics
 * Tracks and attributes conversions to email campaigns and touchpoints
 */

class ConversionAttributionAnalytics {
    constructor(config) {
        this.attributionModel = config.attributionModel || 'last_click';
        this.conversionWindow = config.conversionWindow || 30; // days
        this.touchpoints = [];
        this.conversions = [];
        this.attributionRules = config.attributionRules || [];
    }

    async trackTouchpoint(touchpointData) {
        // Track email touchpoint in customer journey
        const touchpoint = {
            id: this.generateTouchpointId(),
            contactEmail: touchpointData.contactEmail,
            campaignId: touchpointData.campaignId,
            emailId: touchpointData.emailId,
            companyId: touchpointData.companyId,
            touchpointType: touchpointData.type, // email_open, email_click, email_sent
            timestamp: new Date(),
            metadata: {
                subject: touchpointData.subject,
                template: touchpointData.template,
                linkClicked: touchpointData.linkClicked,
                source: touchpointData.source,
                medium: touchpointData.medium,
                campaign: touchpointData.campaign
            }
        };
        
        this.touchpoints.push(touchpoint);
        console.log('Touchpoint tracked:', touchpoint.id, touchpoint.touchpointType);
        
        return touchpoint;
    }

    async trackConversion(conversionData) {
        // Track conversion event
        const conversion = {
            id: this.generateConversionId(),
            contactEmail: conversionData.contactEmail,
            conversionType: conversionData.type, // purchase, signup, demo_request, etc.
            conversionValue: conversionData.value || 0,
            companyId: conversionData.companyId,
            timestamp: new Date(),
            metadata: {
                orderId: conversionData.orderId,
                productId: conversionData.productId,
                revenue: conversionData.revenue,
                currency: conversionData.currency || 'USD',
                source: conversionData.source,
                medium: conversionData.medium
            }
        };
        
        this.conversions.push(conversion);
        console.log('Conversion tracked:', conversion.id, conversion.conversionType, conversion.conversionValue);
        
        // Perform attribution analysis
        await this.performAttribution(conversion);
        
        return conversion;
    }

    async performAttribution(conversion) {
        // Perform attribution analysis for the conversion
        const relevantTouchpoints = this.getRelevantTouchpoints(
            conversion.contactEmail, 
            conversion.timestamp
        );
        
        if (relevantTouchpoints.length === 0) {
            console.log('No relevant touchpoints found for conversion:', conversion.id);
            return;
        }
        
        const attribution = await this.calculateAttribution(conversion, relevantTouchpoints);
        
        // Store attribution results
        conversion.attribution = attribution;
        
        console.log('Attribution calculated for conversion:', conversion.id);
        return attribution;
    }

    getRelevantTouchpoints(contactEmail, conversionTimestamp) {
        // Get touchpoints within conversion window
        const windowStart = new Date(conversionTimestamp);
        windowStart.setDate(windowStart.getDate() - this.conversionWindow);
        
        return this.touchpoints.filter(tp => 
            tp.contactEmail === contactEmail &&
            tp.timestamp >= windowStart &&
            tp.timestamp <= conversionTimestamp
        ).sort((a, b) => a.timestamp - b.timestamp);
    }

    async calculateAttribution(conversion, touchpoints) {
        // Calculate attribution based on model
        let attribution = {};
        
        switch (this.attributionModel) {
            case 'first_click':
                attribution = this.firstClickAttribution(touchpoints);
                break;
            case 'last_click':
                attribution = this.lastClickAttribution(touchpoints);
                break;
            case 'linear':
                attribution = this.linearAttribution(touchpoints);
                break;
            case 'time_decay':
                attribution = this.timeDecayAttribution(touchpoints, conversion.timestamp);
                break;
            case 'position_based':
                attribution = this.positionBasedAttribution(touchpoints);
                break;
            default:
                attribution = this.lastClickAttribution(touchpoints);
        }
        
        // Add conversion value to attribution
        Object.keys(attribution).forEach(key => {
            attribution[key].attributedValue = attribution[key].weight * conversion.conversionValue;
        });
        
        return attribution;
    }

    firstClickAttribution(touchpoints) {
        // First click attribution model
        if (touchpoints.length === 0) return {};
        
        const firstTouchpoint = touchpoints[0];
        return {
            [firstTouchpoint.campaignId]: {
                touchpointId: firstTouchpoint.id,
                weight: 1.0,
                campaignId: firstTouchpoint.campaignId,
                companyId: firstTouchpoint.companyId
            }
        };
    }

    lastClickAttribution(touchpoints) {
        // Last click attribution model
        if (touchpoints.length === 0) return {};
        
        const lastTouchpoint = touchpoints[touchpoints.length - 1];
        return {
            [lastTouchpoint.campaignId]: {
                touchpointId: lastTouchpoint.id,
                weight: 1.0,
                campaignId: lastTouchpoint.campaignId,
                companyId: lastTouchpoint.companyId
            }
        };
    }

    linearAttribution(touchpoints) {
        // Linear attribution model - equal weight to all touchpoints
        if (touchpoints.length === 0) return {};
        
        const weight = 1.0 / touchpoints.length;
        const attribution = {};
        
        touchpoints.forEach(tp => {
            if (!attribution[tp.campaignId]) {
                attribution[tp.campaignId] = {
                    touchpointIds: [],
                    weight: 0,
                    campaignId: tp.campaignId,
                    companyId: tp.companyId
                };
            }
            
            attribution[tp.campaignId].touchpointIds.push(tp.id);
            attribution[tp.campaignId].weight += weight;
        });
        
        return attribution;
    }

    timeDecayAttribution(touchpoints, conversionTimestamp) {
        // Time decay attribution - more recent touchpoints get more credit
        if (touchpoints.length === 0) return {};
        
        const attribution = {};
        let totalWeight = 0;
        
        // Calculate weights with exponential decay
        const weights = touchpoints.map(tp => {
            const daysDiff = (conversionTimestamp - tp.timestamp) / (1000 * 60 * 60 * 24);
            const weight = Math.exp(-daysDiff / 7); // 7-day half-life
            totalWeight += weight;
            return { touchpoint: tp, weight };
        });
        
        // Normalize weights
        weights.forEach(({ touchpoint, weight }) => {
            const normalizedWeight = weight / totalWeight;
            
            if (!attribution[touchpoint.campaignId]) {
                attribution[touchpoint.campaignId] = {
                    touchpointIds: [],
                    weight: 0,
                    campaignId: touchpoint.campaignId,
                    companyId: touchpoint.companyId
                };
            }
            
            attribution[touchpoint.campaignId].touchpointIds.push(touchpoint.id);
            attribution[touchpoint.campaignId].weight += normalizedWeight;
        });
        
        return attribution;
    }

    positionBasedAttribution(touchpoints) {
        // Position-based attribution - 40% first, 40% last, 20% middle
        if (touchpoints.length === 0) return {};
        if (touchpoints.length === 1) return this.firstClickAttribution(touchpoints);
        
        const attribution = {};
        const firstTouchpoint = touchpoints[0];
        const lastTouchpoint = touchpoints[touchpoints.length - 1];
        const middleTouchpoints = touchpoints.slice(1, -1);
        
        // First touchpoint gets 40%
        attribution[firstTouchpoint.campaignId] = {
            touchpointIds: [firstTouchpoint.id],
            weight: 0.4,
            campaignId: firstTouchpoint.campaignId,
            companyId: firstTouchpoint.companyId
        };
        
        // Last touchpoint gets 40%
        if (!attribution[lastTouchpoint.campaignId]) {
            attribution[lastTouchpoint.campaignId] = {
                touchpointIds: [],
                weight: 0,
                campaignId: lastTouchpoint.campaignId,
                companyId: lastTouchpoint.companyId
            };
        }
        attribution[lastTouchpoint.campaignId].touchpointIds.push(lastTouchpoint.id);
        attribution[lastTouchpoint.campaignId].weight += 0.4;
        
        // Middle touchpoints share 20%
        if (middleTouchpoints.length > 0) {
            const middleWeight = 0.2 / middleTouchpoints.length;
            middleTouchpoints.forEach(tp => {
                if (!attribution[tp.campaignId]) {
                    attribution[tp.campaignId] = {
                        touchpointIds: [],
                        weight: 0,
                        campaignId: tp.campaignId,
                        companyId: tp.companyId
                    };
                }
                attribution[tp.campaignId].touchpointIds.push(tp.id);
                attribution[tp.campaignId].weight += middleWeight;
            });
        }
        
        return attribution;
    }

    async getAttributionReport(filters = {}) {
        // Generate attribution report
        console.log('Generating attribution report...');
        
        let conversions = this.conversions;
        
        // Apply filters
        if (filters.timeRange) {
            conversions = conversions.filter(c => 
                c.timestamp >= filters.timeRange.start && 
                c.timestamp <= filters.timeRange.end
            );
        }
        
        if (filters.companyId) {
            conversions = conversions.filter(c => c.companyId === filters.companyId);
        }
        
        if (filters.conversionType) {
            conversions = conversions.filter(c => c.conversionType === filters.conversionType);
        }
        
        const report = {
            totalConversions: conversions.length,
            totalValue: conversions.reduce((sum, c) => sum + c.conversionValue, 0),
            campaignAttribution: {},
            companyAttribution: {},
            conversionsByType: {},
            attributionModel: this.attributionModel
        };
        
        // Aggregate attribution data
        conversions.forEach(conversion => {
            // Count by type
            report.conversionsByType[conversion.conversionType] = 
                (report.conversionsByType[conversion.conversionType] || 0) + 1;
            
            if (conversion.attribution) {
                Object.values(conversion.attribution).forEach(attr => {
                    // Campaign attribution
                    if (!report.campaignAttribution[attr.campaignId]) {
                        report.campaignAttribution[attr.campaignId] = {
                            conversions: 0,
                            attributedValue: 0,
                            weight: 0
                        };
                    }
                    report.campaignAttribution[attr.campaignId].conversions++;
                    report.campaignAttribution[attr.campaignId].attributedValue += attr.attributedValue;
                    report.campaignAttribution[attr.campaignId].weight += attr.weight;
                    
                    // Company attribution
                    if (!report.companyAttribution[attr.companyId]) {
                        report.companyAttribution[attr.companyId] = {
                            conversions: 0,
                            attributedValue: 0,
                            weight: 0
                        };
                    }
                    report.companyAttribution[attr.companyId].conversions++;
                    report.companyAttribution[attr.companyId].attributedValue += attr.attributedValue;
                    report.companyAttribution[attr.companyId].weight += attr.weight;
                });
            }
        });
        
        return report;
    }

    async getCustomerJourney(contactEmail, timeRange = null) {
        // Get complete customer journey for a contact
        let touchpoints = this.touchpoints.filter(tp => tp.contactEmail === contactEmail);
        let conversions = this.conversions.filter(c => c.contactEmail === contactEmail);
        
        if (timeRange) {
            touchpoints = touchpoints.filter(tp => 
                tp.timestamp >= timeRange.start && tp.timestamp <= timeRange.end
            );
            conversions = conversions.filter(c => 
                c.timestamp >= timeRange.start && c.timestamp <= timeRange.end
            );
        }
        
        // Combine and sort by timestamp
        const journey = [
            ...touchpoints.map(tp => ({ ...tp, eventType: 'touchpoint' })),
            ...conversions.map(c => ({ ...c, eventType: 'conversion' }))
        ].sort((a, b) => a.timestamp - b.timestamp);
        
        return {
            contactEmail,
            totalTouchpoints: touchpoints.length,
            totalConversions: conversions.length,
            totalValue: conversions.reduce((sum, c) => sum + c.conversionValue, 0),
            journey
        };
    }

    generateTouchpointId() {
        return 'tp_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    generateConversionId() {
        return 'conv_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
}

module.exports = ConversionAttributionAnalytics;
