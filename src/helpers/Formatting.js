/**
 * Converts the given date data into a cleaner-looking string of the format:</p>
 * "dd MMM yyyy at hh:mm a"
 * See https://docs.oracle.com/javase/7/docs/api/java/text/SimpleDateFormat.html
 * @param {Date} date The date to clean.
 * @returns {string} A cleaner-looking string with the above format.
 */
export function cleanDate(date) {
    const day = date.getDate()
    const month = getMonthName(date.getMonth())
    const year = date.getFullYear()
    var [hours, period] = convert24HourTo12Hour(date.getHours())
    hours = padTimeUnit(hours)
    const minutes = padTimeUnit(date.getMinutes())

    return day + " " + month + " " + year + " at " + hours + ":" + minutes + " " + period
}

/**
 * Converts a 24-based hour (00-23) to a 12-based hour (1-12) and provides the period (AM/PM).
 * @param {number} hour The 24-hour to convert.
 * @returns {[number, string]} The new 12-hour as a number and the period as a string ("AM" or "PM").
 */
function convert24HourTo12Hour(hour) {
    var resultHour
    if (hour === 0) { // Midnight
        resultHour = 12
    } else if (hour > 12) { // Hours 13 - 23
        resultHour = hour - 12
    } else { // Hours 1 - Noon
        resultHour = hour
    }

    var resultPeriod = hour < 12 ? "AM" : "PM"

    return [resultHour, resultPeriod]
}

/**
 * Converts an hour or a minute number into a string with a leading zero if needed.
 * @param {number} timeUnit The time unit to pad.
 * @returns {string} The string equivalent of the provided time unit with a leading zero if needed.
 */
function padTimeUnit(timeUnit) {
    if (timeUnit < 10) {
        return "0" + timeUnit
    } else {
        return "" + timeUnit
    }
}

/**
 * Converts the given month number to a string with the abbreviated name of the month.
 * @param {number} monthNumber The number of the month (0 = January).
 * @returns {string} The abbreviated name of the given month (ex: "Apr", "Sep").
 */
function getMonthName(monthNumber) {
    switch (monthNumber) {
        default:
        case 0:
            return "Jan"
        case 1:
            return "Feb"
        case 2:
            return "Mar"
        case 3:
            return "Apr"
        case 4:
            return "May"
        case 5:
            return "Jun"
        case 6:
            return "Jul"
        case 7:
            return "Aug"
        case 8:
            return "Sep"
        case 9:
            return "Oct"
        case 10:
            return "Nov"
        case 11:
            return "Dec"
    }
}