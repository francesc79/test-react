import Moment from 'moment';

/**
 * DateHelper Class supply a utility methods for manage date (format, parse, isValid).
 * The class is a wrapper over third library (Moment).
 * @author Francesco Zanutto <francesco.zanutto@gmail.com>
 */
export default class DateHelper {

    /**
     * Create a DateHelper
     * @param {string} pattern - Pattern 
     * <ul style="list-style: none;">
     *  <li> YYYY  (year)
     *  <li> MM (month in year)
     *  <li> DD (day in month)
     *  <li> hh (hour in day 0-24)
     *  <li> mm (minute in hour)
     *  <li> ss (second in minute).
     * </ul>
     */
    constructor(pattern) {
        this._pattern = pattern;
    }

    /**
     * Parse text from a string to produce a Date
     *  @param {string} string - text
     *  @return {Date} - return a date
     */
    parse (string) {
        let date = Moment(string, this._pattern, true);
        if (date.isValid()) {
            return date.toDate();
        }
        return null;
    }

    /**
     * Formats the given Date into a date/time string
     *  @param {Date} date - date
     *  @return {string} - return a string
     */
    format (date) {
        return Moment(date).format(this._pattern);
    }

    /**
     * Check the given test is a valid date
     *  @param {string} text - text
     *  @return {boolean} - return true if a string is a valid date otherwise false
     */
    isValid (text) {
        return Moment (text, this._pattern, true).isValid();
    }
}