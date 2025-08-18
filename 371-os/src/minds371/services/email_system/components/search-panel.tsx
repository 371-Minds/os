import React, { useState } from 'react';
import { SearchProvider, SearchBox, Results, Paging } from '@elastic/react-search-ui';
import { EuiProvider, EuiPage, EuiPageBody, EuiPageContent, EuiPageContentBody, EuiPageHeader, EuiTitle, EuiFlexGroup, EuiFlexItem } from '@elastic/eui';
import '@elastic/eui/dist/eui_theme_light.css';

const SearchPanel = () => {
  const [query, setQuery] = useState('');

  const config = {
    apiConnector: {
      search: async (requestState) => {
        const response = await fetch('/api/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestState),
        });
        return response.json();
      },
    },
    searchQuery: {
      query: query,
      // Configure fields and facets as needed
    },
  };

  return (
    <EuiProvider colorMode="light">
      <EuiPage>
        <EuiPageBody>
          <EuiPageHeader>
            <EuiTitle size="l">
              <h1>Email Template Search</h1>
            </EuiTitle>
          </EuiPageHeader>
          <EuiPageContent>
            <EuiPageContentBody>
              <SearchProvider config={config}>
                <EuiFlexGroup>
                  <EuiFlexItem>
                    <SearchBox
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search for email templates..."
                    />
                  </EuiFlexItem>
                </EuiFlexGroup>
                <Results />
                <Paging />
              </SearchProvider>
            </EuiPageContentBody>
          </EuiPageContent>
        </EuiPageBody>
      </EuiPage>
    </EuiProvider>
  );
};

export default SearchPanel;
