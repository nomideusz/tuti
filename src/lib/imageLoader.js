import { realisations } from '$lib/stores';
import { sortImagesByConfig } from './imageSorter';

const allImageGlobs = import.meta.glob('$lib/images/originals/*/*.jpg', {
  import: 'default',
  eager: true,
  query: { as: 'real' }
});
const allConfigGlobs = import.meta.glob('$lib/images/originals/*/config.json', {
  eager: true
});

export function loadRealisations() {
  const newRealisations = [];
  const configs = Object.values(allConfigGlobs).map(cfg => cfg.default);
  for (let config of configs) {
    const imagePaths = Object.keys(allImageGlobs).filter(path => {
      return config.images.some(image => path.includes(image.filename));
    });

    const images = imagePaths.map(path => {
      return {
        filename: path.split('/').pop(),
        img: allImageGlobs[path]
      };
    });

    const sortedImages = sortImagesByConfig(images, config.images);
    newRealisations.push({
      ...config,
      images: sortedImages
    });
  }
  realisations.set(newRealisations);
}
