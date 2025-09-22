import React from 'react';
import { useAuth } from '../contexts/AuthContext';

function RoleBadge({ role, size = 'normal' }) {
  const { getRoleBadge } = useAuth();
  
  if (!role) return null;
  
  const badge = getRoleBadge(role);
  
  const sizeStyles = {
    small: {
      padding: '0.125rem 0.375rem',
      fontSize: '0.625rem',
      borderRadius: '8px'
    },
    normal: {
      padding: '0.25rem 0.5rem',
      fontSize: '0.75rem',
      borderRadius: '12px'
    },
    large: {
      padding: '0.375rem 0.75rem',
      fontSize: '0.875rem',
      borderRadius: '16px'
    }
  };

  return (
    <span
      style={{
        backgroundColor: badge.bgColor,
        color: badge.color,
        fontWeight: '600',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.25rem',
        ...sizeStyles[size]
      }}
    >
      <span>{badge.icon}</span>
      <span>{badge.text}</span>
    </span>
  );
}

export default RoleBadge;