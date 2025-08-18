/**
 * Email Tracking Analytics
 * Comprehensive email performance tracking and analytics
 */

class EmailTrackingAnalytics {
    constructor(config) {
        this.trackingConfig = config.tracking || {};
        this.database = config.database;
        this.events = [];
        this.metrics = {};
    }

    async trackEmailSent(emailData) {
        // Track when email is sent
        const event = {
            type: 'email_sent',
            emailId: emailData.id,
            recipientEmail: emailData.recipient,
            campaignId: emailData.campaignId,
            companyId: emailData.companyId,
            timestamp: new Date(),
            metadata: {
                subject: emailData.subject,
                template: emailData.template,
                segmentId: emailData.segmentId
            }
        };
        
        await this.recordEvent(event);
        console.log('Email sent tracked:', emailData.id);
    }

    async trackEmailOpened(emailId, recipientData) {
        // Track email opens
        const event = {
            type: 'email_opened',
            emailId: emailId,
            recipientEmail: recipientData.email,
            timestamp: new Date(),
            metadata: {
                userAgent: recipientData.userAgent,
                ipAddress: recipientData.ipAddress,
                location: recipientData.location
            }
        };
        
        await this.recordEvent(event);
        console.log('Email open tracked:', emailId);
    }

    async trackEmailClicked(emailId, linkData, recipientData) {
        // Track link clicks in emails
        const event = {
            type: 'email_clicked',
            emailId: emailId,
            recipientEmail: recipientData.email,
            timestamp: new Date(),
            metadata: {
                linkUrl: linkData.url,
                linkText: linkData.text,
                linkPosition: linkData.position,
                userAgent: recipientData.userAgent,
                ipAddress: recipientData.ipAddress
            }
        };
        
        await this.recordEvent(event);
        console.log('Email click tracked:', emailId, linkData.url);
    }

    async trackEmailBounced(emailId, bounceData) {
        // Track email bounces
        const event = {
            type: 'email_bounced',
            emailId: emailId,
            recipientEmail: bounceData.email,
            timestamp: new Date(),
            metadata: {
                bounceType: bounceData.type, // hard, soft
                bounceReason: bounceData.reason,
                smtpCode: bounceData.smtpCode
            }
        };
        
        await this.recordEvent(event);
        console.log('Email bounce tracked:', emailId, bounceData.type);
    }

    async trackEmailUnsubscribed(emailId, recipientData) {
        // Track unsubscribes
        const event = {
            type: 'email_unsubscribed',
            emailId: emailId,
            recipientEmail: recipientData.email,
            timestamp: new Date(),
            metadata: {
                unsubscribeReason: recipientData.reason,
                unsubscribeMethod: recipientData.method // link, reply, etc.
            }
        };
        
        await this.recordEvent(event);
        console.log('Email unsubscribe tracked:', emailId);
    }

    async recordEvent(event) {
        // Record tracking event to database
        this.events.push(event);
        
        if (this.database) {
            await this.database.insertEvent(event);
        }
        
        // Update real-time metrics
        await this.updateMetrics(event);
    }

    async updateMetrics(event) {
        // Update real-time metrics based on event
        const campaignId = event.campaignId || 'unknown';
        
        if (!this.metrics[campaignId]) {
            this.metrics[campaignId] = {
                sent: 0,
                opened: 0,
                clicked: 0,
                bounced: 0,
                unsubscribed: 0,
                openRate: 0,
                clickRate: 0,
                bounceRate: 0,
                unsubscribeRate: 0
            };
        }
        
        const metrics = this.metrics[campaignId];
        
        switch (event.type) {
            case 'email_sent':
                metrics.sent++;
                break;
            case 'email_opened':
                metrics.opened++;
                break;
            case 'email_clicked':
                metrics.clicked++;
                break;
            case 'email_bounced':
                metrics.bounced++;
                break;
            case 'email_unsubscribed':
                metrics.unsubscribed++;
                break;
        }
        
        // Calculate rates
        if (metrics.sent > 0) {
            metrics.openRate = (metrics.opened / metrics.sent) * 100;
            metrics.clickRate = (metrics.clicked / metrics.sent) * 100;
            metrics.bounceRate = (metrics.bounced / metrics.sent) * 100;
            metrics.unsubscribeRate = (metrics.unsubscribed / metrics.sent) * 100;
        }
    }

    async getCampaignMetrics(campaignId, timeRange = null) {
        // Get metrics for specific campaign
        let events = this.events.filter(e => e.campaignId === campaignId);
        
        if (timeRange) {
            events = events.filter(e => 
                e.timestamp >= timeRange.start && e.timestamp <= timeRange.end
            );
        }
        
        return this.calculateMetricsFromEvents(events);
    }

    async getCompanyMetrics(companyId, timeRange = null) {
        // Get metrics for specific company
        let events = this.events.filter(e => e.companyId === companyId);
        
        if (timeRange) {
            events = events.filter(e => 
                e.timestamp >= timeRange.start && e.timestamp <= timeRange.end
            );
        }
        
        return this.calculateMetricsFromEvents(events);
    }

