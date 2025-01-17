import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient,
    private router: Router,
    private authService: MsalService) { }

  getStoredCards() {
    return this.http.get<any>('assets/storedCards.json');
  }
  getCreditCards() {
    return this.http.get<any>('assets/creditcards.json');
  }
  getOrderHistory() {
    return this.http.get<any>('assets/orderHistory.json');
  }
  public logout(): void {
    localStorage.clear();
    this.authService.logoutPopup({
      mainWindowRedirectUri: "/"
    });
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 100);
  }

  handleError(error: HttpErrorResponse) {
    if (error?.status === 401) {
      console.log('logout');
      this.logout();
    }
  }
}

