(()=>{
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let w = canvas.width = innerWidth;
  let h = canvas.height = innerHeight;

  const DPR = Math.min(2, window.devicePixelRatio || 1);
  canvas.width = w * DPR; canvas.height = h * DPR; canvas.style.width = w + 'px'; canvas.style.height = h + 'px'; ctx.scale(DPR, DPR);

  const particles = [];
  const COUNT = Math.round((w*h)/5000); // density scaling

  function rand(min,max){return Math.random()*(max-min)+min}

  for(let i=0;i<COUNT;i++){
    particles.push({
      x:Math.random()*w,
      y:Math.random()*h,
      r:rand(0.6,2.2),
      a:rand(0.02,0.12),
      vx:rand(-0.15,0.15),
      vy:rand(-0.05,0.05)
    })
  }

  function step(){
    ctx.clearRect(0,0,w,h);
    for(const p of particles){
      p.x += p.vx; p.y += p.vy;
      p.x += Math.sin(performance.now()*0.0002 + p.a) * 0.15;
      if(p.x < -20) p.x = w + 20;
      if(p.x > w +20) p.x = -20;
      if(p.y < -20) p.y = h + 20;
      if(p.y > h +20) p.y = -20;

      ctx.beginPath();
      ctx.globalAlpha = 0.6 * (p.r/2.2);
      ctx.fillStyle = 'rgba(200,210,255,0.6)';
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fill();
    }
    requestAnimationFrame(step);
  }
  step();

  window.addEventListener('resize', ()=>{
    w = canvas.width = innerWidth; h = canvas.height = innerHeight;
    canvas.width = w * DPR; canvas.height = h * DPR; canvas.style.width = w + 'px'; canvas.style.height = h + 'px'; ctx.scale(DPR, DPR);
  });

  // Small accessibility: allow keyboard adding
  //addBtn.addEventListener('keydown', (e)=>{ if(e.key === 'Enter' || e.key === ' ') addBtn.click(); });
  
  // buttons logic
  const buttons = document.querySelectorAll('.gdps-button');
  const links = [
  "https://momentum.ps.fhgdps.com/dashboard/",
  "https://your-gdps.com/lists",
  "https://github.com/ItzCraft/momentumgdps ",
  "https://discord.gg/TwCBCv7Wqj",
  "https://youtube.com/@momentumgdps?si=M5sR5i5KjM_-dgXX",
  "https://your-gdps.com/download"
  ];
  
  buttons.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      window.open(links[i], "_blank");
    });
  });
})();
