/*
This file is meant to hold the main rules used in the program (this calendar library) in order for it to work. Rules such as: classes names, attributes names etc..

If for some reason the file grows to 500-1000 lines, we will need to create a new file and continue from there.
*/

//
//
//
//
//

function CalendarLaloGarcia_SelectorsReferences(){
    // this references are NOT given by the user/cliente. They are used literally as references through out the program

    return {
        
        languageSelected:{
            attributes:{
                mainReference:'data-clg-date-language',
                all:[]
            }
        },
        
        //
        calendarLoader:{
            attributes:{
                mainReference:'data-clg-loader-ref',
                all:[]
            }
        },
        

        // html selector that triggers a calendar instance to open
        selectorThatOpensCalendar:{
            attributes:{
                mainReference:'data-clg-date-opener'
            }
        },
        
        
        // html selector that shows the calendar date
        selectorThatDisplayDate:{
            attributes:{
                mainReference:'data-clg-date-format-display'
            }
        },



        // main wrapper of the calendar (outer wrapper). The highest parent of the calendar itself
        mainWrapper:{
            mainReference:'.JS-CALENDAR-BY-LALO-GARCIA-MAIN-OUTER-WRAPPER',
            classes:[
                'JS-CALENDAR-BY-LALO-GARCIA-MAIN-OUTER-WRAPPER',
                'calendar-lalo-garcia-main-wrapper'
            ]
        },


        // the inner wrapper of the calendar
        innerWrapper:{
            mainReference:'.JS-CALENDAR-BY-LALO-GARCIA-INNER-WRAPPER',
            classes:[
                'JS-CALENDAR-BY-LALO-GARCIA-INNER-WRAPPER',
                'calendar-lalo-garcia-inner-wrapper'
            ]
        },


        // the button that closes the calendar
        closeCalendarBtn:{
            mainReference:'.JS-CALENDAR-BY-LALO-GARCIA-CLOSE-BTN',
            classes:[
                'JS-CALENDAR-BY-LALO-GARCIA-CLOSE-BTN',
                'calendar-lalo-garcia-close-btns'
            ]
        },
        
        
        // the check btn
        checkBtn:{
            mainReference:'.JS-CALENDAR-BY-LALO-GARCIA-CHECK-BTN',
            classes:[
                'JS-CALENDAR-BY-LALO-GARCIA-CHECK-BTN',
                'calendar-lalo-garcia-check-btns'
            ]
        },



        // calendar month
        month:{
            mainReference: '.JS-CALENDAR-BY-LALO-GARCIA-SELECT-MONTH',
            classes:[
                'JS-CALENDAR-BY-LALO-GARCIA-SELECT-MONTH',
                'month-select-calendar-lalo-garcia'
            ]
        },


        // the months btns
        monthBtns:{

            // right btn
            rightBtn:{
                mainReference: '.JS-MONTH-SELECT-RIGHT-BTN',
                classes:[
                    'JS-MONTH-SELECT-RIGHT-BTN',
                    'month-select-right-btn',
                    'months-and-years-select-ref-btns'
                ]
            },

            // left btn
            leftBtn:{
                mainReference: '.JS-MONTH-SELECT-LEFT-BTN',
                classes:[
                    'JS-MONTH-SELECT-LEFT-BTN',
                    'month-select-left-btn',
                    'months-and-years-select-ref-btns'
                ]
            }
        },



        // calendar year
        year:{
            mainReference: '.JS-CALENDAR-BY-LALO-GARCIA-YEAR-DISPLAY',
            classes:[
                'JS-CALENDAR-BY-LALO-GARCIA-YEAR-DISPLAY',
                'year-select-calendar-lalo-garcia'
            ]
        },

        // the years btns
        yearBts:{

            // right btn
            rightBtn:{
                mainReference: '.JS-YEAR-SELECT-RIGHT-BTN',
                classes:[
                    'JS-YEAR-SELECT-RIGHT-BTN',
                    'year-select-right-btn',
                    'months-and-years-select-ref-btns'
                ]
            },

            // left btn
            leftBtn:{
                mainReference: '.JS-YEAR-SELECT-LEFT-BTN',
                classes:[
                    'JS-YEAR-SELECT-LEFT-BTN',
                    'year-select-left-btn',
                    'months-and-years-select-ref-btns'
                ]
            }
        },

        // table
        table: {
            mainReference:'.JS-CALENDAR-BY-LALO-GARCIA-TABLE',
            classes:[
                'JS-CALENDAR-BY-LALO-GARCIA-TABLE',
                'table-calendar-lalo-garcia'
            ]
        },

        // thead
        thead: {
            mainReference:'.JS-CALENDAR-BY-LALO-GARCIA-THEAD',
            classes:[
                'JS-CALENDAR-BY-LALO-GARCIA-THEAD',
                'thead-calendar-lalo-garcia'
            ]
        },

        // tbody
        tbody: {
            mainReference:'.JS-CALENDAR-BY-LALO-GARCIA-TBODY',
            classes:[
                'JS-CALENDAR-BY-LALO-GARCIA-TBODY',
                'tbody-calendar-lalo-garcia'
            ]
        },
        

        
        // week days names at the top of the calendar
        weekDaysNames: {
            mainReference:'',
            classes:[
                'week-days-names-cells-calendar-lalo-garcia', 
                'week-days-calendar-lalo-garcia'
            ]
        }
    };
}

//
//
//
//
//

function CheckIfYearSelectedIsInRange(yearSelected){

    var minYear = 1;
    var maxYear = 1000000;
    var checkIfValidYear = yearSelected >= minYear && yearSelected <= maxYear;

    if(checkIfValidYear){
        return true;
    }

    alert('Year selection should be between: '+minYear+' and '+maxYear)
    return false;
}








