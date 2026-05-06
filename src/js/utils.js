/**
 * Utility functions for the Lumber simulation UI.
 */

/**
 * Update the UI elements based on the current state.
 * @param {Object} resources - Current resource counts.
 * @param {Array} workers - Array of worker objects.
 */
export function updateUI(resources, workers) {
    // Лесоруб
    const lj = workers[0];
    document.getElementById("lumberjack-status").textContent =
        lj.status === "working"
            ? `рубит дерево... (${lj.progress.toFixed(1)}/${lj.duration.toFixed(1)} сек)`
            : lj.status === "waiting"
            ? "ожидает"
            : "бездействует";
    document.getElementById("lumberjack-progress").value =
        lj.status === "working" ? lj.progress / lj.duration : 0;
    document.getElementById("lumberjack-produced").textContent = lj.produced;

    // Пильщик
    const saw = workers[1];
    document.getElementById("sawyer-status").textContent =
        saw.status === "working"
            ? `пилит бревно... (${saw.progress.toFixed(1)}/${saw.duration.toFixed(1)} сек)`
            : saw.status === "waiting"
            ? "ожидает (нет брёвен)"
            : "бездействует";
    document.getElementById("sawyer-progress").value =
        saw.status === "working" ? saw.progress / saw.duration : 0;
    document.getElementById("sawyer-produced").textContent = saw.produced;

    // Столяр
    const carp = workers[2];
    document.getElementById("carpenter-status").textContent =
        carp.status === "working"
            ? `делает забор... (${carp.progress.toFixed(1)}/${carp.duration.toFixed(1)} сек)`
            : carp.status === "waiting"
            ? `ожидает (нужно 4 доски, есть ${resources.planks})`
            : "бездействует";
    document.getElementById("carpenter-progress").value =
        carp.status === "working" ? carp.progress / carp.duration : 0;
    document.getElementById("carpenter-produced").textContent = carp.produced;

    // Склады
    document.getElementById("logs-count").textContent = resources.logs;
    document.getElementById("planks-count").textContent = resources.planks;
    document.getElementById("fences-count").textContent = resources.fences;
}

