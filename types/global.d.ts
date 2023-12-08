import { RgbaColor } from "react-colorful";

export declare global {
  type Shape = "line" | "rect" | "circle" | "image";
  type CtxMode = "eraser" | "draw" | "select";

  interface CtxOptions {
    lineWidth: number;
    lineColor: RgbaColor;
    fillColor: RgbaColor;
    shape: Shape;
    mode: CtxMode;
    selection: { x: number; y: number; width: number; height: number } | null;
  }

  interface Move {
    circle: {
      cX: number;
      cY: number;
      radiusX: number;
      radiusY: number;
    };
    rect: {
      width: number;
      height: number;
    };
    img: {
      base64: string;
    };
    path: [number, number][];
    options: CtxOptions;
    timestamp: number;
    id: string;
  }

  type Room = {
    usersMoves: Map<string, Move[]>;
    drawed: Move[];
    users: Map<string, string>;
  };

  interface Message {
    userId: string;
    username: string;
    color: string;
    msg: string;
    id: number;
  }

  interface User {
    name: string;
    color: string;
  }

  interface ClientRoom {
    id: string;
    myMoves: Move[];
  }

  // type Users = { [key: string]: Move[] };

  interface ServerToClientEvents {
    your_move: (move: Move) => void;
    room: (room: Room) => void;
    created: (roomId: string) => void;
    mouse_moved: (x: number, y: number, userId: string) => void;
  }

  interface ClientToServerEvents {
    draw: (move: Move) => void;
    mouse_move: (x: number, y: number) => void;
    undo: () => void;
  }
}
