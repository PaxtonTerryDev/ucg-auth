export function env(key: string): string {
  const value = Deno.env.get(key);

  if (!value) {
    throw new Error(`Missing required env variable: ${key}`);
  }

  return value;
}
