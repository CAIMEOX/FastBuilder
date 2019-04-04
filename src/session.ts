import * as V from "@pureeval/voxel-geometry";
import { Space, setBlocks, Vec3, lift } from "./effect";
import { Sandbox } from "./sandbox";
import { tell_raw } from "./utils";
import { ServerSession } from "mcpews";

type Setting = {
  block: string;
  origin: V.Vec3;
  particle: string;
};

export default class Session {
  session: ServerSession;
  history: Array<string> = [];
  sandbox: Sandbox = new Sandbox({});
  setting: Setting;
  callbacks: { [key: string]: (arg: any) => void } = {};
  constructor(session: ServerSession) {
    session.enableEncryption();
    this.session = session;
    this.setting = {
      block: "minecraft:iron_block",
      origin: Vec3(0, 0, 0),
      particle: "minecraft:explosion",
    };
    this.welcome();
    this.bind_user();
    this.load_pure_functions();
    this.load_effect_functions();
  }

  static create(session: ServerSession) {
    return new Session(session);
  }

  welcome() {
    this.broadcast("Welcome to the FastBuilder!");
  }

  load_pure_functions() {
    this.sandbox.updateEnv({
      ...V.Generator,
      ...V.Exp,
      ...V.Transform,
      ...V.LSystem,
      ...V.IFS,
      ...V.DLA,
      vec3: Vec3,
    });
  }

  load_effect_functions() {
    this.sandbox.updateEnv({
      session: this.session,
      plot: this.plot,
      pos: () => {
        this.session.sendCommand("testforblock ~ ~ ~ air", ({ body }) => {
          this.setting.origin = body.position as V.Vec3;
          this.tell_raw(
            `Position Got: ${this.setting.origin.x}, ${this.setting.origin.y}, ${this.setting.origin.z}`
          );
        });
      },
      setBlocks,
      tell_raw: this.tell_raw,
    });
  }

  plot(space: Space, o = this.setting.origin, block = this.setting.block) {
    return setBlocks(this.session)(block)(V.Transform.move(space, lift(o)));
  }

  exports() {
    this.sandbox.updateEnv({
      session: this.session,
      setting: this.setting,
    });
  }

  bind_user() {
    let t = this;
    this.session.subscribe("PlayerMessage", ({ body }) => {
      const message: string = body.message as string;
      if (message.startsWith("-")) {
        const script = message.substring(1).trim();
        t.exports();
        try {
          const result = t.sandbox.eval(script);
          if (result) {
            t.tell_raw(`>> §e${result}`);
          } else {
            t.tell_raw(`>> §eSuccess`);
          }
        } catch (e) {
          t.tell_raw(`>> §4${e}`);
        }
      }
    });
  }

  tell_raw(...message: string[]) {
    this.session.sendCommand(tell_raw("@s", ...message.map((m) => `§e${m}`)));
  }

  broadcast(...message: string[]) {
    this.session.sendCommand(tell_raw("@a", ...message.map((m) => `§e${m}`)));
  }
}
