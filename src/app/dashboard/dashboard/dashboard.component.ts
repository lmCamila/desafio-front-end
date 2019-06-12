import { ApiService } from './../../core/shared/api.service';
import { Component, OnInit } from '@angular/core';
import { concat } from 'rxjs/operators';

interface Data {
  name: string;
  value: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  chart = false;
  title = 'Meus Planos';
  type = 'PieChart';
  data: any;
  columnNames: any;
  options: any;
  width = '600';
  height = '500';
  iniciados: number;
  cancelados: number;
  aguardando: number;
  concluidos: number;
  suspensos: number;
  chartConfig: any;
  colorIni = '#2980B9';
  colorCan = '#EC7063';
  colorAg = '#5499C7';
  colorSus = '#F8C471';
  colorCon = '#58D68D';

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
  constructor(private api: ApiService) {
  }

  ngOnInit() {
    this.api.getPlans().subscribe(result => {
      this.iniciados = result.filter(p => p.status === 'Iniciado').length;
      this.cancelados = result.filter(p => p.status === 'Cancelado').length;
      this.aguardando = result.filter(p => p.status === 'Aguardando início').length;
      this.suspensos = result.filter(p => p.status === 'Suspenso').length;
      this.concluidos = result.filter(p => p.status === 'Concluído').length;
      this.data = [
        [ 'Iniciados', this.iniciados],
        ['Cancelados', this.cancelados],
        [ 'Aguardando Inicio', this.aguardando],
        [ 'Suspenso', this.suspensos],
        [ 'Concluído', this.concluidos],
      ];
      this.columnNames = ['Planos', 'Quantidade de planos'];
      this.options = {
        colors: [this.colorIni, this.colorCan, this.colorAg, this.colorSus, this.colorCon],
        is3D: true
      };
      this.chart = true;
    });
  }
}
