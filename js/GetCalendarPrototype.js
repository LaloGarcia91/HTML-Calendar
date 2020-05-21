function GetCalendarPrototype(){
    var classPrototype = ClassPrototype();
    var public_ = classPrototype.members.public;
    var private_ = classPrototype.members.private;

    /*
    *
    */
    private_.c_MainCalendarStructureGUI = new MainCalendarStructureGUI();
    private_.c_AlterCalendarGUI = new AlterCalendarGUI();
    private_.c_CalendarEventsManager = new CalendarEventsManager();
    /*
    *
    */

    public_.SetInfo = {
        language:'',
        displayDateOnLoad:true,
        displayInInputElement:'true',
        displayFormat: 'short-words', // short-words, long-words, numeric, default
        css:{
            id:'',
            classes:[]
        }
    };




    public_.GetCalendar = function(){
        var calendarLoader = private_.BuildCalendarLoader();
        var calendarPrototype = private_.c_MainCalendarStructureGUI.GetCalendarPrototype(calendarLoader);
        calendarLoader.appendChild(calendarPrototype);

        var calendarExistInLoader = private_.CalendarLoaderHasCalendarInside(calendarLoader);
        if(calendarExistInLoader){
            private_.SetUpAllTheCalendarDependenciesToWork(calendarLoader);
        }
        return calendarLoader;
    }



    private_.CalendarLoaderHasCalendarInside = function(calendarLoader){
        var iterationsCount = 0;
        while(true){
            var calendarExistInLoader = CalendarSelectors().GetCalendarWrapper(calendarLoader);
            if(calendarExistInLoader){
                return true;
            }
            iterationsCount += 1;

            if(iterationsCount == 5){
                console.log("The calendar does not exist in the calendar loader. Please check the code.")
                return false;
            }
        }
    }



    private_.SetUpAllTheCalendarDependenciesToWork = function(calendarLoader){
        private_.c_AlterCalendarGUI.DisplayActualDateInCalendar(calendarLoader);
        private_.c_AlterCalendarGUI.OnloadDisplayActualDateInSelectorDisplay(calendarLoader);
        private_.c_CalendarEventsManager.AddEventsToThisCalendar(calendarLoader);
    }



    private_.BuildCalendarLoader = function(){
        var calendarLoader = private_.GetCalendarLoader();
        
        var language = createNewElement({
            element:'div',
            attributes:[
                ['data-lalo-calendar-language', public_.SetInfo.language]
            ]
        });
        calendarLoader.appendChild(language);
        
        
        if(public_.SetInfo.displayDateOnLoad){
            var displayDateOnload = createNewElement({
                element:'div',
                attributes:[
                    ['data-lalo-calendar-display-date-onload', true]
                ]
            });
            calendarLoader.appendChild(displayDateOnload);
        }


        var opener = createNewElement({
            element:private_.ElementTypeThatDisplaysDate(),
            id:public_.SetInfo.css.id,
            classes:public_.SetInfo.css.classes,
            attributes:[
                ['data-lalo-calendar-display-format',public_.SetInfo.displayFormat],
                ['data-lalo-calendar-opener',''],
                ['readonly', true]
            ]
        });
        calendarLoader.appendChild(opener);

        return calendarLoader;
    }

    
    
    private_.GetCalendarLoader = function(){
        return createNewElement({
            element:'div',
            attributes:[
                ['data-lalo-calendar','']
            ]
        });
    }


    private_.ElementTypeThatDisplaysDate = function(){
        switch(public_.SetInfo.displayInInputElement){
            case true:
                return 'input';

            default:
                return 'p';
        }
    }



    return public_;
}