import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'app3';

  ngOnInit(): void {
    var firebaseConfig = {
      apiKey: 'AIzaSyApXUDCUgTN3ZW3wxqB4M871kFdeXkksyQ',
      authDomain: 'jta-instagram-wes.firebaseapp.com',
      databaseURL: 'https://jta-instagram-wes.firebaseio.com',
      projectId: 'jta-instagram-wes',
      storageBucket: 'jta-instagram-wes.appspot.com',
      messagingSenderId: '82248474266',
      appId: '1:82248474266:web:90627d942310f508810923',
      measurementId: 'G-7XX5BQC74P',
    };
    firebase.initializeApp(firebaseConfig);
  }
}
