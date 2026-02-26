const WORKER_URL = "https://solitary-pond-ed0b.descen7.workers.dev"; //

function makeCard(c){
  return `
  <div class="card" onclick="go('${c.id}')">
    <img class="thumb" src="${c.thumb}" />
    <div class="info">
      <div class="name">${c.name}</div>
      <div class="author">${c.author}</div>
      <div class="desc">${c.desc}</div>
      <div class="badge ${c.grade}">
        ${c.grade.toUpperCase()}
      </div>
    </div>
  </div>`;
}

function go(id){
  window.open(`https://www.whif.io/character/${id}`);
}

async function load(){

  try{

    const res = await fetch(WORKER_URL);
    const data = await res.json();

    data.characters.forEach(c=>{

      const card = {
        id: c.id,
        name: c.name,
        author: "@"+(c.creator?.username || "unknown"),
        desc: c.description || "",
        thumb: c.avatarUrl
  ? (c.avatarUrl.startsWith("http") ? c.avatarUrl : "https://" + c.avatarUrl)
  : "https://via.placeholder.com/300x400",
        grade: "newbie"
      };

      document.querySelector(`#newbie .grid`)
      .innerHTML += makeCard(card);

    });

  }catch(e){
    document.body.innerHTML += "<p>불러오기 실패</p>";
    console.error(e);
  }
}

load();



