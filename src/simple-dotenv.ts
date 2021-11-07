import { join } from "https://deno.land/std@0.113.0/path/mod.ts";

export class Dotenv {
  readonly filename: string;

  constructor() {
    this.filename = ".env";
  }

  private readSync(): Uint8Array {
    return Deno.readFileSync(join(Deno.env.get("PWD")!, this.filename));
  }

  private getContents(): string[] {
    return new TextDecoder("UTF-8").decode(this.readSync()).split(/=|\n/)
      .filter((v) => v != "");
  }

  private setEnvironment(keyValues: string[]): void {
    const max = keyValues.length;
    for (let i = 0; max > i; i += 2) {
      const [k, v, ...args] = keyValues;
      Deno.env.set(k, v);
      keyValues.splice(0, 2);
    }
  }

  run(): void {
    this.setEnvironment(this.getContents());
  }
}
