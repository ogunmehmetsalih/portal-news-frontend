import React from 'react';
import { colors } from '../tokens/colors.js';

const SkillBadge = ({ 
  skillName, 
  icon, 
  variant = 'default',
  size = 'medium',
  onClick,
  className = '' 
}) => {
  // Skill rengini belirle
  const getSkillColor = () => {
    const skillKey = skillName.toLowerCase().replace('.', '').replace('js', '');
    return colors.skills[skillKey] || {
      color: colors.primary[600],
      background: colors.primary[50],
      darkBackground: colors.primary[900]
    };
  };

  const skillColor = getSkillColor();

  // Size variants
  const sizeClasses = {
    small: 'px-3 py-1 text-xs',
    medium: 'px-4 py-2 text-sm',
    large: 'px-6 py-3 text-base'
  };

  return (
    <div
      className={`
        flex items-center gap-2 rounded-full transition-all duration-200 
        hover:scale-105 cursor-pointer font-medium
        ${sizeClasses[size]}
        ${className}
      `}
      style={{
        backgroundColor: skillColor.background,
        border: `1px solid ${skillColor.color}`,
        color: skillColor.color
      }}
      onClick={onClick}
    >
      {icon && <span>{icon}</span>}
      <span>{skillName}</span>
    </div>
  );
};

export default SkillBadge; 