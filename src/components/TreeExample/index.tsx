import React, { useEffect, useState } from 'react';
import { BiCaretDown, BiCaretRight, BiEdit, BiFileBlank, BiFolderOpen, BiSolidFolder, BiTrashAlt } from 'react-icons/bi';
import axios from 'axios';
import CodeEditor from '../CodeEditor';

interface FileNode {
  _id: number;
  name: string;
  type: 'folder' | 'file';
  toggled?: boolean;
  children?: FileNode[];
  content?: string;
}

interface TreeNodeProps {
  node: FileNode;
  onToggle: (clickedNode: FileNode, toggled: boolean, isFolder: boolean) => void;
  onCreate: (parentNode: FileNode, type: 'file' | 'folder') => void;
  onUpdate: (selectedNode: FileNode) => void;
  onDelete: (selectedNode: FileNode) => void;
  activeNodeId: number | null;
  setActiveNodeId: React.Dispatch<React.SetStateAction<number | null>>;
}

const TreeNode: React.FC<TreeNodeProps> = ({ node, onToggle, onCreate, onUpdate, onDelete, activeNodeId, setActiveNodeId }) => {
  const { _id, name, toggled, type, children } = node;
  const [isToggled, setToggled] = useState<boolean>(toggled || false);
  const isFolder: boolean = type === 'folder';
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [mouseX, setMouseX] = useState<number | null>(null);
  const [mouseY, setMouseY] = useState<number | null>(null);

  const handleToggle = () => {
    setToggled((prevToggled) => {
      const newToggled = !prevToggled;
      onToggle(node, newToggled, isFolder);
      return newToggled;
    });
  };

  const handleCreate = (type: 'file' | 'folder') => {
    onCreate(node, type);
  };

  const handleUpdate = () => {
    console.log('Update button clicked');
    onUpdate(node);
  };
  
  const handleDelete = () => {
    console.log(`Deleting node: ${node.name}`);
    setContextMenuVisible(false);
    setActiveNodeId(null);
  };
  
const showContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveNodeId(_id);
    setContextMenuVisible(true);
    setMouseX(e.clientX);
    setMouseY(e.clientY);
  };
  
  const handleContextMenuAction = (action: 'update' | 'delete') => {
    if (action === 'update') {
      handleUpdate();
    } else if (action === 'delete') {
      handleDelete();
    }
    setContextMenuVisible(false);
    setActiveNodeId(null);
  };
  
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const contextMenu = document.getElementById('contextMenu');
      if (contextMenu && !contextMenu.contains(e.target as Node) && contextMenuVisible && e.button === 0) {
        setContextMenuVisible(false);
        setActiveNodeId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [contextMenuVisible, setActiveNodeId]);
  
  

  return (
    <div className=''>
      <div className='py-[1.5px] px-1 cursor-pointer flex items-center hover:text-[#f1c40f] hover:bg-[#40384a] rounded  mr-5' onClick={handleToggle} onContextMenu={showContextMenu}>
        <div className='flex items-center gap-1'>
          {_id !== 0 &&
            <>
              {isFolder && <span> {isToggled ? <BiCaretDown /> : <BiCaretRight />}</span>}
              {isFolder ? (isToggled ? <BiFolderOpen /> : <BiSolidFolder />) : <BiFileBlank className='ml-1' />}
            </>
          }
          <span className='line-clamp-1'>{name}</span>
          {contextMenuVisible && activeNodeId === _id && (
            <div
                id="contextMenu"
                style={{ left: `${mouseX}px`, top: `${mouseY}px` }}
                className='flex items-center gap-1 bg-[#463465] h-[100px] w-[80px] rounded p-4 absolute'
            >
                <button onClick={(e) => { e.stopPropagation(); handleContextMenuAction('update'); }}>
                <BiEdit />
                </button>
                <button onClick={(e) => { e.stopPropagation(); handleContextMenuAction('delete'); }}>
                <BiTrashAlt />
                </button>
            </div>
            )}
        </div>
      </div>
      {isToggled && isFolder && children && children.length > 0 && (
        <div className={`transition-all duration-200 ml-[9.5px] ${_id === 0 ? '' : 'border-l'} border-transparent hover:border-gray-700`}>
          {children.map((child) => (
            <TreeNode
              key={child._id}
              node={child}
              onToggle={onToggle}
              onCreate={onCreate}
              onUpdate={onUpdate}
              onDelete={onDelete}
              activeNodeId={activeNodeId}
              setActiveNodeId={setActiveNodeId}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const TreeExample: React.FC = () => {
  const [apiData, setApiData] = useState<any>(null);
  const [content, setContent] = useState<string | null>('');
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://folder-tree.onrender.com/api/v1/folders');
        setApiData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const onToggle = (clickedNode: FileNode, toggled: boolean, isFolder: boolean) => {
    clickedNode.toggled = toggled;
    if (!isFolder) {
      setContent(clickedNode.content || 'Không có nội dung');
    }
    setActiveNodeId(clickedNode._id);
  };

  const onCreate = (parentNode: FileNode, type: 'file' | 'folder') => {
    console.log(`Creating ${type} under folder: ${parentNode.name}`);
  };

  const onUpdate = (selectedNode: FileNode) => {
    console.log(`Updating node: ${selectedNode.name}`);
  };

  const onDelete = async (selectedNode: FileNode) => {
    console.log(`Deleting node: ${selectedNode.name}`);
  };
  

  return (
    <div>
      {!apiData ?
        <div className='w-full h-[100vh] flex justify-center items-center font-medium text-[15px]'>Loading...</div> :
        <div className='grid grid-cols-[5%,30%,65%]'>
          <div className='bg-[#171520]'></div>
          <div className='sidebar-container transition-all duration-200 bg-[#241b2f] h-[100vh] overflow-y-auto text-white py-2 text-[13.5px]'>
            {apiData && <TreeNode
              node={{ _id: 0, name: '', type: 'folder', toggled: true, children: apiData }}
              onToggle={onToggle}
              onCreate={onCreate}
              onUpdate={onUpdate}
              onDelete={onDelete}
              activeNodeId={activeNodeId}
              setActiveNodeId={setActiveNodeId}
            />}
          </div>
          <CodeEditor content={content || ''} />
        </div>
      }
    </div>
  );
};

export default TreeExample;
