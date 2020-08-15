window.addEventListener("load", (ev) => {
    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext("2d");
    ctx.lineWidth = 1;
    ctx.lineCap = "round";

    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    let painting = false;
    let points = [];

    const startPainting = (ev) => {
        painting = true;
        points.push([]);
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
        points.slice(-1)[0].push(ev);
        ctx.lineTo(ev.clientX, ev.clientY);
        ctx.stroke();
    };
    const undo = () => {
        while (points.length && points.slice(-1)[0].length == 1) {
            points.pop();
        }
        points.pop();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (const lines of points) {
            ctx.beginPath();
            for (const ev of lines) {
                ctx.lineTo(ev.clientX, ev.clientY);
                ctx.stroke();
            }
        }
    }

    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", endPainting);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener('dblclick', undo);//TODO: figure out how to distinguish mousedown from doubleclick
});
