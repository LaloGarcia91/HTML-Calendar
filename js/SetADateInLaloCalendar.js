
function SetADateInLaloCalendar(selectorReferenceString, monthDay, monthNumber, year){
    var _AlterCalendarGUI = AlterCalendarGUI();
    var _CalendarSelectors = CalendarSelectors();
    
    var selectorReference;
    try {
        selectorReference = document.querySelector(selectorReferenceString);
        var calendarLoader = _CalendarSelectors.GetCalendarLoader(selectorReference);
        _AlterCalendarGUI.SetNewDateInCalendarAndSelectorDisplay(calendarLoader, monthDay, (monthNumber-1), year);
    }catch(err){
        // the selector does in the DOM
        console.log("The selector:");
        console.log(selectorReferenceString);
        console.log("does not exist in the DOM.");
        return false;
    }
}