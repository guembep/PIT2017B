var categorias=[];
var datos= '[{"id": 39,"deporte": "Baaaasds","idequipo": 1,"categoria": "asdasdasdasd"},{"id": 39,"deporte": "Baaaasds","idequipo": 1,"categoria": "asdasdasdasd"},{"id": 39,"deporte": "Baaaasds","idequipo": 1,"categoria": "otra"}]'
console.log(datos);
var info=$.parseJSON(datos);
console.log(info);
var first = true;
var catHTML
var aux=1;
$.each(info,function(i,element){
  if ($.inArray(info[i].categoria,categorias)==-1){
    categorias.push(info[i].categoria);
    if (first){
      aux+=1;
      first=false;
      catHTML='<li class="active"><a href="#faq-cat-1" data-toggle="tab">'+info[i].categoria+'</a></li>';
    }else{
      catHTML+='  <li><a href="#faq-cat-'+aux+'" data-toggle="tab">'+info[i].categoria+'</a></li>';
      aux+=1;
    }

  }
});
console.log(categorias);
console.log(catHTML);
