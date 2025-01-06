/*ANDREA MUNARIN MATRICOLA=879607*/

var id;
$(document).ready(function() {
	
	carica_immagine();
	
	/*gestiamo pressione del bottone*/
	$('#ok').click(function(){
	
		$.getJSON({
		type:'GET',
		url: 'http://www.dais.unive.it/~cosmo/esercitazione3/captcha.php?callback=?&sendCode&id='+id+'&code='+$("#captcha_code").val(),/*prende il valore inserito nella casella di testo*/
		timeout: 0,
		dataType: 'jsonp',
		}).done(function(data){/*quando la promessa è risolta e otteniamo i dati dall'url*/
			var result = data.auth;/*memorizziamo in result se il codice è corretto*/
			if(result==true)
				$("body").html("<div><i><b>autenticazione riuscita</b></i></div>");/*se è corretto modifichiamo il body eliminando i div precedenti e scrivendo autenticazione riuscita*/
			else/*se il codice inserito non è corretto*/
			{
				carica_immagine();/*richiamiamo carica immagine (modifica id, variabile globale, caricando la corrispettiva immagine)*/
				$("#captcha_code").val("");/*settiamo il valore della casella di testo vuota, eliminando precedente valore inserito*/
			}
		}).fail(function(){});
	});
});

/*funione che carica l'immagine*/
var carica_immagine = function(){
	$.getJSON({
		type:'GET',
		url: 'http://www.dais.unive.it/~cosmo/esercitazione3/captcha.php?callback=?&getIdentifier',
		timeout: 0,
		dataType: 'jsonp',          
	}).then(function(data){/*appena la prima promessa è risolta passiamo alla seconda*/
		id = data.id;/*memorizziamo id*/
		return $.getJSON({
			type:'GET',
			url: 'http://www.dais.unive.it/~cosmo/esercitazione3/captcha.php?callback=?&getImage&id='+id,
			timeout: 0,
			dataType: 'jsonp',
		});
	}).done(function(data){/*quando la seconda promessa è risolta (e quindi anche la prima)*/
		var url = data.url;/*memorizziamo url dell'immagine*/
		$('#captcha').attr("src", "http://www.dais.unive.it/~cosmo/esercitazione3/"+url);/*modifichiamo attributo src dell'immagine--> carichiamo nuova immagine*/
	}).fail(function(){});
};