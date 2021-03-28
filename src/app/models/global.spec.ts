import { TestBed } from '@angular/core/testing';
import {urlComponentAfter} from "./Global";

describe('Global_Tests', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({});
    });

    it('url component after another should have correct behavior', () => {
        const url = 'https://test.com/test1/test2';
        expect(urlComponentAfter('test1', url)).toEqual('test2');
        expect(urlComponentAfter('test2', url)).toEqual(null);

        const url2 = 'https://test.com/test1/test2?test=testing&anotherTest=anotherTest';
        expect(urlComponentAfter('test1', url2)).toEqual('test2');
        expect(urlComponentAfter('test2', url2)).toEqual(null);
    });
});
