import * as VG from "@pureeval/voxel-geometry";
import { ServerSession } from "mcpews";
type Space = VG.Vec3[];

const Vec3 = (x: number, y: number, z: number) => new VG.Vec3(x, y, z);

const setBlock =
  (session: ServerSession) => (block: string) => (pos: VG.Vec3) => {
    session.sendCommand(`setblock ${pos.x} ${pos.y} ${pos.z} ${block}`);
  };

const overSpace = (space: Space) => (fn: (pos: VG.Vec3) => void) => {
  space.forEach(fn);
};

const setBlocks =
  (session: ServerSession) => (block: string) => (space: Space) => {
    overSpace(space)(setBlock(session)(block));
  };

function lift({ x, y, z }: { x: number; y: number; z: number }): VG.Vec3 {
  return Vec3(x, y, z);
}

export { Vec3, setBlock, overSpace, setBlocks, Space, lift };
