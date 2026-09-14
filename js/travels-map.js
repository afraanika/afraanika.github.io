(function () {
  const svg = document.getElementById("travels-map");
  const list = document.getElementById("travels-country-list");
  if (!svg || typeof d3 === "undefined") return;

  const NOTE = "First trip write-up coming soon.";

  const COUNTRIES = [
    { id: "050", code: "BD", name: "Bangladesh", lon: 90.41, lat: 23.81, href: "travels-bangladesh.html", trips: 0, photos: 0 },
    { id: "764", code: "TH", name: "Thailand", lon: 100.5, lat: 13.75, href: "travels-thailand.html", trips: 0, photos: 0 },
    { id: "784", code: "AE", name: "United Arab Emirates", pinLabel: "UAE", lon: 54.37, lat: 24.45, href: "travels-uae.html", trips: 0, photos: 0 },
    { id: "458", code: "MY", name: "Malaysia", lon: 101.98, lat: 4.21, href: "travels-malaysia.html", trips: 0, photos: 0 },
  ];
  const idSet = new Set(COUNTRIES.map((c) => c.id));

  list.innerHTML = COUNTRIES.map(
    (c) => `
    <a class="map-country-row" href="${c.href}" data-id="${c.id}">
      <span class="map-country-code">${c.code}</span>
      <span class="map-country-text">
        <span class="map-country-name">${c.name}</span>
        <span class="map-country-note">${NOTE}</span>
      </span>
      <span class="map-country-counts">${c.trips} trips<br />${c.photos} photos</span>
    </a>`
  ).join("");

  function highlight(id) {
    svg.querySelectorAll(".land.visited").forEach((path) => {
      path.classList.toggle("on", path.dataset.id === id);
    });
    list.querySelectorAll(".map-country-row").forEach((row) => {
      row.classList.toggle("on", row.dataset.id === id);
    });
  }

  list.querySelectorAll(".map-country-row").forEach((row) => {
    row.addEventListener("mouseenter", () => highlight(row.dataset.id));
    row.addEventListener("mouseleave", () => highlight(null));
  });

  const d3svg = d3.select(svg);
  const width = 760;
  const height = 400;
  const projection = d3.geoNaturalEarth1().scale(148).translate([width / 2, height / 2 + 14]);
  const path = d3.geoPath(projection);

  d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json")
    .then((topo) => {
      const countries = topojson.feature(topo, topo.objects.countries).features;

      d3svg
        .append("g")
        .selectAll("path")
        .data(countries)
        .join("path")
        .attr("d", path)
        .attr("class", (d) => (idSet.has(String(d.id)) ? "land visited" : "land"))
        .attr("data-id", (d) => String(d.id))
        .on("mouseenter", function () {
          highlight(this.getAttribute("data-id"));
        })
        .on("mouseleave", () => highlight(null))
        .append("title")
        .text((d) => d.properties.name);

      const pins = d3svg.append("g");
      COUNTRIES.forEach((c) => {
        const p = projection([c.lon, c.lat]);
        pins.append("circle").attr("cx", p[0]).attr("cy", p[1]).attr("r", 3.5).attr("class", "pin");
        pins
          .append("text")
          .attr("x", p[0] + 8)
          .attr("y", p[1] + 4)
          .attr("class", "pinlabel")
          .text(c.pinLabel || c.name);
      });
    })
    .catch(() => {
      d3svg
        .append("text")
        .attr("x", width / 2)
        .attr("y", height / 2)
        .attr("text-anchor", "middle")
        .attr("class", "map-fallback-text")
        .text("Map unavailable right now — see the list below.");
    });
})();
