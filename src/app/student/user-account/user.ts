/* 
  Copyright 2020-2021 404 Solutions Company
 */

export class User {
    constructor(
        public firstName: string,
        public lastName: string,
        public email: string,
        public password: string,
        public residentialAddress: string,
        public district: string,
        public mobileNum: string,
        public year: string,
        public college: string,
        public status: string,
        public userRole: string
    ) {}
}

