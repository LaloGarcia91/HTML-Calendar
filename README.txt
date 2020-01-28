HTML CALENDAR BY LALO GARCIA
V.1.0




Hello and thanks for checking out my HTML Calendar library. 

1. I use to comment all of my codes pretty much for myself but always thinking on other potential people that want to check out my codes in the future, so I tend to be descriptive in my comments.

2. Feel free to do whatever you want with this library, I tried to do my best. Although sometimes might be harder to create and build stuff with vanilla JS than with any other framework or JS library such as ReactJS. You can also try and re-style the calendar by editing the CSS file.

3. You should see an index.html file holding examples of how to use this library, although you can also see the steps below.

4. Don't forget to only Use the minified JS version of the calendar, and if you make any changes to the original files, don't forget to minify the whole files once again. Also, include the CSS file to add styling to the calendar.

*
*
*
*
*

Alright, first of all this HTML Calendar library I did is using 2 more VERY SMALL libraries (might not even be considered libraries) that I created, this libraries 'serve' to create dynamic HTML, and where created with ES5:

----- This Libraries are -----
1. CreateDynamicHTML.js
2. DynamicTable.js

You will find them inside the project folder.

*
*
*
*
*

THIS IS HOW THIS LIBRARY WORKS:


------------------------------------------------
------ HOW TO CREATE A CALENDAR:
------------------------------------------------



1. Create a DIV and add the attribute:
-----> data-clg-loader-ref = '';


2. Create 1 HTML selector where you want the date to be displayed:
It can be either an input (type text), div, p or span element and add the attribute:
-----> data-clg-date-format-display = 'numeric';
-----> Available formats are: numeric, default, short-words.


3. Choose the language (english, spanish or french), to do this, add the attribute:
-----> data-clg-date-language = 'english';

4. Choose if you want to display the ACTUAL date on startup (page load), by adding this attribute:
-----> data-display-actual-date-on-load = 'yes';

5. Choose which HTML element is the one that triggers the calendar to open, by adding this attribute to that selector:
-----> data-clg-date-opener = '';

6. You can add any other CSS selectors to any of the selectors mentioned above.
7. You can create as many calendar 'instances' as you want in the same page.




------------------------------------------------
------ HOW TO ACCESS THE CALENDAR DATE FROM JS:
------------------------------------------------



1. You can just call the value / or textContent of the selector choosed to display the date format. But this way you will just get a string of the date.

OR

2. If you want the month index, monthDay and year. You can reference the selector you used as the 'calendar opener'. That's the one that holds the following attributes:

Month Index attr (january is index 0): 
data-clg-selected-month-index;

Month Day attr: 
data-clg-selected-month-day;

Year attr: 
data-clg-selected-year;

Week Day Index attr (sunday index is 0): 
data-clg-selected-weekday-index;











