const wordlist = [
  'Falcon', 'Bridge', 'Crate', 'Torch', 'Spire', 'Drum', 'Fang', 'Box', 'Quill', 'Dust',
  'Bell', 'Shell', 'Key', 'Brick', 'Crown', 'Stone', 'Frost', 'Flame', 'Root', 'Vault',
  'River', 'Cloud', 'Leaf', 'Sword', 'Wheel', 'Mask', 'Wing', 'Moon', 'Star', 'Hill',
  'Lake', 'Boat', 'Horn', 'Gate', 'Book', 'Ring', 'Path', 'Coin', 'Glass', 'Tree',
  'Tower', 'Blade', 'Shield', 'Arrow', 'Wolf', 'Hawk', 'Bear', 'Deer', 'Lion', 'Ox',
  'Rat', 'Crow', 'Raven', 'Bat', 'Snake', 'Loom', 'Forge', 'Anvil', 'Pick', 'Hammer',
  'Rope', 'Lantern', 'Lamp', 'Banner', 'Chair', 'Table', 'Bench', 'Wall', 'Arch', 'Door',
  'Cart', 'Mill', 'Well', 'Bridge', 'Road', 'Trail', 'Cave', 'Mine', 'Cliff', 'Peak',
  'Shore', 'Wave', 'Sand', 'Stone', 'Log', 'Branch', 'Twig', 'Seed', 'Berry', 'Vine'
];

// Helper function to generate a random two-digit number as a string
function getRandomTwoDigitNumber(): string {
  return String(Math.floor(Math.random() * 90) + 10);
}

export function getRandomCodeWordWithNumber(): string {
  const word = wordlist[Math.floor(Math.random() * wordlist.length)];
  const number = getRandomTwoDigitNumber();
  return word + number;
}