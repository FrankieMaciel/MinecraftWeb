function getSurfaceNoise(x, y, smooth, intensity) {
  let Xsmooth = x / smooth;
  let Ysmooth = y / smooth;

  let ofsset = 200;
  let Xsmooth2 = x / (smooth + ofsset);
  let Ysmooth2 = y / (smooth + ofsset);

  let noise = parseInt(perlin.get(Xsmooth, Ysmooth) * intensity);
  let noise2 = parseInt(perlin.get(Xsmooth2 + ofsset, Ysmooth2 + ofsset) * intensity);
  return (noise + noise2) / 2;
}

export default getSurfaceNoise;