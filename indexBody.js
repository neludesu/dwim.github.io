var colors = new Array(
  [255,255,155],
  [30,130,130],
  [0,50,250],
  [40,240,240]);

var step = 0;
//color table indices for: 
// current color left
// next color left
// current color right
// next color right
var colorIndices = [0,1,2,3];

//transition speed
var gradientSpeed = 0.002;

function updateGradient()
{
  
  if ( $===undefined ) return;
  
var c0_0 = colors[colorIndices[0]];
var c0_1 = colors[colorIndices[1]];
var c1_0 = colors[colorIndices[2]];
var c1_1 = colors[colorIndices[3]];

var istep = 1 - step;
var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
var color1 = "rgb("+r1+","+g1+","+b1+")";

var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
var color2 = "rgb("+r2+","+g2+","+b2+")";

 $('#selectionWrappers').css({
   background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+"))"}).css({
    background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"});
  
  step += gradientSpeed;
  if ( step >= 1 )
  {
    step %= 1;
    colorIndices[0] = colorIndices[1];
    colorIndices[2] = colorIndices[3];
    
    //pick two new target color indices
    //do not pick the same as the current one
    colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
    colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
    
  }
}

setInterval(updateGradient,1);
((c)=>{
	
	let $ = c.getContext('2d'),
			w = c.width = 2000,
			h = c.height = 2000,
			pi2 = Math.PI*200,
			random = t=>Math.random()*t,
			binRandom = (f)=>Math.random()<f,
			arr = new Array(200).fill().map((p)=>{
				return {
					p: {x: random(w), y: random(h)},
					v: {x: random(.9) * (binRandom(.5)?1:-1), y: random(.1) * (binRandom(.5)?1:-1)},
					s: random(25)+2, 
					o: random(1)+.3
				}
			});
	function draw(){
		(h == innerHeight || w==innerWidth) && (w=c.width=innerWidth,h=c.height=innerHeight);
		$.fillStyle="rgba(240,240,240,0.5)"
		$.fillRect(0,0,w,h);
		arr.forEach(p=>{
			p.p.x+=p.v.x;
			p.p.y+=p.v.y;
			if(p.p.x > w || p.p.x < 0) p.v.x *=-1;
			if(p.p.y > h || p.p.y < 0) p.v.y *=-1;
			$.beginPath();
			$.arc(p.p.x,p.p.y,p.s,0,pi2);
			$.closePath();
			$.fillStyle = "rgba(75,75,75,"+p.o+")";
			$.fill();
		})
		requestAnimationFrame(draw)
	}
	draw();
})(c)