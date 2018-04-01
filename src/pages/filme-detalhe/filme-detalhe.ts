import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MoovieProvider } from '../../providers/moovie/moovie';

/**
 * Generated class for the FilmeDetalhePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filme-detalhe',
  templateUrl: 'filme-detalhe.html',
  providers:[
    MoovieProvider
  ]
})
export class FilmeDetalhePage {
  public filme;
  public filmeId;

  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
    public movieProvider: MoovieProvider) {
  }

  ionViewDidEnter() {
  this.filmeId = this.navParams.get("id");  
  this.movieProvider.getMovieDetails(this.filmeId).subscribe(data=>{
    const response = (data as any);
    this.filme = response;
  }, error =>{
console.log(error);
  }
)
  console.log(this.filmeId);
  }

}
