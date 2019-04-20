import {Diff, Hunk, parseDiff} from "react-diff-view";
import 'react-diff-view/style/index.css';
import React from "react";

// function getChangeKey(lineNumber) {
//   return `I${lineNumber}`;
// }

const stringifyContent = hunks => {
  return hunks.map(hunk => {
    return {
      ...hunk,
      changes: hunk.changes.map(change => ({...change, content: JSON.stringify(change.content).slice(1, -1)})),
    }
  })
}

const getStringifiedFiles = files => {
  return files.map(file => ({
    ...file,
    hunks: stringifyContent(file.hunks),
  }))
}

export const DiffView = ({diffText}) => {
  const files = parseDiff(diffText, {nearbySequences: 'zip'});
  // const getWidgets = (hunks) => {
  //   const changes = hunks.flatMap(hunk => {
  //     return [...hunk.changes];
  //   }).filter(change => change.type !== 'normal');
  //   const compareLine = changes.reduce((result, change) => {
  //     const line = change.lineNumber;
  //     if (result[line]) {
  //       result[line].push(change.content);
  //     } else {
  //       result[line] = [change.content];
  //     }
  //     return result;
  //   }, {});
  //   let hasReturnInLine = {};
  //   for (const [lineNumber, line] of Object.entries(compareLine)) {
  //     if (line.length === 2) {
  //       console.log(JSON.stringify(line[0]), JSON.stringify(line[1]));
  //       if (line[0] === line[1] || line[0].trim() === line[1].trim()) {
  //         hasReturnInLine[getChangeKey(lineNumber)] = <span style={{color: 'red'}}>maybe a '\n' or '\r' difference</span>;
  //       }
  //     }
  //   }
  //   return hasReturnInLine;
  // };

  const renderFile = ({oldRevision, newRevision, type, hunks}) => (
    <Diff key={oldRevision + '-' + newRevision} viewType="split" diffType={type} hunks={hunks}>
      {hunks => hunks.map(hunk => <Hunk key={hunk.content} hunk={hunk}/>)}
    </Diff>
  );

  return (
    <div>
      {getStringifiedFiles(files).map(renderFile)}
    </div>
  );
};