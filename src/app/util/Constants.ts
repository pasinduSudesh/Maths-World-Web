/* 
 *  Copyright 2020-2021 404 Solutions Company
 */

export class Constants {
    public static COMP_NAME = {
      add_new_user: 'Add New User',
      content_issue_items: 'Content Issue Items',
      manage_menus: 'Home',
      operations: 'Operations',
      parking_lot_items: 'Parking lot Items',
      student_test_result: 'Student Test Results',
      user_accounts: 'User Accounts',
      reports: 'Reports',
      admin: 'Admin',
      classroom: "Classroom",
      question: "Questions"
    };

    public static PAY_DET = {
      merchant_id : '1216754'
    }

    public static RECAPTURE_DET = {
      siteKey: '6LdTIJUaAAAAAEn7FXBIxk4y2F3r2JB3qiNq56XB',
      secreateKey: '6LdTIJUaAAAAAE4PBrtD6sB2cckCWZhnb6TLSm_7'
    }
  
    public static NORMAL_HEADER_OPTION = {
      isHamburger: true,
      isNotification: false,
      isOtherMenu: false,
      isSearch: false
    };
  
    public static USER_ROLES = {
      SystemAdmin: "admin",
      CourseAdmin: "Course Admin",
      Student: "Student",
      Evaluaor: "evaluator"
    };
    // public static USERAPP = "U1VORklGQnZjblJoYkY4ek5ETTBNelE9";
    // public static USERAPP = "SUNFIFBvcnRhbF8zNDM0MzQ=";
    public static USERAPP = "UG9ydGFs";
    public static APPLANGUAGE = "en-US";

    public static STORAGE = {
      BucketName:"project-tuition",
      Server:"s3.amazonaws.com",
    }

    public static USER_ROLE_ASSIGNMENTS_ADMIN = {
      AddPapers:[Constants.USER_ROLES.SystemAdmin],
      EditPapers:[Constants.USER_ROLES.SystemAdmin],
      ViewPapers:[Constants.USER_ROLES.SystemAdmin, Constants.USER_ROLES.Evaluaor],
      UserManage:[Constants.USER_ROLES.SystemAdmin]
    }

    public static USER_ROLE_ASSIGNMENTS_STUDENT = {
      All:[Constants.USER_ROLES.Student]
    }
  }
  