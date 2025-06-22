import { Project } from '@/types/project';
import { cards } from '@/data/cards';

export const projectService = {
    getAll: (): Project[] => {
        return cards;
    },

    getById: (id: string): Project | undefined => {
        return cards.find(project => project.id === id);
    },

    create: (project: Omit<Project, 'id'>): Project => {
        const newProject = {
            ...project,
            id: `projet_${Date.now()}`
        };
        // @ts-ignore
        cards.push(newProject);
        return newProject;
    },

    update: (id: string, project: Partial<Project>): Project | undefined => {
        const index = cards.findIndex(p => p.id === id);
        if (index === -1) return undefined;

        // @ts-ignore
        cards[index] = { ...cards[index], ...project };
        return cards[index];
    },

    delete: (id: string): boolean => {
        const index = cards.findIndex(p => p.id === id);
        if (index === -1) return false;

        cards.splice(index, 1);
        return true;
    }
}; 