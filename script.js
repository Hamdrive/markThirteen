var userBday = document.querySelector("#bday-input");
var output = document.querySelector(".output");
var submitBday = document.querySelector("#check-btn");

function reverseBdayString(bday){
    var splitBday = bday.split("");
    var reversedBday = splitBday.reverse();
    var joinBday = reversedBday.join("");
    return joinBday;
}

function checkPalindrome(bday){
    var reverse = reverseBdayString(bday);
    return reverse === bday;
}

function formatDate(date){
    var formattedDate = {day: "", month: "", year: ""};

    if(date.day < 10){
        formattedDate.day = "0" + date.day;
    } else {
        formattedDate.day = date.day.toString();
    }

    if(date.month < 10){
        formattedDate.month = "0" + date.month;
    } else {
        formattedDate.month = date.month.toString();
    }

    formattedDate.year = date.year.toString();
    
    return formattedDate;
}

function getAllDateFormats(date){
    var dateString = formatDate(date);

    var format1 = dateString.day + dateString.month + dateString.year
    var format2 = dateString.month + dateString.day + dateString.year
    var format3 = date.year + dateString.month + dateString.day
    var format4 = dateString.day + dateString.month + dateString.year.slice(-2)
    var format5 = dateString.month + dateString.day + dateString.year.slice(-2)
    var format6 = dateString.year.slice(-2) + dateString.month + dateString.day

          //ddmmyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd
    return [format1, format2, format3, format4, format5, format6]
}

function checkAllPalindromes(date){
    var formats = getAllDateFormats(date);

    var foundPalindrome = false;

    for(var index= 0; index < formats.length; index++){
        if(checkPalindrome(formats[index])){
            foundPalindrome = true;
            break;
        }
    }

    return foundPalindrome;
}

function checkLeapYear(year){
    if(year % 400 === 0){
        return true;
    }
    if(year % 100 === 0){
        return false;
    }
    if(year % 4 === 0){
        return true;
    }
    return false;
}

function getNextDate(date){
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var monthDates = ["31", "28", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31"];

    if (month === 2){
        if(checkLeapYear(year)){
            if(day > 29){
                day = 1;
                month++;
            }
        } else {
            if(day > 28){
                day = 1;
                month++
            }
        }
    } else {
        if(day > monthDates[month - 1 ]){
            day = 1;
            month++
        }
        if(month > 12){
            month = 1;
            year++;
        }
    }

    return { day: day, month: month, year: year }
}

function getNextPalindromeDate(date){
    var countDays = 0;

    var newDate = getNextDate(date);

    while(true){
        countDays++
        if(checkAllPalindromes(newDate)){
            break;
        }
        newDate = getNextDate(newDate);
    }
    return [countDays, newDate]
}

function getPrevDate(date){
    var day = date.day - 1;
    var month = date.month;
    var year = date.year;

    var monthDates = ["31", "28", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31"];

    if(month === 3){
        if(checkLeapYear(year)){
            if(day < 1){
                day = 29;
                month--;
            }
        } else {
            if(day < 1){
                day = 28;
                month--;
            }
        }
    } else {
        if(day < 1){
            month--;
            day = Number(monthDates[month - 1]);
            if(month < 1){
                month = 12;
                day = Number(monthDates[monthDates.length - 1]);
                year--;            
            }
        }
    }
    return { day: day, month: month, year: year }
}

function getPrevPalindromeDate(date){
    var countDays = 0

    var newDate = getPrevDate(date);

    while(true){
        countDays++;
        if(checkAllPalindromes(newDate)){
            break;
        }

        newDate = getPrevDate(newDate);
    }
    return [countDays, newDate];
}

function handlePalindromeClick(){
    var getuserBday = userBday.value;

    if(getuserBday){
        var simplifyDate = getuserBday.split("-");

        prepareDate = {
            day: Number(simplifyDate[2]),
            month: Number(simplifyDate[1]),
            year: Number(simplifyDate[0])
        }

        var getPalindrome = checkAllPalindromes(prepareDate);

        if(getPalindrome){
            output.innerText = "YOUR BDAY IS PALINDROMEEE"
        } else {
            var [nextCount, nextDate] = getNextPalindromeDate(prepareDate);
            var [prevCount, prevDate] = getPrevPalindromeDate(prepareDate);

            if(prevCount > nextCount){
                output.innerText = `The next date is in ${nextCount} days and is on ${nextDate.day}/${nextDate.month}/${nextDate.year}`
            } else{
                output.innerText = `The previous date was ${prevCount} days ago and was on ${prevDate.day}/${prevDate.month}/${prevDate.year}`
            }
        }
    } else {
        output.innerText = "ENTER A DATE"
    }
}

var date1 = {
    day: 2,
    month: 2,
    year: 2020
}
var date2 = {
    day: 15,
    month: 8,
    year: 2020
}
var date3 = {
    day: 31,
    month: 12,
    year: 2020
}

submitBday.addEventListener("click", handlePalindromeClick);

// function getDate(){
//     var bday = userBday.value;
//     var result = checkPalindrome(bday);
//     console.log(result)
// }
