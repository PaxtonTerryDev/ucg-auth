import pc from "picocolors";

function timestamp(): string {
  const d = new Date();
  return pc.dim(d.toISOString());
}

function log(level: string, message: string, data?: object): void {
  console.log(`${timestamp()} ${level} ${message}`);
  if (data) console.dir(data, { colors: true, depth: null });
}

export function debug(message: string, data?: object): void {
  log(pc.bgGreen(" DEBUG "), message, data);
}
export function info(message: string, data?: object): void {
  log(pc.bgGreen(" INFO "), message, data);
}
export function warn(message: string, data?: object): void {
  log(pc.bgGreen(" WARN "), message, data);
}
export function error(message: string, data?: object): void {
  log(pc.bgGreen(" ERROR "), message, data);
}
