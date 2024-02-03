import React, { useEffect, useState } from 'react';
import { BiCaretDown, BiCaretUp, BiEdit, BiFile, BiFileBlank, BiFolder, BiFolderOpen, BiSolidFolder, BiTrashAlt } from 'react-icons/bi';
import axios from 'axios';

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
}

const TreeNode: React.FC<TreeNodeProps> = ({ node, onToggle, onCreate, onUpdate, onDelete }) => {
    const { _id, name, toggled, type, children } = node;
    const [isToggled, setToggled] = useState<boolean>(toggled || false);
    const isFolder: boolean = type === 'folder';
    const isFile: boolean = type === 'file';

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
        onUpdate(node);
    };

    const handleDelete = () => {
        onDelete(node);
    };

    return (
        <div>
            <div className=''>
                <div className='py-[2px] cursor-pointer flex items-center'>
                    <div className='flex items-center gap-1' onClick={handleToggle}>
                        {_id != 0  &&
                            <>{isFolder && <span> {isToggled ? <BiCaretUp /> : <BiCaretDown />}</span>}
                            {isFolder ? (isToggled ? <BiFolderOpen /> : <BiSolidFolder />) : <BiFileBlank className='ml-1' />}</>
                        }
                        <span>{name}</span>
                    </div>
                    <div className='ml-[15px] flex items-center gap-1'>
                        {isFolder && <button onClick={() => handleCreate('file')}> <BiFile /></button>}
                        {isFolder && <button onClick={() => handleCreate('folder')}> <BiFolder /></button>}
                        {(isFolder || isFile) && <button onClick={handleUpdate}> <BiEdit /></button>}
                        {(isFolder || isFile) && <button onClick={handleDelete}> <BiTrashAlt /></button>}
                    </div>
                </div>
                {isToggled && isFolder && children && children.length > 0 && (
                    <div className='ml-[15px]'>
                        {children.map((child) => (
                            <TreeNode
                                key={child._id}
                                node={child}
                                onToggle={onToggle}
                                onCreate={onCreate}
                                onUpdate={onUpdate}
                                onDelete={onDelete}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const TestCallAPI: React.FC = () => {
    const [apiData, setApiData] = useState<any>(null);

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
        console.log(`${clickedNode.name} : ${clickedNode._id}`);
    };

    const onCreate = (parentNode: FileNode, type: 'file' | 'folder') => {
        console.log(`Creating ${type} under folder: ${parentNode.name}`);
    };

    const onUpdate = (selectedNode: FileNode) => {
        console.log(`Updating node: ${selectedNode.name}`);
    };

    const onDelete = (selectedNode: FileNode) => {
        console.log(`Deleting node: ${selectedNode.name}`);
    };

    return (
        <div className='bg-[#241b2f] h-[100vh] text-white py-4 px-2 text-[14px]'>
            {apiData && <TreeNode
                node={{ _id: 0, name: 'Root', type: 'folder', toggled: true, children: apiData }}
                onToggle={onToggle}
                onCreate={onCreate}
                onUpdate={onUpdate}
                onDelete={onDelete}
            />
        }
        </div>
    );
};

export default TestCallAPI;
