export class INPUTHANDLER {
  constructor(type) {
    this.inputype = type;
    // this.keys = {
    //   w: {
    //     pressed: false,
    //   },
    //   a: {
    //     pressed: false,
    //   },
    //   s: {
    //     pressed: false,
    //   },
    //   q: {
    //     pressed: false,
    //   },
    //   e: {
    //     pressed: false,
    //   },
    //   r: {
    //     pressed: false,
    //   },
    //   t: {
    //     pressed: false,
    //   },
    //   y: {
    //     pressed: false,
    //   },
    //   u: {
    //     pressed: false,
    //   },
    //   i: {
    //     pressed: false,
    //   },
    //   o: {
    //     pressed: false,
    //   },
    //   p: {
    //     pressed: false,
    //   },
    //   d: {
    //     pressed: false,
    //   },
    //   f: {
    //     pressed: false,
    //   },
    //   g: {
    //     pressed: false,
    //   },
    //   h: {
    //     pressed: false,
    //   },
    //   j: {
    //     pressed: false,
    //   },
    //   k: {
    //     pressed: false,
    //   },
    //   l: {
    //     pressed: false,
    //   },
    //   z: {
    //     pressed: false,
    //   },
    //   x: {
    //     pressed: false,
    //   },
    //   c: {
    //     pressed: false,
    //   },
    //   v: {
    //     pressed: false,
    //   },
    //   b: {
    //     pressed: false,
    //   },
    //   n: {
    //     pressed: false,
    //   },
    //   m: {
    //     pressed: false,
    //   },
    //   1: {
    //     pressed: false,
    //   },
    //   2: {
    //     pressed: false,
    //   },
    //   3: {
    //     pressed: false,
    //   },
    //   4: {
    //     pressed: false,
    //   },
    //   5: {
    //     pressed: false,
    //   },
    //   6: {
    //     pressed: false,
    //   },
    //   7: {
    //     pressed: false,
    //   },
    //   8: {
    //     pressed: false,
    //   },
    //   9: {
    //     pressed: false,
    //   },
    //   0: {
    //     pressed: false,
    //   },

    // };
    this.keys = new Map();
    // this.keys.set('y', 39);

    // this.keys = {};

  }
  addkeys(key) {
    this.keys.set(key, false);

    window.addEventListener("keydown", (e) => {
      // this.#setKeys(e.key,key);
      let key1 = key;
      if(e.key === key1){
        // let b = e.key
        // let a= {`${b}`: true}
        // this.keys.push(a) ;
        // this.keys = true;
      this.keys.set(key, true);
      // console.log(this)

      }
    });

    window.addEventListener("keyup", (e) => {
      // this.#resetKeys(e.key);
      // this.keys = false;
      this.keys.set(key, false);

    });
    // return {a:this.keys.has('y'),b:this.keys} 
    // return this.keys.get('y');
    // this.#getkeys();

    // return  this.keys.get(key)
    // this.#setKeys(this.keys.get(key))

    // let a = this.keys
    // return  a
  }

  #setKeys(key) {
    // console.log(typeof key)
    // this.keys
    // this.keys.key.pressed = true;
    // this.keys.set(key, true);
    // console.log(this.keys.get(key))
    // console.log(this.keys)

    // switch (key) {
    //   case "w":
    //     this.keys.w.pressed = true;
    //     break;
    //   case "a":
    //     this.keys.a.pressed = true;
    //     break;
    //   case "s":
    //     this.keys.s.pressed = true;
    //     break;
    // }
  }

  getKey(key) {
    return this.keys.get(key)

  }
  // #getkeys(){
  //   return this.keys

  // }

  #resetKeys(key) {
    switch (key) {
      case "w":
        this.keys.w.pressed = false;
        break;
      case "a":
        this.keys.a.pressed = false;
        break;
      case "s":
        this.keys.s.pressed = false;
        break;
    }
  }
}

class JoystickController {
  // stickID: ID of HTML element (representing joystick) that will be dragged
  // maxDistance: maximum amount joystick can move in any direction
  // deadzone: joystick must move at least this amount from origin to register value change
  constructor(stickID, maxDistance, deadzone) {
    this.id = stickID;
    let stick = document.getElementById(stickID);

    // location from which drag begins, used to calculate offsets
    this.dragStart = null;

    // track touch identifier in case multiple joysticks present
    this.touchId = null;

    this.active = false;
    this.value = { x: 0, y: 0 };

    let self = this;
    function handleDown(event) {
      self.active = true;

      // all drag movements are instantaneous
      stick.style.transition = "0s";

      // touch event fired before mouse event; prevent redundant mouse event from firing
      event.preventDefault();

      if (event.changedTouches)
        self.dragStart = {
          x: event.changedTouches[0].clientX,
          y: event.changedTouches[0].clientY,
        };
      else self.dragStart = { x: event.clientX, y: event.clientY };

      // if this is a touch event, keep track of which one
      if (event.changedTouches)
        self.touchId = event.changedTouches[0].identifier;
    }

    function handleMove(event) {
      if (!self.active) return;

      // if this is a touch event, make sure it is the right one
      // also handle multiple simultaneous touchmove events
      let touchmoveId = null;
      if (event.changedTouches) {
        for (let i = 0; i < event.changedTouches.length; i++) {
          if (self.touchId == event.changedTouches[i].identifier) {
            touchmoveId = i;
            event.clientX = event.changedTouches[i].clientX;
            event.clientY = event.changedTouches[i].clientY;
          }
        }

        if (touchmoveId == null) return;
      }

      const xDiff = event.clientX - self.dragStart.x;
      const yDiff = event.clientY - self.dragStart.y;
      const angle = Math.atan2(yDiff, xDiff);
      const distance = Math.min(maxDistance, Math.hypot(xDiff, yDiff));
      const xPosition = distance * Math.cos(angle);
      const yPosition = distance * Math.sin(angle);

      // move stick image to new position
      stick.style.transform = `translate3d(${xPosition}px, ${yPosition}px, 0px)`;

      // deadzone adjustment
      const distance2 =
        distance < deadzone
          ? 0
          : (maxDistance / (maxDistance - deadzone)) * (distance - deadzone);
      const xPosition2 = distance2 * Math.cos(angle);
      const yPosition2 = distance2 * Math.sin(angle);
      const xPercent = parseFloat((xPosition2 / maxDistance).toFixed(4));
      const yPercent = parseFloat((yPosition2 / maxDistance).toFixed(4));

      self.value = { x: xPercent, y: yPercent };
    }

    function handleUp(event) {
      if (!self.active) return;

      // if this is a touch event, make sure it is the right one
      if (
        event.changedTouches &&
        self.touchId != event.changedTouches[0].identifier
      )
        return;

      // transition the joystick position back to center
      stick.style.transition = ".2s";
      stick.style.transform = `translate3d(0px, 0px, 0px)`;

      // reset everything
      self.value = { x: 0, y: 0 };
      self.touchId = null;
      self.active = false;
    }

    stick.addEventListener("mousedown", handleDown);
    stick.addEventListener("touchstart", handleDown);
    stick.addEventListener("touchmove", handleMove);
    stick.addEventListener("touchend", handleUp);
    document.addEventListener("mousemove", handleMove, { passive: false });
    document.addEventListener("touchmove", handleMove, { passive: false });
    document.addEventListener("mouseup", handleUp);
    document.addEventListener("touchend", handleUp);
  }
}

