const canvas = document.getElementById("canvas1");

const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let gradient = ctx.createRadialGradient(canvas.width/2, canvas.height/2, 100, canvas.width/2, canvas.height/2, canvas.width/2);

gradient.addColorStop(0, 'red')
gradient.addColorStop(0.5, 'cyan')
gradient.addColorStop(1, 'magenta')


class Symbol {
  constructor(x, y, fontSize, canvasHeight){
    this.characters = '001001011001011010101010101010101010101010101010101010010101010100101010101010010101010101111001010100101010101010010101010101010010101010011001010100101010101001010100110';this.x = x;
    this.y = y;
    this.fontSize = fontSize;
    this.text = '';
    this.canvasHeight = canvasHeight;    
  }

  draw(context){
      this.text = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
      context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);
      if(this.y * this.fontSize > this.canvasHeight && Math.random() > 0.98){
        this.y = 0;
      }else{
        this.y += 1;
      }
  }
}

class Effect{
  constructor(canvasWidth, canvasHeight){
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.fontSize = 25;
    this.columns = this.canvasWidth/this.fontSize;
    this.symbols = [];
    this.#initialize();
    console.log(this.symbols);
  }
  #initialize(){
    for(let i = 0; i < this.columns; i++){
      this.symbols[i] = new Symbol(i, 0, this.fontSize,this.canvasHeight);
    }
  }

  resize(width, height){
    this.canvasHeight = height;
    this.canvasWidth = width;
    this.columns = this.canvasWidth/this.fontSize;
    this.symbols = [];
    this.#initialize();
  }
}

const effect = new Effect(canvas.width, canvas.height);
let lastTime = 0;
const fps = 160;
const nextFrame = 1000/fps;
let timer = 0;

function animate(timeStamp){
  const deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;
  if(timer > nextFrame){
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.textAlign = 'center';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = gradient;//'#0aff0a';
    ctx.font = effect.fontSize + 'px monospace';
    effect.symbols.forEach(symbol => symbol.draw(ctx));
    timer = 0;
  }else{
    timer += deltaTime;
  }
    
    requestAnimationFrame(animate);
}

animate(0);

window.addEventListener('resize' , function(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  effect.resize(canvas.width,canvas.height);
  gradient = ctx.createRadialGradient(canvas.width/2, canvas.height/2, 100, canvas.width/2, canvas.height/2, canvas.width/2);

  gradient.addColorStop(0, 'red')
  gradient.addColorStop(0.5, 'cyan')
  gradient.addColorStop(1, 'magenta')
})