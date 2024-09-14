# storymate-animejs-toolkit

Open this page: https://playables-dev.github.io/storymate-animejs-toolkit/  
to test anime.js behaviours sponsored by StoryMate.  

# Example story:
The first few passages of a text adventure that showcase many of the behaviors are included under "example-story" - download it if you want to try it out.

# Making your own behaviors:  
Most of the behaviors follow a general template for how they work. Almost all have:  
-An html element the behavior is tied to, which has a css class identifying it to the behavior (e.g. "class='spoiler-text'")  
-A javascript file with the behavior code with the following general structure:  
    -An array of all elements that have the corresponding class, obtained with document.getElementsByClassName. Note that you can also access each element  
    through anime.js by setting the target of your animation to the class name (for example, animate('.spoiler-text', {})). This will work in most situations,  
    but in some specific cases where you need to access attributes of the element outside of your animation, the former method works where this method does not.  
    -If using getElementsByClassName, a for loop that iterates through the array of all corresponding elements.  
    -With in the for loop is the code for the behavior, icnluding any triggers (such as an eventHandler for clicking) and the anime.js animation(s) themselves.  
Many behaviors have parameters which can be changed per element. This is done by storing the values in data- attributes in the tag, and accessing them via element.dataset.data-name.  

# Where to find the example behaviors:  
The javascript files for the animations and behaviors are located in website->scripts->behaviors. Each are showcased in a corresponding html stored in preview-pages, loaded into an iframe on click in index.  