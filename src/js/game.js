/**
 * Main game logic for the Lumber simulation.
 * This module is imported as an ES module from index.html.
 */
import { updateUI } from "./utils.js";

// ---------- состояние ----------
const resources = { logs: 0, planks: 0, fences: 0 };

const workers = [
    {
        role: "lumberjack",
        status: "idle",
        progress: 0,
        duration: 3,
        produced: 0,
        inputCheck: () => true, // лес бесконечен
        inputResource: null,
        inputAmount: 0,
        outputResource: "logs",
        outputAmount: 1,
    },
    {
        role: "sawyer",
        status: "waiting",
        progress: 0,
        duration: 2,
        produced: 0,
        inputCheck: () => resources.logs > 0,
        inputResource: "logs",
        inputAmount: 1,
        outputResource: "planks",
        outputAmount: 2,
    },
    {
        role: "carpenter",
        status: "waiting",
        progress: 0,
        duration: 5,
        produced: 0,
        inputCheck: () => resources.planks >= 4,
        inputResource: "planks",
        inputAmount: 4,
        outputResource: "fences",
        outputAmount: 1,
    },
];

// ---------- игровой цикл (каждые 100 мс) ----------
function gameLoop() {
    const delta = 0.1; // 100 мс
    for (const w of workers) {
        // попытка начать работу
        if (w.status === "idle" || w.status === "waiting") {
            if (w.inputCheck()) {
                w.status = "working";
                w.progress = 0;
            }
        }

        // если работает – увеличиваем прогресс
        if (w.status === "working") {
            w.progress += delta;
            if (w.progress >= w.duration) {
                // завершить работу
                if (w.inputResource && w.inputAmount > 0) {
                    resources[w.inputResource] -= w.inputAmount;
                }
                if (w.outputResource && w.outputAmount > 0) {
                    resources[w.outputResource] += w.outputAmount;
                }
                w.produced++;
                w.progress = 0;
                // проверяем, можно ли продолжать
                w.status = w.inputCheck() ? "working" : "waiting";
            }
        }
    }
    updateUI(resources, workers);
}

// Первый рендер и запуск цикла
updateUI(resources, workers);
setInterval(gameLoop, 100);

