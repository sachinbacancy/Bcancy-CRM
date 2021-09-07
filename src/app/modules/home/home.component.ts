import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ngOnInit(): void {
  }

  constructor(private router: Router,
    public socialAuthServive: SocialAuthService) {
  }

  logout(): void {
    this.socialAuthServive.signOut().then(() => this.router.navigate(['auth']));
  }


/*   <div id='flash_container'>
  <div class='flash-messages' id="flash-msg">
<div class="alert alert-notice">
<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
Successfully authenticated from Google account.
</div>  </div>
<script>
$(document).ready(function(){
$(".flash-messages").delay(2000).slideUp(1000).fadeOut();
});
</script>
 */
}
