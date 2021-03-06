//Create variables here
var dogIMG, happyDogIMG, foodS, foodStock, database, dog;
var feedButton, addFood, feedTime, lastFed;
var foodObj;
function preload()
{
	//load images here
  dogIMG = loadImage("images/dogImg.png");
  happyDogIMG = loadImage("images/dogImg1.png");
  
}

function setup() {
	createCanvas(1000, 700);
  database= firebase.database();
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  dog = createSprite(250,250);
  dog.addImage("Doggo", dogIMG);
  dog.addImage("HappyDoggo", happyDogIMG);
  foodObj = new Food();
  feedButton= createButton("Feed the Dog");
  feedButton.position(700,95);
  feedButton.mousePressed(feedDog);
  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}


function draw() {  
  background(46,139,87);

  //Feeding the dog milk
 // if(keyWentDown(UP_ARROW)){
   // writeStock(foodS);
    //dog.changeImage("HappyDoggo" , happyDogIMG);
  //}
  
  dog.scale=0.3;

  

  //Text
  fill("white");
  stroke(10);
  text("Note: Press the up arrow to feed Drago a bottle of milk", 100, 100);
  
  if(foodS!==undefined){
    text("Food: " + foodS, 200, 150);
  } 
  feedTime=database.ref("feedTime")
  feedTime.on("value", function(data){
    lastFed=data.val();
  })


  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Fed: " + lastFed%12 + " PM", 350, 30);
  } else if(lastFed===0){
    text("Last Fed: 12AM", 350, 30);
  }else{
    text("Last Fed: " + lastFed + " AM", 350 , 30);
  }



foodObj.display();
drawSprites();
}


function readStock(data){
    foodS=data.val();
}

function writeStock(x){

    if(x<=0){
      x=0;
    }else{
      x=x-1;
    }
    
    database.ref("/").update({
        Food:x,
    })
  }

  function feedDog(){
    dog.addImage(happyDogIMG);
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
    
    database.ref('/').update({
      Food:foodObj.getFoodStock(),
      feedTime:hour()
    })
  }

  function addFoods(){
    foodS++;

    database.ref('/').update({
      Food:foodS
    })
    }


