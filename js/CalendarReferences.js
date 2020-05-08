
function CalendarReferences(){
    var classPrototype = ClassPrototype();
    var public_ = classPrototype.members.public;
    var private_ = classPrototype.members.private; 
    
    /*
    *
    */
    
    public_.currentDateAsNumeric = CurrentDate('object-numeric', null);
    
    public_.selectorsReferences = {
        calendarLoader:{
            attr:'data-lalo-calendar'
        },
        calendarWrapper:{
            class:'js-lalo-calendar--wrapper'
        },
        openerSelector: {
            attr:'data-lalo-calendar-opener'
        },
        monthSelector:{
            attrs:{
                monthIndex:'data-get-month-name-displayed-index'
            }
        },
        yearSelector:{
            attr:'data-current-year-displayed'
        },
        monthDaysSelectors:{
            selectedDay:{
                highlight:{
                    class:'css-js-selected-day-highlight'
                }
            }
        }
    };

    /*
    *
    */
    
    return public_;
}