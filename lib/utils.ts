export function generateReferralCode(name: string = ""): string {
  const rand = Math.random().toString(36).substring(2, 8).toUpperCase();
  return (name.split(" ")[0] || "USER") + "-" + rand;
}
