"use client";
/**
 * PropertiesPanel Component
 * Placeholder for object properties panel
 * TODO: Implement full properties panel functionality
 */

import React from 'react';

const PropertiesPanel: React.FC<Record<string, never>> = () => {
  return (
    <div style={{
      padding: '16px',
      textAlign: 'center',
      color: 'var(--text-muted)',
      fontSize: '14px'
    }}>
      <p>Properties Panel</p>
      <p style={{ fontSize: '12px' }}>Object properties coming soon</p>
    </div>
  );
};

export default PropertiesPanel;
