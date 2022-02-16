function setup()
{
    video=createCapture(VIDEO);
    video.size(550,400);

    canvas=createCanvas(550,450);
    canvas.position(560,100);
    
    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('pose',gotPoses);
}
function modelLoaded()
{
    console.log("Posenet model intialised.");
}

var noseX=0,noseY=0,leftX=0,rightX=0,diff=0;
function gotPoses(results)
{
    if(results.length>0)
    {
        console.log(results);
        noseX=results[0].pose.nose.x;
        noseY=results[0].pose.nose.y;
        console.log("Nose X : "+noseX+" | Nose Y : "+noseY);
        leftX=results[0].pose.leftWrist.x;
        rightX=results[0].pose.rightWrist.x;
        diff=floor(leftX-rightX);
        console.log("Left Wrist X : "+leftX+" | Right Wrist X : "+rightX);
    }
}

function draw()
{
    document.getElementById("square_sides").innerHTML="Width and Height of the text \"Arunit\" will be = "+diff+"px";
    background("#505050");
    textSize(diff);
    text("Arunit",noseX,noseY);
}