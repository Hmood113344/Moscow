async function load() {
  const res = await fetch('/api/ministries');
  const data = await res.json();
  const list = document.getElementById('list');
  list.innerHTML = '';
  data.forEach(m => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${m.name}</strong> — ${m.description} <a href="/static/ministry.html#${m.id}">عرض</a>`;
    list.appendChild(li);
  });
}

document.getElementById('btn-login').addEventListener('click', async ()=>{
  const username = prompt('اسم المستخدم (تجريبي)');
  if(!username) return;
  const r = await fetch('/api/auth/login', {
    method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({username})
  });
  const j = await r.json();
  alert('تم تسجيل الدخول (تجريبي)\n' + JSON.stringify(j,null,2));
});

document.getElementById('btn-report').addEventListener('click', async ()=>{
  const title = prompt('موضوع البلاغ');
  if(!title) return;
  const r = await fetch('/api/report', {
    method:'POST', headers:{'Content-Type':'application/json'},
    body: JSON.stringify({title, reporter: 'زائر', details: 'تفاصيل تجريبية'})
  });
  const j = await r.json();
  alert('تم إرسال البلاغ:\n' + JSON.stringify(j.report, null, 2));
});

window.addEventListener('load', load);
