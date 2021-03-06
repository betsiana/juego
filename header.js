const Registro = (update) =>{
  const formulario = $('<div class="cont-form"></div>');
  const divLogo1 = $('<div class="logo-form"></div>');
  const logo1 = $('<img src="img/logo.png">');

  const form = $('<div class="form"></div>');
  const divLogo = $('<div class="logo margin-bottom"></div>');
  const logo = $('<img src="img/titulo.png">');
  const nombre = $('<input id="nombre" class="margin-bottom" type="text" placeholder="Nombre" name="" value="">');
  const email = $('<input id="email" class="margin-bottom" type="text" placeholder="Email" name="" value="">');
  const jugarEnviar = $('<button id="btn" class="jugar disabled" type="button" name="button">Jugar</button>');
  formulario.append(divLogo1, form);
  form.append(divLogo, nombre, email, jugarEnviar);
  divLogo.append(logo);
  divLogo1.append(logo1);

  //Accedemos a nuestra base de datos mediante la URL de tu app
 var ref = new Firebase("https://juego-2ede8.firebaseio.com");
 //Hacemos referencia a nuestro nodo del sensor Temp
 var tempRef = ref.child("person");

 const validateFields = () => {
   if((/[0-9a-zA-Z._]+@[0-9a-zA-Z]+[\.]{1}[0-9a-zA-Z]+[\.]?[0-9a-zA-Z]+/.test(email.val())) && (nombre.val().length != 0) ) {
     jugarEnviar.prop('disabled', false);
     jugarEnviar.focus();
   } else {
     jugarEnviar.prop('disabled', true);

    //  $("#spanText").attr("css", { backgroundColor: "gray" });
   }
 }
 nombre.on('keypress', (event) => {
   const charCode = event.keyCode;
   if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 8 || charCode == 32) {
     return true;
   } else {
     return false;
   }
 });

 nombre.on('keyup', (e) => {
   validateFields();
 });

 email.on('keyup', (e) => {
   validateFields();
   if( jugarEnviar.prop('disabled') == 'true')
   {
      $("#btn").attr("css",{backgroundColor: "green"} );
   }
 });


 $(_ => {
 if (nombre.val()=="" & email.val()=="") {
   $('#btn').attr("disabled", true);
 }
});

  jugarEnviar.on('click', function(){
    if (nombre.val()=="" & email.val()=="") {
      $('#btn').attr("disabled", true);

    }else{
      $('#btn').attr("disabled", false);
    }

    state.page=1;
    console.log(state.page);
    const inputnombre = nombre.val();
    console.log(inputnombre);
    const inputemail = email.val();
    //Agregamos un dato nuevo en la base de datos

		// tempRef.push().set({
		// 	//generamos un valor aleatorio
		// 	nombre: inputnombre,
		// 	//generamos un timestamp
		// 	email: inputemail
		// });

    update();
  });

  return formulario;
};

function aparecer (objeto){
  objeto.css('display','inline-block');
}
function oculto (objeto){
  objeto.css('display','none');
}
function ubicacion(objeto){
  var bodyWidth = document.body.clientWidth
  var bodyHeight = document.body.clientHeight;
  const randPosX = Math.floor((Math.random()*(bodyWidth-90)));
  const randPosY = Math.floor((Math.random()*(bodyHeight-90)));
  objeto.css('left', randPosX);
  objeto.css('top', randPosY);
}
function contador(obj, img1) {
  var imagenes = ["carro-nube.png", "edificio-nube.png"];

    var t = 0;
    var x = setInterval( function() {
      t++;
      if(t==1){
        aparecer(obj);
        obj.children().attr("src", "img/"+imagenes[Math.floor(Math.random() * imagenes.length)]);
        ubicacion(obj);
      }
      if(t==8) {
      t = 0;
      };
    },70);
}

const Header = () =>{
  const contenedor = $('<div class="contenedor"></div>');
  const divImagen = $('<div id="rand_pos" class="rand"></div>');
  const imagen = $('<img src="img/carro-nube.png">');
  contenedor.append(divImagen);
  divImagen.append(imagen);
// console.log(state.imagen);
  $(_ => {
contador(divImagen, imagen);
  var cont = 0;
 $('#rand_pos').click(function() {
        cont = cont +1;
        state.puntaje=cont;
        console.log(cont);
 });
      setTimeout(function(){
        const root = $('#root');
        root.empty();
        root.append(Puntaje());
      }, 10000);
      });
  return contenedor;
};

const Puntaje = () =>{
  const contienePuntaje = $('<div class="puntaje"></div>');
  const texto = $('<h1>Puntaje: '+state.puntaje+'</h1>');
  contienePuntaje.append(texto);
  return contienePuntaje;
};
