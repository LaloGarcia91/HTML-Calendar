



function CurrentDate(returnType, language){


    var weekDay = DaysOfWeekArray(language);
    var month = MonthsArray(language);


    var date = new Date();
    var finalWeekDay = weekDay[date.getDay()];
    var finalMonth = month[date.getMonth()];
    var finalDayOfMonth = new Date(date).getDate();
    var year = new Date(date).getFullYear();


    //
    var asObject = {
        weekDay:finalWeekDay,
        monthDay:finalDayOfMonth,
        month:finalMonth,
        year:year
    };

    //
    var asNumbers = {
        weekDayIndex:date.getDay(),
        monthDay:finalDayOfMonth,
        monthIndex:date.getMonth(),
        year:year
    };

    //
    var asString = finalWeekDay+", "+finalDayOfMonth+" "+finalMonth+", "+year;


    //
    switch(returnType){
        case 'object':
            return asObject; 

        case 'object-numeric':
            return asNumbers;

        case 'string':
        default:
            return asString;
    }

}

//
//
//
//
//

function GetThisDateInfo(language, thisMonth, thisDayOfMonth, thisYear, returnType){

    var weekDay = DaysOfWeekArray(language);
    var months = MonthsArray(language);


    // If month parameter is not an index (number), lets get the index number.
    // We also need to check if the language is not english, try to "convert" everything to english to make our codes works

    if(isNaN(thisMonth)){
        thisMonth = DetectMonthLanguageAnd_ReturnIndex(thisMonth);

        if(thisMonth < 0){
            alert("Invalid month passed as parameter.");
            return false;
        }
    }



    var date = new Date(thisYear, thisMonth, thisDayOfMonth);

    var finalWeekDay = weekDay[date.getDay()];
    var finalMonth = months[date.getMonth()];
    var finalDayOfMonth = date.getDate();
    var year = date.getFullYear();


    //
    var asNumbers = {
        weekDayIndex:date.getDay(),
        monthDay:finalDayOfMonth,
        monthIndex:date.getMonth(),
        year:year
    };

    //
    var asString = finalWeekDay+", "+finalDayOfMonth+" "+finalMonth+", "+year;


    //
    switch(returnType){
        case 'object':
            return asObject; 

        case 'object-numeric':
            return asNumbers;

        case 'string':
        default:
            return asString;
    }


}

//
//
//
//
//

function DetectMonthLanguageAnd_ReturnIndex(thisMonth){

    var months_spanish = MonthsArray('spanish');
    var months_english = MonthsArray('english'); 
    var months_french = MonthsArray('french'); 


    // check if the month parameter is in spanish
    if(months_spanish.indexOf(thisMonth) >= 0 ){
        return  months_spanish.indexOf(thisMonth);
    }


    // check if the month parameter is in english
    if(months_english.indexOf(thisMonth) >= 0 ){
        return months_english.indexOf(thisMonth);
    }


    // check if the month parameter is in french
    if(months_french.indexOf(thisMonth) >= 0 ){
        return months_french.indexOf(thisMonth);
    }


    // alert and return false if the month parameter is not spanish or english
    alert("Invalid month passed as parameter.");
    return false;
}

//
//
//
//
//

function DetectWeekDayLanguageAnd_ReturnIndex(thisWeekDay){


    // check if the week day parameter is in spanish
    var weekDays_spanish = DaysOfWeekArray('spanish');
    if(weekDays_spanish.indexOf(thisWeekDay) >= 0 ){
        return  weekDays_spanish.indexOf(thisWeekDay);
    }


    // check if the week day parameter is in english
    var weekDays_english = DaysOfWeekArray('english'); 
    if(weekDays_english.indexOf(thisWeekDay) >= 0 ){
        return weekDays_english.indexOf(thisWeekDay);
    }


    // check if the week day parameter is in french
    var weekDays_french = DaysOfWeekArray('french'); 
    if(weekDays_french.indexOf(thisWeekDay) >= 0 ){
        return weekDays_french.indexOf(thisWeekDay);
    }


    alert("Invalid week day passed as parameter.");
    return false;
}

//
//
//
//
//

function DaysInThisMonth(thisMonth, year) {


    /*
    if month parameter is not an index (number), lets get the index number
    */

    if(isNaN(thisMonth)){
        thisMonth = DetectMonthLanguageAnd_ReturnIndex(thisMonth);
    }


    var thisDate = new Date(year, thisMonth);

    return new Date(thisDate.getFullYear(), thisDate.getMonth() + 1, 0).getDate();

}

//
//
//
//
//

function CurrentMonthName(language){

    var month = MonthsArray(language);

    //
    var date = new Date();
    var monthIndex = date.getMonth();
    var monthName = month[monthIndex];

    //
    return monthName;
}

//
//
//
//
//

function GetDateTime(returnType) {

    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();

    if (month.toString().length == 1) {
        month = '0' + month;
    }
    if (day.toString().length == 1) {
        day = '0' + day;
    }
    if (hour.toString().length == 1) {
        hour = '0' + hour;
    }
    if (minute.toString().length == 1) {
        minute = '0' + minute;
    }
    if (second.toString().length == 1) {
        second = '0' + second;
    }

    //
    var dateTimeAsObject = {
        year:year,
        month:month,
        day:day,
        hour:hour,
        minute:minute,
        seconds:second
    };
    //
    var dateTimeAsString = year + '/' + month + '/' + day + ' ' + hour + ':' + minute + ':' + second;


    switch(returnType){
        case 'object':
            return dateTimeAsObject;

        case 'string':
        default:
            return dateTimeAsString;
    }


}

