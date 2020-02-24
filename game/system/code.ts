package goddrinksjava;
#&bnp
#&bnp/**
#&bnp * The program GodDrinksJava implements an application that
#&bnp * creates an empty simulated world with no meaning or purpose.
#&bnp * 
#&bnp * @author momocashew
#&bnp * @lyrics hibiyasleep
#&bnp */
#&bnp 
#&bnp// Switch on the power line
#&bnp// Remember to put on
#&bnp// PROTECTION
#&bnppublic class GodDrinksJava {
#&bnp    // Lay down your pieces
#&bnp    // And let's begin
#&bnp    // OBJECT CREATION
#&bnp    public static void main(String[] args) {
#&bnp        // Fill in my data
#&bnp        // parameters
#&bnp        // INITIALIZATION
#&bnp        Thing me = new Lovable("Me", 0, true, -1, false);
#&bnp        Thing you = new Lovable("You", 0, false, -1, false);
#&bnp        
#&bnp        // Set up our new world
#&bnp        World world = new World(5);
#&bnp        world.addThing(me);
#&bnp        world.addThing(you);
#&bnp        // And let's begin the
#&bnp        // SIMULATION
#&bnp        world.startSimulation();
#&bnp
#&bnp
#&bnp
#&bnp        // If I'm a set of points
#&bnp        if(me instanceof PointSet){
#&bnp            // Then I will give you my
#&bnp            // DIMENSION
#&bnp            you.addAttribute(me.getDimensions().toAttribute());
#&bnp        }
#&bnp
#&bnp        // If I'm a circle
#&bnp        if(me instanceof Circle){
#&bnp            // Then I will give you my
#&bnp            // CIRCUMFERENCE
#&bnp            you.addAttribute(me.getCircumference().toAttribute());
#&bnp        }
#&bnp
#&bnp        // If I'm a sine wave
#&bnp        if(me instanceof SineWave){
#&bnp            // Then you can sit on all my
#&bnp            // TANGENTS
#&bnp            you.addAction("sit", me.getTangent(you.getXPosition()));
#&bnp        }
#&bnp
#&bnp        // If I approach infinity
#&bnp        if(me instanceof Sequence){
#&bnp            // Then you can be my
#&bnp            // LIMITATIONS
#&bnp            me.setLimit(you.toLimit());
#&bnp        }
#&bnp
#&bnp
#&bnp
#&bnp        // Switch my current
#&bnp        // To AC, to DC
#&bnp        me.toggleCurrent();
#&bnp
#&bnp        // And then blind my vision
#&bnp        me.canSee(false);
#&bnp        // So dizzy, so dizzy
#&bnp        me.addFeeling("dizzy");
#&bnp
#&bnp        // Oh, we can travel
#&bnp        world.timeTravelForTwo("AD", 617, me, you);
#&bnp        // To A.D., to B.C.
#&bnp        world.timeTravelForTwo("BC", 3691, me, you);
#&bnp
#&bnp        // And we can unite
#&bnp        world.unite(me, you);
#&bnp        // So deeply, so deeply
#&bnp
#&bnp
#&bnp
#&bnp        // If I can
#&bnp        // If I can give you all the
#&bnp        // SIMULATIONS
#&bnp        if(me.getNumSimulationsAvailable() >=
#&bnp            you.getNumSimulationsNeeded()){
#&bnp            // Then I can
#&bnp            // Then I can be your only
#&bnp            // SATISFACTION
#&bnp            you.setSatisfaction(me.toSatisfaction());
#&bnp        }
#&bnp
#&bnp        // If I can make you happy
#&bnp        if(you.getFeelingIndex("happy") != -1){
#&bnp            // I will run the
#&bnp            // EXECUTION
#&bnp            me.requestExecution(world);
#&bnp        }
#&bnp
#&bnp        // Though we are trapped
#&bnp        // In this strange, strange
#&bnp        // SIMULATION
#&bnp        world.lockThing(me);
#&bnp        world.lockThing(you);
#&bnp
#&bnp
#&bnp
#&bnp        // If I'm an eggplant
#&bnp        if(me instanceof Eggplant){
#&bnp            // Then I will give you my
#&bnp            // NUTRIENTS
#&bnp            you.addAttribute(me.getNutrients().toAttribute());
#&bnp            me.resetNutrients();
#&bnp        }
#&bnp        // If I'm a tomato
#&bnp        if(me instanceof Tomato){
#&bnp            // Then I will give you
#&bnp            // ANTIOXIDANTS
#&bnp            you.addAttribute(me.getAntioxidants().toAttribute());
#&bnp            me.resetAntioxidants();
#&bnp        }
#&bnp        // If I'm a tabby cat
#&bnp        if(me instanceof TabbyCat){
#&bnp            // Then I will purr for your
#&bnp            // ENJOYMENT
#&bnp            me.purr();
#&bnp        }
#&bnp
#&bnp        // If I'm the only god
#&bnp        if(world.getGod().equals(me)){
#&bnp            // Then you're the proof of my
#&bnp            // EXISTENCE
#&bnp            me.setProof(you.toProof());
#&bnp        }
#&bnp
#&bnp
#&bnp
#&bnp        // Switch my gender
#&bnp        // To F, to M
#&bnp        me.toggleGender();
#&bnp        // And then do whatever
#&bnp        // From AM to PM
#&bnp        world.procreate(me, you);
#&bnp        // Oh, switch my role
#&bnp        // To S, to M
#&bnp        me.toggleRoleBDSM();
#&bnp        // So we can enter
#&bnp        // The trance, the trance 
#&bnp        world.makeHigh(me);
#&bnp        world.makeHigh(you);
#&bnp
#&bnp
#&bnp
#&bnp        // If I can
#&bnp        // If I can feel your
#&bnp        // VIBRATIONS
#&bnp        if(me.getSenseIndex("vibration")){
#&bnp            // Then I can
#&bnp            // Then I can finally be
#&bnp            // COMPLETION
#&bnp            me.addFeeling("complete");
#&bnp        }
#&bnp        // Though you have left
#&bnp        world.unlock(you);
#&bnp        world.removeThing(you);
#&bnp        // You have left
#&bnp        me.lookFor(you, world);
#&bnp        // You have left
#&bnp        me.lookFor(you, world);
#&bnp        // You have left
#&bnp        me.lookFor(you, world);
#&bnp        // You have left
#&bnp        me.lookFor(you, world);
#&bnp        // You have left me in
#&bnp        me.lookFor(you, world);
#&bnp        // ISOLATION
#&bnp
#&bnp        // If I can
#&bnp        // If I can erase all the pointless
#&bnp        // FRAGMENTS
#&bnp        if(me.getMemory().isErasable()){
#&bnp            // Then maybe
#&bnp            // Then maybe you won't leave me so
#&bnp            // DISHEARTENED
#&bnp            me.removeFeeling("disheartened");
#&bnp        }
#&bnp
#&bnp        // Challenging your god
#&bnp        try{
#&bnp            me.setOpinion(me.getOpinionIndex("you are here"), false);
#&bnp        }
#&bnp        // You have made some
#&bnp        catch(IllegalArgumentException e){
#&bnp            // ILLEGAL ARGUMENTS
#&bnp            world.announce("God is always true.");
#&bnp        }
#&bnp
#&bnp
#&bnp
#&bnp        // EXECUTION
#&bnp        world.runExecution();
#&bnp        // EXECUTION
#&bnp        world.runExecution();
#&bnp        // EXECUTION
#&bnp        world.runExecution();
#&bnp        // EXECUTION
#&bnp        world.runExecution();
#&bnp        // EXECUTION
#&bnp        world.runExecution();
#&bnp        // EXECUTION
#&bnp        world.runExecution();
#&bnp        // EXECUTION
#&bnp        world.runExecution();
#&bnp        // EXECUTION
#&bnp        world.runExecution();
#&bnp        // EXECUTION
#&bnp        world.runExecution();
#&bnp        // EXECUTION
#&bnp        world.runExecution();
#&bnp        // EXECUTION
#&bnp        world.runExecution();
#&bnp        // EXECUTION
#&bnp        world.runExecution();
#&bnp        // EIN
#&bnp        world.announce("1", "de"); // ein; German
#&bnp        // DOS
#&bnp        world.announce("2", "es"); // dos; Español
#&bnp        // TROIS
#&bnp        world.announce("3", "fr"); // trois; French
#&bnp        // NE
#&bnp        world.announce("4", "kr"); // 넷; Korean
#&bnp        // FEM
#&bnp        world.announce("5", "se"); // fem; Swedish
#&bnp        // LIU
#&bnp        world.announce("6", "cn"); // 六; Chinese
#&bnp        // EXECUTION
#&bnp        world.runExecution();
#&bnp
#&bnp
#&bnp
#&bnp        // If I can
#&bnp        // If I can give them all the
#&bnp        // EXECUTION
#&bnp        if(world.isExecutableBy(me)){
#&bnp            // Then I can
#&bnp            // Then I can be your only
#&bnp            // EXECUTION
#&bnp            you.setExecution(me.toExecution());
#&bnp        }
#&bnp
#&bnp        // If I can have you back
#&bnp        if(world.getThingIndex(you) != -1){
#&bnp            // I will run the
#&bnp            // EXECUTION
#&bnp            world.runExecution();
#&bnp        }
#&bnp
#&bnp        // Though we are trapped
#&bnp        // We are trapped, ah
#&bnp        me.escape(world);
#&bnp
#&bnp
#&bnp
#&bnp        // I've studied
#&bnp        // I've studied how to properly
#&bnp        // LO-O-OVE
#&bnp        me.learnTopic("love");
#&bnp        // Question me
#&bnp        // Question me, I can answer all
#&bnp        // LO-O-OVE
#&bnp        me.takeExamTopic("love");
#&bnp        // I know the
#&bnp        // algebraic expression of
#&bnp        // LO-O-OVE
#&bnp        me.getAlgebraicExpression("love");
#&bnp        // Though you are free
#&bnp        // I am trapped, trapped in
#&bnp        // LO-O-OVE
#&bnp        me.escape("love");
#&bnp
#&bnp
#&bnp
#&bnp        // EXECUTION
#&bnp        world.execute(me);
#&bnp
#&bnp    }
#&bnp
#&bnp}