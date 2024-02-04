import React from 'react';
import ContextMenuProvider from './components/ContextMenuProvider/index';
import TreeExample from './components/TreeExample';

interface AppProps {
  title: string;
}

const App: React.FC<AppProps> = ({ title }) => {
  const contextMenuOptions: Option[] = [
    { label: 'Edit', onClick: () => console.log(`Edit clicked for ${title}`) },
    { label: 'Delete', onClick: () => console.log(`Delete clicked for ${title}`) },
  ];

  return (
    <div>
      {/* <ContextMenuProvider title={title} options={contextMenuOptions}>
        <button>Right-click btn 1</button>
        <button>Right-click btn 2</button>
        <button>Right-click bnt 3</button>
      </ContextMenuProvider> */}

      <TreeExample/>
    </div>
  );
};

export default App;
