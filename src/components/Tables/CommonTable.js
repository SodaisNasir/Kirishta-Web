import React from "react";
import Actions from "../Actions";

const CommonTable = ({ template, state, actionCols, props }) => {
  const keys = Object.keys(template);

  return (
    <>
      <div className="relative overflow-hidden overflow-x-auto rounded-t-xl">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {keys.map((e) => (
                <th scope="col" className="px-6 py-3 text-center" key={e}>
                  {e.toUpperCase()}
                </th>
              ))}
              {actionCols &&
                actionCols.map((elem) => (
                  <th
                    key={elem}
                    scope="col"
                    className="justify-between px-6 py-3 text-center uppercase"
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
                  className="border-b bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700"
                  key={el.id}
                >
                  {keys.map((elem) => (
                    <td
                      className="px-6 py-4 text-xs text-center whitespace-nowrap"
                      key={elem + el.id}
                    >
                      {el[elem]}
                    </td>
                  ))}

                  <Actions {...{ data: el, id: el.id, actionCols, ...props }} />
                </tr>
              ))
            ) : (
              <tr className="text-center border-b bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700">
                <td
                  className={`"px-6 py-4 whitespace-nowrap text-xs`}
                  colSpan={keys.length + actionCols.length + 1}
                >
                  No inactive/saved books found!
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
