$(document).ready(function () {
    let callData = new CallData();

    callData.getDaTa()
        .done((res) => {
            console.log(res);
            let ulNavPill = "";
            let content = "";
            res.navPills.forEach((item, index) => {
                let activeClass = (item.tabName === "tabTopClothes") ? "active" : "";
                let fadeClass = (item.tabName === "tabTopClothes") ? "" : "fade";
                ulNavPill += getEleNavPill(item, activeClass);
                content += `
                <div class="tab-pane container ${activeClass} ${fadeClass} " id="${item.tabName}">
                <div class="container">
                <div class="row">
                ${rederTabName(item.type, res.tabPanes)}
                </div>
                </div>

                </div>
                `

            });
            $(".nav-pills").html(ulNavPill);


            $(".tab-content").html(content);
        })
        .fail((err) => {
            console.log(err);
        });
})


function getEleNavPill(item, activeClass) {
    return `
            <li class="nav-item">
            <a class="nav-link ${activeClass}"data-toggle="pill" href="#${item.tabName}">${item.showName}</a>
          </li>
              `;
}


function getTypeArray(type, ArrayDaTa) {
    let array = [];

    ArrayDaTa.forEach((item, index) => {
        if (item.type === type) {
            array.push(item);
        }
    })
    return array;
}

function rederTabName(tabName, arrayTabPane) {
    let mang = null;
    let eleItem=null;
    switch (tabName) {
        case "topclothes":
            mang = getTypeArray("topclothes", arrayTabPane);
            eleItem= getEleItem(mang);
            break;
        case "botclothes":
            mang = getTypeArray( "botclothes", arrayTabPane);
            eleItem= getEleItem(mang);
            break;

        case "shoes":
            mang = getTypeArray( "shoes", arrayTabPane);
            eleItem= getEleItem(mang);
            break;

        case "handbags":
            mang = getTypeArray("handbags", arrayTabPane);
            eleItem= getEleItem(mang);
            break;

        case "necklaces":
            mang = getTypeArray("necklaces", arrayTabPane);
            eleItem= getEleItem(mang);
            break;

        case "hairstyle":
            mang = getTypeArray("hairstyle", arrayTabPane);
            eleItem= getEleItem(mang);
            break;

        case "background":
            mang = getTypeArray("background", arrayTabPane);
            eleItem= getEleItem(mang);
            break;
    }
   return eleItem;
}


function getEleItem(mang){
    let content="";
    mang.forEach((item)=>{
        content+=`
       
          <div class="col-md-3">
            <div class="card text-center">
              <img class="img-fuild" src="${item.imgSrc_jpg}" alt="">
              <h4><b>${item.name}</b></h4>
              <button data-id="${item.id}" data-type="${item.type}"  data-name="${item.name}" data-desc="${item.desc}" data-imgsrcjpg="${item.imgSrc_jpg}" data-imgsrcpng="${item.imgSrc_png}"  class="changeStyle"> Thử dồ</button>
            </div>
          </div>
       
        `
    });
    return content;
}

//
function findIndex(type){
    let viTri=-1;
    if(listChosen.listChose&&listChosen.listChose.length>0){
        listChosen.listChose.forEach(function(item,index){
            if(item.type===type)
            {
                viTri=index;
            }
        })
    }
    return viTri;
}

let listChosen=new ListChosen();
$("body")
.delegate(".changeStyle","click",function(){
  let id=$(this).data("id");
  let type=$(this).data("type");
  let name=$(this).data("name");
  let desc=$(this).data("desc");
  let imgSrc_jpg=$(this).data("imgsrcjpg");
  let imgSrc_png=$(this).data("imgsrcpng");


  let choseItem=new ChoseItem(id,type,name,desc,imgSrc_jpg,imgSrc_png);
  console.log(choseItem);  
  var index=findIndex(choseItem.type);
  console.log(index);
    if(index!==-1)
    {
        // UPDATE
        listChosen.listChose[index]=choseItem;
    }else{
        // ADD
        listChosen.addChose(choseItem);
    }

    console.log(listChosen.listChose);
    renderContain(listChosen.listChose);
})


function renderContain(choseItem){
    if(choseItem&&choseItem.length>0)
    {   

        choseItem.forEach(function(item){
           if(item.type==="topclothes"){
             renderBiKiNiTop(item.imgPNG);
           }
           if(item.type==="botclothes")
           {    
            renderBiKiNiBot(item.imgPNG);
           }

           if(item.type==="shoes"){
            renderShoe(item.imgPNG);
           }

           if(item.type==="handbags")
           {
            rederHandbags(item.imgPNG);
           }

           if(item.type==="hairstyle")
           {
            renderHair(item.imgPNG);
           }

           if(item.type==="necklaces")
           {
            renderNecklaces(item.imgPNG);
           }

           if(item.type==="background")
           {
            renderBackground(item.imgPNG);
           }
        })
    }
}

function renderBiKiNiTop(img)
{
    $(".bikinitop").css({
        width:"500px",
        height:"500px",
        background:`url(${img})`,
        position:"absolute",
        top:"-9%",
        left:"-5%",
        zIndex:"3",
        transform:"scale(0.5)"
    });
}

function renderBiKiNiBot(img)
{
    $(".bikinibottom").css({
        width:"500px",
        height:"1000px",
        background:`url(${img})`,
        position:"absolute",
        top:"-30%",
        left:"-5%",
        zIndex:"2",
        transform:"scale(0.5)"
    });
    
}

function renderShoe(img)
{
    $(".feet").css({
        width:"500px",
        height:"1000px",
        background:`url(${img})`,
        position:"absolute",
        top:"-31%",
        left:"-4.8%",
        zIndex:"1",
        transform:"scale(0.5)"
    });
}

function rederHandbags(img)
{
    $(".handbag").css({
        width:"500px",
        height:"1000px",
        background:`url(${img})`,
        position:"absolute",
        top:"-40%",
        left:"-3.5%",
        zIndex:"4",
        transform:"scale(0.5)"
    });
}

function renderHair(img)
{
    $(".hairstyle").css({
        width:"1000px",
        height:"1000px",
        background:`url(${img})`,
        position:"absolute",
        top:"-75%",
        left:"-60%",
        zIndex:"4",
        transform:"scale(0.15)"
    });
}

function  renderNecklaces(img){
    $(".necklace").css({
        width:"500px",
        height:"1000px",
        background:`url(${img})`,
        position:"absolute",
        top:"-32%",
        left:"-5.5%",
        zIndex:"4",
        transform:"scale(0.5)"
    });
}

function renderBackground(img){
    $(".background").css({
        backgroundImage:`url(${img})`
    });
}