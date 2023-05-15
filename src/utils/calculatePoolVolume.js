const calculateVolume = (shape, width, length, depth) => {
  let volume;

  switch(shape) {
    case 'square':
      volume = (Number(length * width * depth)).toFixed(2);
      break;
    case 'oval':
      volume = (Number((length * width * depth)*0.89)).toFixed(2);
      break;
    case 'eight':
      volume = (Number((length * width * depth)*0.85)).toFixed(2);
      break;
    case 'circle':
      volume = (Number((length * width * depth)*0.79)).toFixed(2);
      break;
    default:
      volume = 0;
  }

  return volume;
}

export default calculateVolume;