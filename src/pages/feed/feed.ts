import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MoovieProvider } from '../../providers/moovie/moovie';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
  providers: [
    MoovieProvider
  ]
})
export class FeedPage {

  public objetoFeed = {
    titulo: "Leandro Oliveira",
    data: "15/03/2018",
    descricao: "Estou assistindo a série ",
    qtdLikes: 12,
    qtdComments: 4,
    timeComment: "11h ago"
  }

  public nomeSerie: String = "House of Cards";

  public somarDoisNumeros(num1: number, num2: number): void {
    alert(num1 + num2);
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, private movieProvider: MoovieProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedPage');
    this.movieProvider.getLatestMovies().subscribe(data => {
      const response: any = (data as any);
      const objeto_retorno = JSON.parse(response._body);

      console.log("Data log: " + objeto_retorno);
    }, error => {
      console.log("Data Erro: " + error);
    }
    )
  }

}
