
export interface PieceData {
  id: string;
  name: string;
  color: string;
  width: number;
  height: number;
  path: string;
  initialPos: { x: number; y: number };
}

export enum HintMode {
  NONE = 'NONE',
  SOLID = 'SOLID',
  HOLE = 'HOLE'
}

export interface Position {
  x: number;
  y: number;
}
