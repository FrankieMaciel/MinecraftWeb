function getRandomColor() {
  const greenShades = ['#DDFFBB', '#C7E9B0', '#B3C99C', '#A4BC92'];
  const randomIndex = Math.floor(Math.random() * greenShades.length);
  return greenShades[randomIndex];
}

function getRandomColorRock() {
  const grayColors = ['#555555', '#777777', '#999999', '#BBBBBB', '#DDDDDD']; // Tons de cinza de baixo contraste
  const randomIndex = Math.floor(Math.random() * grayColors.length);
  return grayColors[randomIndex];
}

function getRandomColorDirt() {
  const grayColors = ['#8D7B68', '#A4907C', '#C8B6A6', '#C8B6A6']; // Tons de cinza de baixo contraste
  const randomIndex = Math.floor(Math.random() * grayColors.length);
  return grayColors[randomIndex];
}

export { getRandomColor, getRandomColorDirt, getRandomColorRock };