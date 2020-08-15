window.addEventListener("load", (ev) => {
    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext("2d");

    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    let painting = false;

    const startPainting = (ev) => {
        painting = true;
        moves.push([]);
        ctx.beginPath();
        ctx.moveTo(ev.clientX, ev.clientY);
        draw(ev);
    };
    const endPainting = () => {
        painting = false;
    };
    const draw = (ev) => {
        if (!painting) {
            return;
        }
        ctx.lineWidth = 1;
        ctx.lineCap = "round";
        ctx.lineTo(ev.clientX, ev.clientY);
        ctx.stroke();
    };

    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", endPainting);
    canvas.addEventListener("mousemove", draw); 
});