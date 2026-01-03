export interface GameDefinition {
    id: string, 
    title: string,
    icon: URL | string,
    description: string,
    backgroundColor: string,
    component: () => Promise<any>,
    enabled: boolean
}