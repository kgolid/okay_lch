import p5 from 'p5';

let h = 80;
let w = 50;

export function draw_scale(p: p5, y: number, colors: string[]) {
  colors.forEach((c, i) => draw_color(p, y, c, i));
}

function draw_color(p: p5, y: number, col: string, pos: number) {
  p.fill(col);
  p.rect(100 + pos * w, y, w, h);
}
