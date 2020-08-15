window.addEventListener("load", (ev) => {
    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext("2d");

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
        ctx.lineWidth = 10;
        ctx.lineCap = "round";
        ctx.lineTo(ev.clientX, ev.clientY);
        ctx.stroke();
    };
    const undo = () => {
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
    canvas.addEventListener('keydown',(e) => {
        undo();
    });
});
