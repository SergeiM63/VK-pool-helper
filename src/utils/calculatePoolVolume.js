const calculateVolume = (shape, width, length, depth) => {
  let volume;

  switch(shape) {
    case 'square':
      volume = Number(length * width * depth);
      break;
    case 'oval':
      volume = Number((length * width * depth)*0.89);
      break;
    case 'eight':
      volume = Number((length * width * depth)*0.85);
      break;
    case 'circle':
      volume = Number((length * width * depth)*0.79);
      break;
    default:
      volume = 0;
  }

  return volume.toFixed(2);
}

export default calculateVolume;