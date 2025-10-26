document.addEventListener('DOMContentLoaded',function(){
  // Load posts (static: display sample post)
  const postsDiv = document.getElementById('news-list') || document.getElementById('posts');
  if(postsDiv){
    postsDiv.innerHTML = '<div class="card mb-2"><div class="card-body"><h5>Pembukaan Tahun Ajaran Baru 2025</h5><small>01 Jul 2025</small><p>MAS TAHFIDZ ROKAN HULU resmi membuka tahun ajaran 2025...</p></div></div>';
  }

  // small stats on home
  const statsSmall = document.getElementById('stats-small');
  if(statsSmall){
    const st = {santri:120,guru:12,program:6,alumni:45};
    statsSmall.innerHTML = '<ul class="list-unstyled mb-0"><li>Santri: '+st.santri+'</li><li>Guru: '+st.guru+'</li><li>Program: '+st.program+'</li><li>Alumni: '+st.alumni+'</li></ul>';
  }
  // update stats page
  const statSantri = document.getElementById('stat-santri');
  if(statSantri) statSantri.textContent = 120;
  const statGuru = document.getElementById('stat-guru');
  if(statGuru) statGuru.textContent = 12;
  const statProgram = document.getElementById('stat-program');
  if(statProgram) statProgram.textContent = 6;
  const statAlumni = document.getElementById('stat-alumni');
  if(statAlumni) statAlumni.textContent = 45;

  // Alumni management via localStorage
  const alumniForm = document.getElementById('alumni-form');
  const alumniTableBody = document.querySelector('#alumni-table tbody');
  function loadAlumni(){
    const data = JSON.parse(localStorage.getItem('mastahf_alumni')||'[]');
    alumniTableBody.innerHTML = data.map(a=>'<tr><td>'+a.name+'</td><td>'+a.year+'</td><td>'+a.job+'</td></tr>').join('');
  }
  if(alumniForm){
    alumniForm.addEventListener('submit',function(e){
      e.preventDefault();
      const name = document.getElementById('alumni-name').value.trim();
      const year = document.getElementById('alumni-year').value.trim();
      const job = document.getElementById('alumni-job').value.trim();
      if(!name||!year) return alert('Nama dan tahun lulus wajib');
      const data = JSON.parse(localStorage.getItem('mastahf_alumni')||'[]');
      data.push({name,year,job});
      localStorage.setItem('mastahf_alumni',JSON.stringify(data));
      loadAlumni();
      alumniForm.reset();
      alert('Alumni ditambahkan (tersimpan di browser). Untuk menyimpan permanen, ekspor JSON dan masukkan ke /data/alumni.json di repo.');
    });
    loadAlumni();
    const exportBtn = document.getElementById('export-alumni');
    if(exportBtn){
      exportBtn.addEventListener('click',function(){
        const data = localStorage.getItem('mastahf_alumni')||'[]';
        const blob = new Blob([data],{type:'application/json'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download='alumni.json'; a.click();
        URL.revokeObjectURL(url);
      });
    }
  }

  // Testimonials
  const testiForm = document.getElementById('testi-form');
  const testiList = document.getElementById('testi-list');
  function loadTesti(){
    const data = JSON.parse(localStorage.getItem('mastahf_testi')||'[]');
    if(testiList) testiList.innerHTML = data.map(t=>'<div class="col-md-6"><div class="card p-3 mb-2"><strong>'+t.name+'</strong><p>'+t.content+'</p></div></div>').join('');
  }
  if(testiForm){
    testiForm.addEventListener('submit',function(e){
      e.preventDefault();
      const name = document.getElementById('testi-name').value.trim()||'Anonim';
      const content = document.getElementById('testi-content').value.trim();
      if(!content) return alert('Isi testimoni kosong');
      const data = JSON.parse(localStorage.getItem('mastahf_testi')||'[]');
      data.push({name,content});
      localStorage.setItem('mastahf_testi',JSON.stringify(data));
      testiForm.reset();
      loadTesti();
      alert('Testimoni ditambahkan (tersimpan di browser).');
    });
    loadTesti();
  }

});