//
//
//
//
//

function GetCurrentYear(){
    var now = new Date();
    var year = now.getFullYear();

    return year;
}

//
//
//
//
//

function MonthsArray(language){

    if(language){
        return  AllMonths()[language];
    } else {
        return  AllMonths();
    }


    function AllMonths(){
        return {
            english: English(),
            spanish: Spanish(),
            french: French()
        };
    }


    function English(){
        return function(){
            var months = [];
            months[0] = "january";
            months[1] = "february";
            months[2] = "march";
            months[3] = "april";
            months[4] = "may";
            months[5] = "june";
            months[6] = "july";
            months[7] = "august";
            months[8] = "september";
            months[9] = "october";
            months[10] = "november";
            months[11] = "december";
            return months;
        }()
    }


    function Spanish(){
        return function(){
            var months = [];
            months[0] = "enero";
            months[1] = "febrero";
            months[2] = "marzo";
            months[3] = "abril";
            months[4] = "mayo";
            months[5] = "junio";
            months[6] = "julio";
            months[7] = "agosto";
            months[8] = "septiembre";
            months[9] = "octubre";
            months[10] = "noviembre";
            months[11] = "diciembre";
            return months;
        }()
    }


    function French(){
        return function(){
            var months = [];
            months[0] = "janvier";
            months[1] = "fevrier";
            months[2] = "mars";
            months[3] = "avril";
            months[4] = "mai";
            months[5] = "juin";
            months[6] = "juillet";
            months[7] = "août";
            months[8] = "septembre";
            months[9] = "octobre";
            months[10] = "novembre";
            months[11] = "décembre";
            return months;
        }()
    }
}

//
//
//
//
//

function ReturnAllMonthsAsSelectOptions(returnType, language, capitalize){

    var acumulated;

    switch(returnType){
        case "html":
            return ReturnAsHTML();
            break;

        default:
            return false;
    }



    function ReturnAsHTML(){

        acumulated = "";

        Array.prototype.forEach.call(MonthsArray(language), function(month){

            if(capitalize){
                acumulated += "<option value='"+month+"'>"+CapitalizeFirstLetter(month)+"</option>";
            }else {
                acumulated += "<option value='"+month+"'>"+month+"</option>";
            }

        });

        return acumulated;
    }

}

//
//
//
//
//

function ReturnThisMonthDaysList(returnType, thisMonth, year){
    var thisMonthDays = DaysInThisMonth(thisMonth, year);


    switch(returnType){
        case 'html-options':
            return ReturnAsHTMLoptions();

        case 'json':
            return false;

        case 'array':
            return false;

        default: 
            return false;
    }



    function ReturnAsHTMLoptions(){
        var acumulatedDaysOptions = "";

        for(var day=1; day<=thisMonthDays; day++){

            acumulatedDaysOptions += "<option value='"+day+"'>"+day+"</option>";
        }

        return acumulatedDaysOptions;
    }



    return acumulatedDaysOptions;
}

//
//
//
//
//

function ReturnCurrentYearAsHTMLoption(){
    var year = GetCurrentYear();

    return "<option value='"+year+"'>"+year+"</option>";
}

//
//
//
//
//

function DaysOfWeekArray(language){

    if(language){
        return  AllDaysOfWeek()[language];
    } else {
        return  AllDaysOfWeek();
    }


    function AllDaysOfWeek(){
        return {
            english: English(),
            spanish: Spanish(),
            french: French()
        };
    }


    function English(){
        return function(){
            var weekDay = [];
            weekDay[0] = "sunday";
            weekDay[1] = "monday";
            weekDay[2] = "tuesday";
            weekDay[3] = "wednesday";
            weekDay[4] = "thursday";
            weekDay[5] = "friday";
            weekDay[6] = "saturday";
            return weekDay;
        }()
    }


    function Spanish(){
        return function(){
            var weekDay = [];
            weekDay[0] = "domingo";
            weekDay[1] = "lunes";
            weekDay[2] = "martes";
            weekDay[3] = "miercoles";
            weekDay[4] = "jueves";
            weekDay[5] = "viernes";
            weekDay[6] = "sabado";
            return weekDay;
        }()
    }


    function French(){
        return function(){
            var weekDay = [];
            weekDay[0] = "dimanche";
            weekDay[1] = "lundi";
            weekDay[2] = "mardi";
            weekDay[3] = "mercredi";
            weekDay[4] = "jeudi";
            weekDay[5] = "vendredi";
            weekDay[6] = "samedi";
            return weekDay;
        }()
    }
}

//
//
//
//
//

function ReturnIndexOfFirstWeekDayOfAMonth(language, monthIndex, year){

    var getThisDate = GetThisDateInfo(language, monthIndex, 1, year);
    var daysOfWeek = DaysOfWeekArray(language);

    return daysOfWeek.indexOf(getThisDate.weekDay);
}





