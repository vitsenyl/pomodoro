# pomodoro

A simple Pomodoro timer for [The Odin Project](https://www.theodinproject.com/courses/web-development-101/lessons/pairing-project). No pair programming, just solo for this one.  [Try it out](https://vitsenyl.github.io/pomodoro/).

## General Thoughts
The interactions for this project was more complex than I anticipated initially, but very manageable when broken down into individual components. I ended up implementing a state machine that transitioned based on what buttons were hit. 

I should go back to my previous exercises and practice designing more dynamic UI with HTML/CSS/JS. My solutions are typically functional but ugly. Or minimalistic. Minimalistic. Yup. 

## ToDo
[] Add Increment and Decrement buttons for the timer
[] During Standby, update the the timer when session value changes

## Lessons Learned
1. Can add audio to a program in two separate ways depending on if you want to hide the audio filepath or use a DOM-path.
```javascript
let audio = New Audio('audiofilepath');
let audio = document.querySelector('audio');

audio.play()
```
2. To get the current time, have to create a new Date() object. Formatting the the date-time is well-represented in this [w3schools tutorial](https://www.w3schools.com/howto/howto_js_countdown.asp). 
```javascript
let currentTime = new Date().getTime(); // Returns the current time in ms
Math.floor(currentTime % (1000*60) / 1000); // Returns the amount of seconds as an integer
// Similar logic for higher order time units (hours, days, etc.)
```
3. Can use the myString.padStart(digitsToPad, paddingValue) function to pad a string to a certain length
```javascript
'543.2'.padStart(6,'0') // returns '0543.2'
```
4. If you want an audio file to play repeatedly, create new Audio objects for each time you call the file. Otherwise it'll wait until the file finished playing the first time. 
