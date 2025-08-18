import React, { useState, useCallback } from 'react';
import { EuiProvider, EuiPage, EuiPageBody, EuiPageContent, EuiPageContentBody, EuiPageHeader, EuiTitle, EuiButton, EuiFieldText, EuiForm, EuiFormRow, EuiSpacer } from '@elastic/eui';
import '@elastic/eui/dist/eui_theme_light.css';

const AiDashboard = () => {
  const [rules, setRules] = useState([]);
  const [newRule, setNewRule] = useState({ condition: '', action: '' });

  const handleAddRule = useCallback(() => {
    if (newRule.condition && newRule.action) {
      setRules([...rules, newRule]);
      setNewRule({ condition: '', action: '' });
    }
  }, [newRule, rules]);

  return (
    <EuiProvider colorMode="light">
      <EuiPage>
        <EuiPageBody>
          <EuiPageHeader>
            <EuiTitle size="l">
              <h1>AI Automation Rules</h1>
            </EuiTitle>
          </EuiPageHeader>
          <EuiPageContent>
            <EuiPageContentBody>
              <EuiForm component="form">
                <EuiFormRow label="Condition">
                  <EuiFieldText
                    value={newRule.condition}
                    onChange={(e) => setNewRule({ ...newRule, condition: e.target.value })}
                    placeholder="e.g., 'email.subject contains \"support\"'"
                  />
                </EuiFormRow>
                <EuiFormRow label="Action">
                  <EuiFieldText
                    value={newRule.action}
                    onChange={(e) => setNewRule({ ...newRule, action: e.target.value })}
                    placeholder="e.g., 'assign_to(\"tech_support\")'"
                  />
                </EuiFormRow>
                <EuiSpacer />
                <EuiButton onClick={handleAddRule} fill>
                  Add Rule
                </EuiButton>
              </EuiForm>
              <EuiSpacer size="xl" />
              {/* Display existing rules */}
              {rules.map((rule, index) => (
                <div key={index}>
                  <strong>Condition:</strong> {rule.condition} <br />
                  <strong>Action:</strong> {rule.action}
                </div>
              ))}
            </EuiPageContentBody>
          </EuiPageContent>
        </EuiPageBody>
      </EuiPage>
    </EuiProvider>
  );
};

export default AiDashboard;
