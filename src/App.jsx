import Editor from "./components/Editor";
import Preview from "./components/Preview";

function App() {
  return (
    <div className="w-full h-screen flex flex-col ">
      <header className="text-[#FBF6E2] px-12 py-3 bg-[#131842] font-semibold text-2xl">Markdown to BBCode</header>
      <main className="flex w-full h-full px-4 mt-1 flex-grow gap-0.5 ">
        <Editor />
        <Preview />
      </main>
    </div>
  );
}

export default App;
