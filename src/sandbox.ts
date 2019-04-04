class Sandbox {
  sandbox: object;
  constructor(sandbox: object) {
    this.sandbox = sandbox;
  }

  eval(code: string): unknown {
    const body = `with(inside) { ${code} }`;
    const fn = new Function("inside", body);
    return fn(this.sandbox);
  }

  updateEnv(...env: object[]) {
    Object.assign(this.sandbox, env[0]);
  }
}

export { Sandbox };
