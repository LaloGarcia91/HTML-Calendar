"use-strict"

CalendarINIT();
function CalendarINIT(){
    var c_MainCalendarStructureGUI = new MainCalendarStructureGUI();
    c_MainCalendarStructureGUI.Init();

    var c_AlterCalendarGUI = new AlterCalendarGUI();
    c_AlterCalendarGUI.Init();

    var c_CalendarEventsManager = new CalendarEventsManager();
    c_CalendarEventsManager.Init();

}
