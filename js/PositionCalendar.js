function PositionCalendar(){
    var classPrototype = ClassPrototype();
    var public_ = classPrototype.members.public;
    var private_ = classPrototype.members.private;  


    private_.CalendarSelectors = CalendarSelectors();

    /*
    *
    */

    public_.PositionCalendarWhenOpened = function(calendarLoader){
        private_.PositionCalendarVertically(calendarLoader);
        private_.PositionCalendarHorizontally(calendarLoader);
    }

    
    
    private_.PositionCalendarVertically = function(calendarLoader){
        var calendar = private_.CalendarSelectors.GetCalendarWrapper(calendarLoader);
        var calendarOpener = private_.CalendarSelectors.GetCalendarOpener(calendarLoader);
        var calendarOpenerRects = calendarOpener.getBoundingClientRect();
        calendar.style.top = calendarOpenerRects.height+'px';
    }
    
    
    
    private_.PositionCalendarHorizontally = function(calendarLoader){
        var calendar = private_.CalendarSelectors.GetCalendarWrapper(calendarLoader);
        var calendarRects = calendar.getBoundingClientRect();
        
        var calendarOpener = private_.CalendarSelectors.GetCalendarOpener(calendarLoader);
        var calendarOpenerRects = calendarOpener.getBoundingClientRect();
        var calendarOpenerSpaceToTheLeft = calendarOpenerRects.left;

        var freeSpaceToTheRight = 
            window.innerWidth - (calendarOpenerSpaceToTheLeft + calendarOpenerRects.width);
        var freeSpaceToTheLeft = calendarOpenerSpaceToTheLeft;

        if((freeSpaceToTheRight < calendarRects.width) && (freeSpaceToTheLeft > calendarRects.width)){
            // position the calendar in the left corner of the calendar opener, relative to the window width
            calendar.style.left = (calendarOpenerSpaceToTheLeft - calendarRects.width) + 'px';
        } else {
            // position the calendar in the right corner of the calendar opener, relative to the window width
            calendar.style.left = calendarOpenerSpaceToTheLeft + 'px';
        }
    }
    
    
    
    return public_;
}