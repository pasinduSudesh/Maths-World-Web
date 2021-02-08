/* 
 *  Copyright 2019-2020 Axis Limited Liability Company
 */

import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';

describe('UsersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });

});
