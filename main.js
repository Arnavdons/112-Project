//https://teachablemachine.withgoogle.com/models/6hDujbcK6/model.json

prediction1="";
prediction2="";

Webcam.set({
width:350,
height:300,
image_format:"jpeg",
jpeg_quality:90
});

camera=document.getElementById("camera");
Webcam.attach("#camera");

function take_snapshot(){
Webcam.snap(function(data_uri){
document.getElementById("result").innerHTML="<img id='capture_image' src='"+data_uri+"'>";
});
}
console.log("ml5 version - ",ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/6hDujbcK6/model.json",modelloaded);

function modelloaded(){
console.log("model is loded!");
}

function speak(){
var synth=window.speechSynthesis;
speak_data1="The first prediction is"+prediction1;
speak_data2="The Second Prediction is "+prediction2;
var utterthis= new SpeechSynthesisUtterance(speak_data1+speak_data2);
synth.speak(utterthis);
}

function check(){
img=document.getElementById("capture_image");
classifier.classify(img,gotresults);
}

function gotresults(error,results){
if(error){
console.log(error);
}
else{
console.log(results);
document.getElementById("result_emotion_name1").innerHTML=results[0].label;
document.getElementById("result_emotion_name2").innerHTML=results[1].label;
prediction1=results[0].label;
prediction2=results[1].label;
speak();

if(results[0].label=="Best"){
document.getElementById("update_emoji1").innerHTML="&#128077;";
}
if(results[0].label=="Amazing"){
document.getElementById("update_emoji1").innerHTML="&#128076;";
}
if(results[0].label=="Victory"){
document.getElementById("update_emoji1").innerHTML="&#9996;";
}
if(results[1].label=="Best"){
document.getElementById("update_emoji2").innerHTML="&#128077;";
}
if(results[1].label=="Amazing"){
document.getElementById("update_emoji2").innerHTML="&#128076;";
}
if(results[1].label=="Victory"){
document.getElementById("update_emoji2").innerHTML="&#9996;";
}

}
}