import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MoovieProvider } from '../../providers/moovie/moovie';
import { LoadingController } from 'ionic-angular';
import { FilmeDetalhePage } from '../filme-detalhe/filme-detalhe';

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
  public refresher;
  public isRefreshing: boolean = false;


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

  fechaCarregando() {
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
    this.carregaListaFilmes();
  }

  doRefresh(refresher) {
    this.refresher = refresher;
    this.isRefreshing = true;
    this.carregaListaFilmes();
  }

  abrirDetalhes(filme) {
    console.log(filme);
    this.navCtrl.push(FilmeDetalhePage, { id: filme.id });
  }

  carregaListaFilmes() {
    this.abreCarregando();
    this.movieProvider.getLatestMovies().subscribe(
      data => {
        const response = (data as any);
        this.lista_filmes = response.results;

        console.log(response.results);
        this.fechaCarregando();
        if (this.isRefreshing) {
          this.refresher.complete();
          this.refresher = false;
        }
      }, error => {
        console.log("Data Erro: " + error);
        this.fechaCarregando();
        if (this.isRefreshing) {
          this.refresher.complete();
          this.refresher = false;
        }
      }
    )
  }
}
