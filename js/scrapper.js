var plantillatabla = document.getElementById("plantillatabla");
var htmltabla = plantillatabla.innerHTML;
var contenidotabla = "";
var contenido = "";

$.ajax({
        type: 'POST',
        url: 'php/scrapperv2.php',
        dataType: "json",
        success: function(data){
            console.log(data);
            for (var i in data){
              if (i%2 == 0) {
                contenidotabla += htmltabla.replace("#evenodd", "id=\"par\"")
                                      .replace("#Lugar", data[i].Lugar)
                                      .replace("#Municipio", data[i].Municipio)
                                      .replace("#Categoria", data[i].CATEGORIA)
                                      .replace("#Fecha", data[i].FECHA)
                                      .replace("#Hora", data[i].HORA)
                                      .replace("#Local", data[i].ELOCAL)
                                      .replace("#Visitante", data[i].EVISITANTE)
            } else {
                contenidotabla += htmltabla.replace("#evenodd", "id=\"impar\"")
                                      .replace("#Lugar", data[i].Lugar)
                                      .replace("#Municipio", data[i].Municipio)
                                      .replace("#Categoria", data[i].CATEGORIA)
                                      .replace("#Fecha", data[i].FECHA)
                                      .replace("#Hora", data[i].HORA)
                                      .replace("#Local", data[i].ELOCAL)
                                      .replace("#Visitante", data[i].EVISITANTE)


            }
      }
			$("#tbody").append(contenidotabla);        
      }
})
