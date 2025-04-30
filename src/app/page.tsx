import Input from "./_component/Input"

export default async function Home() {
  const res = await fetch('http://localhost:3000/api/get', {cache: 'no-store'});
  const data = await res.json();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="border-[2px] border-gray-400 bg-slate-50 p-10 rounded-[10px]">
        <h1 className="text-5xl mb-3">Todo List</h1>
        <Input data={data}/>
      </div>
    </div>
  );
}
