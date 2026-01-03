import type { GameDefinition } from "@/types/game";

const game: GameDefinition = {
    id: 'detectiveGame',
    title: 'Detective Game',
    description: 'Become detectives together with your friends. Look at the evidence and witnesses\' testimonies. Find the murder!',
    icon: '🔍',
    backgroundColor: '#1F2937',
    component: () => import('./Game.vue'),
    enabled: true
}

export default game