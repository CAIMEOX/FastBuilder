function tell_raw(Player: string, ...Message: string[]) {
  return `tellraw ${Player} {"rawtext":[{"text":"${now()} ${Message.join(
    "\n"
  )}"}]}`;
}

function now(): string {
  const date = new Date();
  return ["[", date.toTimeString().slice(0, 8), "]"].join("");
}


export { tell_raw };
