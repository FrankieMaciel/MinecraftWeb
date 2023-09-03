// import { noise } from '../noise/noise.js';

export function caveNoise (seed, x, y, smooth, intensity) {
  noise.seed(seed);
  let Xsmooth = x / smooth;
  let Ysmooth = y / smooth;

  let noise1 = parseInt(noise.perlin2(Xsmooth, Ysmooth) * intensity);
  let noise2 = parseInt(noise.perlin2(Xsmooth, Ysmooth) * (intensity * 2));
  return (noise1 + noise2) / 2;
}