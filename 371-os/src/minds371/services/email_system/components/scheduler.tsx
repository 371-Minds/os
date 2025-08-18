import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { EuiProvider, EuiPage, EuiPageBody, EuiPageContent, EuiPageContentBody, EuiPageHeader, EuiTitle, EuiFlexGroup, EuiFlexItem, EuiPanel } from '@elastic/eui';
import '@elastic/eui/dist/eui_theme_light.css';

const ItemType = 'EMAIL';

const DraggableEmail = ({ email }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType,
    item: { id: email.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move' }}>
      <EuiPanel paddingSize="m" hasShadow>
        {email.name}
      </EuiPanel>
    </div>
  );
};

const Scheduler = () => {
  const [emails, setEmails] = useState([
    { id: 1, name: 'Welcome Email' },
    { id: 2, name: 'Follow-up Email' },
    { id: 3, name: 'Promotional Email' },
  ]);

  const [, drop] = useDrop(() => ({ accept: ItemType }));

  return (
    <EuiProvider colorMode="light">
      <DndProvider backend={HTML5Backend}>
        <EuiPage>
          <EuiPageBody>
            <EuiPageHeader>
              <EuiTitle size="l">
                <h1>Email Scheduler</h1>
              </EuiTitle>
            </EuiPageHeader>
            <EuiPageContent>
              <EuiPageContentBody>
                <EuiFlexGroup ref={drop}>
                  {emails.map((email) => (
                    <EuiFlexItem key={email.id}>
                      <DraggableEmail email={email} />
                    </EuiFlexItem>
                  ))}
                </EuiFlexGroup>
              </EuiPageContentBody>
            </EuiPageContent>
          </EuiPageBody>
        </EuiPage>
      </DndProvider>
    </EuiProvider>
  );
};

export default Scheduler;
