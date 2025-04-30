'use client';
import { useState } from "react";

interface Data {
    _id: string;
    content: string;
}

const Input = ({ data }: { data: Data[] }) => {
    const [text, setText] = useState('');
    const [task, setTask] = useState(data);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editingText, setEditingText] = useState('');

    const addTodo = async () => {
        try {
            const res = await fetch('/api/post', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text })
            })
            if (!res.ok) {
                return;
            }
            const newTask = await res.json();
            setTask([...task, newTask]);
            setText('');
        } catch {
            alert('失敗')
        }
    }

    const deleteBtn = async (id: string) => {
        try {
            const res = await fetch(`/api/delete/${id}`, {
                method: 'DELETE',
            })

            if (!res.ok) {
                return;
            }

            const newTask = task.filter(items => items._id !== id);
            setTask(newTask);
        } catch {
            alert('失敗');
        }
    }

    const updateBtn = async (id: string, content: string) => {
        setEditingId(id);
        setEditingText(content);
    }

    const completeEdit = async () => {
        if (!editingId) return;

        try {
            const res = await fetch(`/api/update/${editingId}`, {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({content: editingText})
            });

            if(!res.ok) {
                return;
            }

            const updatedTask = await res.json();
            console.log(updatedTask);

            const newTasks = task.map(item => 
                item._id === editingId ? {...item, content: updatedTask.content} : item
            );
            setTask(newTasks);
            cancelEdit();
        } catch {
            alert('更新に失敗');
        }
    }

    const cancelEdit = () => {
        setEditingId(null);
        setEditingText('');
    }

    return (
            <>
                <div>
                    <input
                        className="border-solid border-[1px] border-gray-400 mr-[10px] w-[500px] h-[40px] rounded-[10px] mb-5"
                        placeholder="入力して下さい"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <button
                        className="bg-blue-600 text-white p-[8px] rounded-[10px] cursor-pointer"
                        onClick={addTodo}
                    >
                        追加
                    </button>
                </div>
                <ul>
                    {task.map((value) => (
                        <li className="mb-10px border-b-[1px] border-gray-400 mb-3 flex justify-between" key={value._id}>
                            {editingId === value._id ? (
                                //編集モード
                                <>
                                    <input
                                        className="border-solid border-[1px] border-gray-400 mr-[10px] w-[500px] h-[40px] rounded-[10px] mb-5"
                                        value={editingText}
                                        onChange={(e) => setEditingText(e.target.value)}
                                    />
                                    <div>
                                        <button
                                            className="border-[1px] border-gray-400 mr-[5px] mb-[5px] p-[2px] rounded-[10px] cursor-pointer"
                                            onClick={completeEdit}>
                                            更新
                                        </button>
                                        <button
                                            className="border-[1px] border-gray-400 p-[2px] mb-[5px] rounded-[10px] cursor-pointer"
                                            onClick={cancelEdit}>
                                            キャンセル
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {value.content}
                                    <div>
                                        <button
                                            className="border-[1px] border-gray-400 mr-[5px] mb-[5px] p-[2px] rounded-[10px] cursor-pointer"
                                            onClick={() => deleteBtn(value._id)}>
                                            削除
                                        </button>
                                        <button className="border-[1px] border-gray-400 p-[2px] mb-[5px] rounded-[10px] cursor-pointer"
                                            onClick={() => updateBtn(value._id, value.content)}>
                                            修正
                                        </button>
                                    </div>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </>
        )
    }

    export default Input