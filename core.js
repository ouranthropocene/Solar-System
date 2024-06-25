document.addEventListener("DOMContentLoaded", function() {
    const IS_IOS =
      /^(iPad|iPhone|iPod)/.test(window.navigator.platform) ||
      (/^Mac/.test(window.navigator.platform) && window.navigator.maxTouchPoints > 1);
    if (IS_IOS) {
      window.createImageBitmap = undefined;
    }

    const sceneEl = document.querySelector('#example-scene');
    const exampleTarget = document.querySelector('#example-target');
    const background = document.querySelector('#background');
    const description = document.querySelector('.planet-descriptions');
    const backButton = document.querySelector('.backBtn');

    const initialStatePlanets = [
      {x:-0.192, y:0.090, z: -0.4,
        scale: 0.005,
        scaleFactor: 8,
        maxScale: 12, 
        description:{name:'earth', 
        data:'<span>Type:</span> Terrestrial Planet<br/><span>Radius:</span> 6,378 km<br/><span>Length of year: </span> 365.25 days<br/><span>Distance from Sun: </span> 152 million km<br/><span>Earth: </span> Our home planet, is the only planet in our solar system with liquid water on the surface. Earth has one Moon that stabilizes planet’s wobble and our climate.<br/>'
      }},
      {x:0.088, y:0.109, z: -0.4,
        scale: 0.006,
        scaleFactor: 4, 
        maxScale: 8, 
        description:{name:'jupiter', 
        data:'<p><strong>Type</strong>: Gas Giant</p><p><strong>Radius</strong>: 71,492 km</p><p><strong>Length of year</strong>: 11.86 Earth years</p><p><strong>Distance from Sun</strong>: 742 million km</p><p><strong>Moon</strong>: 79</p><p>Jupiter is the largest planet in our solar system. The stripes are thick clouds with different colors. The swirls are massive storms.</p>'
      }},
      {x:-0.108, y:0.104, z: -0.4,
        scale: 0.007,
        scaleFactor: 8, 
        maxScale: 12, 
        description:{name:'mars', 
        data:'<p><strong>Type</strong>: Terrestrial Planet</p><p><strong>Radius</strong>: 3,396 km</p><p><strong>Length of year</strong>: 1.88 Earth years</p><p><strong>Distance from Sun</strong>: 207 million km</p><p><strong>Moon</strong>: 2</p><p>Mars is a desert world with a very thin atmosphere. There is strong evidence that Mars was wetter, warmer and with a thicker atmosphere in billions of years ago.</p>'
      }},
      {x:-0.319, y:0.093, z: -0.4,
        scale: 0.006,
        scaleFactor: 7, 
        maxScale: 11, 
        description:{name:'mercury', 
        data:'<p><strong>Type</strong>: Terrestrial Planet</p><p><strong>Radius</strong>: 2,439 km</p><p><strong>Length of year</strong>: 88 Earth days</p><p><strong>Distance from Sun</strong>: 49 million km</p><p>Mercury is the closest planet to the Sun. It is the smallest planet in our solar system. Mercury has no Moon and no atmosphere.</p>'
      }},
      {x:0.581, y:0.148, z: -0.4, 
        scale: 0.006,
        scaleFactor: 7,
        maxScale: 11,  
        description:{name:'neptune', 
        data:'<p><strong>Type</strong>: Ice Giant</p><p><strong>Radius</strong>: 24,764 km</p><p><strong>Length of year</strong>: 164.81 Earth years</p><p><strong>Distance from Sun</strong>: 4.48 billion km</p><p><strong>Moon</strong>: 14</p><p>Neptune is the eighth planet orbiting the Sun. It is dark, cold and whipped by supersonic winds.</p>'
      }},
      {x:0.297, y:0.094, z: -0.4, 
        scale: 0.006,
        scaleFactor: 3, 
        maxScale: 7, 
        description:{name:'saturn', 
        data:'<p><strong>Type</strong>: Gas Giant</p><p><strong>Radius</strong>: 60,268 km</p><p><strong>Length of year</strong>: 29.45 Earth years</p><p><strong>Distance from Sun</strong>: 1.48 billion km</p><p><strong>Moon</strong>: 62</p><p>Saturn is the second-largest planet in our solar system. It is mostly made of hydrogen and helium. The rings are made of billions of small chunks of ice and rock and each ring orbits at a different speed.</p>'
      }},
      {x:-0.577, y:0.115, z: -0.45,
        scale: 0.006,
        scaleFactor: 1.01, 
        maxScale: 3, 
        description:{name:'sun', 
        data:'<p><strong>Type</strong>: Yellow Dwarf Star</p><p><strong>Radius</strong>: about 700,000 km</p><p><strong>Length of year</strong>: 230 million earth years</p><p>The Sun is the largest object in our solar system. Its surface temperature is 5,500 ºC and 15 million ºC in core. Its gravity holds the solar system together, making everything revolving around it.</p>'
      }},
      {x:0.479, y:0.179, z: -0.4, 
        scale: 0.006,
        scaleFactor: 7, 
        maxScale: 11, 
        description:{name:'uranus', 
        data:'<p><strong>Type</strong>: Ice Giant</p><p><strong>Radius</strong>: 25,559 km</p><p><strong>Length of year</strong>: 84 Earth years</p><p><strong>Distance from Sun</strong>: 3.04 billion km</p><p><strong>Moon</strong>: 27</p><p>Uranus rotates at a nearly 90º angle from the plane of its orbit. The unique tilt makes Uranus appear to spin on its side.</p>'
      }},
      {x:-0.259, y:0.072, z: -0.4,
        scale: 0.006,
        scaleFactor: 8,
        maxScale: 12,  
        description:{name:'venus', 
        data:'<p><strong>Type</strong>: Terrestrial Planet</p><p><strong>Radius</strong>: 6,051 km</p><p><strong>Length of year</strong>: 225 Earth days</p><p><strong>Distance from Sun</strong>: 108 million km</p><p>Venus spins in the opposite direction from most planets. It has a thick atmosphere making it the hottest planet in our solar system. Venus has no Moon.</p>'
      }}];

    // arReady event triggered when ready
    sceneEl.addEventListener("arReady", (event) => {
      // console.log("MindAR is ready")
    });
    // arError event triggered when something went wrong. Mostly browser compatbility issue
    sceneEl.addEventListener("arError", (event) => {
      // console.log("MindAR failed to start")
    });
    // detect target found
    exampleTarget.addEventListener("targetFound", event => {
      console.log("target found");
    });
    // detect target lost
    exampleTarget.addEventListener("targetLost", event => {
      console.log("target lost");
    });

    function handleExit(index) {
      const elem = exampleTarget.children[index]
      
      elem.setAttribute('class', 'clickable')
      elem.removeAttribute('xrextras-one-finger-rotate')
      elem.removeAttribute('xrextras-pinch-scale')
      backButton.setAttribute('style', 'display: none');
      background.setAttribute('class', '')
      background.setAttribute('visible', 'false');
      elem.setAttribute('animation', 'property: position;to:'+ `${initialStatePlanets[index].x}`+ ' ' + ` ${initialStatePlanets[index].y}` + ' ' +  `${initialStatePlanets[index].z}` +';dur: 2000; easing: easeInOutCubic;');
      elem.setAttribute('animation__scale', 'property: scale; to:' +`${initialStatePlanets[index].scale}` + ' ' + `${initialStatePlanets[index].scale}` + ' ' + `${initialStatePlanets[index].scale}` +'; dur: 2000; easing: linear;');
      console.log()
      
      elem.emit('resumeanim');
      
      description.style.display = 'none'
      description.children[0].innerHTML = ''
      description.children[1].innerHTML = ''
    }

    for (let i = 0; i < exampleTarget.children.length; i++) {
      const elem = exampleTarget.children[i]

      // initialStatePlanets.push({position: elem.getAttribute("position"), scale: elem.getAttribute("scale")})
      if (elem.getAttribute('id') !== 'background') {
        elem.addEventListener('click', event => {    

          setTimeout(()=>{
            background.setAttribute('visible', 'true');                                  
          }, 1500)

          elem.emit('pauseanim', null, false);
          elem.setAttribute('class', '')
          elem.setAttribute('xrextras-one-finger-rotate', 'factor: 4')
          elem.setAttribute('xrextras-pinch-scale', "min: 0.5; max:"+`${initialStatePlanets[i].maxScale}`)
          elem.setAttribute('animation', "property: position; to: 0 0 0.2; dur: 2000; easing: easeInOutCubic;");
          elem.setAttribute('animation__scale', 'property: scale; to:' +`${initialStatePlanets[i].scale * initialStatePlanets[i].scaleFactor}` + ' ' + `${initialStatePlanets[i].scale * initialStatePlanets[i].scaleFactor}` + ' ' + `${initialStatePlanets[i].scale * initialStatePlanets[i].scaleFactor}` +'; dur: 2000; easing: linear;');
          
          backButton.addEventListener('click', () => handleExit(i))
          backButton.setAttribute('style', 'display: flex');

          background.setAttribute('class', 'clickable')

          description.style.display = 'flex'
          description.children[0].innerHTML = initialStatePlanets[i].description.name
          description.children[1].innerHTML = initialStatePlanets[i].description.data
             
        })
      }
    }
 
});