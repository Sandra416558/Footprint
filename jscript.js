// jscript.js

/* Tabelle filtern */
document.addEventListener("DOMContentLoaded", function () {
  var input = document.getElementById("filterInput");
  var tbody = document.getElementById("tabelle-emissionsdaten").getElementsByTagName("tbody")[0];
  if (!input || !tbody) return;

  var rows = tbody.getElementsByTagName("tr");

  function filterRows(query) {
    query = query.toLowerCase();

    for (var i = 0; i < rows.length; i++) {
      var cells = rows[i].getElementsByTagName("td");
      if (cells.length >= 2) {
        var company = cells[0].textContent.toLowerCase();
        var country = cells[1].textContent.toLowerCase();

        if (company.indexOf(query) > -1 || country.indexOf(query) > -1) {
          rows[i].style.display = "";
        } else {
          rows[i].style.display = "none";
        }
      }
    }
  }

  input.addEventListener("keyup", function () {
    filterRows(this.value);
  });

  filterRows(""); // Anfangszustand: alles sichtbar
});

/* Tabelle sortieren */
document.addEventListener("DOMContentLoaded", function () {
  const button = document.getElementById("filterButton");
  const menu = document.getElementById("filterMenu");
  const table = document.getElementById("tabelle-emissionsdaten");
  const tbody = table.querySelector("tbody");

  // Dropdown ein-/ausblenden
  button.addEventListener("click", function () {
    menu.classList.toggle("show");
  });

  // Dropdown-Items durchgehen
  menu.querySelectorAll(".dropdown-item").forEach(item => {
    item.addEventListener("click", function (event) {
      event.preventDefault();

      const col = parseInt(this.getAttribute("data-col")); // Spaltenindex
      const order = this.getAttribute("data-order");       // asc/desc

      sortTable(tbody, col, order);
      menu.classList.remove("show"); // Menü nach Klick schließen
    });
  });

  // Klick außerhalb → Dropdown schließen
  document.addEventListener("click", function (event) {
    if (!button.contains(event.target) && !menu.contains(event.target)) {
      menu.classList.remove("show");
    }
  });

  // Sortierfunktion
  function sortTable(tbody, colIndex, order) {
    const rows = Array.from(tbody.querySelectorAll("tr"));

    rows.sort((a, b) => {
      const cellA = a.children[colIndex]?.innerText.trim().toLowerCase();
      const cellB = b.children[colIndex]?.innerText.trim().toLowerCase();

      if (cellA < cellB) return order === "asc" ? -1 : 1;
      if (cellA > cellB) return order === "asc" ? 1 : -1;
      return 0;
    });

    // Neu sortierte Reihen anhängen
    rows.forEach(row => tbody.appendChild(row));
  }
});

// Funktion: On Click Button 2
document.addEventListener("DOMContentLoaded", function () {
  const button = document.getElementById("FormularAbsenden");
  const ausgabe = document.getElementById("anfrage-abgesendet");

  button.addEventListener("click", function () {
    const suchbegriff = document.getElementById("anfrage").value;

    if (suchbegriff.length < 50) {
      alert("Ihre Anfrage muss aus mindestens 50 Zeichen bestehen!");
    } else {
      ausgabe.innerText = "OK";
    }
  });
});

// Menü Toggle für mobile Geräte
//const toggleBtn = document.getElementById('menuToggle');
//const menuItems = document.getElementById('menuItems');

//toggleBtn.addEventListener('click', () => {
//  menuItems.classList.toggle('d-none');
//});

// Schreibrichtung prüfen und Menü rechts positionieren, falls rtl
//if (document.documentElement.dir === 'rtl') {
  //document.getElementById('menu').classList.remove('start-0');
  //document.getElementById('menu').classList.add('end-0');
//}

