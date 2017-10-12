input=document.getElementById("exercisematerial");
input.addEventListener("keypress", enter);
material=document.getElementById("materialintroduced");


function enter(e){
    tecla = e.keyCode;
    if (tecla==13) {
        //Añadir con fondo de etiqueta lo qque haya introducido
        mat=document.createElement("div");
        mat.innerHTML=input.value;
        mat.setAttribute("class","material");
        img=document.createElement("img");
        img.setAttribute("src","images/etiqueta.png");
        img.setAttribute("heigth","15px");
        img.setAttribute("width","15px");
        img.setAttribute("align", "left");
        material.appendChild(img);
        material.appendChild(mat);
    };

} 
      

