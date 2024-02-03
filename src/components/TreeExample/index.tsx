import React, { useEffect, useState } from 'react';
import { BiCaretDown, BiCaretUp, BiFileBlank, BiFolderOpen, BiSolidFolder } from 'react-icons/bi';
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
                <div className='py-[2px] px-1 cursor-pointer flex items-center hover:text-[#f1c40f] hover:bg-[#40384a] mr-4 rounded' onClick={handleToggle}>
                    <div className='flex items-center gap-1'>
                        {_id != 0  &&
                            <>{isFolder && <span> {isToggled ? <BiCaretUp /> : <BiCaretDown />}</span>}
                            {isFolder ? (isToggled ? <BiFolderOpen /> : <BiSolidFolder />) : <BiFileBlank className='ml-1' />}</>
                        }
                        <span className='line-clamp-1'>{name}</span>
                    </div>
                    {/* Ẩn tạm thời */}
                    {/* <div className='ml-[15px] flex items-center gap-1'>
                    <button onClick={(e) => { e.stopPropagation(); handleCreate('file'); }}> <BiFile /></button>
                    <button onClick={(e) => { e.stopPropagation(); handleCreate('folder'); }}> <BiFolder /></button>
                    <button onClick={(e) => { e.stopPropagation(); handleUpdate(); }}> <BiEdit /></button>
                    <button onClick={(e) => { e.stopPropagation(); handleDelete(); }}> <BiTrashAlt /></button>
                    </div> */}
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
    const [content, setContent] = useState<string | null>('');


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
        if(isFolder == false){
            setContent(clickedNode.content || 'Không có nội dung');
        }
        // thêm biên active dựa vào id của file được click để thêm class active
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
        <div className='grid grid-cols-[19%,81%]'>
            <div className='sidebar-container bg-[#241b2f] h-[100vh] overflow-y-auto text-white py-2 text-[13.5px]'>
                {apiData && <TreeNode
                    node={{ _id: 0, name: '', type: 'folder', toggled: true, children: apiData }}
                    onToggle={onToggle}
                    onCreate={onCreate}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                />}
            </div>
            <CodeEditor content={content || ''}/>
        </div>
    );
};

export default TestCallAPI;
