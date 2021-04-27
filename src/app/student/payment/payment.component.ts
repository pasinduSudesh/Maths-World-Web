import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { AlertService } from 'src/app/util/alert/alert.service';
import { LocalStorage } from '../../util/localStorage.service';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from '../../../environments/environment';
import { Constants } from '../../util/Constants';
import { Router } from "@angular/router";
import { PaymentDetailsService } from '../../services/payment/payment-details.service';
declare var payhere: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  isSubmitted = false
  hasErrors = false
  loginError: string = ""
  userId: string
  orderId: string
  items: string
  paperId: string
  categoryId: string

  paper:any;
  
  
  constructor(public fb: FormBuilder, 
    private alertService: AlertService, 
    private http: HttpClient, 
    private router: Router,
    private paymentService: PaymentDetailsService
    ) { 
    payhere.onCompleted = function onCompleted(orderId) {
      console.log("Payment completed. OrderID:" + orderId);
      console.log("dsds"+paymentService.paper);
      this.isSubmitted = true;
      router.navigate(['/paper/list']);
    };

    payhere.onDismissed = function onDismissed() {
      console.log("Payment dismissed");
    };

    payhere.onError = function onError(error) {
      console.log("Error:" + error);
    };

  }
  registrationForm = this.fb.group({
    subscription: ['', [Validators.required]]
  })

    get myForm() {
    return this.registrationForm.get('subscription');
    }

    // payment action trigger 
    paynow() {
      var returnedStatus: any
      this.isSubmitted = true;
      let merchantId
      let notifyUrl
      let returnUrl
      let canselUrl
      let amount
      let currency
      let firstName
      let lastName
      let email
      let phone
      let address
      let city
      let country

      if(!this.registrationForm.valid) {
        this.hasErrors = false;
        this.alertService.clear();
        this.alertService.error("Please select a subscription method by clicking tick in the circle!!!");
        return false;
      } else {
        amount = JSON.parse(JSON.stringify(this.registrationForm.value.subscription));
        if (amount.toString() === this.paper.prize.toString()) {
          this.orderId = this.paperId;
        } else {
          this.orderId = this.categoryId;
        }

        notifyUrl = environment.SERVER_URL + "/v1/payment/addPayment";
        merchantId = Constants.PAY_DET.merchant_id;
        this.getUserDetails().subscribe( response => {
          returnedStatus = response.status
          currency = "LKR";
          firstName = response.payload.user.firstName;
          lastName = response.payload.user.lastName;
          email = response.payload.user.email;
          phone = response.payload.user.phone;
          address = response.payload.user.address;
          city = response.payload.user.city;
          country = "Sri Lanka"; 


          // Put the payment variables here
          var payment = {
            "sandbox": true,
            "merchant_id": merchantId,    // Replace your Merchant ID
            "return_url": "https://google.com",     // Important
            "cancel_url": "https://ecbd2efff36d.ngrok.io/login",     // Important
            "notify_url": notifyUrl,
            "order_id": this.orderId,
            "items": this.paper.papername,
            "amount": amount,
            "currency": currency,
            "first_name": firstName,
            "last_name": lastName,
            "email": email,
            "phone": phone,
            "address": address,
            "city": city,
            "country": country,
            "custom_1": this.userId
          };
          payhere.startPayment(payment);
        })

      }
    
  
    }
  
  ngOnInit() {
    console.log(this.paymentService.paper);
    if(this.paymentService.paper === null){
      this.router.navigate(['/paper/list']);
    }
    this.paper = this.paymentService.paper;
    this.getPaperDetails(this.paper.paperid, this.paper.categoryid, this.paper.categoryId)
  }

  getUserDetails() {
    this.userId = localStorage.getItem(LocalStorage.USER_ID);
    console.log(this.userId);
    let headers: HttpHeaders = new HttpHeaders()
    headers = headers.append("user-id", btoa(this.userId))
    console.log(headers);
    return this.http.get<any>(
      environment.SERVER_URL+ "/v1/users/userDetails",
      {
        headers: headers
      }
    );
  }

  getPaperDetails(paperId, categoryId, items) {
    this.paperId = paperId;
    this.categoryId = categoryId;
    this.items = items;
  }

}
