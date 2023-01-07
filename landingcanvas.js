const canvas = document.querySelector("#title__canvas");
const c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var mouse = {
    x: 0,
    y: 0
};

class Circle
{
    constructor(x, y, radius)
    {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.alpha = 0.5;
        this.rgba = "rgba(9, 219, 177, ";
        this.color = this.rgba + this.alpha + ")";//"rgba(79, 117, 179, " + this.alpha + ")";
        this.direction = Math.random() * Math.PI * 2;
        this.maxSize = this.radius * 1.5;
        this.minSize = this.radius;
    }

    changeAlpha()
    {
        if(this.y > canvas.height * 0.8)
        {
            let sectionHeight = canvas.height * 0.2;
            this.alpha =  (0.5 - (this.y - canvas.height*0.8) / (2*sectionHeight));
            this.color = this.rgba + this.alpha + ")";
        }
        else
        {
            this.alpha = 0.5;
            this.color = this.rgba + this.alpha + ")"
        }
        
    }

    show()
    {
        this.changeAlpha();
        c.beginPath();
        c.arc(this.x, this.y, this.radius, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }

    update()
    {
        this.x += Math.cos(this.direction);
        this.y += Math.sin(this.direction);
        this.edges();
    }
    
    edges()
    {
        if(this.x > canvas.width + this.radius)
        {
            this.x = -this.radius;
        }

        if(this.x < -this.radius)
        {
            this.x = canvas.width + this.radius;
        }

        if(this.y < -this.radius)
        {
            this.y = canvas.height + this.radius;
        }

        if(this.y > canvas.height + this.radius)
        {
            this.y = -this.radius;
        }
    }

    grow()
    {
        if(this.radius < this.maxSize)
        {
            this.radius += 1;
        }
    }

    shrink()
    {
        if(this.radius > this.minSize)
        {
            this.radius -= 1;
        }
    }
}

var circles = [];
var NUM_CIRCLES = Math.floor(canvas.width / 40);
for(let i = 0;i < NUM_CIRCLES;i++)
{
    circles.push(new Circle(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 10 + 25));
}

function getDistance(x1, y1, x2, y2)
{
    return Math.sqrt(Math.pow((x1-x2),2) + Math.pow((y1-y2),2));
}

function draw()
{
    c.fillStyle = "#fff";
    c.fillRect(0, 0, canvas.width, canvas.height);
    for(circle of circles)
    {
        circle.show();
        circle.update();
        if(getDistance(mouse.x, mouse.y, circle.x, circle.y) < 50)
        {
            circle.grow();
        }
        else{
            circle.shrink();
        }
    }
    
    requestAnimationFrame(draw);
}

draw();

function getMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
        y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
    };
}

window.addEventListener("mousemove",
function (event)
{
    let position = getMousePos(event);
    mouse.x = position.x;
    mouse.y = position.y;
});

window.addEventListener("resize", () =>
{
    circles = [];
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    NUM_CIRCLES = Math.floor(canvas.width / 40);
    for(let i = 0;i < NUM_CIRCLES;i++)
    {
        circles.push(new Circle(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 10 + 25));
    }
});