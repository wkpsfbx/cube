import "./style.css";

const getE = (e) => (e.touches ? e.touches[0] : e);

document.querySelectorAll(".cube").forEach((cube) => {
    const sides = cube.querySelector(".sides");

    cube.ondragstart = () => false;

    let x0 = null,
        y0 = null,
        inertiaX = -10,
        inertiaY = 10,
        angle = 0,
        drag = false,
        updateCycle = 0;

    const lock = (ev) => {
        let e = getE(ev);

        drag = true;
        x0 = e.clientX;
        y0 = e.clientY;
    };

    const release = () => {
        if (!drag) return;

        drag = false;
        x0 = y0 = null;
    };

    const rotate = (ev) => {
        ev.preventDefault();

        if (!drag) return;

        let e = getE(ev),
            x = e.clientX,
            y = e.clientY,
            dx = x - x0,
            dy = y - y0;

        if (dx && dy) {
            inertiaX += dx;
            inertiaY += dy;

            x0 = x;
            y0 = y;
        }
    };

    // transform to new position
    setInterval(() => {
        sides.style.transform = `rotate3d(${-inertiaY}, ${inertiaX}, 0, ${angle}deg) ${getComputedStyle(sides).transform.replace("none", "")}`;

        // recalculate every 4th frame
        if (updateCycle >= 3) {
            inertiaX = +(inertiaX * 0.97).toFixed(2);
            inertiaY = +(inertiaY * 0.97).toFixed(2);

            angle = +(Math.hypot(inertiaX, inertiaY) * 0.1).toFixed(2);

            updateCycle = 0;

            return;
        }

        updateCycle++;
    }, 16);

    cube.addEventListener("mousedown", lock);
    cube.addEventListener("touchstart", lock);

    document.addEventListener("mousemove", rotate);
    document.addEventListener("touchmove", rotate);

    document.addEventListener("mouseup", release);
    document.addEventListener("touchend", release);
});
