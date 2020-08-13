## Avoid COVID Game:

### Developer Objective:

> - Educate people on risk factors
>
> - Say something about resources and opportunity disparities and their effects on covid risk


#### Player Objectives:
>* Survive for set period of time while avoiding catching *covid*.  
> 
> * Balance maintaining physical and mental health, managing basic needs like food and money, and taking precautions to avoid *covid*.
> 
> * Loss is either by Phys/Mental Health or by contracting *covid*.
> 
> * Game is not meant to be *winnable* after certain amount of time.

### User Stories: 
 * I want to be able to see the status of my gamerep's health, food, etc AND to have it be noticeable when it goes down or up
 * I want to get feedback when I make a choice telling me what the result of that was and what my status is now and maybe hint to me what further options I have after that
 * I want to be able to tell how my person is moving on the outside board, not too fast but also not so slow that it's painful to control
 * I don't want to make any game choices by mistake; i.e. leave the store or go in by pressing accidentally
 * I want to know how well I'm doing so I can adjust my choices: maybe include reminders if things are getting bad and color code stats display

### Minimal Viable Product
- Has 3 interaction contexts:
1. **Home:** 
   - Display:
     - pic representing player with player name
     - Time (H and D), Health, Mental Health, Food, Money, (maybe Risk Factor, time since last exposure, Caution)
  
   - Action Choices:
     - Exercise
     - Talk/text/zoom?
     - (food goes down automatically)
     - ( maybe drink, eat ice-cream, watch tv)
     - Go out: 
       - choice: what to wear (protective)

  1. **Outside:**
     - Display/Action:
  
       - street grid layout (inspo: pokemon, police quest) 
       - Icon representing player with movement in grid controlled by on-screen elements for mobile and (also by keyboard arrows for desktop - not crucial): REQUIRE response on screen to show direction element clicked
       - random generated pop up events
       - display to player about type of risk event AND option to choose response
       - preset consequences based on risk AND using playerStats (risk factor, exposure time, caution, etc.): calculate and record internally and show to player where appropriate
       - Option to enter 3rd context: grocery/workplace/pharmacy/park/indoor cafe/etc. ONLY grocery and maybe workplace essential for MVP
  
   1. **Non-home contained settings "space":** 
       - Display/Activity:
         - Non-interacting place background pic
         - random generator tied to time in store/park
         - pop-up risk events with option to choose
         - replenishment of playerStats based on time there: longer is better
         - option to leave at any time
         - second zoomed in time counter for time in this space

## Stretch game features: 
 - Choice of "difficulty" before start opens different posssiblities: 
   - work from home
   - order food by app
   - etc
 - Work choices: 1st stretch feature to tackle
   - work to make money: choice of how hard to work: earnings vs risk

### MCD setup: 

...to fill in

### Wireframes:

![Home Screeen](images/IMG_2528.jpg)
![Outside Screen](images/IMG_2530.jpg)
![Store Screen](images/IMG_2532.jpg)

### Deployment Link:
###### [mygame]('avoidcovid.surge.sh')


  