async function getStatus() {
  const r = await fetch('/api/status');
  const d = await r.json();
  document.getElementById('status').innerText = d.status;
}

async function loadChat() {
  const r = await fetch('/api/chat');
  const d = await r.json();
  document.getElementById('chat').innerHTML = d.map(m => '👤 ' + m).join('<br>');
}

async function sendMsg() {
  const msg = document.getElementById('msg').value;

  await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ msg })
  });

  document.getElementById('msg').value = '';
  loadChat();
}

async function cmd(c) {
  await fetch('/admin/cmd', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cmd: c })
  });

  getStatus();
}

setInterval(() => {
  getStatus();
  loadChat();
}, 2000);

getStatus();
loadChat();