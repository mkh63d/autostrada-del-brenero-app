import type { GameDefinition } from "@/types/game";

const game: GameDefinition = {
    id: 'fiveSecondsGame',
    title: '5 Seconds',
    description: 'You have only 5 seconds to answer a question. Do you think you can beat your friends with your strike?',
    icon: '⏰',
    backgroundColor: '#3B82F6',
    component: () => import('./Game.vue'),
    enabled: true
}

export default game