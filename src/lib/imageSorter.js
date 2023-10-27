export function sortImagesByConfig(images, config) {
  try {
    return config
      .sort((a, b) => a.position - b.position)
      .map(conf => {
        const imgData = images.find(img => img.filename === conf.filename);
        if (!imgData) {
          console.warn(`Nie znaleziono obrazu o nazwie: ${conf.filename}`);
          return null;
        }
        return imgData.img;
      })
      .filter(Boolean); // Usuwa wszelkie puste wartości
  } catch (error) {
    console.error('Wystąpił błąd podczas sortowania obrazów:', error);
    return [];
  }
}
