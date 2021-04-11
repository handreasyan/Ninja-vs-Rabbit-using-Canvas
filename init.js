
		const canvas = document.querySelector("canvas");
		// et vercvacin kcumenq getContext_y vor ogtagrocem ira hamar sarqvac patrasti functionnery
		const context = canvas.getContext("2d");

		//  background
		const backgroundImg = document.createElement("img");
		backgroundImg.src = "https://previews.123rf.com/images/alexmstudio/alexmstudio1508/alexmstudio150800012/43889983-cartoon-game-background.jpg";

		//  hero
		const heroImg = document.createElement("img");
		heroImg.src = "http://pngimg.com/uploads/ninja/ninja_PNG18.png";

		// death hero
		const killedHero = document.createElement("img");
		killedHero.src = "http://pngimg.com/uploads/ninja/ninja_PNG6.png";

		//	 bullet
		const starImg = document.createElement("img");
		starImg.src = "https://www.pngkey.com/png/full/192-1925330_shuriken-shuriken-png.png";

		// shoot audio
		const audio = document.createElement("audio");
		audio.src = "http://www.soundescapestudios.com/SESAudio/SES%20Site%20Sounds/Laser%20Sci%20Fi/Flash-laser-05.wav";

		// enemy
		const rabbitImg = document.createElement("img");
		rabbitImg.src = "https://preview.redd.it/4e15s7ljf2o41.png?width=256&format=png&auto=webp&s=99b4d97d6c2eeacbb218fc6e31773bd3aecc385c";

		// kill audio
		const stabAudio = document.createElement("audio");
		stabAudio.src = "http://puistokemisti.kapsi.fi/Splatoon/WOOMY/WOOMY%20and%20other%20assorted%20babbling/WOOMY/VoiceFDead01.mp3";
		

		let data = {
			hero:{
				xDelta:0,
				yDelta:0,
				x:10,
				y:130,
				width:100,
				height:100
			},
			bullets:[],
			rabbits:[]
		}

	
		function intersect(rect1, rect2) {
		    const x = Math.max(rect1.x, rect2.x),
		        num1 = Math.min(rect1.x + rect1.width, rect2.x + rect2.width),
		        y = Math.max(rect1.y, rect2.y),
		        num2 = Math.min(rect1.y + rect1.height, rect2.y + rect2.height);
		    return (num1 >= x && num2 >= y);
		};

		function update(){
			data.hero.x += data.hero.xDelta;
			data.hero.y += data.hero.yDelta;

			data.bullets.forEach( function(bullet) {
				data.rabbits.forEach(function(rabbit){
					if(intersect(rabbit,bullet)){
						stabAudio.currentTime = 0;
						stabAudio.play();

						bullet.deleteMe = true;
						rabbit.deleteMe = true;

					}
				})
			});
			
			data.bullets = data.bullets.filter(function(bullet){
				return bullet.deleteMe !== true;
			})
			data.rabbits = data.rabbits.filter(function(rabbit){
				return rabbit.deleteMe !== true;
			})


			data.bullets.forEach( function(bullet) {
				bullet.x += bullet.xDelta;
			});

			data.bullets = data.bullets.filter(function(bullet){
				if(bullet.x > canvas.width){
					return false;
				}
				return true;
			})

			data.rabbits.forEach(function(rabbit){
				rabbit.x += rabbit.xDelta;
			})


			data.rabbits.forEach( function(rabbit) {
				if(rabbit.x < data.hero.x + data.hero.width){
					rabbit.x = canvas.width - 100;
					alert("You lose!")
				}
			});



			if(data.rabbits.length === 0){
				data.rabbits.push({
					xDelta:-1,
					x:canvas.width - 100,
					y:data.hero.y,
					width:100,
					height:100
				})
			}


		}

		function draw() {
			context.drawImage(backgroundImg,0,0,canvas.width,canvas.height);
			context.drawImage(heroImg,data.hero.x,data.hero.y,data.hero.width,data.hero.height);
			data.bullets.forEach(function(bullet){
				context.drawImage(starImg,bullet.x,bullet.y,bullet.width,bullet.height);
			})
			data.rabbits.forEach(function(rabbit){
				context.drawImage(rabbitImg,rabbit.x,rabbit.y,rabbit.width,rabbit.height);
			})

		}



		function loop(){
			requestAnimationFrame(loop);

			update();
			draw();
		}

		loop();

		document.addEventListener("keydown",function(evt){
			if(evt.code === "ArrowRight"){

				data.hero.xDelta = 1;

			} else if( evt.code === "ArrowLeft"){

				data.hero.xDelta = -1;

			}else {

				audio.currentTime = 0;
				audio.play();
				
				data.bullets.push({
					xDelta:5,
					x:data.hero.x,
					y:160,
					width:20,
					height:20
				});
			}

		})

		document.addEventListener("keyup",function(evt){
			data.hero.xDelta = 0;
		})






































