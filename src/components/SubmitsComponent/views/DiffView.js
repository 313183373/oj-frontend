import {Diff, Hunk, parseDiff} from "react-diff-view";
import 'react-diff-view/style/index.css';
import React from "react";

function getChangeKey(lineNumber) {
  return `I${lineNumber}`;
}

export const DiffView = ({diffText}) => {
  const files = parseDiff(diffText, {nearbySequences: 'zip'});

  const getWidgets = (hunks) => {
    const changes = hunks.flatMap(hunk => {
      return [...hunk.changes];
    }).filter(change => change.type !== 'normal');
    const compareLine = changes.reduce((result, change) => {
      const line = change.lineNumber;
      if (result[line]) {
        result[line].push(change.content);
      } else {
        result[line] = [change.content];
      }
      return result;
    }, {});
    /*
    * 1: (2) ["34", "68"]
2: (2) ["26", "52"]
3: (2) ["30", "61"]
4: (2) ["40", "81"]
5: (2) ["25", "51"]
6: (2) ["34", "69"]
7: (2) ["29", "59"]
8: (2) ["47", "95"]
9: (2) ["47", "94"]
10: (2) ["5", "10"]*/
    let hasReturnInLine = {};
    for (const [lineNumber, line] of Object.entries(compareLine)) {
      if (line.length === 2) {
        if (line[0] === line[1]) {
          hasReturnInLine[getChangeKey(lineNumber)] = <span style={{color: 'red'}}>maybe a '\n' difference</span>;
        }
      }
    }
    return hasReturnInLine;
  };

  const renderFile = ({oldRevision, newRevision, type, hunks}) => (
    <Diff key={oldRevision + '-' + newRevision} viewType="split" diffType={type} hunks={hunks}
          widgets={getWidgets(hunks)}>
      {hunks => hunks.map(hunk => <Hunk key={hunk.content} hunk={hunk}/>)}
    </Diff>
  );

  return (
    <div>
      {files.map(renderFile)}
    </div>
  );
};