export class JOYSTICK {
  constructor(posT = 60,posL = 5,width=80,height=80,maxDistance = 40) {
    this.posT = posT;
    this.posL = posL;
    this.width = width;
    this.height = height;
    this.maxDistance = maxDistance;

    this.stick2W = this.width / 3;
    this.stick2h = this.height / 3;

    this.#create(this.width, this.height, this.stick2W, this.stick2h);
    this.controller = new JoystickController("stick2", this.maxDistance, 18);
  }

  #create(w, h, w1, h1) {
    const body = document.querySelector("body");

    const stick1 = document.createElement("div");
    stick1.id = "stick1";
    stick1.style = `width: ${w}px; height: ${h}px; position: absolute; left:${this.posL}%; top:${this.posT}%; display:block`;

    body.appendChild(stick1);

    const img = document.createElement("img");
    img.src = "img/buttons/Circle.png";
    img.style = "width: 100%; height: 100%;";

    stick1.appendChild(img);

    const stick2 = document.createElement("div");
    stick2.id = "stick2";
    // stick2.style = `position: relative; width: ${w1}px; height: ${h1}px; left: ${
    //   w / 2 - 20
    // }px; bottom: ${
    //   h / 2 + 20
    // }px; transition: all 0.2s ease 0s; transform: translate3d(0px, 0px, 0px);`;


    // stick2.style = `position: absolute;  width: ${w1}px; height: ${h1}px; left: ${((w/2) - (w1/2)) - 0}%; bottom: ${
    //   ((h/2) - h1/2) 
    // }%; transition: all 0.2s ease 0s; transform: translate3d(0px, 0px, 0px);`;


    
    stick2.style = `position: absolute;  width: ${w1}px; height: ${h1}px; left: 33%; bottom: 33%; transition: all 0.2s ease 0s; transform: translate3d(0px, 0px, 0px);`;

    stick1.appendChild(stick2);

    const img1 = document.createElement("img");
    img1.src = "img/buttons/joystick-red.png";
    img1.style = "width: 100%;";

    stick2.appendChild(img1);
  }
}

export class BUTTON {
  constructor(id) {
    this.id = id;
    this.pressed = false;
    this.#setBtn(this.id);
  }
  #setBtn(id) {
    const el = document.getElementById(id);
    el.addEventListener("touchstart", () => {
      this.pressed = true;
    });
    el.addEventListener("touchend", () => {
      this.pressed = false;
    });
  }
}

export class SWIPE {
  constructor(touchThreshoad = 30){
    this.keys = [];
    this.touchY = '';
    this.touchX = '';
    this.touchThreshoad = touchThreshoad;
    this.#setSwipe();
  }
  #setSwipe(){
    window.addEventListener('touchstart', e => {
      this.touchY = e.changedTouches[0].pageY;
      this.touchX = e.changedTouches[0].pageX;
    })

    window.addEventListener('touchmove', e => {
      const swipeDistance = e.changedTouches[0].pageY - this.touchY;
      const swipeDistanceX = e.changedTouches[0].pageX - this.touchX;
      if(swipeDistance < -this.touchThreshoad && this.keys.indexOf('swipe up') === -1) this.keys.push('swipe up');
      else if(swipeDistance > this.touchThreshoad && this.keys.indexOf('swipe down') === -1) this.keys.push('swipe down');
   
      if(swipeDistanceX < -this.touchThreshoad && this.keys.indexOf('swipe left') === -1) this.keys.push('swipe left');
      else if(swipeDistanceX > this.touchThreshoad && this.keys.indexOf('swipe right') === -1) this.keys.push('swipe right');
   

    })

    window.addEventListener('touchend', e => {
      this.keys.pop()
    });

  }

  swipeRight(){
    return this.keys.includes('swipe right');
  }

  swipeLeft(){
    return this.keys.includes('swipe left');
  }

  swipeDown(){
    return this.keys.includes('swipe down');
  }

  swipeUp(){
    return this.keys.includes('swipe up');
  }
}


