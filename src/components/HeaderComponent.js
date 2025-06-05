import React from 'react';

export default function HeaderComponent({ 
  title, 
  description, 
  buttonText
}) {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800" 
         style={{ 
           padding: '20px 0',
           marginBottom: '32px'
         }}>
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-gray-900 dark:text-white"
              style={{ 
                margin: 0, 
                fontSize: '24px',
                fontWeight: '600',
                letterSpacing: '-0.01em'
              }}>
            {title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300"
             style={{ 
               margin: 0,
               fontSize: '15px',
               fontWeight: '400'
             }}>
            {description}
          </p>
        </div>
        {buttonText && (
          <div>
            {buttonText}
          </div>
        )}
      </div>
    </div>
  );
} 