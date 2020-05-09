function PositionCalendar(){
    var classPrototype = ClassPrototype();
    var public_ = classPrototype.members.public;
    var private_ = classPrototype.members.private;  


    private_.CalendarSelectors = CalendarSelectors();

    /*
    *
    */

    public_.PositionCalendarWhenOpened = function(calendarLoader){
        private_.AutoPositionCalendarVertically(calendarLoader);
        private_.AutoPositionCalendarHorizontally(calendarLoader);
    }



    private_.AutoPositionCalendarVertically = function(calendarLoader){
        var calendar = private_.CalendarSelectors.GetCalendarWrapper(calendarLoader);
        var calendarLoaderRects = calendarLoader.getBoundingClientRect();
        var calendarOpener = private_.CalendarSelectors.GetCalendarOpener(calendarLoader);
        var calendarOpenerRects = calendarOpener.getBoundingClientRect();
        var finalTopDistance = calendarLoaderRects.height;
        calendar.style.top = finalTopDistance+'px';
    }



    private_.AutoPositionCalendarHorizontally = function(calendarLoader){
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