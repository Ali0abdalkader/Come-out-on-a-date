// التنقل بين الشاشات
function goTo(id) {
  document.querySelectorAll('.step').forEach(s => s.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// زر "Nope" يهرب من الماوس
const nopeBtn = document.getElementById('nopeBtn');
nopeBtn.addEventListener('mouseover', () => {
  const x = Math.random() * (window.innerWidth - 120);
  const y = Math.random() * (window.innerHeight - 60);
  nopeBtn.style.position = 'fixed'; // يتحول إلى fixed فقط عند الهروب
  nopeBtn.style.left = x + 'px';
  nopeBtn.style.top = y + 'px';
  nopeBtn.style.zIndex = '1000';

  const msgs = ['Think harder', 'Are you sure?', 'Really?', 'Last chance...', "C'mon!"];
  nopeBtn.textContent = msgs[Math.floor(Math.random() * msgs.length)];
});

// اختيار الطعام
let selectedFood = 'Italian';
document.querySelectorAll('#foodGrid button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('#foodGrid button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    selectedFood = btn.dataset.food;
  });
});
document.querySelector('#foodGrid button').classList.add('active');

// تأكيد الموعد
function confirmDate() {
  const dateVal = document.getElementById('dateInput').value;
  // إجبار التاريخ على الإنجليزية
document.getElementById('dateInput').setAttribute('lang', 'en');
  const timeVal = document.getElementById('timeInput').value;
  const planVal = document.getElementById('planInput').value;

  const d = new Date(dateVal);
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

  document.getElementById('sumDate').textContent = days[d.getDay()] + ' ' + d.getDate() + ' ' + months[d.getMonth()];
  document.getElementById('sumTime').textContent = timeVal;
  document.getElementById('sumPlan').textContent = planVal;
  document.getElementById('sumFood').textContent = selectedFood + ' 💕';

  goTo('step-done');
  
  launchConfetti();
  
}


// تأثير الكونفيتي
function launchConfetti() {
  const canvas = document.getElementById('confetti');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const pieces = [];
  const colors = ['#c2185b','#e91e63','#f48fb1','#f8bbd0','#ff4081'];

  for (let i = 0; i < 150; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      w: Math.random() * 8 + 4,
      h: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      vy: Math.random() * 3 + 2,
      vx: Math.random() * 2 - 1,
      rot: Math.random() * 360,
      vr: Math.random() * 5 - 2.5
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(p => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot * Math.PI / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w/2, -p.h/2, p.w, p.h);
      ctx.restore();

      p.y += p.vy;
      p.x += p.vx;
      p.rot += p.vr;

      if (p.y > canvas.height) p.y = -10;
    });
    requestAnimationFrame(draw);
  }
  draw();
}