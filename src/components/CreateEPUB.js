import { VscClose } from "react-icons/vsc";
import Editor from "./Editor";

const CreateEPUB = ({ state, setState, saveBtn = false, handleSave }) => {
  const handleTitleChange = (value, index) => {
    const updatedState = [...state];
    updatedState[index] = {
      ...updatedState[index],
      title: value,
    };
    setState(updatedState);
  };

  const handleBodyChange = (value, index) => {
    const updatedState = [...state];
    updatedState[index] = {
      ...updatedState[index],
      body: value,
    };
    setState(updatedState);
  };

  const handleAdd = () => {
    let stateCopy = [...state];
    stateCopy.push({ title: "", body: "" });
    setState(stateCopy);
  };

  const closeSection = (index) =>
    state.length > 1 && setState(state.filter((_, idx) => idx !== index));

  return (
    <div className="col-span-6">
      {state.map((item, index) => (
        <div
          key={item.title + index}
          className={`w-full text-sm text-gray-800 ${
            index !== 0 ? "mt-6" : ""
          } border rounded-md overflow-hidden`}
        >
          <header className="flex items-center justify-between font-semibold p-3 py-4 bg-gray-100">
            Section #{index + 1}
            <button
              onClick={() => closeSection(index)}
              className="text-lg text-gray-800 hover:text-gray-600"
            >
              <VscClose />
            </button>
          </header>
          <main className="p-5">
            <div>
              <label
                htmlFor={"chapter-title-" + (index + 1)}
                className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
              >
                Chapter Title
              </label>
              <input
                type="text"
                name={"chapter-title-" + (index + 1)}
                id={"chapter-title-" + (index + 1)}
                value={item.title}
                onChange={(e) => handleTitleChange(e.target.value, index)}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-md focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Harry Potter"
                autoFocus={true}
              />
            </div>
            <div>
              <label className="block my-2 mt-4 text-xs font-medium text-gray-900 dark:text-white">
                Chapter Body
              </label>
              <Editor
                {...{
                  id: index,
                  styles: "!pt-0",
                  state: item.body,
                  handleChange: (value) => handleBodyChange(value, index),
                }}
              />
            </div>
          </main>
        </div>
      ))}

      <div
        className={`flex ${saveBtn ? "justify-between" : "justify-end"} mt-5`}
      >
        <button
          onClick={handleAdd}
          className="text-white bg-[#387de5] hover:bg-[#2e6dcc] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:cursor-not-allowed disabled:opacity-60 disabled:saturate-0"
        >
          Add Section
        </button>

        {saveBtn && (
          <button
            onClick={handleSave}
            className="text-white bg-[#387de5] hover:bg-[#2e6dcc] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-10 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:cursor-not-allowed disabled:opacity-60 disabled:saturate-0"
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
};

export default CreateEPUB;
