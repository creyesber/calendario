/* Minimal Community Viz stub: muestra que carga y que recibe datos.
   Más tarde sustituiremos el contenido por el calendario real. */
(function () {
  const dscc = window.dscc;

  // Helper DOM
  const root = document.createElement('div');
  root.id = 'calendar-root';
  root.style.fontFamily = 'inherit';
  root.style.padding = '12px';
  document.body.appendChild(root);

  // Render básico (sin calendario todavía)
  function render(data) {
    const rows = data.tables.DEFAULT || [];
    const hasDate = rows.length > 0 && rows[0].date && rows[0].date.v;

    const firstDate = hasDate ? String(rows[0].date.v) : '(sin datos)';
    root.innerHTML = `
      <div class="cal-stub">
        <div class="cal-title">📅 Calendar Stub cargado</div>
        <div class="cal-hint">Filas recibidas: <strong>${rows.length}</strong></div>
        <div class="cal-hint">Primera fecha: <strong>${firstDate}</strong></div>
        <button id="test-select" type="button" class="cal-btn">Probar selección (cross‑filter)</button>
      </div>
    `;

    // Botón de prueba: selecciona todas las filas del primer día disponible (si existe).
    const btn = document.getElementById('test-select');
    btn.onclick = () => {
      if (!rows.length) return;

      const target = rows[0].date ? String(rows[0].date.v) : null;
      if (!target) return;

      const selectedRows = rows
        .map((r, i) => ({ i, val: r.date && String(r.date.v) }))
        .filter(x => x.val === target)
        .map(x => x.i);

      // Emite selección para que Looker Studio aplique cross‑filter
      dscc.sendInteraction({
        type: 'ROW_SELECTION',
        data: { tableId: 'DEFAULT', rowIndices: selectedRows }
      });
    };
  }

  dscc.subscribeToData(render, { transform: dscc.tableTransform });
})();
