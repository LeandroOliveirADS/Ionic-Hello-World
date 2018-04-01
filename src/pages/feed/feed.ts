import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MoovieProvider } from '../../providers/moovie/moovie';
import { LoadingController } from 'ionic-angular';

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
  public loader;


  public objetoFeed = {
    titulo: "Leandro Oliveira",
    data: "15/03/2018",
    descricao: "Estou assistindo a série ",
    qtdLikes: 12,
    qtdComments: 4,
    timeComment: "11h ago"
  }

  abreCarregando() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando Filmes...",
    });
    this.loader.present();
  }

  fechaCarregando(){
    this.loader.dismiss();
  }


  public somarDoisNumeros(num1: number, num2: number): void {
    alert(num1 + num2);
  }
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private movieProvider: MoovieProvider,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidEnter() {
    this.abreCarregando();
    this.movieProvider.getLatestMovies().subscribe(
      data => {
        const response = (data as any);
        this.lista_filmes = response.results;

        console.log(response.results);
        this.fechaCarregando();
      }, error => {
        console.log("Data Erro: " + error);
        this.fechaCarregando();
      }
    )
  }

}
