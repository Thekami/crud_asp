/**
 * Archivo de funciones genericas para todo lo que se pueda necesitar
 */

//$(document).ready(function() {

//	var current_path = window.location.href.split('/');
//	current_path = current_path[current_path.length-1].split('.')[0];

//	$('.lnk_menu').removeClass('active');
//	$("li[data-path='"+current_path+"']").addClass('active');

//	// toast("Error!", "No se pueden agregar mas de  caracteres", 8000, "error");
	
//});

var validaCampos = function(obj){

	var response = true;
	$(obj).removeClass('red');

	$(obj).each(function(index, el) {

		if(el.type == 'select-one'){
			var bandera = el.value == 0 ? true : bandera;
		}
		else{
			var bandera = el.value == '' ? true : bandera;
		}
		
		if (bandera == true) {$(el).addClass('red'); response = false;} else {$(el).removeClass('red')}
		
	});

	return response;

};


function serializeForm(idForm){
	var form = $('#'+idForm)[0];
	var action = form[0].value;
	var info = '[{';

	for(var i = 1; i < form.length; i++){
		var key = form[i].name;
		info += '"'+key+'":"'+form[i].value+'",';
	}

	info = info.substring(0, info.length-1);
	info += '}]';

	return {'info': info, 'action': action};

}

function capitalize(str) {
	return str.replace(/^(.)|\s(.)/g, function($1){ 
		return $1.toUpperCase(); 
	});

}


var error = "Ocurrió un error insesperado en el sitio, por favor intentelo mas tarde o pongase en contacto con su administrador.";


// =========== ALERTAS =============================================================================

	// https://sciactive.com/pnotify/
	function toast(title, body, delay, type){
		new PNotify({
			title: title,
			text: body,
			delay: delay,
			type: type,
			mobile: {
				styling: false
			},
			animate: {
		        animate: true,
		        in_class: 'bounceInRight',
		        out_class: 'bounceOutRight'
		    },
		    mobile: {
		        styling: false
		    }
		});

	}

	//Necesita el script DreamAlert
	function customAlert(title, content){
		$.alert({
	        title: title,
	        content: content,
	        theme: 'black',
	        animation: 'left',
	        closeAnimation: 'right',
	        icon: 'fa fa-warning',
	        keyboardEnabled: true,
	        confirm: function(){
	            // $.alert('Confirmed!'); // shorthand.
	        }
	    });

	}

// =========== VALIDACION DE CAMPOS ================================================================

	// validaCampoLength("txt_destino_viaje", 100)
	function validaCampoLength(idCampo, length){

		var contenido = "";
		$(document).on('keyup', '#'+idCampo, function(event){ 					
																			
			var caracteres = $(this).val();									
																			
			if (caracteres.length > length){			
				toast("Error!", "No se pueden agregar mas de "+length+" caracteres", 4000, "error");							
				$(this).val(contenido);
			}else{								
				contenido = $(this).val();
			}																					
																																								
		});	

	}

	// validaOnlyNumbers("txt_cont_d_unid_edit")
	function validaOnlyNumbers(idCampo){

		var contenido = "";
		$(document).on('keyup', '#'+idCampo, function(event){ 					
																			
			var caracteres = $(this).val();									
																			
			if (caracteres.match(/[^1234567890.]/g) ){
				toast("Error!", "Solo se admiten numeros", 4000, "error");	
				
				$(this).val(contenido);
			}else{								
				contenido = $(this).val();
			}																					
																			
																								
		});	

	}

	// validaCampoNum("txt_numero_unid", 2147483647)
	function validaCampoNum(idCampo, val){

		var contenido = "";
		$(document).on('keyup', '#'+idCampo, function(event){ 					
																			
			var caracteres = $(this).val();									
																			
			if (caracteres > val){	
				toast("Error!", "No se puede ingresar un valor tan grande, intente con uno mas pequeño", 4000, "error");								
				$(this).val(contenido);
			}else{								
				contenido = $(this).val();
			}																					
																																								
		});	

	}

// =========== OTRAS FUNCIONES =====================================================================
	function resetForm(id){
		$('#'+id).each (function(){
		  this.reset();
		});

	}

	function hoy(){
		var d = new Date();

		var month = d.getMonth()+1;
		var day = d.getDate();

		var output = (day<10 ? '0' : '') + day + '/' + (month<10 ? '0' : '') + month + '/' + d.getFullYear()

		return output;

	} 

	function redondeo(val, num){

		val = val.toString();
		val = val.split('.');
		
		if(val.length  > 1){
			val = val[0]+'.'+val[1].substring(0,num);
		}

		return val;

	}

// =========== Validacion de Email =================================================================

	function validarEmail(email){

		var patronArroba = /[@]/;

		if (patronArroba.test(email)) { //reviso que exista una @

			var dominio = email.split("@")[1]; //divido donde halla una @
			if(dominio == 'gmail.com'){
				return 'success';
			}
			else{
				return 'dominio';
			}

		}
		else{
			return 'formato';
		}

	}

// =========== ESTA EN DESARROLLO AÚN ==============================================================
	function msgClose(id){
		$('#'+id).slideUp();
	}

	function msgAlert(id, tipo, texto){
		$('#'+id).slideUp();

		$('#'+id).html('');
		$('#'+id).attr({
			"hidden": true,
			"class": "alert alert-"+tipo
		});
		$('#'+id).html('<button type="button" class="close" aria-label="Close" onclick="msgClose(\'' + id + '\')"><span aria-hidden="true">&times;</span></button>'+texto);

		$('html, body').animate( { scrollTop : 0 }, 800 );
		$('#'+id).slideDown(function(){
			// setInterval(function(){ msgClose(id)}, 8000);
		});

		// var myVar = setInterval(function(){ msgClose(id)}, 8000);
		// clearInterval(myVar);

	}


$(document).on('click', '#logout', function(e){
	e.preventDefault();

	$.confirm({
        title: 'Atencion!',
        content: '¿Esta seguro que desea cerrar sesión?',
        confirm: function(){

        	$.ajax({
				url:'routes/routeUsuario.php',
				type:'POST',
				data:{action: 'logout'},
				dataType:'JSON',
				beforeSend: function(){
					showSpinner();
				},
				error: function(error){
					console.log(error)
					toast('danger',error, 8000);	
					removeSpinner();
				},
				success: function(data){
					// console.log(data);
					removeSpinner();

					if(data == true){
						window.location = "index.php";
					}
					else{
						toast('danger',error, 8000);
					}
				}
			});

		},
        cancel: function(){
            // console.log('false');
        }
    });
	
	

});
