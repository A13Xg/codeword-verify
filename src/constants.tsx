const words = [
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


export function getRandomCodeWord() {
  const word = words[Math.floor(Math.random() * words.length)];
  const num = Math.floor(Math.random() * 90) + 10; // random 2-digit number
  return word + num;
}