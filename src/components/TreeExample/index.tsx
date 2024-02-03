import React, { useState } from 'react';
import { BiCaretDown, BiCaretUp, BiEdit, BiFile, BiFileBlank, BiFolder, BiFolderOpen, BiNote, BiSolidFolder, BiTrashAlt } from 'react-icons/bi';

interface FileNode {
    id: number;
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

const TreeNode: React.FC<TreeNodeProps> = ({
    node, onToggle, onCreate, onUpdate, onDelete}) => {
    const { name, toggled, type, children } = node;
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
                        {isFolder && 
                            <span> {isToggled ? <BiCaretUp /> : <BiCaretDown />}</span>}
                            {isFolder 
                            ? (isToggled ? <BiFolderOpen /> : <BiSolidFolder />)
                            : <BiFileBlank className='ml-1'/>
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
                {isToggled && isFolder && (
                    <div className='ml-[15px]'>
                        {children?.map((child, index) => (
                            <TreeNode
                                key={index}
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

const TreeExample: React.FC = () => {
    const onToggle = (clickedNode: FileNode, toggled: boolean, isFolder: boolean) => {
        console.log(`Node ${clickedNode.name} ${toggled ? 'opened' : 'closed'}`);
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

    const [data] = useState<FileNode>(
        {
            id: 1,
            name: 'react-typescript-project',
            type: 'folder',
            children: [
                {
                    id: 2,
                    name: 'src',
                    type: 'folder',
                    children: [
                        {
                            id: 3,
                            name: 'components',
                            type: 'folder',
                            children: [
                                { id: 4, name: 'codeEditor.jsx', type: 'file', content: 'Nội dung file codeEditor.jsx' },
                                { id: 5, name: 'TableBlock.jsx', type: 'file', content: 'Nội dung file TableBlock.jsx' },
                            ],
                        },
                        {
                            id: 6,
                            name: 'styles',
                            type: 'folder',
                            children: [
                                { id: 7, name: 'main.css', type: 'file', content: 'Nội dung file main.css' },
                                { id: 8, name: 'style.css', type: 'file', content: 'Nội dung file style.css' },
                            ],
                        },
                    ],
                },
                { id: 9, name: 'app.js', type: 'file', content: 'Nội dung file app.js' },
                { id: 10, name: 'index.js', type: 'file', content: 'Nội dung file index.js' },
                { id: 11, name: '.gitignore', type: 'file', content: 'Nội dung file gitignore' },
                { id: 12, name: 'package-lock.json', type: 'file', content: 'Nội dung file package-lock.json' },
                { id: 13, name: 'package.json', type: 'file', content: 'Nội dung file package.json' },
                { id: 14, name: 'README.md', type: 'file', content: 'Nội dung file README.md' },
            ],
        }
    );

    return (
        <div className='bg-[#241b2f] h-[100vh] text-white py-4 px-2 text-[14px]'>
            <TreeNode
                node={data}
                onToggle={onToggle}
                onCreate={onCreate}
                onUpdate={onUpdate}
                onDelete={onDelete}
            />
        </div>
    );
};

export default TreeExample;
