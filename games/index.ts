// Game registry - auto-discovers games from subfolders using Vite's glob import
import type { GameDefinition } from '@/types/game'

// Import all game configs using Vite's glob import feature
// This automatically imports any game.config.ts from game folders
const gameModules = import.meta.glob<{ default: GameDefinition }>(
  './*/game.config.ts',
  { eager: true }
)

// Extract and export all games from the modules
const games: GameDefinition[] = Object.values(gameModules).map(
  (module) => module.default
)

export default games