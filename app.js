async function load(){

const res = await fetch("https://solitary-pond-ed0b.descen7.workers.dev/");
const data = await res.json();

data.characters.forEach(c=>{

const card = {
 id:c.id,
 name:c.name,
 author:"@"+(c.creator?.username || "unknown"),
 desc:c.description || "",
 thumb:c.thumbnail || "https://via.placeholder.com/300x400",
 grade:"newbie"
};

document.querySelector(`#newbie .grid`)
.innerHTML += makeCard(card);

});
}

load();
