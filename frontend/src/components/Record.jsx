import React from "react";

export const Record = (props) => {
  // Helper function to group moves into pairs
  const pairMoves = (moves) => {
    const pairedMoves = [];
    for (let i = 0; i < moves.length; i += 2) {
      pairedMoves.push([moves[i], moves[i + 1]]);
    }
    return pairedMoves;
  };

  const pairedMoves = pairMoves(props.moves);

  return (
    <div className="height-moves">
      <div className="w-full flex flex-col bg-slate-400 p-5 rounded-md min-h-full items-start">
        {pairedMoves.map((pair, index) => (
          <div key={index} className="flex flex-row w-full gap-20">
            <h3>{index + 1}.</h3>
            <h3 className="text-white">{pair[0]}</h3>
            {pair[1] && <h3 className="text-white">{pair[1]}</h3>}
          </div>
        ))}
      </div>
    </div>
  );
};
