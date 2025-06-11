import React from 'react';

const HighlightVariables = ({ message }: any) => {
  const regex = /\{([^}]+)\}/g;
  const parts = message.split(regex);
  return (
    <p className="text-lg">
      {parts.map((part: any, index: any) => {
        if (index % 2 === 0) {
          return part;
        } else {
          return <strong className="text-primary" key={index}>{`{${part}}`}</strong>;
        }
      })}
    </p>
  );
};

export default HighlightVariables;
