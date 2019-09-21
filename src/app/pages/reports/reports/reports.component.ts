import { Category } from './../../categories/shared/categorie.model';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { EntryService } from './../../entries/shared/entry.service';
import { CategoryService } from './../../categories/shared/category.service';

import currencyFormarter from 'currency-formatter';
import { Entry } from '../../entries/shared/entry.model';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  expenseTotal: any = 0;
  revenueTotal: any = 0;
  balance: any = 0;

  expenseChartData: any;
  revenueChartData: any;

  chartOptions: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };

  categories: Category[] = [];
  entries: Entry[] = [];

  @ViewChild('month', { static: false }) month: ElementRef = null;
  @ViewChild('year', { static: false }) year: ElementRef = null;


  constructor(
    private categoryService: CategoryService,
    private entryService: EntryService
  ) { }

  ngOnInit() {
    this.categoryService.getAll().subscribe(data => this.categories = data);
  }

  generateReports() {
    const month = this.month.nativeElement.value;
    const year = this.year.nativeElement.value;

    if (!month || !year) {
      console.error('Selecione o Mes e o Ano')
    } else {
      this.entryService.getByMonthAndYear(month, year).subscribe(this.setValues.bind(this));
    }
  }

  private setValues(entries: Entry[]): void {
    this.entries = entries;
    this.calculateBalance();
    this.setChartData();
  }

  private calculateBalance() {
    let expenseTotal = 0;
    let revenueTotal = 0;

    this.entries.forEach(entry => {
      if (entry.type == 'revenue') {
        revenueTotal += this.unformatCurrency(entry.amount);
      } else {
        expenseTotal += this.unformatCurrency(entry.amount);
      }
    });

    this.revenueTotal = this.formatCurrency(revenueTotal);
    this.expenseTotal = this.formatCurrency(expenseTotal);
    this.balance = this.formatCurrency(revenueTotal - expenseTotal);
  }

  private setChartData() {
    this.revenueChartData = this.getChartData('revenue', 'Gráfico de Receitas', '#9CCC65');
    this.expenseChartData = this.getChartData('expense', 'Gráfico de Despesas', '#E03131');
  }

  private getChartData(entryType: string, title: string, color: string) {
    const chartData = [];
    this.categories.forEach(category => {
      const filteredEntries = this.entries.filter(
        entry => (entry.categoryId === category.id) && (entry.type == entryType)
      );

      if (filteredEntries.length > 0) {
        const totalAmount = filteredEntries.reduce(
          (acc, cur) => acc + this.unformatCurrency(cur.amount), 0
        );

        chartData.push({
          categoryName: category.name,
          totalAmount
        });
      }
    });

    return {
      labels: chartData.map(item => item.categoryName),
      datasets: [{
        label: title,
        backgroundColor: color,
        data: chartData.map(item => item.totalAmount)
      }]
    };
  }


  private formatCurrency(value: number): string {
    return currencyFormarter.format(value, { code: 'BRL' });
  }

  private unformatCurrency(value: string): number {
    return currencyFormarter.unformat(value, { code: 'BRL' })
  }

}
