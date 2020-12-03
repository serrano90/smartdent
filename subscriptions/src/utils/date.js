/**
 * Date Time
 */

export const DateFormatString = (date) => {
    const value = new Date(date);
    return `${value.getDate()}/${value.getMonth()}/${value.getFullYear()}` 
}