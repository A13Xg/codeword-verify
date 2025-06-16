const words = [
  'Falcon', 'Bridge', 'Crate', 'Torch', 'Spire', 'Drum', 'Fang', 'Box', 'Quill', 'Dust',
  'Bell', 'Shell', 'Key', 'Brick', 'Crown', 'Stone', 'Frost', 'Flame', 'Root', 'Vault'
];

export function getRandomCodeWord() {
  return words[Math.floor(Math.random() * words.length)];
}