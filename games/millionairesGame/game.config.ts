import type { GameDefinition } from "@/types/game";

const game: GameDefinition = {
    id: 'millionairesGame',
    title: 'Millionaires',
    description: 'Become the millionaire by answering 12 questions.',
    icon: '💰',
    backgroundColor: '#F59E0B',
    component: () => import('./Game.vue'),
    enabled: true
}

export default game