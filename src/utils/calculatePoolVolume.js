const calculateVolume = (shape, width, length, depth) => {
  let volume;

  switch(shape) {
    case 'square':
      volume = Math.round(Number(length * width * depth));
      break;
    case 'oval':
      volume = Math.round(Number((length * width * depth)*0.89));
      break;
    case 'eight':
      volume = Math.round(Number((length * width * depth)*0.85));
      break;
    case 'circle':
      volume = Math.round(Number((length * width * depth)*0.79));
      break;
    default:
      volume = 0;
  }

  return volume;
}

export default calculateVolume;