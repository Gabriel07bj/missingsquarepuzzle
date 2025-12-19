
import { PieceData } from './types';

export const GRID_SIZE = 40;
export const BOARD_WIDTH_UNITS = 16;
export const BOARD_HEIGHT_UNITS = 9;

export const PIECES: PieceData[] = [
  {
    id: 'red',
    name: 'Red Triangle (8x3)',
    color: '#ef4444', // red-500
    width: 320, // 8 units
    height: 120, // 3 units
    path: 'M0,0 L320,120 L0,120 Z',
    initialPos: { x: 40, y: 40 }
  },
  {
    id: 'blue',
    name: 'Blue Triangle (5x2)',
    color: '#3b82f6', // blue-500
    width: 200, // 5 units
    height: 80, // 2 units
    path: 'M0,0 L200,80 L0,80 Z',
    initialPos: { x: 400, y: 40 }
  },
  {
    id: 'green',
    name: 'Green Shape',
    color: '#22c55e', // green-500
    width: 200, // 5 units wide at top
    height: 80, // 2 units tall
    path: 'M0,0 L200,0 L200,40 L120,40 L120,80 L0,80 Z',
    initialPos: { x: 400, y: 160 }
  },
  {
    id: 'yellow',
    name: 'Yellow Shape',
    color: '#eab308', // yellow-600
    width: 200,
    height: 80,
    path: 'M120,0 L200,0 L200,80 L0,80 L0,40 L120,40 Z',
    initialPos: { x: 40, y: 200 }
  }
];

export const SYSTEM_PROMPT = `You are a mathematics professor specializing in geometry. 
Explain the "Missing Square Paradox" (Curry's paradox) clearly and concisely. 
Focus on the difference in slopes (3/8 vs 2/5) and how the "hypotenuse" of the larger shape is not actually a straight line. 
Keep the tone encouraging and academic.`;
