const rock = '#AAA492';
const dirt = '#955A47';
const grass = '#B1BD5D';
const middirt = '#9F8772';


function getColor(id) {
  if (id === 'game:air') return null;
  if (id === 'game:rock') return rock;
  if (id === 'game:dirt') return dirt;
  if (id === 'game:grass') return grass;
  if (id === 'game:middirt') return middirt;
}

export { getColor };