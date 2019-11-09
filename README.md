# betterRSlider
Range slider plugin for jQuery

### UML diagram
<h1 align="center">
  <br/>
  <img src="https://raw.githubusercontent.com/BOBRIWE/betterRSlider/master/UML-Diagram.png" width="1272px"/>
  <br/>
  <br/>
</h1>

### Architecture Description
Application uses MVC pattern. Where Model is BetterRSlider, Controller is BetterRSliderController and View is BetterRSliderView. I used active type of this pattern where View and Controller know about Model. 

Also I used Observer pattern which make MVC easier in JS. Here observer is View. When Observable (Model) get changes in options or specifically in options.value it notify all listeners which implements IBetterRSliderListener interface.

Controller is used for handling mouse events such as mousedown, mouseup and mousemove. When mousemove event fires, Controller use dependency called OptionsHandler which check that options correct and increment value with some steps depending on how far mouse was moved. Then controller send new options to model and it notify observers.

User also can change options manually and it works same as in controller.
