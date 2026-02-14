// --------------------
// CANVAS SETUP
// --------------------
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;
let cx = width/2;
let cy = height/2;

window.addEventListener('resize', ()=>{
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    cx = width/2;
    cy = height/2;
});

// --------------------
// CLOCK SETTINGS
// --------------------
let speed = 1;
const timeEl = document.getElementById('current-time');
const dateEl = document.getElementById('current-date');
const centerYearEl = document.getElementById('center-year');

const rings = [
    { name:'Seconds', color:'#ef4444', max:60, radius:50, thickness:4, getValue:d=>d.getSeconds() + d.getMilliseconds()/1000 },
    { name:'Minutes', color:'#f59e0b', max:60, radius:70, thickness:5, getValue:d=>d.getMinutes() + d.getSeconds()/60 },
    { name:'Hours', color:'#06b6d4', max:24, radius:90, thickness:6, getValue:d=>d.getHours() + d.getMinutes()/60 },
    { name:'Day', color:'#10b981', max:7, radius:120, thickness:8, getValue:d=>d.getDay() + d.getHours()/24 },
    { name:'Week', color:'#8b5cf6', max:52, radius:150, thickness:6, getValue:d=>{
        const start = new Date(d.getFullYear(),0,1);
        return Math.floor((d - start)/604800000);
    }},
    { name:'Month', color:'#ec4899', max:12, radius:180, thickness:8, getValue:d=>d.getMonth() + d.getDate()/new Date(d.getFullYear(),d.getMonth()+1,0).getDate() }
];

let simulatedTime = new Date();

// --------------------
// DRAW RINGS
// --------------------
function drawClock(){
    ctx.clearRect(0,0,width,height);
    rings.forEach(r=>{
        const value = r.getValue(simulatedTime);
        ctx.beginPath();
        ctx.arc(cx,cy,r.radius,-Math.PI/2, (value/r.max)*2*Math.PI-Math.PI/2);
        ctx.strokeStyle = r.color;
        ctx.lineWidth = r.thickness;
        ctx.stroke();
    });
}

// --------------------
// ANIMATION LOOP
// --------------------
function animate(){
    simulatedTime = new Date(simulatedTime.getTime() + 1000*speed/60);
    drawClock();
    timeEl.textContent = simulatedTime.toTimeString().split(' ')[0];
    dateEl.textContent = simulatedTime.toDateString();
    centerYearEl.textContent = simulatedTime.getFullYear();
    requestAnimationFrame(animate);
}

animate();

// --------------------
// CONTROLS
// --------------------
document.querySelectorAll('.control-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
        document.querySelectorAll('.control-btn').forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        speed = parseInt(btn.dataset.speed);
    });
});
