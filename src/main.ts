import p5 from 'p5';
import { hex_from_rgb, lch_from_rgb, rgb_from_lch } from './convert';
import chroma from 'chroma-js';
import { color_scale, colors_scale } from './scale';
import { draw_scale } from './display';

let sketch = function (p: p5) {
  const DIM = 900;

  p.setup = function () {
    p.createCanvas(DIM, DIM);
    p.background(255);
    p.smooth();
    p.noStroke();
    p.background(100);

    scale_test(p);
  };

  p.draw = function () {};

  p.keyPressed = function () {
    if (p.keyCode === 80) p.saveCanvas('okay_lch_' + Date.now(), 'jpeg'); // Press P to download image
  };
};

new p5(sketch);

function get_random_rgb() {
  return [
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255),
  ];
}

function scale_test(p: p5) {
  let rgb1 = get_random_rgb();
  let rgb2 = get_random_rgb();
  let rgb3 = get_random_rgb();
  let my_rgb_scale = colors_scale([rgb1, rgb2, rgb3], 3).map((r) => hex_from_rgb(r));

  let lch1 = lch_from_rgb(rgb1);
  let lch2 = lch_from_rgb(rgb2);
  let lch3 = lch_from_rgb(rgb3);
  let my_lch_scale = colors_scale([lch1, lch2, lch3], 3).map((l) => hex_from_rgb(rgb_from_lch(l)));

  let chroma_rgb_scale = chroma
    .scale([hex_from_rgb(rgb1), hex_from_rgb(rgb2), hex_from_rgb(rgb3)])
    .mode('rgb')
    .colors(7);

  let chroma_lch_scale = chroma
    .scale([hex_from_rgb(rgb1), hex_from_rgb(rgb2), hex_from_rgb(rgb3)])
    .mode('lch')
    .colors(7);

  draw_scale(p, 100, my_rgb_scale);
  draw_scale(p, 200, my_lch_scale);
  draw_scale(p, 400, chroma_rgb_scale);
  draw_scale(p, 500, chroma_lch_scale);

  console.log(hex_from_rgb(rgb1), hex_from_rgb(rgb2), hex_from_rgb(rgb3));
  console.log(my_lch_scale);
  console.log(chroma_lch_scale);
}

function convert_test() {
  for (var i = 0; i < 1; i++) {
    let rgb = get_random_rgb();
    let rgb2 = get_random_rgb();
    let lch = lch_from_rgb(rgb);
    let rgb1 = rgb_from_lch(lch);

    console.log('RGB: ', rgb);
    console.log('... to LCH: ', lch);
    console.log('... to RGB: ', rgb1);
    console.log(rgb[0] === rgb1[0] && rgb[1] === rgb1[1] && rgb[2] === rgb1[2]);

    let rgb_hex = chroma.rgb(rgb[0], rgb[1], rgb[2]).hex();
    let lch_hex = chroma.lch(lch[0], lch[1], lch[2]).hex();

    console.log('=====');
    console.log('RGB hex: ', rgb_hex);
    console.log('LCH hex: ', lch_hex);

    let rgb_hex2 = hex_from_rgb(rgb);
    let lch_hex2 = hex_from_rgb(rgb1);

    console.log('=====');
    console.log('my RGB hex: ', rgb_hex2);
    console.log('my LCH hex: ', lch_hex2);

    console.log('=====');
    let scale = color_scale(rgb, rgb2, 3);
    console.log('RGB1: ', rgb);
    console.log('RGB2: ', rgb2);
    console.log('Scale: ', scale);
  }
}
