import "./style.css";

const getE = e => (e.touches ? e.touches[0] : e);

document.querySelectorAll(".cube").forEach(cube => {
    const sides = cube.querySelector(".sides");

    cube.ondragstart = () => false

    sides.style.transform = `rotate3d(1, 1, 0, 35deg)  `

    let x0 = null,
        y0 = null,
        drag = false;

    const lock = ev => {
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

    const rotate = ev => {
        if (!drag) return;

        let e = getE(ev),
            x = e.clientX,
            y = e.clientY,
            dx = x - x0,
            dy = y - y0,
            d = Math.hypot(dx, dy);

        let prev = getComputedStyle(sides).transform.replace("none", "");

        if (d) {
            sides.style.transform = `rotate3d(${+(-dy).toFixed(2)}, ${+dx.toFixed(2)}, 0, ${+(d * 0.2).toFixed(2)}deg) ${prev}`;

            x0 = x;
            y0 = y;
        }
    };

    cube.addEventListener("mousedown", lock);
    cube.addEventListener("touchstart", lock);

    document.addEventListener("mousemove", rotate);
    document.addEventListener("touchmove", rotate);

    document.addEventListener("mouseup", release);
    document.addEventListener("touchend", release);
});
