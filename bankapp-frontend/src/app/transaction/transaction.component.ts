import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import jspdf from 'jspdf';
import 'jspdf-autotable'

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  searchTerm:string='';
  transactions:any=[];
  constructor(private api:ApiService){}
  ngOnInit(): void {
    this.api.transactionHistory().subscribe((result:any)=>{
      console.log(result); //array of transactions
      this.transactions=result.transaction
      console.log(this.transactions);
    },
    (result:any)=>{
      console.log(result.error.meassage);
    })

  }

  //generate pdf
  generatepdf(){
    //1.create an object for jspdf
    var pdf = new jspdf();

    //2setup row for the table
    let thead = ['Type','From Account','To Account','Amount']
    let tbody = []

    //3 setup properties for the table
    pdf.setFontSize(16)
    pdf.text('Mini Statements',15,10)

    //4 To display as table, we needed to convert array of objects into nested array
    for(let item of this.transactions){
      let temp = [item.type,item.fromAcno,item.toAcno,item.amount] //nest array [[] [] []]
      tbody.push(temp)
    }

    //5convert nested array into table structure using jspdf-autotable
    (pdf as any).autoTable(thead,tbody)

    //6 to open pdf in another tab
    pdf.output('dataurlnewwindow')

    //7 download/save pdf
    pdf.save('TransactionHistory.pdf')
  }
}
