export function colors_scale(cs: number[][], steps: number) {
  let scale: number[][] = [cs[0]];
  for (let i = 0; i < cs.length - 1; i++) {
    let c_scale = color_scale(cs[i], cs[i + 1], steps);
    scale = scale.concat(c_scale.slice(1));
  }
  return scale;
}

export function color_scale(ca: number[], cb: number[], steps: number): number[][] {
  let scale = [];
  for (let i = 0; i <= steps; i++) {
    let r = i / steps;
    scale.push(color_lerp(ca, cb, r));
  }
  return scale;
}

function color_lerp(ca: number[], cb: number[], r: number) {
  let c0 = lerp(ca[0], cb[0], r);
  let c1 = lerp(ca[1], cb[1], r);
  let c2 = hue_lerp(ca[2], cb[2], r);
  return [c0, c1, c2];
}

function lerp(a: number, b: number, r: number) {
  return a + (b - a) * r;
}

function hue_lerp(a: number, b: number, r: number) {
  if (a - b > 180) return angle_modulo(lerp(a, b + 360, r));
  if (b - a > 180) return angle_modulo(lerp(a + 360, b, r));
  return lerp(a, b, r);
}

function angle_modulo(phi: number) {
  return nmod(phi + 180, 360) - 180;
}

function nmod(x: number, n: number) {
  return ((x % n) + n) % n;
}
