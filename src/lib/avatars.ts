// Cartoon-style avatar SVGs representing diverse characters
export const cartoonAvatars = {
  "whiteMan": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><circle cx="20" cy="20" r="20" fill="#FFE0D1"/><path d="M15 22c2-8 8-8 10 0" fill="#724133"/><circle cx="15" cy="15" r="2.5" fill="#2C1810"/><circle cx="25" cy="15" r="2.5" fill="#2C1810"/><path d="M13 25 Q20 28 27 25" stroke="#2C1810" fill="none" stroke-width="2" stroke-linecap="round"/></svg>`,
  "blackMan": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><circle cx="20" cy="20" r="20" fill="#8E5D52"/><path d="M15 22c2-8 8-8 10 0" fill="#2C1810"/><circle cx="15" cy="15" r="2.5" fill="#2C1810"/><circle cx="25" cy="15" r="2.5" fill="#2C1810"/><path d="M13 25 Q20 28 27 25" stroke="#2C1810" fill="none" stroke-width="2" stroke-linecap="round"/></svg>`,
  "youngGirl": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><circle cx="20" cy="20" r="20" fill="#FFD7D7"/><path d="M12 12c3-6 13-6 16 0" fill="#724133"/><circle cx="15" cy="15" r="2.5" fill="#2C1810"/><circle cx="25" cy="15" r="2.5" fill="#2C1810"/><path d="M13 25 Q20 28 27 25" stroke="#2C1810" fill="none" stroke-width="2" stroke-linecap="round"/></svg>`,
  "elderMan": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><circle cx="20" cy="20" r="20" fill="#E0E0E0"/><path d="M15 12c2-8 8-8 10 0" fill="#FFFFFF"/><circle cx="15" cy="15" r="2.5" fill="#2C1810"/><circle cx="25" cy="15" r="2.5" fill="#2C1810"/><path d="M13 25 Q20 28 27 25" stroke="#2C1810" fill="none" stroke-width="2" stroke-linecap="round"/></svg>`,
  "asianGirl": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><circle cx="20" cy="20" r="20" fill="#FFE7D7"/><path d="M12 12c3-6 13-6 16 0" fill="#2C1810"/><path d="M13 15 Q15 17 17 15" stroke="#2C1810" fill="none" stroke-width="2"/><path d="M23 15 Q25 17 27 15" stroke="#2C1810" fill="none" stroke-width="2"/><path d="M13 25 Q20 28 27 25" stroke="#2C1810" fill="none" stroke-width="2" stroke-linecap="round"/></svg>`,
  "default": "/placeholder.svg"
};

export type AvatarKey = keyof typeof cartoonAvatars;

export function getAvatarUrl(key: AvatarKey): string {
  const svg = cartoonAvatars[key];
  return svg === "/placeholder.svg" ? svg : `data:image/svg+xml,${encodeURIComponent(svg)}`;
}