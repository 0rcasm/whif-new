const sample=[
{id:"1",name:"백무월",author:"@moamoa",desc:"요지, 내 안경...",thumb:"https://via.placeholder.com/300x400",grade:"rookie"},
{id:"2",name:"김무영",author:"@Lusolaine",desc:"10년 넘게 함께...",thumb:"https://via.placeholder.com/300x400",grade:"prime"}
];

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
</div>
`;
}

function render(){
sample.forEach(c=>{
document.querySelector(`#${c.grade} .grid`).innerHTML+=makeCard(c);
});
}

function go(id){
window.open(`https://www.whif.io/character/${id}`);
}

render();