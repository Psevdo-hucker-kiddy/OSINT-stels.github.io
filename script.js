// ====== Баланс ======
let balance = 0;
const moneyEl = document.getElementById("money");
moneyEl.innerText = "💰 " + balance;

// ====== Вкладки ======
function openTab(tabId) {
  document.querySelectorAll(".page").forEach(p=>p.style.display="none");
  document.getElementById(tabId).style.display="block";
  if(tabId==="market") showShop();
  if(tabId==="missions") showMissions();
  if(tabId==="graphPage") drawGraph();
}

// ====== Магазин ======
const tools=[
  {id:"relativesTool",name:"Родственники",price:1000,unlocked:false},
  {id:"friendsTool",name:"Друзья",price:1000,unlocked:false},
  {id:"colleaguesTool",name:"Коллеги",price:1000,unlocked:false},
];

function showShop(){
  const shopEl=document.getElementById("market");
  shopEl.innerHTML="<h3>Магазин инструментов</h3>";
  tools.forEach(tool=>{
    shopEl.innerHTML+=`<button ${balance>=tool.price&&!tool.unlocked?"":"disabled"}
      onclick="buyTool('${tool.id}')">${tool.name} — ${tool.price}💰 ${tool.unlocked?"(куплено)":""}</button><br>`;
  });
}

function buyTool(id){
  let tool=tools.find(t=>t.id===id);
  if(balance>=tool.price&&!tool.unlocked){
    balance-=tool.price;
    tool.unlocked=true;
    moneyEl.innerText="💰 "+balance;
    showShop();
    alert("Вы купили: "+tool.name+" в Stels OSINT!");
  } else alert("Недостаточно денег или инструмент уже куплен");
}

// ====== Миссии ======
const missionsQueue=[
  {id:1,text:"Найти ФИО по телефону",completed:false,reward:500},
  {id:2,text:"Найти родственников по email",completed:false,reward:700},
  {id:3,text:"Найти коллег по городу",completed:false,reward:600},
  {id:4,text:"Найти пользователя по IP",completed:false,reward:400},
  {id:5,text:"Найти все устройства пользователя",completed:false,reward:800},
];

function showMissions(){
  const missionsEl=document.getElementById("missions");
  missionsEl.innerHTML="<h3>Миссии</h3>";
  missionsQueue.forEach(m=>{
    missionsEl.innerHTML+=`<div class="mission">
      <b>${m.text}</b> — ${m.completed?"✅ Выполнено":"❌ Не выполнено"}
      ${!m.completed?`<button onclick="completeMission(${m.id})">Выполнить</button>`:""}
    </div>`;
  });
}

function completeMission(id){
  let m=missionsQueue.find(x=>x.id===id);
  if(m&&!m.completed){
    m.completed=true;
    balance+=m.reward;
    moneyEl.innerText="💰 "+balance;
    showMissions();
    alert(`Миссия выполнена! +${m.reward}💰 в Stels OSINT`);
  }
}

// ====== Пользователи (50) ======
const firstNamesCommon=["Александр","Дмитрий","Илья","Максим","Егор","Сергей","Елена"];
const firstNamesUnique=["Никита","Виктория","Мария","Лев"];
const lastNames=["Иванов","Смирнов","Кузнецов","Попов","Соколов","Карасев","Громов","Морозов"];
const middleNames=["Александрович","Дмитриевич","Ильич","Сергеевич"];
const cities=["Москва","Арзамас","Новосибирск","Челябинск","Уфа","Санкт-Петербург","Минск","Киев","Баку","Тбилиси"];
const jobs=["Программист","Менеджер","Студент","Инженер","Дизайнер"];
const nationalities=["Русский","Украинец","Белорус","Армянин","Грузин"];
const osVersions=["Android 13","Android 12","iOS 17","iOS 16"];
const phoneModels=["Samsung S22","iPhone 14","Xiaomi 13","Huawei P50"];
const devices=["Ноутбук","Планшет","ПК","Смартфон"];

const database=[];
for(let i=1;i<=50;i++){
  let fname = i<=46 ? firstNamesCommon[Math.floor(Math.random()*firstNamesCommon.length)]
                     : firstNamesUnique[i-46];
  let lname = lastNames[Math.floor(Math.random()*lastNames.length)];
  let mname = middleNames[Math.floor(Math.random()*middleNames.length)];
  let year=1980+Math.floor(Math.random()*30);
  let month=1+Math.floor(Math.random()*12);
  let day=1+Math.floor(Math.random()*28);
  let birth=`${day.toString().padStart(2,"0")}.${month.toString().padStart(2,"0")}.${year}`;
  let city=cities[Math.floor(Math.random()*cities.length)];
  let device1=devices[Math.floor(Math.random()*devices.length)];
  let device2=devices[Math.floor(Math.random()*devices.length)];
  
  let friends=[], colleagues=[], relatives=[];
  for(let j=0;j<3;j++){
    friends.push(1+Math.floor(Math.random()*50));
    colleagues.push(1+Math.floor(Math.random()*50));
    relatives.push(1+Math.floor(Math.random()*50));
  }
  
  database.push({
    id:i,
    fullname:`${lname} ${fname} ${mname}`,
    birth,
    city,
    job:jobs[Math.floor(Math.random()*jobs.length)],
    phone:"+7 7"+Math.floor(100000000+Math.random()*899999999),
    email:`${fname.toLowerCase()}${lname.toLowerCase()}${i}@mail.com`,
    social:`${fname.toLowerCase()}_${lname.toLowerCase()}`,
    nationality:nationalities[Math.floor(Math.random()*nationalities.length)],
    phoneOS:osVersions[Math.floor(Math.random()*osVersions.length)],
    phoneModel:phoneModels[Math.floor(Math.random()*phoneModels.length)],
    ip:`192.168.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}`,
    iin:String(Math.floor(1000000+Math.random()*9000000)),
    passport:"A"+Math.floor(1000000+Math.random()*9000000),
    devices:[device1,device2],
    friends,
    colleagues,
    relatives
  });
}

