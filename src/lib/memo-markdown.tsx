import * as React from "react";

const isTableRow = (line: string) => line.startsWith("|") && line.endsWith("|");

const getTableCells = (row: string) => row.split("|").filter((cell) => cell.trim());

const renderTable = (tableRows: string[], key: string) => {
  const headerRow = tableRows[0];
  const bodyRows = tableRows.slice(2);

  if (!headerRow || bodyRows.length === 0) {
    return (
      <div key={key} className="overflow-x-auto my-4">
        <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
          <tbody>
            {tableRows.map((row) => (
              <tr key={row} className="border-b border-border last:border-0">
                {getTableCells(row).map((cell) => (
                  <td key={cell.trim()} className="px-4 py-2 text-text-primary">
                    {cell.trim()}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div key={key} className="overflow-x-auto my-4">
      <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-surface-raised">
            {getTableCells(headerRow).map((cell) => (
              <th
                key={cell.trim()}
                className="px-4 py-2 text-left font-medium text-text-secondary border-b border-border"
              >
                {cell.trim()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bodyRows.map((row) => (
            <tr key={row} className="border-b border-border last:border-0">
              {getTableCells(row).map((cell) => (
                <td key={cell.trim()} className="px-4 py-2 text-text-primary">
                  {cell.trim()}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const renderLine = (line: string, key: string) => {
  if (line.startsWith("# ")) {
    return (
      <h1 key={key} className="font-serif text-2xl font-bold text-text-primary mt-8 mb-4 first:mt-0">
        {line.slice(2)}
      </h1>
    );
  }

  if (line.startsWith("## ")) {
    return (
      <h2 key={key} className="font-serif text-xl font-semibold text-text-primary mt-6 mb-3">
        {line.slice(3)}
      </h2>
    );
  }

  if (line.startsWith("### ")) {
    return (
      <h3 key={key} className="font-serif text-lg font-medium text-text-primary mt-4 mb-2">
        {line.slice(4)}
      </h3>
    );
  }

  if (line.startsWith("**") && line.endsWith("**")) {
    return (
      <p key={key} className="font-semibold text-text-primary my-3">
        {line.slice(2, -2)}
      </p>
    );
  }

  if (line.startsWith("- ")) {
    return (
      <li key={key} className="text-text-primary ml-4 my-1">
        {line.slice(2)}
      </li>
    );
  }

  if (line.trim() === "") {
    return <div key={key} className="h-2" />;
  }

  if (line.trim()) {
    return (
      <p key={key} className="text-text-primary my-2 leading-relaxed">
        {line}
      </p>
    );
  }

  return null;
};

export const renderMarkdown = (text: string) => {
  const elements: React.ReactNode[] = [];
  const lines = text.split("\n");
  let tableRows: string[] = [];

  const flushTableRows = (key: string) => {
    if (tableRows.length === 0) {
      return;
    }

    elements.push(renderTable(tableRows, key));
    tableRows = [];
  };

  lines.forEach((line, lineIndex) => {
    if (isTableRow(line)) {
      tableRows.push(line);
      return;
    }

    flushTableRows(`table-${lineIndex}`);

    const renderedLine = renderLine(line, `line-${lineIndex}`);
    if (renderedLine) {
      elements.push(renderedLine);
    }
  });

  flushTableRows("table-end");

  return elements;
};
