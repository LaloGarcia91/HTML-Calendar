
function SetADateInLaloCalendar(selectorReference, monthDay, monthNumber, year){
    var _AlterCalendarGUI = AlterCalendarGUI();
    var _CalendarSelectors = CalendarSelectors();
        

    try {
        var selectorReferenceType = typeof selectorReference;
        var selector;
        switch(selectorReferenceType){
            case 'string':
                selector = document.querySelector(selectorReference);
                break;

            default:
                selector = selectorReference;
                break;
        }
        
        var calendarLoader = _CalendarSelectors.GetCalendarLoader(selector);
        _AlterCalendarGUI.SetNewDateInCalendarAndSelectorDisplay(calendarLoader, monthDay, (monthNumber-1), year);
    }catch(err){
        // the selector does in the DOM
        console.log("The selector:");
        console.log(selectorReference);
        console.log("does not exist in the DOM.");
        return false;
    }
}