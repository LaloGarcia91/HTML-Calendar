
function LoadDateInLaloCalendar(selectorReference, monthDay, monthIndex, year){
    var _AlterCalendarGUI = AlterCalendarGUI();
    var _CalendarSelectors = CalendarSelectors();
    
    var selectorReference = document.querySelector(selectorReference);
    var calendarLoader = _CalendarSelectors.GetCalendarLoader(selectorReference);
    _AlterCalendarGUI.SetNewDateInCalendarAndSelectorDisplay(calendarLoader, monthDay, (monthIndex-1), year);
}