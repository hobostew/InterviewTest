const print = console.log;

const objTypes = {
    CIRCLE: "circle",
    RECTANGLE: "rectangle",
    TRIANGLE: "triangle",
}

let circle1Data = {type: objTypes.CIRCLE, x: 100, y: 200, radius: 50, color: "red", moveVector: {x: 0, y: 0}, moveSpeed: 1 };
let circle2Data = {type: objTypes.CIRCLE, x: 500, y: 200, radius: 50, color: "blue", moveVector: {x: 0, y: 0}, moveSpeed: 1 };
let rect1Data = {type: objTypes.RECTANGLE, x: 50, y: 500, width: 100, height: 100, color: "green", moveVector: {x: 0, y: 0}, moveSpeed: 1 };
let rect2Data = {type: objTypes.RECTANGLE, x: 450, y: 500, width: 100, height: 100, color: "green", moveVector: {x: 0, y: 0}, moveSpeed: 1 };

let drawObjects = [circle1Data, circle2Data, rect1Data, rect2Data];

function normalize(vector) {
    var magnitude = Math.sqrt(vector.x*vector.y + vector.x*vector.y);
    return {x: vector.x/magnitude, y: vector.y/magnitude};
}

function getDistance(vector1, vector2) {
    return Math.sqrt(((vector2.x-vector1.x)*(vector2.x-vector1.x)) + ((vector2.y-vector1.y)*(vector2.y-vector1.y)));
}

function vectorSubtract(vector1, vector2) {
    return {x: vector1.x-vector2.x, y: vector1.y-vector2.y};
}

function drawCircle(context, objData) {
    context.beginPath();
    context.arc(objData.x, objData.y, objData.radius, 0, Math.PI);
    context.stroke();
    context.fillStyle = objData.color;
    context.fill();
}

function drawRectangle(context, objData) {
    context.beginPath();
    context.rect(objData.x, objData.y, objData.width, objData.height);
    context.stroke();
    context.fillStyle = objData.color;
    context.fill();
}

function circleCircleCollide(obj1Data, obj2Data) {
    let vec1 = {x: obj1Data.x, y: obj1Data.y};
    let vec2 = {x: obj2Data.x, y: obj2Data.y};
    let dist = getDistance(vec1, vec2);

    return ((dist < (obj1Data.radius*2)) || (dist < (obj2Data.radius*2)))
}

function rectRectCollide(obj1Data, obj2Data) {
    if (((obj1Data.x + obj1Data.width) >= obj2Data.x) &&     // r1 right edge past r2 left
        ((obj2Data.x + obj2Data.width) >= obj1Data.x) &&       // r1 left edge past r2 right
        ((obj1Data.y + obj1Data.height) >= obj2Data.y) &&       // r1 top edge past r2 bottom
        ((obj2Data.y + obj2Data.height) >= obj1Data.y)) {       // r1 bottom edge past r2 top
        return true;
    }
    
    return false;
}

function circleRectCollide(circleData, rectData) {
    let testX = circleData.x;
    let testY = circleData.y;

    // which edge is closest?
    if (circleData.x < rectData.x)                       testX = rectData.x;      // test left edge
    else if (circleData.x > rectData.x + rectData.width) testX = rectData.x+rectData.width;   // right edge
    if (circleData.y < rectData.y)                       testY = rectData.y;      // top edge
    else if (circleData.y > rectData.y+rectData.height)  testY = rectData.y+rectData.height;   // bottom edge

    // get distance from closest edges
    let distX = circleData.x-testX;
    let distY = circleData.y-testY;
    let dist = Math.sqrt((distX*distX)+(distY*distY));

    // if the distance is less than the radius, collision!
    if (dist <= circleData.radius) {
        return true;
    }

    return false;
}    

function drawObject(context, objData) {
    if (objData.type == objTypes.CIRCLE) {
        drawCircle(context, objData);
    }
    else if (objData.type == objTypes.RECTANGLE) {
        drawRectangle(context, objData);
    }
    else if (objData.type == objTypes.TRIANGLE) {
        drawTriangle(context, objData);
    }
}

function moveObject(objData) {
    objData.x += (objData.moveVector.x * objData.moveSpeed);
    objData.y += (objData.moveVector.y * objData.moveSpeed);
}

function moveTowards(objData1, objData2) {
    objData1.moveVector = normalize(vectorSubtract(objData1, objData2));
    objData2.moveVector = normalize(vectorSubtract(objData2, objData1));
}

function update() {
    drawObjects.forEach((objData) => moveObject(objData));
}

function draw(context) {
    drawObjects.forEach((objData) => drawObject(context, objData));
}

function checkCollisions() {
    
}

function tick() {
    let canvas = document.getElementById("myCanvas");
    let context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);

    update();
    draw(context);
    checkCollisions();

    setTimeout(tick, 10);
}

tick();
