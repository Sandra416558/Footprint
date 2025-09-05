// Funktion: Sortieren der Tabelle nach Land
document.addEventListener("DOMContentLoaded", function () {
  var input = document.getElementById("filterInput");
  var table = document.getElementById("tabelle-emissionsdaten");
  if (!input || !table) return;

  var tbody = table.getElementsByTagName("tbody")[0];
  var rows = tbody.getElementsByTagName("tr");

  // Funktion zur Vereinfachung des Vergleichsstrings
  function norm(text) {
    return String(text || "").toLowerCase();
  }

  function filterRows(query) {
    var q = norm(query.trim());

    for (var i = 0; i < rows.length; i++) {
      var row = rows[i];
      var cells = row.getElementsByTagName("td");

      if (!q) {
        row.style.display = ""; // Zeige alle Zeilen bei leerem Suchfeld
        continue;
      }

      var company = norm(cells[0] ? cells[0].textContent : "");
      var country = norm(cells[1] ? cells[1].textContent : "");

      if (company.indexOf(q) !== -1 || country.indexOf(q) !== -1) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    }
  }