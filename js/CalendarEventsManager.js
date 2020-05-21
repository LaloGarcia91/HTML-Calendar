

function CalendarEventsManager(){
    var classPrototype = ClassPrototype();
    var public_ = classPrototype.members.public;
    var private_ = classPrototype.members.private; 

    /*
    *
    */

    private_.MainCalendarStructureGUI = MainCalendarStructureGUI();
    private_.AlterCalendarGUI = AlterCalendarGUI();
    private_.GetCalendarInfos = GetCalendarInfos();
    private_.CalendarSelectors = CalendarSelectors();
    private_.PositionCalendar = PositionCalendar();
    private_.allCalendarsLoaders = private_.GetCalendarInfos.allCalendarsLoaders;
    
    private_.currentIndexOfDisplayedMonth = null;
    private_.currentYearDisplayed = null;

    /*
    *
    */
    
    
    public_.Init = function(){
        private_.AddEventsToAllCalendars();
    }

    

    private_.AddEventsToAllCalendars = function(){
        for(var i=0; i<private_.allCalendarsLoaders.length; i++){
            var calendarLoader = private_.allCalendarsLoaders[i];
            public_.AddEventsToThisCalendar(calendarLoader);
        }
    }



    public_.AddEventsToThisCalendar = function(calendarLoader){
        var calendar = private_.CalendarSelectors.GetCalendarWrapper(calendarLoader);
        var language = private_.GetCalendarInfos.GetCalendarLanguage(calendarLoader);

        var monthRightBtn = calendar.querySelector('.js-lalo-calendar--month-right-btn');
        monthRightBtn.addEventListener('click', function(){
            private_.AlterCalendarGUI.ChangeMonthToNext(calendar, language);
        }, false);

        var monthLeftBtn = calendar.querySelector('.js-lalo-calendar--month-left-btn');
        monthLeftBtn.addEventListener('click', function(){
            private_.AlterCalendarGUI.ChangeMonthToPrevious(calendar, language);
        }, false);

        var yearRightBtn = calendar.querySelector('.js-lalo-calendar--year-right-btn');
        yearRightBtn.addEventListener('click', function(){
            private_.AlterCalendarGUI.ChangeYearToNext(calendar);
        }, false);

        var yearLeftBtn = calendar.querySelector('.js-lalo-calendar--year-left-btn');
        yearLeftBtn.addEventListener('click', function(){
            private_.AlterCalendarGUI.ChangeYearToPrevious(calendar);
        }, false);

        var monthDaysTbody = calendar.querySelector('.js-lalo-calendar--table-tbody');
        monthDaysTbody.addEventListener('click', function(e){
            var monthDayClicked = e.target;
            private_.AlterCalendarGUI.HighlightClickedMonthDay(calendarLoader, monthDayClicked);
        }, false);

        var closeCalendarBtn = calendar.querySelector('.js-lalo-calendar--close-btn');
        closeCalendarBtn.addEventListener('click', function(e){
            private_.AlterCalendarGUI.HideCalendar(calendarLoader);
        }, false);

        var calendarOpener = calendarLoader.querySelector('[data-lalo-calendar-opener]');
        calendarOpener.addEventListener('click', function(e){
            private_.AlterCalendarGUI.ShowCalendar(calendarLoader);
        }, false);
        
        window.addEventListener('resize', function(){
            private_.PositionCalendar.PositionCalendarWhenOpened(calendarLoader);
        }, false);
    }
    

    return public_;
}