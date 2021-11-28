songStarWars = "";
songIndiana = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
statusLeftPlay = "";
statusRightPlay = "";

function preload()
{
    songStarWars = loadSound("Star Wars Main Theme (Full).mp3")
    songIndiana = loadSound("Indiana Jones Main Theme.mp3")
}

function setup() {
    canvas = createCanvas(600, 400);
    canvas.position(500, 225)

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log("Posenet is Initialized!")
}

function draw() {
    image(video, 0, 0, 600, 400);
    
    fill("#87CEEB");
    stroke("#87CEEB");

    statusLeftPlay = songStarWars.isPlaying()
    if (scoreLeftWrist > 0.2)
    {
        circle(leftWristX, leftWristY, 20);
        songIndiana.stop();

        if(statusLeftPlay = "false") {
            songStarWars.play();
            document.getElementById("song").innerHTML = "Song Playing is Star Wars Main Theme."
        }
    }
    statusRightPlay = songIndiana.isPlaying()
    if (scoreRightWrist > 0.2)
    {
        circle(rightWristX, rightWristY, 20);
        songStarWars.stop();

        if(statusRightPlay = "false") {
            songIndiana.play();
            document.getElementById("song").innerHTML = "Song Playing is Indiana Jones Main Theme."
            amountofplaysright += 1;
        }
    }
}

function gotPoses(results) 
{
    if (results.length > 0) {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
    }
}