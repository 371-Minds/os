-- Database initialization script for DAO Governance Service
-- Creates necessary tables and test data for local development

-- Create proposals table
CREATE TABLE IF NOT EXISTS proposals (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    description TEXT,
    proposer VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    voting_start TIMESTAMP,
    voting_end TIMESTAMP
);

-- Create votes table
CREATE TABLE IF NOT EXISTS votes (
    id SERIAL PRIMARY KEY,
    proposal_id VARCHAR(255) NOT NULL,
    voter_address VARCHAR(255) NOT NULL,
    vote_option VARCHAR(20) NOT NULL,
    voting_power DECIMAL(18, 2) NOT NULL,
    reason TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    signature TEXT,
    transaction_hash VARCHAR(255),
    FOREIGN KEY (proposal_id) REFERENCES proposals(id) ON DELETE CASCADE,
    UNIQUE(proposal_id, voter_address)
);

-- Create events table
CREATE TABLE IF NOT EXISTS governance_events (
    id VARCHAR(255) PRIMARY KEY,
    event_type VARCHAR(100) NOT NULL,
    proposal_id VARCHAR(255),
    triggered_by VARCHAR(255) NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data JSONB,
    FOREIGN KEY (proposal_id) REFERENCES proposals(id) ON DELETE CASCADE
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_proposals_status ON proposals(status);
CREATE INDEX IF NOT EXISTS idx_proposals_type ON proposals(type);
CREATE INDEX IF NOT EXISTS idx_proposals_created_at ON proposals(created_at);
CREATE INDEX IF NOT EXISTS idx_votes_proposal_id ON votes(proposal_id);
CREATE INDEX IF NOT EXISTS idx_votes_voter_address ON votes(voter_address);
CREATE INDEX IF NOT EXISTS idx_events_proposal_id ON governance_events(proposal_id);
CREATE INDEX IF NOT EXISTS idx_events_type ON governance_events(event_type);

-- Insert test data
INSERT INTO proposals (id, title, description, proposer, type, status) VALUES
    ('PROP-TEST-001', 'Test Strategic Proposal', 'A test proposal for strategic decisions', '0x1234567890123456789012345678901234567890', 'STRATEGIC', 'DRAFT'),
    ('PROP-TEST-002', 'Test Financial Proposal', 'A test proposal for budget allocation', '0x2234567890123456789012345678901234567890', 'FINANCIAL', 'VOTING_ACTIVE')
ON CONFLICT (id) DO NOTHING;

-- Grant permissions
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO test_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO test_user;

-- Success message
DO $$
BEGIN
    RAISE NOTICE 'Database initialized successfully for DAO Governance Service';
END $$;
