import React from "react";
import Actions from "../Actions";

const CommonTable = ({ template, state, actionCols, props }) => {
  const keys = Object.keys(template);

  return (
    <>
      <div className="relative overflow-x-auto rounded-t-xl overflow-hidden">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {keys.map((e) => (
                <th scope="col" className="px-6 py-3 text-center" key={e}>
                  {e.toLocaleUpperCase()}
                </th>
              ))}
              {actionCols &&
                actionCols.map((elem) => (
                  <th
                    scope="col"
                    className="px-6 py-3 justify-between uppercase text-center"
                  >
                    {elem}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {state.length ? (
              state.map((el) => (
                <tr
                  className="bg-gray-50 border-b hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700"
                  key={el.id}
                >
                  {keys.map((key) => (
                    <td
                      className="px-6 py-4 whitespace-nowrap text-xs text-center"
                      key={key + el.id}
                    >
                      {el[key]}
                    </td>
                  ))}

                  <Actions {...{ data: el, actionCols, ...props }} />
                </tr>
              ))
            ) : (
              <tr className="text-center bg-gray-50 border-b hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700">
                <td
                  className={`"px-6 py-4 whitespace-nowrap text-xs`}
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
