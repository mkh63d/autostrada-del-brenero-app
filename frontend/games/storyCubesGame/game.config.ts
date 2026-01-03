import type { GameDefinition } from "@/types/game";

const game: GameDefinition = {
    id: 'storyCubesGame',
    title: 'Story Cubes',
    description: 'Make a story out of four symbols you drew on cubes. The funnier and more stupid, the better!',
    icon: '🎲',
    backgroundColor: '#8B5CF6',
    component: () => import('./Game.vue'),
    enabled: true
}

export default game