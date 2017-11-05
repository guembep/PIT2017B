<?php
		error_reporting(E_ALL);
		ini_set('display_errors', 1);
		//INICIALICAMOS VARIABLES
		$arraybalonmano = array();
		$arraybaloncesto = array();
		$dias = 15; //Rango de dias en los que queremos buscar partidos		
		$arrayligas = [];
		$arraypartidos = [];
		//Cargamos libreria para parsear y realizamos la peticion de la web
		include('simple_html_dom.php');

		//PETICION DE BALONCESTO
		$url = "http://competiciones.feb.es/autonomicas/Resultados.aspx?a=17";
		$html = file_get_html($url);
		//Buscamos el listado de categorias con sus respectivos identificadores
		foreach($html->find('select#controlNavegacion_categoriasDropDownList') as $e){
			foreach ($e->children() as $ch) {
				$liga = [];
				$liga[] = $ch->plaintext;
				$liga[] = $ch->getAttribute("value");
				$arrayligas[] = $liga;
			}
		}
		foreach ($arrayligas as $liga) {

			$parametrospost = "__EVENTTARGET=controlNavegacion%24categoriasDropDownList&__EVENTARGUMENT=&__LASTFOCUS=&__VIEWSTATE=%2FwEPDwULLTIwMjk5MzYyNTEPZBYCAgcPZBYMAgEPDxYEHgFhAhEeAXALKX5GRUIuU0dDRC5QYXNhcmVsYUZBLkNvbnRyb2xlcy5OYXZlZ2FjaW9uK1BhZ2luYSwgU0dDRC5QYXNhcmVsYUZBLCBWZXJzaW9uPTEuMC42MTk4LjI3MDA4LCBDdWx0dXJlPW5ldXRyYWwsIFB1YmxpY0tleVRva2VuPW51bGwAZBYIAgEPZBYEAgMPEA8WBh4ORGF0YVZhbHVlRmllbGQFAklkHg1EYXRhVGV4dEZpZWxkBQVUZXh0bx4LXyFEYXRhQm91bmRnZBAVHw5MSUdBIExFQiBQTEFUQQhMSUdBIEVCQRVQcmltLiBEaXYuIE1hcy4oUC5WLikVUHJpbS4gRGl2LiBGZW0uKFAuVi4pE1NlZ3VuZGEgIEZlbS4oUC5WLikeU2VndW5kYSBEaXYgTWFzY3VsaW5hIEludGVyYXV0GFNlbmlvciBNYXNjdWxpbm8gMcKqIEF1dBhTZW5pb3IgTWFzY3VsaW5vIDLCqiBBdXQXU2VuaW9yIEZlbWVuaW5vIDHCqiBBdXQXU2VuaW9yIEZlbWVuaW5vIDLCqiBBdXQeSkROIC0gSnVuaW9yIE1hc2N1bGlubyAxwqogQXV0HkpETiAtIEp1bmlvciBNYXNjdWxpbm8gMsKqIEF1dB1KRE4gLSBKdW5pb3IgRmVtZW5pbm8gMcKqIEF1dB1KRE4gLSBKdW5pb3IgRmVtZW5pbm8gMsKqIEF1dB5KRE4gLSBDYWRldGUgTWFzY3VsaW5vIDHCqiBDYXQeSkROIC0gQ2FkZXRlIE1hc2N1bGlubyAywqogQ2F0HUpETiAtIENhZGV0ZSBGZW1lbmlubyAxwqogQ2F0HUpETiAtIENhZGV0ZSBGZW1lbmlubyAywqogQ2F0H0pETiAtIEluZmFudGlsIE1hc2N1bGlubyAxwqpDYXQfSkROIC0gSW5mYW50aWwgTWFzY3VsaW5vIDLCqkNhdB9KRE4gLSBJbmZhbnRpbCBGZW1lbmlubyAxwqogQ2F0H0pETiAtIEluZmFudGlsIEZlbWVuaW5vIDLCqiBDYXQbSkROIC0gUHJlaW5mYW50aWwgTWFzY3VsaW5vHkpETiAtIFByZWluZmFudGlsIEZlbWVuaW5vIDHCqh5KRE4gLSBQcmVpbmZhbnRpbCBGZW1lbmlubyAywqoaSkROIC0gTWluaWJhc2tldCBNYXMgTWl4dG8aSkROIC0gTWluaWJhc2tldCBGZW0gTWl4dG8cSkROIC0gUHJlbWluaWJhc2tldCBNYXMgTWl4dB1KRE4gLSBQcmVtaW5pYmFza2V0IEZlbSBNaXh0bxtYVklJSSBDb3BhIE5hdmFycmEgRmVtZW5pbmEcWFZJSUkgQ29wYSBOYXZhcnJhIE1hc2N1bGluYRUfBTE0NjMyBTE0NjM1BTE0NTcxBTE0NTc0BTE0NTcyBTE0MzkzBTE0Mzk5BTE0NzY1BTE0Mzk1BTE0NzY2BTE0Mzk2BTE0NzY3BTE0Mzk3BTE0NzY4BTE0NDAxBTE0NzY5BTE0NDAwBTE0NzcwBTE0NTM0BTE0NzcxBTE0NTcwBTE0NzcyBTE0NTk0BTE0NTc5BTE0OTcwBTE0NTgwBTE0OTY2BTE0OTY4BTE0OTY3BTE0ODc5BTE0ODgwFCsDH2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2cWAQINZAIHDxAPFgYfAgUCSWQfAwUFVGV4dG8fBGdkEBULCTIwMTcvMjAxOAkyMDE2LzIwMTcJMjAxNS8yMDE2CTIwMTQvMjAxNQkyMDEzLzIwMTQJMjAxMi8yMDEzCTIwMTEvMjAxMgkyMDEwLzIwMTEJMjAwOS8yMDEwCTIwMDgvMjAwOQkyMDA3LzIwMDgVCwQyMDE3BDIwMTYEMjAxNQQyMDE0BDIwMTMEMjAxMgQyMDExBDIwMTAEMjAwOQQyMDA4BDIwMDcUKwMLZ2dnZ2dnZ2dnZ2cWAWZkAgMPPCsACQEADxYGHg1TZWxlY3RlZEluZGV4Zh4IRGF0YUtleXMWAB4LXyFJdGVtQ291bnQCBGQWCGYPZBYCAgEPDxYCHgRUZXh0BRtSZXN1bHRhZG9zIHkgQ2xhc2lmaWNhY2nDs25kZAICD2QWAgIBDw8WBB8IBQtDYWxlbmRhcmlvcx4LTmF2aWdhdGVVcmwFJi4uL0NhbGVuZGFyaW9zLmFzcHg%2FYT0xNyZjPTE0NzY4Jm1lZD0wZGQCBA9kFgICAQ8PFgQfCAUHRXF1aXBvcx8JBSIuLi9FcXVpcG9zLmFzcHg%2FYT0xNyZjPTE0NzY4Jm1lZD0wZGQCBg9kFgICAQ8PFgQfCAUSUHLDs3hpbW9zIFBhcnRpZG9zHwkFIy4uL1BhcnRpZG9zLmFzcHg%2FYT0xNyZjPTE0NzY4Jm1lZD0wZGQCBQ8PFgIfCAUbUmVzdWx0YWRvcyB5IENsYXNpZmljYWNpw7NuZGQCBw8PFgIfCAUnMjAxNy8yMDE4IEpETiAtIEp1bmlvciBGZW1lbmlubyAywqogQXV0ZGQCAw8QDxYGHwIFAklkHwMFBVRleHRvHwRnZBAVAhAxwqogRmFzZSBHcnVwbyAxEDHCqiBGYXNlIEdydXBvIDIVAgU2NDM0MQU2NDM0MhQrAwJnZxYBZmQCBQ8QDxYGHwIFAklkHwMFBVRleHRvHwRnZBAVEhRKb3JuYWRhIDEgMDgvMTAvMjAxNxRKb3JuYWRhIDIgMTUvMTAvMjAxNxRKb3JuYWRhIDMgMjIvMTAvMjAxNxRKb3JuYWRhIDQgMjkvMTAvMjAxNxRKb3JuYWRhIDUgMDUvMTEvMjAxNxRKb3JuYWRhIDYgMTIvMTEvMjAxNxRKb3JuYWRhIDcgMTkvMTEvMjAxNxRKb3JuYWRhIDggMjYvMTEvMjAxNxRKb3JuYWRhIDkgMDMvMTIvMjAxNxVKb3JuYWRhIDEwIDE3LzEyLzIwMTcVSm9ybmFkYSAxMSAxNC8wMS8yMDE4FUpvcm5hZGEgMTIgMjEvMDEvMjAxOBVKb3JuYWRhIDEzIDI4LzAxLzIwMTgVSm9ybmFkYSAxNCAwNC8wMi8yMDE4FUpvcm5hZGEgMTUgMTEvMDIvMjAxOBVKb3JuYWRhIDE2IDE4LzAyLzIwMTgVSm9ybmFkYSAxNyAyNS8wMi8yMDE4FUpvcm5hZGEgMTggMDQvMDMvMjAxOBUSBjQ5OTQyNgY0OTk0MjcGNDk5NDI4BjQ5OTQyOQY0OTk0MzAGNDk5NDMxBjQ5OTQzMgY0OTk0MzMGNDk5NDM0BjQ5OTQzNQY0OTk0MzYGNDk5NDM3BjQ5OTQzOAY0OTk0MzkGNDk5NDQwBjQ5OTQ0MQY0OTk0NDIGNDk5NDQzFCsDEmdnZ2dnZ2dnZ2dnZ2dnZ2dnZxYBAgJkAgcPDxYEHgdWaXNpYmxlZx8JBSpSZXN1bHRhZG9zQ3J1emFkb3MuYXNweD9nPTY0MzQxJmE9MTcmbWVkPTBkZAINDw8WAh8KaGRkAhMPDxYCHwpoZGRkHQw5J%2BLMY4moXzCIN5CwE0pYqN3ITMk7DJxDYRVNL3w%3D&__VIEWSTATEGENERATOR=28F5A6FB&__EVENTVALIDATION=%2FwEdAEP3tRHpzfbe63lYq9aVRowB45WH1F%2FWTbjklbWdWv0QomauNkcDrEZ8PzOpUZcx2gIuhdBhkFRTVJr23iEPR%2F%2Fq%2BmIDsaYw1Op5YrrZuUQEfc4xSV460fQR0KlTRVb1fDybx0nKO7aEVO3YhO0uG9m%2FdcRRvqwg73Xwzj21ixTwagPli5uEBrPhgu%2BnxD3JZQriMoKQIuT%2FHdhDnm19kgo1TAgB27QF1vXOeHZeDnYMhKwZbZXMDk8sYc6RZmfUvGD8u7zSv09CjmBqQ0umfYGlArujd9A0axdOZ5mHTTXNbAKZe%2BKWA0LBXkPuoe%2B1JFZHj8CDVioyjcHaQvEzJ0uhJz5FriBQsQ6KA5iDjPiren39Qbnlk5M9Doez8dQGLKZqrl1VvC7hEbQk2%2BYS0Z3ugBWulm0xK06W0S9Uj9mw7p%2Bq5NStylCBoRbF2sLWe0VlnVRcJ4Mpu3efxTWnVADkKIJ%2Fk9cTSaYnQW3WFB06cGSucy19v4IoO7x2uMaFrotffX5%2FnSssxAas%2Fj%2FwoUpGd%2FNI1HdiGbZ%2BYh9kpu7%2FxwHnR3W3EwXBjx53YQxMHPQkpY6iqkr4a1nnJ38NOuTn2sZTPPzY9gZXifQBepjzEjVaeervjrr%2FGvBLztVcaxgKchzLFlctYNOQpBzAwS%2BSd0nKwOTI2DEfB8Q1CnFKeSrVfiZU5xhKIeWG3VY6SlovcRZh30Yd36dobOEXKsqy24cMFNRyTh2%2BqTGcPJoHH9y%2FMC%2FW4rPiRstxm1iS4MtHcYMldiD%2BDArNFXx8PGdYw98P6AU8zH3InYynQ8XK%2F2aiglP9yLBftXntbsDCivpQ%2B3%2BYosPbrutp5jycwpiscqIBWiLV1ZzPiMaOylB7WlqALC%2B0wRLELNgD5uCRa5UB0YseQ64Fy8khVvhacXmc9va50wjvwog1pbUfx7Kleu1bee7cB5L3sE1j17tyBeDkolq%2B9Jrbr3LnxkTQLR9WgqpQwA5Jn7H23dfeuhxgmfrnUQc2oDDDB0jYBus4yEhlJsmwHwpo0ey8MR3OU89yEWIviOtW1Rt9DDKRaFtrIRQrsnjzd05qmt6Pw4MYkx50pr2nw%2FNi5ldLS%2FNeZzabf5Af%2F%2BntacjBguHSiv0vyB9c8wWT%2F9qSMS3EV%2BAQlrQb2ybbxSTsE47ujmjNQPDkqLP4C%2Bagu6l6TDTeGhArS2WsLfgVNso2Tfkly8%2B1QJUz7AGr3TiuwP0WezmtXlO7fxfErDm0Kv%2FmSyOCIx5tvuNETf6IqCypHtm7NqBN8v%2BSIVe2awkbr4FyA5XwlUWjak3IVmDtACnhzn5O5NjdZI%2BkF0g7DfkGsi6l1ieGTp7df1lYWa2llgczJ%2BoIEzdrKAYSCmqcQQ1ZOvZahtEqU1sCZkAjAmDzs15pyQqerSa2qR514bfo%2FzN%2B%2FAF1iCuTb00qNA6EAJgIjnGbmhvALMflCjfxtfioTbf60QJRowQ%3D&controlNavegacion%3AcategoriasDropDownList=".$liga[1]."&controlNavegacion%3AtemporadasDropDownList=2017&gruposDropDownList=64341&jornadasDropDownList=499428";
			$curl = curl_init($url);
			curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
			curl_setopt($curl, CURLOPT_POST, TRUE);
			curl_setopt($curl, CURLOPT_POSTFIELDS, $parametrospost);
			$result = curl_exec($curl);
			//Convertimos la pagina obtenida para recoger los datos con la libreria
			$html = new simple_html_dom();
			$html->load($result);
			foreach($html->find('table#proximaJornadaDataGrid') as $e){
				foreach ($e->children() as $p) {
					$data = $p->find('span');
					$equipos = $data[0]->plaintext;
					$infopartido = $data[1]->plaintext;
					$fecha = $data[3]->plaintext;
					$hora = $data[4]->plaintext;
					$partido = [];
					$partido['Lugar'] = ltrim(explode("(", explode(":",$infopartido)[1])[0]);
					$partido['Municipio'] = explode(")",explode("(", explode(":",$infopartido)[1])[1])[0];
					$partido['CATEGORIA'] = $liga[0];
					$partido['FECHA'] = $fecha;
					$partido['HORA'] = $hora;
					$partido['ELOCAL'] = preg_split("/-/", $equipos)[0];
					$partido['EVISITANTE'] = ltrim(preg_split("/-/", $equipos)[1]);
			    	$arraybaloncesto[] = $partido;					
				}
			}
		}
		$file =	fopen("../partidos/baloncesto.json", "w");
		fwrite($file, json_encode($arraybaloncesto,JSON_UNESCAPED_UNICODE));
		fclose($file);



		//PETICION DE BALONMANO
		$fini = date("d/m/Y");
		$ffin = date("d/m/Y", strtotime("+".$dias." days"));
		$url = "http://fnavarrabm.es/JSON/get_partidos.asp?fini=".$fini."&ffin=".$ffin;

		//Realizamos la peticion de los señalamientos de los partidos
		$curl = curl_init($url);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
		$result = curl_exec($curl);
		$elementos = json_decode($result, true);
		//Comenzamos a recorrer el json en busca de los partidos que incluyan al equipo
		foreach ($elementos['items'] as $partido) {
			unset($partido['Campo']);
			unset($partido['OCATEGORIA']);
			unset($partido['arbitro1']);
			unset($partido['arbitro2']);
			unset($partido['ELOCALPAT']);
			unset($partido['EVISITANTEPAT']);
			unset($partido['EVISITANTENOID']);
			unset($partido['ELOCALNOID']);
			$partido['Municipio'] = trim($partido['Municipio']);
	    	$arraybalonmano[] = $partido;
		}
		$file =	fopen("../partidos/balonmano.json", "w");
		fwrite($file, json_encode($arraybalonmano,JSON_UNESCAPED_UNICODE));
		fclose($file);

?>