    async getPortfolioMetrics(timeRange = null) {
        // Get overall portfolio metrics
        let events = this.events;
        
        if (timeRange) {
            events = events.filter(e => 
                e.timestamp >= timeRange.start && e.timestamp <= timeRange.end
            );
        }
        
        return this.calculateMetricsFromEvents(events);
    }

    calculateMetricsFromEvents(events) {
        // Calculate metrics from event array
        const metrics = {
            sent: events.filter(e => e.type === 'email_sent').length,
            opened: events.filter(e => e.type === 'email_opened').length,
            clicked: events.filter(e => e.type === 'email_clicked').length,
            bounced: events.filter(e => e.type === 'email_bounced').length,
            unsubscribed: events.filter(e => e.type === 'email_unsubscribed').length
        };
        
        // Calculate rates
        if (metrics.sent > 0) {
            metrics.openRate = (metrics.opened / metrics.sent) * 100;
            metrics.clickRate = (metrics.clicked / metrics.sent) * 100;
            metrics.bounceRate = (metrics.bounced / metrics.sent) * 100;
            metrics.unsubscribeRate = (metrics.unsubscribed / metrics.sent) * 100;
        } else {
            metrics.openRate = 0;
            metrics.clickRate = 0;
            metrics.bounceRate = 0;
            metrics.unsubscribeRate = 0;
        }
        
        return metrics;
    }

    async generateReport(reportType, filters = {}) {
        // Generate analytics report
        console.log('Generating email tracking report:', reportType);
        
        const report = {
            type: reportType,
            generatedAt: new Date(),
            filters: filters,
            data: {}
        };
        
        switch (reportType) {
            case 'campaign_performance':
                report.data = await this.getCampaignPerformanceReport(filters);
                break;
            case 'engagement_trends':
                report.data = await this.getEngagementTrendsReport(filters);
                break;
            case 'audience_insights':
                report.data = await this.getAudienceInsightsReport(filters);
                break;
            default:
                report.data = await this.getPortfolioMetrics(filters.timeRange);
        }
        
        return report;
    }

    async getCampaignPerformanceReport(filters) {
        // Generate campaign performance report
        const campaigns = [...new Set(this.events.map(e => e.campaignId))];
        const performance = {};
        
        for (const campaignId of campaigns) {
            if (campaignId) {
                performance[campaignId] = await this.getCampaignMetrics(campaignId, filters.timeRange);
            }
        }
        
        return performance;
    }

    async getEngagementTrendsReport(filters) {
        // Generate engagement trends report
        const trends = {};
        const events = this.events.filter(e => 
            !filters.timeRange || 
            (e.timestamp >= filters.timeRange.start && e.timestamp <= filters.timeRange.end)
        );
        
        // Group by day
        events.forEach(event => {
            const day = event.timestamp.toISOString().split('T')[0];
            if (!trends[day]) {
                trends[day] = { sent: 0, opened: 0, clicked: 0, bounced: 0, unsubscribed: 0 };
            }
            
            switch (event.type) {
                case 'email_sent':
                    trends[day].sent++;
                    break;
                case 'email_opened':
                    trends[day].opened++;
                    break;
                case 'email_clicked':
                    trends[day].clicked++;
                    break;
                case 'email_bounced':
                    trends[day].bounced++;
                    break;
                case 'email_unsubscribed':
                    trends[day].unsubscribed++;
                    break;
            }
        });
        
        return trends;
    }

    async getAudienceInsightsReport(filters) {
        // Generate audience insights report
        const insights = {
            topDomains: {},
            deviceTypes: {},
            locations: {},
            engagementBySegment: {}
        };
        
        const events = this.events.filter(e => 
            !filters.timeRange || 
            (e.timestamp >= filters.timeRange.start && e.timestamp <= filters.timeRange.end)
        );
        
        events.forEach(event => {
            if (event.recipientEmail) {
                const domain = event.recipientEmail.split('@')[1];
                insights.topDomains[domain] = (insights.topDomains[domain] || 0) + 1;
            }
            
            if (event.metadata && event.metadata.userAgent) {
                const deviceType = this.detectDeviceType(event.metadata.userAgent);
                insights.deviceTypes[deviceType] = (insights.deviceTypes[deviceType] || 0) + 1;
            }
            
            if (event.metadata && event.metadata.location) {
                const location = event.metadata.location;
                insights.locations[location] = (insights.locations[location] || 0) + 1;
            }
        });
        
        return insights;
    }

    detectDeviceType(userAgent) {
        // Simple device type detection
        if (/Mobile|Android|iPhone|iPad/.test(userAgent)) {
            return 'mobile';
        } else if (/Tablet/.test(userAgent)) {
            return 'tablet';
        } else {
            return 'desktop';
        }
    }
}

module.exports = EmailTrackingAnalytics;