// ====== Поиск ======
function search(){
  let q=document.getElementById("searchInput").value.toLowerCase();
  const res=document.getElementById("results");
  res.innerHTML="";
  database.forEach(p=>{
    let data=(p.fullname+p.phone+p.email+p.city+p.passport+p.iin).toLowerCase();
    if(data.includes(q)){
      res.innerHTML+=`<div class="card">
        <b>${p.fullname}</b><br>${p.city}<br>
        <button onclick="openProfile(${p.id})">Открыть профиль</button>
      </div>`;
    }
  });
}

// ====== Профиль ======
function openProfile(id){
  let p=database.find(x=>x.id===id);
  const res=document.getElementById("results");
  res.innerHTML=`<div class="card">
    <h3>${p.fullname}</h3>
    <p>Дата рождения: ${p.birth}</p>
    <p>Город: ${p.city}</p>
    <p>Работа: ${p.job}</p>
    <p>Телефон: ${p.phone}</p>
    <p>Email: ${p.email}</p>
    <p>Соцсеть: ${p.social}</p>
    <p>Национальность: ${p.nationality}</p>
    <p>OS телефона: ${p.phoneOS}</p>
    <p>Модель телефона: ${p.phoneModel}</p>
    <p>IP: ${p.ip}</p>
    <p>ИИН: ${p.iin}</p>
    <p>Паспорт: ${p.passport}</p>
    <p>Устройства: ${p.devices.join(", ")}</p>
    <p>
      Родственники: ${p.relatives.map(id=>database.find(x=>x.id===id).fullname).join(", ")}<br>
      Друзья: ${p.friends.map(id=>database.find(x=>x.id===id).fullname).join(", ")}<br>
      Коллеги: ${p.colleagues.map(id=>database.find(x=>x.id===id).fullname).join(", ")}
    </p>
    <button onclick='search()'>Назад</button>
  </div>`;
}

// ====== Граф BlackBird ======
function drawGraph(){
  const canvas=document.getElementById("graphCanvas");
  const ctx=canvas.getContext("2d");
  ctx.clearRect(0,0,canvas.width,canvas.height);
  
  const positions=[];
  database.forEach((p,i)=>{
    let angle=i*(Math.PI*2/database.length);
    let radius=Math.min(canvas.width,canvas.height)/2.5;
    let x=canvas.width/2 + Math.cos(angle)*radius + (Math.random()*20-10);
    let y=canvas.height/2 + Math.sin(angle)*radius + (Math.random()*20-10);
    positions.push({id:p.id,x,y});
  });
  
  database.forEach(p=>{
    const pos=positions.find(pos=>pos.id===p.id);
    const drawLine=(ids,color)=>{
      ctx.strokeStyle=color;
      ctx.lineWidth=1;
      ids.forEach(relId=>{
        const relPos=positions.find(x=>x.id===relId);
        if(relPos){
          ctx.beginPath();
          ctx.moveTo(pos.x,pos.y);
          ctx.lineTo(relPos.x,relPos.y);
          ctx.stroke();
        }
      });
    };
    drawLine(p.relatives,"red");
    drawLine(p.friends,"blue");
    drawLine(p.colleagues,"yellow");
  });
  
  positions.forEach(pos=>{
    const p=database.find(x=>x.id===pos.id);
    ctx.fillStyle="#0f0";
    ctx.beginPath();
    ctx.arc(pos.x,pos.y,6,0,2*Math.PI);
    ctx.fill();
    ctx.fillStyle="#fff";
    ctx.font="10px monospace";
    ctx.fillText(p.fullname.split(" ")[0],pos.x+7,pos.y+3);
  });
  
  canvas.onclick=function(event){
    const rect=canvas.getBoundingClientRect();
    const x=event.clientX-rect.left;
    const y=event.clientY-rect.top;
    const clicked=positions.find(pos=>Math.hypot(pos.x-x,pos.y-y)<6);
    if(clicked) openProfile(clicked.id);
  };
}

// ====== Инициализация ======
openTab("searchPage");
showShop();
showMissions();
drawGraph();