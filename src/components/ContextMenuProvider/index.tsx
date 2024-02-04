import React, { useState } from 'react';

interface Option {
  label: string;
  onClick: () => void;
}

interface ContextMenuProviderProps {
  title: string;
  options: Option[];
  children: React.ReactNode;
}

const ContextMenuProvider: React.FC<ContextMenuProviderProps> = ({ title, options, children }) => {
  const [isContextMenuVisible, setContextMenuVisible] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenuPosition({ x: e.clientX, y: e.clientY });
    setContextMenuVisible(true);
  };

  const closeContextMenu = () => {
    setContextMenuVisible(false);
  };

  const handleOptionClick = (onClick: () => void) => {
    return () => {
      onClick();
      closeContextMenu();
    };
  };

  return (
    <div onContextMenu={handleContextMenu}>
      {children}

      {isContextMenuVisible && (
        <div
          style={{
            position: 'fixed',
            top: contextMenuPosition.y,
            left: contextMenuPosition.x,
            backgroundColor: 'white',
            border: '1px solid #ccc',
            padding: '5px',
            zIndex: 1000,
          }}
        >
          {options.map((option, index) => (
            <div key={index}>
              <button onClick={handleOptionClick(option.onClick)}>{option.label}</button>
            </div>
          ))}
          <div>
            <button onClick={closeContextMenu}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContextMenuProvider;
