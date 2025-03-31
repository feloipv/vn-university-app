// utils/format.ts
export const maskEmail = (email: string): string => {
  const [name, domain] = email.split("@");
  if (name.length > 2) {
    return `${name.slice(0, 3)}***${name.slice(-2)}@${domain}`;
  }
  return email;
};
