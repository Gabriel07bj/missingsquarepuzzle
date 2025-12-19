
import React, { useState, useEffect, useRef } from 'react';
import { PieceData, Position } from '../types';
import { GRID_SIZE } from '../constants';

interface PuzzlePieceProps {
  data: PieceData;
  onDragStart: () => void;
  onDragEnd: (pos: Position) => void;
}

const PuzzlePiece: React.FC<PuzzlePieceProps> = ({ data, onDragStart, onDragEnd }) => {
  const [pos, setPos] = useState<Position>(data.initialPos);
  const [isDragging, setIsDragging] = useState(false);
  const offset = useRef<Position>({ x: 0, y: 0 });

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    offset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
    onDragStart();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    
    // Calculate new position relative to the container
    // This assumes the container is at the top-left of the viewport or we handle its offset
    const container = document.getElementById('game-container');
    if (!container) return;
    const cRect = container.getBoundingClientRect();

    const newX = e.clientX - cRect.left - offset.current.x;
    const newY = e.clientY - cRect.top - offset.current.y;

    setPos({ x: newX, y: newY });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);

    // Snap to grid
    const snappedX = Math.round(pos.x / GRID_SIZE) * GRID_SIZE;
    const snappedY = Math.round(pos.y / GRID_SIZE) * GRID_SIZE;
    
    const finalPos = { x: snappedX, y: snappedY };
    setPos(finalPos);
    onDragEnd(finalPos);
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  };

  // Reset functionality trigger
  useEffect(() => {
    const handleReset = () => setPos(data.initialPos);
    window.addEventListener('reset-pieces', handleReset);
    return () => window.removeEventListener('reset-pieces', handleReset);
  }, [data.initialPos]);

  return (
    <div
      className={`absolute cursor-grab active:cursor-grabbing transition-shadow ${isDragging ? 'z-50' : 'z-10'}`}
      style={{
        left: pos.x,
        top: pos.y,
        width: data.width,
        height: data.height,
        touchAction: 'none',
        filter: isDragging ? 'drop-shadow(0 10px 15px rgba(0,0,0,0.3))' : 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))'
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <svg width={data.width} height={data.height} viewBox={`0 0 ${data.width} ${data.height}`}>
        <path
          d={data.path}
          fill={data.color}
          stroke="rgba(0,0,0,0.4)"
          strokeWidth="2"
          className="transition-colors duration-200"
        />
        <defs>
          <pattern id={`grid-${data.id}`} width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-${data.id})`} style={{ pointerEvents: 'none' }} />
      </svg>
    </div>
  );
};

export default PuzzlePiece;
