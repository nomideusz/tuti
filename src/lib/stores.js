import { writable } from 'svelte/store';
import { _ } from 'svelte-i18n';

export const activeEditorView = writable(null);
export const isEditing = writable(false);
export const currentUser = writable(null);
export const activeLink = writable(null);
export const analyticsStore = writable([]);

const initialRealisations = [];
const realisations = writable(initialRealisations);

export { realisations };

export const LINKS = [
  { name: 'realisations', url: '#realisations' },
  { name: 'workshop', url: '#workshop' },
  { name: 'publications', url: '#publications' },
  { name: 'references', url: '#references' },
  { name: 'contact', url: '#contact' }
];
