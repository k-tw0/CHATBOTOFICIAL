// Cargar el archivo JSON de figuras
fetch('figures.json')


.then(response => response.json())
.then(data => {
    const colorPalette = [
        '#FF6384', // Rosa
        '#36A2EB', // Azul
        '#FFCE56', // Amarillo
        '#4BC0C0', // Turquesa
        '#FF8A4C', // Naranja
        '#9966FF', // Morado
        '#6FC3DF', // Azul claro
        '#FFD700'  // Dorado
      ];
  // Obtener el array de figuras del archivo JSON
  const figures = data.figures;

  let currentIndex = 0;
  let currentArt = figures[currentIndex].art;

  function animateAsciiArt() {
    const container = document.getElementById('asciiArt');
    const descriptionContainer = document.getElementById('description');
    let index = 0;
    let colorIndex = 0;

    container.innerHTML = ''; // Limpiar el contenido antes de mostrar el nuevo arte

    function animateLine() {
      if (index < currentArt.length) {
        const line = currentArt[index];
        let charIndex = 0;

        const interval = setInterval(() => {
          const char = line[charIndex];
          const color = colorPalette[colorIndex % colorPalette.length];
          const coloredChar = `<span style="color: ${color}">${char}</span>`;
          container.innerHTML += coloredChar;
          charIndex++;

          if (charIndex === line.length) {
            clearInterval(interval);
            container.innerHTML += '<br>';
            index++;
            colorIndex++;
            setTimeout(animateLine, 10); // Retraso de 0.1 segundos entre líneas
          }
        }, 1); // Retraso de 0.1 segundos entre letras
      } else {
        descriptionContainer.textContent = figures[currentIndex].name;
        setTimeout(() => {
          currentIndex = (currentIndex + 1) % figures.length;
          currentArt = figures[currentIndex].art;
          animateAsciiArt(); // Volver a llamar a la función para mostrar la siguiente figura
        }, 4000); // Retraso de 4 segundos antes de cambiar a la siguiente figura
      }
    }

    animateLine();
  }
  function hideAsciiArt() {
    const container = document.getElementById('asciiArt');
    const descriptionContainer = document.getElementById('description');
    descriptionContainer.style.display = 'none';
    container.style.display = 'none';
  }

  // Agregar controlador de eventos al menú desplegable
  var dropdownMenu = document.getElementById("dropdown-menu");
  var dropdownItems = dropdownMenu.getElementsByTagName("a");

  for (var i = 0; i < dropdownItems.length; i++) {
    dropdownItems[i].addEventListener("click", function() {
      hideAsciiArt();
    });
  }

  animateAsciiArt();
})
.catch(error => {
  console.error('Error al cargar el archivo JSON:', error);
});


// Obtener el elemento del menú desplegable
var dropdownMenu = document.getElementById("dropdown-menu");

// Obtener el elemento del contenido del menú desplegable
var dropdownContent = document.getElementById("dropdown-content");

// Obtener todos los elementos hijos del contenido del menú desplegable
var dropdownItems = dropdownContent.getElementsByTagName("a");

// Eliminar los dos últimos elementos del menú desplegable
var numItems = dropdownItems.length;
if (numItems >= 2) {
  dropdownContent.removeChild(dropdownItems[numItems - 1]);
  dropdownContent.removeChild(dropdownItems[numItems - 2]);
}