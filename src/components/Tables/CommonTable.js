import { useState } from "react";

const CommonTable = ({ template, paginatedData, Actions }) => {
  const { curItems } = paginatedData;
  const keys = Object.keys(template);
  const [addUser, setAddUser] = useState({ isVisible: false, data: {} });

  return (
    <>
      <div className="relative overflow-x-auto rounded-t-xl overflow-hidden">
        <table className="text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {keys.map((e) => (
                <th scope="col" className="px-6 py-3" key={e}>
                  {e.toLocaleUpperCase()}
                </th>
              ))}
              {Actions && (
                <th scope="col" className="px-6 py-3 justify-between">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {curItems.length ? (
              curItems.map((el) => (
                <tr
                  className="bg-gray-50 border-b hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700"
                  key={el.id}
                >
                  {keys.map((key) => (
                    <td
                      className="px-6 py-4 whitespace-nowrap"
                      key={key + el.id}
                    >
                      {el[key]}
                    </td>
                  ))}

                  {Actions && (
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Actions item={el} />
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr className="text-center bg-gray-50 border-b hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700">
                <td
                  className={`"px-6 py-4 whitespace-nowrap`}
                  colSpan={keys.length + 1}
                >
                  No results found!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CommonTable;
