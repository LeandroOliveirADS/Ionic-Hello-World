import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MoovieProvider } from '../../providers/moovie/moovie';

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
  providers: [
    MoovieProvider
  ]
})
export class FeedPage {

  public lista_filmes = new Array<any>();


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
    this.movieProvider.getLatestMovies().subscribe(
      data => {
        const response = (data as any);
        this.lista_filmes = response.results;

        console.log(response);
      }, error => {
        console.log("Data Erro: " + error);
      }
    )
  }

}
