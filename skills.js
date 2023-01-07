const skillsCanvas = document.querySelector("#skills__canvas");
const container = document.querySelector("#skills__design");
const skillsContext = skillsCanvas.getContext("2d");

skillsCanvas.width = window.innerWidth * 0.6;
skillsCanvas.height = window.innerHeight;

class Icon
{
    constructor(radius, angle, imageSource)
    {
        this.angle = angle;
        this.radius = radius;
        this.x = skillsCanvas.width / 2 + Math.cos(this.angle) * this.radius;
        this.y = skillsCanvas.height / 2 + Math.sin(this.angle) * this.radius;
        this.image = new Image(50, 50);
        this.image.src = imageSource;
    }

    update()
    {
        this.angle += 0.005;
        this.x = skillsCanvas.width / 2 + Math.cos(this.angle) * this.radius;
        this.y = skillsCanvas.height / 2 + Math.sin(this.angle) * this.radius;
    }

    show()
    {
        skillsContext.drawImage(this.image, this.x, this.y, 100, 100);
    }
}

let radius = Math.min(skillsCanvas.width/2, skillsCanvas.height/2) - 120;
let myImages = [
    new Icon(radius, 0, "/icons/binarytree.png"),
    new Icon(radius, Math.PI*2/5, "/icons/c++.png"),
    new Icon(radius, Math.PI*4/5, "/icons/github.png"),
    new Icon(radius, Math.PI*6/5, "/icons/pythonicon.png"),
    new Icon(radius, Math.PI*8/5, "/icons/web-development.svg")
];

function drawSkills()
{
    skillsContext.fillStyle = "white";//"#09dbb1";
    skillsContext.fillRect(0, 0, skillsCanvas.width, skillsCanvas.height);
    for(let image of myImages)
    {
        image.update();
        image.show();
    }
    
    requestAnimationFrame(drawSkills);
}

drawSkills();

window.addEventListener("resize", () =>
{
    skillsCanvas.width = window.innerWidth * 0.6;
    skillsCanvas.height = window.innerHeight;
    let radius = Math.min(skillsCanvas.width/2, skillsCanvas.height/2) - 120;
    myImages = [
        new Icon(radius, 0, "/icons/binarytree.png"),
        new Icon(radius, Math.PI*2/5, "/icons/c++.png"),
        new Icon(radius, Math.PI*4/5, "/icons/github.png"),
        new Icon(radius, Math.PI*6/5, "/icons/pythonicon.png"),
        new Icon(radius, Math.PI*8/5, "/icons/web-development.svg")
    ];
});