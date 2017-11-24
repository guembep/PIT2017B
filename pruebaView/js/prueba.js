$(document).ready(function() {
  var categorias=[];
  var nomCategorias=[];
  var datos;
  var info;
  //var datos= '[{"id": 39,"deporte": "Deporte primera cat","idequipo": 1,"categoria": "Primera Cat","nombre":"Ejercicio 1 cat 1"},{"id": 39,"deporte": "Deporte primera cat","idequipo": 1,"categoria": "Primera Cat","nombre":"Ejercicio 2 cat 1"},{"id": 39,"deporte": "Baaaasds","idequipo": 1,"categoria": "Segunda Cat","nombre":"Ejercicio 1 cat 2"},{"id": 39,"deporte": "Baaaasds","idequipo": 1,"categoria": "Segunda Cat","nombre":"Ejercicio 2 cat 2"},{"id": 39,"deporte": "Baaaasds","idequipo": 1,"categoria": "Tercera Cat","nombre":"Ejercicio 1 cat 3"}]';
  $.ajax({
    url: "../php/cogerejerciciosBD.php",
    success:( function (response) {
        console.log( "La solicitud se ha completado correctamente" );
      /*	var div = document.getElementById("demo");
        div.textContent = data.email;
        data.email;
        data.id;*/
    //    $("#contenido").html("Listado de ejercicios: "+response);
        info=response;
        console.log(info);
        console.log(info);
        var ejerEnCat=[];
        var htmlEjer="";
        //var info=$.parseJSON(datos);
        console.log(info);
        var first = true;
        var catHTML;
        var active = true;
        var ejerHTML=[];
        var aux=0;
        $.each(info,function(i,element){
          if ($.inArray(info[i].categoria,categorias)==-1){
            aux+=1;
            console.log("Es la primera vez que aparece esta categoria y la añado");
            categorias.push(info[i].categoria);
            if (first){
              first=false;
              console.log("Es la primera categoria de todas y añado la linea inicial");
              catHTML='<li class="active mb-4"><a href="#faq-cat-1" data-toggle="tab">'+info[i].categoria+'</a></li>';
            }else{
              console.log("No es la primera categoria de todas asi que añado otra tab");
              catHTML+='  <li class="mb-4"><a href="#faq-cat-'+aux+'" data-toggle="tab">'+info[i].categoria+'</a></li>';
            }
          }// Hasta aqui meto las categorais

          //Aqui empieza a meter los ejercicios dentro de cada categoria
          if (ejerHTML[info[i].categoria] == null){
            if (active){
              active=false;
              ejerEnCat[info[i].categoria]=1;
              console.log(ejerEnCat[info[i].categoria]);
              console.log("valor de aux cuando active es true "+aux);
              console.log("Meto un ejercicio con i="+i+" y el en el if active");
              console.log(info[i].nombre);
              ejerHTML[info[i].categoria]='<div class="tab-pane active in fade" id="faq-cat-'+1+'"> <div class="panel-group" id="accordion-cat-'+1+'"> <div class="panel panel-default panel-faq"> <div class="panel-heading"> <a data-toggle="collapse" data-parent="#accordion-cat-'+1+'" href="#faq-cat-'+1+'-sub-'+ejerEnCat[info[i].categoria]+'"> <h4 id="cat1Ej1" class="panel-title">'+info[i].nombre+'<span class="pull-right"><i class="glyphicon glyphicon-plus"></i></span> </h4> </a> </div> <div id="faq-cat-'+1+'-sub-'+ejerEnCat[info[i].categoria]+'" class="panel-collapse collapse"> <div id="'+info[i].id+'" class="panel-body">'+info[i].explicacion+'</div> </div> </div>';
            }else{
              ejerEnCat[info[i].categoria]+=1;
              console.log("Meto un ejercicio con i="+i+" y el en el else active");
                console.log(info[i].nombre);
              console.log("valor de aux cuando es el primer ejercicio de la categoria "+aux);
              ejerHTML[info[i].categoria]='</div></div><div class="tab-pane fade" id="faq-cat-'+aux+'"> <div class="panel-group" id="accordion-cat-'+aux+'"> <div class="panel panel-default panel-faq"> <div class="panel-heading"> <a data-toggle="collapse" data-parent="#accordion-cat-'+aux+'" href="#faq-cat-'+aux+'-sub-'+ejerEnCat[info[i].categoria]+'"> <h4 id="cat1Ej1" class="panel-title">'+info[i].nombre+'<span class="pull-right"><i class="glyphicon glyphicon-plus"></i></span> </h4> </a> </div> <div id="faq-cat-'+aux+'-sub-'+ejerEnCat[info[i].categoria]+'" class="panel-collapse hello collapse"> <div id="'+info[i].id+'" class="panel-body"> '+info[i].explicacion+' </div> </div> </div>';
            }
          }else{
            ejerEnCat[info[i].categoria]+=1;
            console.log("valor de aux cuando es el segundo+ ejercicio de la categoria "+aux);
              console.log("Meto un ejercicio con i="+i+" y el en else null");
              console.log(info[i].nombre);
            ejerHTML[info[i].categoria]+='<div class="panel panel-default panel-faq"> <div class="panel-heading"> <a data-toggle="collapse" data-parent="#accordion-cat-'+aux+'" href="#faq-cat-'+aux+'-sub-'+ejerEnCat[info[i].categoria]+'"> <h4 id="cat1Ej1" class="panel-title">'+info[i].nombre+'<span class="pull-right"><i class="glyphicon glyphicon-plus"></i></span> </h4> </a> </div> <div id="faq-cat-'+aux+'-sub-'+ejerEnCat[info[i].categoria]+'" class="panel-collapse collapse"> <div id="'+info[i].id+'" class="panel-body"> '+info[i].explicacion+' </div> </div> </div>'
          }

        });
        console.log(ejerHTML);
        console.log(categorias);
        console.log(catHTML);
        $('.faq-cat-tabs').html(catHTML);
        console.log(ejerEnCat);
        console.log(ejerEnCat[categorias[0]]);

        console.log(ejerEnCat[categorias[1]]);
        console.log(Object.keys(ejerHTML).length);

        /*console.log(ejerEnCat[categorias[2]]);
        htmlEjer+=ejerHTML[info[0].categoria];
        console.log("Primera insercion "+htmlEjer);
        //htmlEjer+=ejerHTML[info[1].categoria]; //Esto es lo que da problemas
        console.log("Segunda insercion "+htmlEjer);
        htmlEjer+=ejerHTML[info[2].categoria];
        console.log("Tercera insercion "+htmlEjer);
        htmlEjer+=ejerHTML[info[3].categoria];
        console.log("Cuarta insercion "+htmlEjer);
        */
        /*var first=true
        for (i=0; i<Object.keys(ejerHTML).length;i++){
            console.log("ENTROOOOO");
          if (isNaN(ejerEnCat[i])){
            console.log("Es nan");
            ejerEnCat[i]=0;
          }

          if(first){
            htmlEjer+=ejerHTML[info[i].categoria];
            first=false;
          }else{
          console.log(i+ejerEnCat[i-1]);
          console.log(info[i+ejerEnCat[i-1]]);

          htmlEjer+=ejerHTML[info[i+ejerEnCat[i-1]].categoria];
          }

        }
        */

        for (var index in ejerHTML){
          if(!ejerHTML.hasOwnProperty(index)){
            continue;
          }
          htmlEjer+=ejerHTML[index];
        }
          console.log(htmlEjer);
          var htmlplantilla="";
          $('.faq-cat-content').html(htmlEjer);
          $.ajax({
            async: false,
            dataType: 'html',
            url: './plantillaejer.html',

            success: function(datHtml){
              $.each(info,function(i,element){
                console.log("each");
                let z;
                var replc=datHtml;
                z=info[i].id;
                var ejercicioPlan = info[i];
                $('#'+z).click( function(){
                console.log("click");
                //$('#contenido').load("./plantillaejer.html");
                console.log(replc);
                console.log(datHtml);
                for (var key in ejercicioPlan){
                  console.log("replace(#"+key+"),"+ejercicioPlan[key]);
                  if(ejercicioPlan[key]==0){
                    console.log("Algo escondo "+key);
                    $('.cl'+key).hide();
                  }
                  replc= replc.replace("#"+key+"#",ejercicioPlan[key]);
                }
          /*      replc= replc.replace("#name#",info[i].nombre);
                replc= replc.replace("#description#",info[i].explicacion);
                replc= replc.replace("#sport#",info[i].deporte);
                replc= replc.replace("#category#",info[i].categoria);
                replc= replc.replace("#subcategory#",info[i].subcategoria);
                replc= replc.replace("#rutaimg#",info[i].foto);*/
      //          replc= replc.replace("#duracion#",info[i].explicacion);
    //            replc= replc.replace("#minpeople#",info[i].explicacion);
  //              replc= replc.replace("#maxpeople#",info[i].explicacion);
//                replc= replc.replace("#age#",info[i].explicacion);


                htmlplantilla+=replc;
                console.log(htmlplantilla);
                $('#contenido').html(htmlplantilla);
                });
              });
            }
          });


            $('.collapse').on('show.bs.collapse', function() {
                var id = $(this).attr('id');
                $('a[href="#' + id + '"]').closest('.panel-heading').addClass('active-faq');
                $('a[href="#' + id + '"] .panel-title span').html('<i class="glyphicon glyphicon-minus"></i>');
              //  $('a[href="#' + id + '"]').closest('.panel-heading').closest('.panel-body').html("<h1>Hello</h1>");
              //  console.log("Hello");
            //    $('#body1').html("<h1></h1>");
            });
            $('.collapse').on('hide.bs.collapse', function() {
                var id = $(this).attr('id');
                $('a[href="#' + id + '"]').closest('.panel-heading').removeClass('active-faq');
                $('a[href="#' + id + '"] .panel-title span').html('<i class="glyphicon glyphicon-plus"></i>');
            });



     }),
     error:(function(xhr, status){
         console.log( "La solicitud ha fallado: " +  status);
     })
  });
});
