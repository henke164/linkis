import { Dimensions } from 'react-native';
import {Image as RNimage} from 'react-native';
import Canvas, {Image} from 'react-native-canvas';
import wheelImage from '../images/neonlight_wheel.png';

const size = Dimensions.get('window').width;

const colors = ["#63FFBF", 
  "#F591BC", "#68CAF2",
  "#F591BC", "#68CAF2",
  "#F591BC", "#68CAF2",
  "#F591BC", "#68CAF2",
  "#F591BC", "#68CAF2",
  "#F591BC", "#68CAF2",
  "#F591BC", "#68CAF2",
  "#F591BC", "#68CAF2",
  "#F591BC", "#68CAF2",
  "#F591BC", "#68CAF2",
  "#F591BC", "#68CAF2",
  "#F591BC", "#68CAF2",
  "#F591BC", "#68CAF2",
  "#F591BC", "#68CAF2",
  "#F591BC", "#68CAF2",
  "#F591BC", "#68CAF2",
  "#F591BC", "#68CAF2",
  "#F591BC", "#68CAF2"];

const numbers = [0, 32, 15, 19, 4, 21, 2, 25, 17, 23, 6, 27, 13, 36, 11, 30, 8, 
  23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26];

function drawPredictions({ctx, insideRadius, angle, spinTypes, number, predictedNumbers}) {
  const magicSize = (size / 2) - ((size / 100));
  let count = 0.5;

  for (let i = 0; i < predictedNumbers.length; i++) {
    if (predictedNumbers[i].number !== number){
      continue;
    }

    ctx.beginPath();
    count += 0.6;
    let center = 0.1;
    
    const x = magicSize + Math.cos(angle + center) * (insideRadius - 7);
    const y = magicSize + Math.sin(angle + center) * (insideRadius - 7);

    const { color, textColor } = spinTypes.find(g => g.value === predictedNumbers[i].color);
    ctx.strokeStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = 5;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.lineWidth = count;

    ctx.moveTo(magicSize, magicSize);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.save();
    ctx.restore();
  }
}

async function drawWheel(canvas, spinTypes, predictedNumbers) {

  var arc = Math.PI / 18.5;
  
  var startAngle = 4.62;
  if (!canvas || !canvas.getContext) {
    return;
  }

  var outsideRadius = (size / 2) - 10;
  var textRadius = outsideRadius - 25;
  var insideRadius = outsideRadius - 40;

  const ctx = canvas.getContext("2d");
  canvas.width = size;
  canvas.height = size;
  ctx.clearRect(0, 0, size, size);

  const image = new Image(canvas, size, size);
  image.src = RNimage.resolveAssetSource(wheelImage).uri;
  image.addEventListener('load', () => {
    ctx.drawImage(image, 0, 0, size, size);

    ctx.font = 'bold 16px Helvetica, Arial';

    const halfWidth = size / 2;

    for (var i = 0; i < 37; i++) {
      const text = numbers[i];
      var angle = startAngle + i * arc;

      /*ctx.strokeStyle = colors[i];
      ctx.lineWidth = 0.1;
    
      ctx.fillStyle = "#1E2541";
      ctx.shadowColor = colors[i];
      ctx.shadowBlur = 4;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;

      ctx.beginPath();
      //ctx.arc(halfWidth, halfWidth, outsideRadius, angle, angle + arc, false);
      ctx.strokeStyle = "#1E2541";
      ctx.lineWidth = 2;
      ctx.style
      ctx.arc(halfWidth, halfWidth, insideRadius, angle + arc, angle, true);
      ctx.stroke();
      ctx.fill();
      ctx.save();

      ctx.fillStyle = colors[i];
      ctx.translate(halfWidth + Math.cos(angle + arc / 2) * textRadius, 
        halfWidth + Math.sin(angle + arc / 2) * textRadius);

      ctx.rotate(angle + arc / 2 + Math.PI / 2);

      const textMeasure = await ctx.measureText(text);
      ctx.fillText(text, -(textMeasure.width / 2), 0);
      ctx.restore();
      */
      drawPredictions({
        ctx,
        insideRadius,
        angle,
        spinTypes,
        number: text,
        predictedNumbers
      });
    }
  });
}

module.exports = {
  drawWheel,
};