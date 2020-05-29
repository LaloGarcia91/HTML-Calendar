HTML CALENDAR BY LALO GARCIA
    MIT LICENCE (obviously)
    V.3.0


--------------
* 
You MIGHT don't need to read this file if you saw the examples in index.html
Although, here it is:
*



----------------------------------------
******* HOW TO USE THE CALENDAR ********
----------------------------------------

1. Create a Div and add the attribute: "data-lalo-calendar='' "


2. To change the calendar language (english, spanish, french):
    Create a <span> or <p> or <div> element inside that Div, and add the attribute: 
        " data-lalo-calendar-language= 'spanish' " 
    
    *The default language is English, you don't need to add this element unless you want another language.


3. Display the date in an HTML selector:
    Create an 'input element (type='text')' or 'p' or 'div' element and add the attributes: 
        a) Options for date format:

            // Default formats options
            a) data-lalo-calendar-display-format='default-numeric' //shows a dnumeric date
            b) data-lalo-calendar-display-format='default-short' //shows a date displayed as short words
            c) data-lalo-calendar-display-format='default-long'//shows a date displayed as long words
            
            // Custom Formats Options
            // This Custom Format options are mean for you to write how you want the date to be displayed, the words: month, day, weekday, year will be replaces by their actual values when the program runs.

            d) data-lalo-calendar-display-format='custom-numeric: month / day / year'
            e) data-lalo-calendar-display-format='custom-numeric: day / month / year'
            f) data-lalo-calendar-display-format='custom-short: weekday, day / month / year'
            g) data-lalo-calendar-display-format='custom-long: weekday - month - day - year'
            

        b) data-lalo-calendar-opener='' (in case you want this element to be the one that opens the calendar, otherwise just create another element like a <button> and add this attribute to it.)
    
    Add an id to this element so you can reference the date later on. Example: id='my-calendar'
    

4. Final Example:

    <div data-lalo-calendar>
        <p data-lalo-calendar-language="spanish"></p>
        <input data-lalo-calendar-display-format="long-words" data-lalo-calendar-opener='' id='my-calendar'>
    </div>



---------------------------------------------------
******* HOW TO LOAD A DATE IN THE CALENDAR ********
---------------------------------------------------

Here is how you can load/set a date in a calendar, like when you retrieve a date from the DB and you want/need to set the calendar to that date.

Call the following function and pass the correct parameters.

Example with parameters names:
    SetADateInLaloCalendar(selectorWhereDateIsDisplayed, monthDay, monthNumber, year);

Example with real values:
    SetADateInLaloCalendar('#my-calendar', 18, 1, 2011);

    The above will translate to "18 - January - 2011" following in the calendar, and will be displayed accordingly to how you choosed the date format to be shown (explained in the earlier instructions):


----------------------------
******* EXTRA NOTES ********
----------------------------
    You might find my names (Lalo) here and there, I use it to prefix references, function names etc. The reason why is to PREVENT any functions or reference selectors that you MAY HAVE in your projects from interfering with namings and references of the Calendar codes. So, by prefixing my functions and HTML selectors references with <my name>, I believe that the above, will be prevented 100%.
