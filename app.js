const WORKER_URL = "https://solitary-pond-ed0b.descen7.workers.dev"; // 

function makeCard(c){
  const badgeText =
    c.grade === "prime" ? "PRIME" :
    c.grade === "rookie" ? "ROOKIE" : "NEWBIE";

  return `
  <div class="card" onclick="go('${c.id}')">
    <img class="thumb" src="${c.thumb || "https://via.placeholder.com/300x400"}" />
    <div class="info">
      <div class="name">${escapeHtml(c.name || "")}</div>
      <div class="author">${escapeHtml(c.author || "")}</div>
      <div class="desc">${escapeHtml(c.desc || "")}</div>
      <div class="badge ${c.grade || "newbie"}">${badgeText}</div>
    </div>
  </div>`;
}

function go(id){
  window.open(`https://www.whif.io/character/${id}`);
}

function escapeHtml(s){
  return String(s).replace(/[&<>"']/g, m => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
  }[m]));
}

async function load(){
  // 로딩 표시
  document.querySelector("#prime .grid").innerHTML = "";
  document.querySelector("#rookie .grid").innerHTML = "";
  document.querySelector("#newbie .grid").innerHTML = "";

  try{
    const res = await fetch(WORKER_URL, { method: "GET" });

    if(!res.ok){
      throw new Error(`Worker HTTP ${res.status}`);
    }

    const data = await res.json();

    // data.characters가 맞는지 안전 처리
    const list = Array.isArray(data.characters) ? data.characters : [];
    if(list.length === 0){
      throw new Error("characters가 비어있거나 응답 형식이 달라요");
    }

    // 등급은 일단 newbie로(다음 단계에서 아이콘/필드로 분류 붙임)
    for(const c of list){
      const card = {
        id: c.id,
        name: c.name,
        author: c.creator?.username ? `@${c.creator.username}` : (c.author ? `@${c.author}` : "@unknown"),
        desc: c.description || c.desc || "",
        thumb: c.thumbnail || c.thumb || "",
        grade: "newbie"
      };

      document.querySelector(`#${card.grade} .grid`).innerHTML += makeCard(card);
    }
  }catch(e){
    // 화면에 에러 표시
    const msg = document.createElement("div");
    msg.style.padding = "12px";
    msg.style.background = "#2a2d44";
    msg.style.borderRadius = "12px";
    msg.style.marginTop = "12px";
    msg.textContent = `불러오기 실패: ${e.message}`;
    document.body.prepend(msg);
    console.error(e);
  }
}

load();
