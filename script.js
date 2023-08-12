document.addEventListener("DOMContentLoaded", () => {
    const dataContainer = document.getElementById("data-container");
    const searchInput = document.getElementById("searchInput");
    const loadDataButton = document.getElementById("loadDataButton");
    const clearDataButton = document.getElementById("clearDataButton");
    const searchButton = document.getElementById("searchButton");
  
    let currentData = []; // Almacenar los datos actuales
  
    const apiUrl = "https://api.censopoblacion.gt/api/getByDepartamento/";
  
    function loadData() {
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          currentData = data; // Almacenar los datos actuales
          displayData(currentData);
        })
        .catch(error => {
          console.error("Error al obtener los datos:", error);
        });
    }
  
    function displayData(data) {
      dataContainer.innerHTML = ""; // Limpiar el contenedor
      data.forEach(item => {
        const deptoDiv = document.createElement("div");
        deptoDiv.classList.add("departamento");
        deptoDiv.innerHTML = `
          <h2>${item.departamento}</h2>
          <p>Población: ${item.poblacion}</p>
          <p>Densidad: ${item.densidad}</p>
        `;
        dataContainer.appendChild(deptoDiv);
      });
    }
  
    loadDataButton.addEventListener("click", () => {
      loadData();
    });
  
    clearDataButton.addEventListener("click", () => {
      dataContainer.innerHTML = "";
      currentData = [];
    });
  
    searchButton.addEventListener("click", () => {
      const searchTerm = searchInput.value.toLowerCase();
      const filteredData = currentData.filter(item =>
        item.departamento.toLowerCase().includes(searchTerm)
      );
      displayData(filteredData);
    });
  });
  