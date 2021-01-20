import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from "@angular/common";

@Pipe({
    name: 'messagingDateFormatter'
})
export class MessagingDateFormatterPipe implements PipeTransform {

    transform(date: Date): string {
        const pipe = new DatePipe('en-US');
        if (this.isToday(date)) {
            return pipe.transform(date, 'shortTime'); // 9:00 AM
        } else if (this.isSameYear(date)) {
            return pipe.transform(date, 'MMM d'); // June 15
        } else {
            return pipe.transform(date, 'mediumDate'); // June 15, 2015
        }
    }

    isToday(someDate: Date): boolean {
        const today = new Date()
        return someDate.getDate() == today.getDate() &&
            someDate.getMonth() == today.getMonth() &&
            someDate.getFullYear() == today.getFullYear()
    }

    isSameYear(date: Date): boolean {
        const today = new Date()
        return date.getFullYear() == today.getFullYear()
    }

}
