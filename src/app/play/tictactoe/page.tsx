"use client";

import { useEffect, useMemo, useState } from "react";
import ShinyButton from "@/components/ui/ShinyButton";
import RPGPanel from "@/components/ui/RPGPanel";
import { HoloModal } from "@/components/ui/HoloModal";
import Link from "next/link";
import { ArrowLeft, RefreshCw } from "lucide-react";
import confetti from "canvas-confetti";

export default function TicTacToe() {
  const [board, setBoard] = useState<Array<"X" | "O" | null>>(
    Array(9).fill(null)
  );
  const [isXNext, setIsXNext] = useState(true);

  const checkWinner = (squares: Array<"X" | "O" | null>) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (i: number) => {
    if (board[i] || winner) return;
    const nextBoard = board.slice();
    nextBoard[i] = isXNext ? "X" : "O";
    setBoard(nextBoard);
    setIsXNext(!isXNext);
  };

  const winner = useMemo(() => checkWinner(board), [board]);
  const isDraw = useMemo(
    () => !winner && board.every((cell) => cell !== null),
    [board, winner]
  );
  const showWinModal = Boolean(winner || isDraw);

  useEffect(() => {
    if (!winner) return;
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: ["#FF00CC", "#00FFFF"],
    });
  }, [winner]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  return (
    <div className="min-h-full flex flex-col items-center p-4 bg-plastic-bg scanlines">
      <div className="space-grid" />
      <div className="w-full flex justify-between items-center mb-8 relative z-10">
        <Link href="/play">
          <ShinyButton size="sm" variant="pink" icon={<ArrowLeft size={16} />}>
            Back
          </ShinyButton>
        </Link>
        <div className="font-black text-2xl text-white">
          TURN: <span className={isXNext ? "text-plastic-pink" : "text-plastic-cyan"}>{isXNext ? "X (YOU)" : "O (THEM)"}</span>
        </div>
      </div>

      <RPGPanel className="p-4" glowing>
        <div className="grid grid-cols-3 gap-3 bg-black/20 p-3 rounded-2xl">
          {board.map((cell, i) => (
            <button
              key={i}
              onClick={() => handleClick(i)}
              className={`
                h-24 w-24 rounded-xl text-6xl font-black shadow-inner transition-all duration-200
                flex items-center justify-center
                ${!cell ? "bg-white/10 hover:bg-white/20 active:scale-95" : "bg-black/40"}
                ${cell === "X" ? "text-plastic-pink drop-shadow-[0_0_10px_#FF00CC]" : "text-plastic-cyan drop-shadow-[0_0_10px_#00FFFF]"}
              `}
            >
              {cell}
            </button>
          ))}
        </div>
      </RPGPanel>

      <div className="mt-8">
        <ShinyButton onClick={resetGame} variant="lime" icon={<RefreshCw />}>
          RESET BOARD
        </ShinyButton>
      </div>

      <HoloModal
        isOpen={showWinModal}
        onClose={resetGame}
        title={isDraw ? "GAME OVER" : "VICTORY!"}
      >
        <div className="text-center">
          <div className="text-6xl mb-4">
            {winner === "X" ? "🏆" : winner === "O" ? "💀" : "🤝"}
          </div>
          <p className="font-data text-xl mb-6">
            {isDraw ? "Nobody wins. Try again!" : `${winner} takes the round!`}
          </p>
          <div className="p-4 bg-white/10 rounded-xl mb-4">
            <div className="flex justify-between text-sm uppercase font-bold">
              <span>XP Earned</span>
              <span className="text-plastic-lime">+50 XP</span>
            </div>
            <div className="flex justify-between text-sm uppercase font-bold mt-2">
              <span>Coins</span>
              <span className="text-yellow-400">+10</span>
            </div>
          </div>
          <ShinyButton onClick={resetGame} variant="cyan" className="w-full">
            PLAY AGAIN
          </ShinyButton>
        </div>
      </HoloModal>
    </div>
  );
}
