# 371 OS End-to-End Test: Stratplan to DAO Proposal

This document outlines the steps to perform a full local simulation of the core agent proposal pipeline.

## Test-01: Ortega Stratplan Processing & C-Suite Vote

**Objective:** Verify that a strategic document can be processed by the Chief of Staff (Ortega), submitted to the governance service, and successfully voted on by the C-Suite agents.

### Step 1: Create a Draft Stratplan

Create a file at `questflow/docs/strategy/stratplan_test.md` with the following content:

```markdown
# Q4 2025 Strategic Plan: Memory Optimization

## Goal
Implement the new episodic memory system (EPICACHE) across all C-Suite agents to achieve an 85% reduction in memory overhead and enable multi-session context retention.

## Key Initiatives
1. Integrate EPICACHE into the unified agent architecture.
2. Deploy agents to Akash Network to measure real-world cost savings.
3. Develop a memory market for economic allocation.
```

### Step 2: Run Chief of Staff Agent (Ortega)

Execute the following command from the monorepo root to have Ortega process the Stratplan. It will generate proposal files in `outputs/proposals/`.

```bash
cd os-workspace
bun nx run chief-of-staff-agent:process-stratplan --file=../questflow/docs/strategy/stratplan_test.md
```

*Expected Outcome:* A new directory is created in `os-workspace/apps/chief-of-staff-agent/output/dao-proposals/` containing proposal JSON and Markdown files with timestamp-based naming.

### Step 3: Run Governance Service and Submit Proposal

In one terminal, start the `dao-governance-service`:
```bash
cd os-workspace
bun nx serve dao-governance-service
```

In a second terminal, use `curl` to submit the generated proposal (replace `<timestamp>` with the actual folder name):
```bash
curl -X POST http://localhost:3003/submit-proposal \
  -H "Content-Type: application/json" \
  -d @os-workspace/apps/chief-of-staff-agent/output/dao-proposals/DAO-<timestamp>.json
```

*Expected Outcome:* The governance service logs the following, confirming it received the proposal and simulated submission to DAO DAO.
```
Submitting proposal to DAO DAO...
Title: Q4 2025 Strategic Plan: Memory Optimization
Description: ...
Command: daodao-cli tx wasm execute [contract_address] ...
```

### Step 4: Simulate C-Suite Voting

Execute `curl` commands to simulate each C-Suite agent voting "yes" on proposal ID `1`.

```bash
# CEO (Mimi)
curl -X POST http://localhost:3003/proposals/1/vote \
  -H "Content-Type: application/json" \
  -d '{"agent":"ceo-agent","vote":"yes"}'

# CTO (Zara)
curl -X POST http://localhost:3003/proposals/1/vote \
  -H "Content-Type: application/json" \
  -d '{"agent":"cto-agent","vote":"yes"}'

# CFO (Maya)
curl -X POST http://localhost:3003/proposals/1/vote \
  -H "Content-Type: application/json" \
  -d '{"agent":"cfo-agent","vote":"yes"}'
```

*Expected Outcome:* After the required number of votes, the governance service logs that the proposal has passed.
```
Proposal #1 PASSED – status updated and execution simulated.
```

## Test Results Validation

### Success Criteria
- [ ] Stratplan document successfully created in `questflow/docs/strategy/stratplan_test.md`
- [ ] Chief of Staff Agent (Ortega) successfully processes the stratplan
- [ ] DAO proposal files generated in correct output directory with proper naming convention
- [ ] Governance service successfully receives and processes the proposal
- [ ] All C-Suite agents can vote on the proposal
- [ ] Proposal status updates correctly based on voting results
- [ ] Full audit trail maintained in output/dao-proposals/audit/ directory

### Performance Benchmarks
- Stratplan processing: < 5 seconds
- Proposal generation: < 3 seconds
- Governance service response: < 1 second per operation
- Vote processing: < 500ms per vote
- End-to-end pipeline: < 15 seconds total

### Troubleshooting Common Issues

**Issue: Ortega agent fails to start**
```bash
# Check dependencies
cd os-workspace
bun install

# Verify TypeScript compilation
bun nx build chief-of-staff-agent

# Check for missing configuration
cat os-workspace/libs/prompts/agent-definitions/ortega_chief_of_staff.yml
```

**Issue: Governance service connection refused**
```bash
# Verify service is running
curl http://localhost:3003/health

# Check port conflicts
netstat -an | findstr 3003

# Restart service if needed
bun nx serve dao-governance-service --port=3004
```

**Issue: Proposal file not found**
```bash
# List generated proposals
ls -la os-workspace/apps/chief-of-staff-agent/output/dao-proposals/

# Check processing logs
bun nx run chief-of-staff-agent:process-stratplan --verbose
```

## Integration Test Extensions

### Test-02: Multi-Agent Coordination
Extend the basic test to verify cross-agent coordination:

1. Create multiple stratplan documents
2. Process them simultaneously with different agents
3. Verify conflict resolution and coordination
4. Validate economic incentive calculations

### Test-03: Blockchain Integration
Test the blockchain registry integration:

1. Deploy smart contracts to local testnet
2. Register agents in blockchain registry
3. Verify stake-based reputation system
4. Test cryptographic verification of proposals

### Test-04: Performance Under Load
Stress test the system:

1. Generate 100 simultaneous stratplan requests
2. Monitor memory usage and response times
3. Verify graceful degradation under load
4. Test recovery after system restart

## Continuous Testing Integration

### Automated Test Execution
Add these tests to the CI/CD pipeline:

```bash
# Add to package.json scripts
"test:e2e": "bun run test:stratplan-pipeline",
"test:stratplan-pipeline": "node scripts/test-stratplan-pipeline.js"
```

### Monitoring and Alerting
Set up monitoring for:
- Proposal processing success rate
- Average response times
- Agent coordination accuracy
- Cost optimization metrics

## Documentation Updates

After successful testing, update the following documents:
- `README.md` - Add link to this testing guide
- `IMPLEMENTATION_GUIDE.md` - Include testing procedures
- `AB/milestone-tracker.md` - Mark testing milestone complete
- `os-workspace/apps/chief-of-staff-agent/README.md` - Add testing examples