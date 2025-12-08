document.getElementById("contacto_Form").addEventListener("submit", function(event) {
    event.preventDefault();
    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const mensaje = document.getElementById("info-adicinal").value;

    alert(
      "Mensaje enviado\n\n" +
      "Nombre: " + nombre + "\n" +
      "Email: " + email + "\n" +
      "Mensaje: " + mensaje
    );
  });