import { writable } from 'svelte/store';

export const activeEditorView = writable(null);
export const isEditing = writable(false);
export const currentUser = writable(null);
export const activeLink = writable(null);

const initialRealisations = [];
const realisations = writable(initialRealisations);

export { realisations };
export const LINKS = [
  { name: 'Realizacje', url: '#realisations' },
  { name: 'Pracownia', url: '#workshop' },
  { name: 'Publikacje', url: '#publications' },
  { name: 'Referencje', url: '#references' },
  { name: 'Kontakt', url: '#contact' }
];
