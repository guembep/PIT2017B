$(document).ready(function() {
  var categorias=[];
  var nomCategorias=[];
  var datos= '[{"id": 39,"deporte": "Baaaasds","idequipo": 1,"categoria": "asdasdasdasd","nombre":"Prueba este ejercicio es genial"},{"id": 39,"deporte": "Baaaasds","idequipo": 1,"categoria": "asdasdasdasd","nombre":"nombre2"},{"id": 39,"deporte": "Baaaasds","idequipo": 1,"categoria": "otra","nombre":"nombre3"}]'
  console.log(datos);
  var ejerEnCat=[];
  var htmlEjer="";
  var info=$.parseJSON(datos);
  console.log(info);
  var first = true;
  var catHTML;
  var active = true;
  var ejerHTML=[];
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
    if (ejerHTML[info[i].categoria] == null){
      if (active){
        active=false;
        ejerEnCat[info[i].categoria]=1;
        console.log(ejerEnCat[info[i].categoria]);
        ejerHTML[info[i].categoria]='<div class="tab-pane active in fade" id="faq-cat-'+(aux-1)+'"> <div class="panel-group" id="accordion-cat-'+(aux-1)+'"> <div class="panel panel-default panel-faq"> <div class="panel-heading"> <a data-toggle="collapse" data-parent="#accordion-cat-'+(aux-1)+'" href="#faq-cat-'+(aux-1)+'-sub-'+ejerEnCat[info[i].categoria]+'"> <h4 id="cat1Ej1" class="panel-title">'+info[i].nombre+'<span class="pull-right"><i class="glyphicon glyphicon-plus"></i></span> </h4> </a> </div> <div id="faq-cat-'+(aux-1)+'-sub-'+ejerEnCat[info[i].categoria]+'" class="panel-collapse collapse"> <div id="body1" class="panel-body"> '+info[i].deporte+' </div> </div> </div>'
      }else{
        ejerEnCat[info[i].categoria]+=1;
        ejerHTML[info[i].categoria]='<div class="tab-pane fade" id="faq-cat-'+(aux-1)+'"> <div class="panel-group" id="accordion-cat-'+(aux-1)+'"> <div class="panel panel-default panel-faq"> <div class="panel-heading"> <a data-toggle="collapse" data-parent="#accordion-cat-'+(aux-1)+'" href="#faq-cat-'+(aux-1)+'-sub-'+ejerEnCat[info[i].categoria]+'"> <h4 id="cat1Ej1" class="panel-title">'+info[i].nombre+'<span class="pull-right"><i class="glyphicon glyphicon-plus"></i></span> </h4> </a> </div> <div id="faq-cat-'+(aux-1)+'-sub-'+ejerEnCat[info[i].categoria]+'" class="panel-collapse collapse"> <div id="body1" class="panel-body"> '+info[i].deporte+' </div> </div> </div>';
      }
    }else{
      ejerEnCat[info[i].categoria]+=1;
      ejerHTML[info[i].categoria]+='<div class="panel panel-default panel-faq"> <div class="panel-heading"> <a data-toggle="collapse" data-parent="#accordion-cat-'+(aux-1)+'" href="#faq-cat-'+(aux-1)+'-sub-'+ejerEnCat[info[i].categoria]+'"> <h4 id="cat1Ej1" class="panel-title">'+info[i].nombre+'<span class="pull-right"><i class="glyphicon glyphicon-plus"></i></span> </h4> </a> </div> <div id="faq-cat-'+(aux-1)+'-sub-'+ejerEnCat[info[i].categoria]+'" class="panel-collapse collapse"> <div id="body1" class="panel-body"> '+info[i].deporte+' </div> </div> </div>'
    }
  });
  console.log(ejerHTML);
  console.log(categorias);
  console.log(catHTML);
  $('.faq-cat-tabs').html(catHTML);
  $.each(ejerHTML,function(i,element2){
    console.log("hola");
    console.log(ejerHTML[info[0].categoria]);

  });
  htmlEjer+=ejerHTML[info[0].categoria];
    htmlEjer+=ejerHTML[info[1].categoria];
  console.log(htmlEjer);
  $('.faq-cat-content').html(htmlEjer);

    $('.collapse').on('show.bs.collapse', function() {
        var id = $(this).attr('id');
        $('a[href="#' + id + '"]').closest('.panel-heading').addClass('active-faq');
        $('a[href="#' + id + '"] .panel-title span').html('<i class="glyphicon glyphicon-minus"></i>');
      //  $('a[href="#' + id + '"]').closest('.panel-heading').closest('.panel-body').html("<h1>Hello</h1>");
        console.log("Hello");
    //    $('#body1').html("<h1></h1>");
    });
    $('.collapse').on('hide.bs.collapse', function() {
        var id = $(this).attr('id');
        $('a[href="#' + id + '"]').closest('.panel-heading').removeClass('active-faq');
        $('a[href="#' + id + '"] .panel-title span').html('<i class="glyphicon glyphicon-plus"></i>');
    });
});
